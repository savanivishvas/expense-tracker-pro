import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CATEGORY_COLORS } from '../services/expenseService';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl px-3 py-2 shadow-lg">
      <p className="text-sm font-semibold text-slate-800 dark:text-white">{payload[0].name}</p>
      <p className="text-sm text-slate-500 dark:text-slate-400">₹{payload[0].value?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
    </div>
  );
};

export default function CategoryChart({ data = {} }) {
  const chartData = Object.entries(data).map(([name, value]) => ({ name, value }));
  if (!chartData.length) return (
    <div className="card h-72 flex items-center justify-center">
      <p className="text-slate-400 dark:text-slate-500 text-sm">No data yet</p>
    </div>
  );

  return (
    <div className="card">
      <h3 className="font-semibold text-slate-800 dark:text-white mb-4">Spending by Category</h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={chartData} cx="50%" cy="50%" innerRadius={65} outerRadius={100}
            paddingAngle={3} dataKey="value" stroke="none">
            {chartData.map((entry) => (
              <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || '#6b7280'} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle"
            iconSize={10}
            formatter={(value) => <span className="text-xs text-slate-600 dark:text-slate-300">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
