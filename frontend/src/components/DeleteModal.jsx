import { X } from 'lucide-react';

export default function DeleteModal({ expense, onConfirm, onCancel }) {
  if (!expense) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 w-full max-w-sm animate-slide-up">
        <button onClick={onCancel} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
          <X size={18} />
        </button>
        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🗑️</span>
        </div>
        <h3 className="text-center text-lg font-bold text-slate-800 dark:text-white">Delete Expense?</h3>
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-2">
          Are you sure you want to delete <span className="font-semibold text-slate-700 dark:text-slate-300">"{expense.title}"</span>?
          This action cannot be undone.
        </p>
        <div className="flex gap-3 mt-6">
          <button onClick={onCancel} className="btn-secondary flex-1 justify-center">Cancel</button>
          <button onClick={() => onConfirm(expense.id)} className="btn-danger flex-1 justify-center">Delete</button>
        </div>
      </div>
    </div>
  );
}
