/**
 * CauseChart.jsx
 * Donut chart showing the most frequent mood triggers.
 * Styled in dark navy glassmorphism with cyan/blue accents.
 */
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { CAUSE_FREQUENCY } from '../data/mockData';

const CAUSE_COLORS = [
  '#22D3EE', // Cyan
  '#3B82F6', // Blue
  '#6366F1', // Indigo
  '#38BDF8', // Sky
  '#F59E0B', // Amber
  '#A78BFA', // Violet
  '#F43F5E', // Rose
  '#10B981', // Emerald
];

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
  return (
    <div className="bg-[#0A1630] rounded-xl shadow-xl border border-cyan-500/40 px-3.5 py-2 text-xs text-[#E6EDFF]">
      <p className="font-bold text-white capitalize">{name}</p>
      <p className="text-cyan-400 font-medium">{value} logged days</p>
    </div>
  );
}

export default function CauseChart() {
  const top = CAUSE_FREQUENCY[0];

  return (
    <div className="glass-card p-6 rounded-2xl border border-[#3B82F6]/20 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between mb-1">
        <h2 className="font-bold text-white text-base flex items-center gap-2">
          <span className="text-xl">🎯</span> Top Mood Triggers
        </h2>
        <span className="text-xs text-cyan-400 font-medium">Monthly Breakdown</span>
      </div>
      <p className="text-xs text-[#8FA3C7] mb-4">
        Highest frequency trigger:{' '}
        <span className="font-bold text-cyan-300 capitalize">{top.name}</span>
      </p>

      <div className="w-full h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={CAUSE_FREQUENCY}
              cx="50%"
              cy="50%"
              innerRadius={52}
              outerRadius={75}
              paddingAngle={4}
              dataKey="value"
              stroke="#050B1A"
              strokeWidth={2}
            >
              {CAUSE_FREQUENCY.map((entry, i) => (
                <Cell key={i} fill={CAUSE_COLORS[i % CAUSE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend Grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3 pt-3 border-t border-[#3B82F6]/15">
        {CAUSE_FREQUENCY.slice(0, 6).map((c, i) => (
          <div key={c.name} className="flex items-center gap-2 text-xs text-[#8FA3C7]">
            <div
              className="w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-sm"
              style={{ background: CAUSE_COLORS[i % CAUSE_COLORS.length] }}
            />
            <span className="capitalize truncate text-[#E6EDFF]">{c.name}</span>
            <span className="ml-auto text-cyan-300/80 font-mono">{c.value}d</span>
          </div>
        ))}
      </div>
    </div>
  );
}
