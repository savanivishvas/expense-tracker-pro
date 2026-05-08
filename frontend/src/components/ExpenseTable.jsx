import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Pencil, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { CATEGORY_COLORS } from '../services/expenseService';

function CategoryBadge({ category }) {
  const color = CATEGORY_COLORS[category] || '#6b7280';
  return (
    <span className="badge text-white text-xs px-2 py-0.5 rounded-full font-medium"
      style={{ backgroundColor: color }}>
      {category}
    </span>
  );
}

export default function ExpenseTable({ expenses = [], onDelete }) {
  const navigate = useNavigate();
  const [sortKey, setSortKey] = useState('date');
  const [sortDir, setSortDir] = useState('desc');

  const sort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  const sorted = [...expenses].sort((a, b) => {
    let av = a[sortKey], bv = b[sortKey];
    if (sortKey === 'amount') { av = +av; bv = +bv; }
    if (av < bv) return sortDir === 'asc' ? -1 : 1;
    if (av > bv) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  const SortIcon = ({ col }) => {
    if (sortKey !== col) return <ChevronUp size={13} className="opacity-20" />;
    return sortDir === 'asc' ? <ChevronUp size={13} className="text-primary-500" /> : <ChevronDown size={13} className="text-primary-500" />;
  };

  const Th = ({ col, children }) => (
    <th onClick={() => sort(col)}
      className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer select-none hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
      <div className="flex items-center gap-1">{children} <SortIcon col={col} /></div>
    </th>
  );

  if (!expenses.length) return (
    <div className="card text-center py-16">
      <p className="text-4xl mb-3">💸</p>
      <p className="text-slate-500 dark:text-slate-400 font-medium">No expenses found</p>
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Add your first expense to get started</p>
    </div>
  );

  return (
    <div className="card p-0 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-100 dark:border-slate-700">
            <tr>
              <Th col="title">Title</Th>
              <Th col="amount">Amount</Th>
              <Th col="category">Category</Th>
              <Th col="date">Date</Th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {sorted.map(exp => (
              <tr key={exp.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group">
                <td className="px-4 py-3.5">
                  <div className="font-medium text-slate-800 dark:text-slate-200">{exp.title}</div>
                  {exp.description && <div className="text-xs text-slate-400 dark:text-slate-500 truncate max-w-48">{exp.description}</div>}
                </td>
                <td className="px-4 py-3.5 font-semibold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                  ₹{Number(exp.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </td>
                <td className="px-4 py-3.5"><CategoryBadge category={exp.category} /></td>
                <td className="px-4 py-3.5 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                  {exp.date ? format(new Date(exp.date), 'dd MMM yyyy') : '—'}
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => navigate(`/expenses/edit/${exp.id}`)}
                      className="p-1.5 rounded-lg bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 hover:bg-primary-100 transition-colors"
                      title="Edit">
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => onDelete(exp)}
                      className="p-1.5 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 hover:bg-red-100 transition-colors"
                      title="Delete">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 bg-slate-50 dark:bg-slate-700/30 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-400">
        {expenses.length} expense{expenses.length !== 1 ? 's' : ''} found
      </div>
    </div>
  );
}
