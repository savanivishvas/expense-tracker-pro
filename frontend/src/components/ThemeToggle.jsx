import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { dark, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-yellow-400 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-200"
    >
      {dark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}
