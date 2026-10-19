/**
 * CauseChart.jsx
 * Donut chart showing the most frequent mood triggers.
 * Uses Recharts PieChart.
 */
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CAUSE_FREQUENCY } from '../data/mockData';

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 px-3 py-2 text-sm">
      <p className="font-semibold text-slate-700 dark:text-slate-200">{name}</p>
      <p className="text-slate-500">{value} days</p>
    </div>
  );
}

export default function CauseChart() {
  const top = CAUSE_FREQUENCY[0]; // Highest cause

  return (
    <div className="glass-card p-5">
      <h2 className="font-semibold text-slate-700 dark:text-slate-200 mb-1 flex items-center gap-2">
        <span className="text-xl">🎯</span> Top Cause
      </h2>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Your most frequent trigger this month:{' '}
        <span className="font-semibold text-violet-600 dark:text-violet-400 capitalize">{top.name}</span>
      </p>

      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={CAUSE_FREQUENCY}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
          >
            {CAUSE_FREQUENCY.map((entry, i) => (
              <Cell key={i} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
        {CAUSE_FREQUENCY.slice(0, 6).map(c => (
          <div key={c.name} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: c.fill }} />
            <span className="capitalize truncate">{c.name}</span>
            <span className="ml-auto text-slate-400">{c.value}d</span>
          </div>
        ))}
      </div>
    </div>
  );
}
