import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl px-3 py-2 shadow-lg">
      <p className="text-sm font-semibold text-slate-800 dark:text-white">{label}</p>
      <p className="text-sm text-primary-600 dark:text-primary-400">₹{payload[0].value?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
    </div>
  );
};

export default function TrendChart({ data = [] }) {
  if (!data.length) return (
    <div className="card h-72 flex items-center justify-center">
      <p className="text-slate-400 dark:text-slate-500 text-sm">No monthly data yet</p>
    </div>
  );

  return (
    <div className="card">
      <h3 className="font-semibold text-slate-800 dark:text-white mb-4">Monthly Spending ({new Date().getFullYear()})</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false}
            tickFormatter={v => `₹${v >= 1000 ? (v/1000).toFixed(1)+'k' : v}`} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(14,165,233,0.08)' }} />
          <Bar dataKey="amount" fill="url(#barGrad)" radius={[6, 6, 0, 0]} />
          <defs>
            <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
