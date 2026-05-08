import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ListOrdered, PlusCircle, TrendingUp } from 'lucide-react';

const links = [
  { to: '/',          label: 'Dashboard',  icon: LayoutDashboard },
  { to: '/expenses',  label: 'Expenses',   icon: ListOrdered },
  { to: '/expenses/add', label: 'Add New', icon: PlusCircle },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 min-h-screen bg-white dark:bg-slate-800 border-r border-slate-100 dark:border-slate-700 px-4 py-6 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
          <TrendingUp size={18} className="text-white" />
        </div>
        <div>
          <p className="font-bold text-slate-800 dark:text-white text-sm leading-tight">ExpenseTracker</p>
          <p className="text-xs text-slate-400">Manage your money</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-200'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto px-2 py-3 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border border-primary-100 dark:border-primary-800/30">
        <p className="text-xs font-semibold text-primary-700 dark:text-primary-400">💡 Tip</p>
        <p className="text-xs text-primary-600 dark:text-primary-300 mt-1">Track every expense to gain full financial clarity.</p>
      </div>
    </aside>
  );
}
