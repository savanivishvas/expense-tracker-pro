import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useExpenses } from '../context/ExpenseContext';
import FilterBar from '../components/FilterBar';
import ExpenseTable from '../components/ExpenseTable';
import DeleteModal from '../components/DeleteModal';
import { PlusCircle, RefreshCw } from 'lucide-react';

export default function ExpenseList() {
  const { expenses, fetchExpenses, deleteExpense, loading } = useExpenses();
  const [toDelete, setToDelete] = useState(null);

  useEffect(() => { fetchExpenses(); }, []);

  const handleFilter = (filters) => fetchExpenses(filters);

  const handleConfirmDelete = async (id) => {
    await deleteExpense(id);
    setToDelete(null);
  };

  return (
    <div className="space-y-0 pb-20 md:pb-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Expenses</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">View and manage all your expenses</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => fetchExpenses()} className="btn-secondary" title="Refresh">
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <Link to="/expenses/add" className="btn-primary">
            <PlusCircle size={15} />
            <span className="hidden sm:inline">Add New</span>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <FilterBar onFilter={handleFilter} />

      {/* Loading */}
      {loading ? (
        <div className="card flex items-center justify-center h-40">
          <div className="w-8 h-8 border-3 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <ExpenseTable expenses={expenses} onDelete={setToDelete} />
      )}

      {/* Delete Modal */}
      <DeleteModal
        expense={toDelete}
        onConfirm={handleConfirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
