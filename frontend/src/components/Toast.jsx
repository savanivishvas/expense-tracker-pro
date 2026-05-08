import { useEffect, useState } from 'react';
import { CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

const styles = {
  success: 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200',
  error:   'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
  info:    'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
};

const icons = { success: CheckCircle, info: Info, error: AlertTriangle };

export default function Toast({ message, type = 'success' }) {
  const [visible, setVisible] = useState(true);
  const Icon = icons[type] || CheckCircle;

  useEffect(() => { setVisible(true); }, [message]);

  if (!visible) return null;
  return (
    <div className={`fixed bottom-20 md:bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg animate-slide-up max-w-sm ${styles[type]}`}>
      <Icon size={18} className="shrink-0" />
      <p className="text-sm font-medium flex-1">{message}</p>
      <button onClick={() => setVisible(false)} className="shrink-0 opacity-60 hover:opacity-100 transition-opacity">
        <X size={16} />
      </button>
    </div>
  );
}
