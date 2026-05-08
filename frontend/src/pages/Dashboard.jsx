import { useEffect } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import StatCard from '../components/StatCard';
import CategoryChart from '../components/CategoryChart';
import TrendChart from '../components/TrendChart';
import { DollarSign, Receipt, TrendingUp, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { CATEGORY_COLORS } from '../services/expenseService';

export default function Dashboard() {
  const { summary, expenses, fetchSummary, fetchExpenses, loading } = useExpenses();

  useEffect(() => {
    fetchSummary();
    fetchExpenses();
  }, []);

  const recentExpenses = [...(expenses || [])].slice(0, 5);

  const fmt = (n) => `₹${Number(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Dashboard</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Welcome back! Here's your financial overview.</p>
        </div>
        <Link to="/expenses/add" className="btn-primary hidden md:flex">
          + Add Expense
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Total Spending" value={fmt(summary?.totalSpending)} subtitle="All time" icon={DollarSign} color="primary" />
        <StatCard title="Total Expenses" value={summary?.expenseCount ?? '—'} subtitle="Recorded entries" icon={Receipt} color="emerald" />
        <StatCard title="Avg. Expense" value={fmt(summary?.averageExpense)} subtitle="Per transaction" icon={TrendingUp} color="violet" />
        <StatCard title="Top Category" value={summary?.highestCategory || '—'} subtitle="Highest spending" icon={Tag} color="amber" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryChart data={summary?.categoryBreakdown || {}} />
        <TrendChart data={summary?.monthlyTotals || []} />
      </div>

      {/* Recent Expenses */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-800 dark:text-white">Recent Expenses</h3>
          <Link to="/expenses" className="text-xs text-primary-600 dark:text-primary-400 hover:underline font-medium">View all →</Link>
        </div>
        {loading ? (
          <div className="flex items-center justify-center h-24">
            <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : recentExpenses.length === 0 ? (
          <p className="text-sm text-center text-slate-400 dark:text-slate-500 py-8">No expenses yet. <Link to="/expenses/add" className="text-primary-500 hover:underline">Add one!</Link></p>
        ) : (
          <div className="space-y-3">
            {recentExpenses.map(exp => (
              <div key={exp.id} className="flex items-center gap-3 py-2 border-b border-slate-50 dark:border-slate-700/50 last:border-0">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: (CATEGORY_COLORS[exp.category] || '#6b7280') + '22' }}>
                  <span className="text-base">{categoryEmoji(exp.category)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{exp.title}</p>
                  <p className="text-xs text-slate-400">{exp.date ? format(new Date(exp.date), 'dd MMM yyyy') : ''}</p>
                </div>
                <span className="font-semibold text-sm text-slate-700 dark:text-slate-300 whitespace-nowrap">{fmt(exp.amount)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function categoryEmoji(cat) {
  const map = { Food: '🍔', Travel: '✈️', Shopping: '🛍️', Bills: '📄', Entertainment: '🎬', Health: '💊', Other: '📌' };
  return map[cat] || '💰';
}
