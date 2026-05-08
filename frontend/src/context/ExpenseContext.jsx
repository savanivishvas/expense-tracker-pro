import { createContext, useContext, useState, useCallback } from 'react';
import { expenseService } from '../services/expenseService';

const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchExpenses = useCallback(async (filters = {}) => {
    setLoading(true); setError(null);
    try {
      const data = await expenseService.getAll(filters);
      setExpenses(data);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }, []);

  const fetchSummary = useCallback(async () => {
    try { setSummary(await expenseService.getSummary()); }
    catch (e) { console.error(e); }
  }, []);

  const createExpense = async (data) => {
    const created = await expenseService.create(data);
    setExpenses(prev => [created, ...prev]);
    fetchSummary();
    showToast('Expense added successfully!');
    return created;
  };

  const updateExpense = async (id, data) => {
    const updated = await expenseService.update(id, data);
    setExpenses(prev => prev.map(e => e.id === id ? updated : e));
    fetchSummary();
    showToast('Expense updated successfully!');
    return updated;
  };

  const deleteExpense = async (id) => {
    await expenseService.delete(id);
    setExpenses(prev => prev.filter(e => e.id !== id));
    fetchSummary();
    showToast('Expense deleted.', 'info');
  };

  return (
    <ExpenseContext.Provider value={{
      expenses, summary, loading, error, toast,
      fetchExpenses, fetchSummary, createExpense, updateExpense, deleteExpense
    }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export const useExpenses = () => useContext(ExpenseContext);
