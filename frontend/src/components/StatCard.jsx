import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({ title, value, subtitle, icon: Icon, color = 'primary', trend }) {
  const colorMap = {
    primary: 'from-primary-500 to-primary-600',
    emerald: 'from-emerald-500 to-emerald-600',
    violet:  'from-violet-500 to-violet-600',
    amber:   'from-amber-500 to-amber-600',
    rose:    'from-rose-500 to-rose-600',
  };
  const bgMap = {
    primary: 'bg-primary-50 dark:bg-primary-900/20',
    emerald: 'bg-emerald-50 dark:bg-emerald-900/20',
    violet:  'bg-violet-50 dark:bg-violet-900/20',
    amber:   'bg-amber-50 dark:bg-amber-900/20',
    rose:    'bg-rose-50 dark:bg-rose-900/20',
  };

  return (
    <div className="card hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 animate-slide-up">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <p className="mt-1.5 text-2xl font-bold text-slate-800 dark:text-white">{value}</p>
          {subtitle && <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">{subtitle}</p>}
          {trend !== undefined && (
            <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${trend >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
              {trend >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
              {Math.abs(trend)}% vs last month
            </div>
          )}
        </div>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br ${colorMap[color]} shadow-sm`}>
          {Icon && <Icon size={20} className="text-white" />}
        </div>
      </div>
    </div>
  );
}
