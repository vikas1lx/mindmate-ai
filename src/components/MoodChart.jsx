/**
 * MoodChart.jsx
 * Line chart showing mood trend for last 7 or 30 days.
 * Uses Recharts with a custom tooltip.
 */
import { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Area, AreaChart,
} from 'recharts';
import { useApp } from '../context/AppContext';

const MOOD_LABELS = { 1: '😔', 2: '😕', 3: '😐', 4: '🙂', 5: '😄' };
const MOOD_COLORS = {
  1: '#f87171', 2: '#fb923c', 3: '#facc15', 4: '#4ade80', 5: '#34d399',
};

// Format date label: "Oct 19"
function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
}

// Custom tooltip
function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 p-3 text-sm max-w-[180px]">
      <p className="font-semibold text-slate-700 dark:text-slate-200 mb-1">{formatDate(d.date)}</p>
      <p className="text-2xl">{MOOD_LABELS[d.mood]}</p>
      <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 leading-snug">{d.note}</p>
      {d.cause && <p className="text-violet-500 dark:text-violet-400 capitalize text-xs mt-1">Cause: {d.cause}</p>}
    </div>
  );
}

export default function MoodChart() {
  const { moodHistory } = useApp();
  const [range, setRange] = useState(7);

  const data = moodHistory.slice(-range).map(d => ({
    ...d,
    dateLabel: formatDate(d.date),
  }));

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
          <span className="text-xl">📈</span> Mood Trend
        </h2>
        <div className="flex gap-1">
          {[7, 30].map(r => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                range === r
                  ? 'bg-violet-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-violet-100'
              }`}
            >
              {r}d
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
          <defs>
            <linearGradient id="moodGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.5} />
          <XAxis
            dataKey="dateLabel"
            tick={{ fontSize: 10, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={false}
            interval={range === 7 ? 0 : 4}
          />
          <YAxis
            domain={[1, 5]}
            ticks={[1, 2, 3, 4, 5]}
            tick={{ fontSize: 10, fill: '#94a3b8' }}
            tickFormatter={v => MOOD_LABELS[v]}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={3} stroke="#e2e8f0" strokeDasharray="4 4" />
          <Area
            type="monotone"
            dataKey="mood"
            stroke="#a78bfa"
            strokeWidth={2.5}
            fill="url(#moodGrad)"
            dot={{ fill: '#a78bfa', r: 4, strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 6, fill: '#7c3aed' }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Mood legend */}
      <div className="flex justify-between mt-3 px-1">
        {Object.entries(MOOD_LABELS).map(([k, v]) => (
          <div key={k} className="flex flex-col items-center gap-0.5">
            <span className="text-sm">{v}</span>
            <div className="w-3 h-1 rounded-full" style={{ background: MOOD_COLORS[k] }} />
          </div>
        ))}
      </div>
    </div>
  );
}
