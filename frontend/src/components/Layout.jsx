import Sidebar from './Sidebar';
import ThemeToggle from './ThemeToggle';
import Toast from './Toast';
import { useExpenses } from '../context/ExpenseContext';
import { Menu, Bell } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ListOrdered, PlusCircle } from 'lucide-react';

const mobileLinks = [
  { to: '/',             label: 'Dashboard', icon: LayoutDashboard },
  { to: '/expenses',     label: 'Expenses',  icon: ListOrdered },
  { to: '/expenses/add', label: 'Add New',   icon: PlusCircle },
];

export default function Layout({ children }) {
  const { toast } = useExpenses();

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur border-b border-slate-100 dark:border-slate-700">
          <h1 className="text-base font-semibold text-slate-700 dark:text-slate-200">Expense Tracker</h1>
          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-6 animate-fade-in">
          {children}
        </main>

        {/* Mobile bottom nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 flex">
          {mobileLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center py-2.5 text-xs font-medium transition-colors ${
                  isActive ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400 dark:text-slate-500'
                }`
              }
            >
              <Icon size={20} className="mb-0.5" />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
