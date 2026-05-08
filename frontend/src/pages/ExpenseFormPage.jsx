import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ExpenseForm from '../components/ExpenseForm';
import { useExpenses } from '../context/ExpenseContext';

export default function ExpenseFormPage() {
  const { id } = useParams();
  const { fetchExpenses, expenses } = useExpenses();

  useEffect(() => {
    // Make sure expenses are loaded so the form can pre-fill on edit
    if (id && expenses.length === 0) fetchExpenses();
  }, [id]);

  return (
    <div className="pb-20 md:pb-0">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          {id ? 'Edit Expense' : 'Add Expense'}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          {id ? 'Update the details of this expense' : 'Fill in the details to record a new expense'}
        </p>
      </div>
      <ExpenseForm expenseId={id} />
    </div>
  );
}
