/**
 * MoodChart.jsx
 * Line/Area chart showing mood trends for 7 or 30 days.
 * Styled in dark navy glassmorphism with cyan/blue glowing gradients.
 */
import { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from 'recharts';
import { useApp } from '../context/AppContext';

const MOOD_LABELS = { 1: '😔', 2: '😕', 3: '😐', 4: '🙂', 5: '😄' };
const MOOD_COLORS = {
  1: '#F43F5E', 2: '#F59E0B', 3: '#22D3EE', 4: '#3B82F6', 5: '#10B981',
};

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  return (
    <div className="bg-[#0A1630] rounded-xl shadow-2xl border border-cyan-500/40 p-3 text-xs max-w-[190px] text-[#E6EDFF]">
      <p className="font-bold text-white mb-1">{formatDate(d.date)}</p>
      <p className="text-2xl mb-1">{MOOD_LABELS[d.mood]}</p>
      <p className="text-[#8FA3C7] text-xs leading-snug">{d.note}</p>
      {d.cause && (
        <p className="text-cyan-400 capitalize text-[11px] mt-1 font-medium">
          Trigger: {d.cause}
        </p>
      )}
    </div>
  );
}

export default function MoodChart() {
  const { moodHistory } = useApp();
  const [range, setRange] = useState(7);

  const data = moodHistory.slice(-range).map((d) => ({
    ...d,
    dateLabel: formatDate(d.date),
  }));

  return (
    <div className="glass-card p-6 rounded-2xl border border-[#3B82F6]/20 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-bold text-white text-base flex items-center gap-2">
            <span className="text-xl">📈</span> Mood Trend Analysis
          </h2>
          <p className="text-xs text-[#8FA3C7] mt-0.5">
            Emotional pattern timeline across past check-ins
          </p>
        </div>
        <div className="flex gap-1.5 p-1 rounded-xl bg-[#0F1D3D] border border-[#3B82F6]/20">
          {[7, 30].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                range === r
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-sm'
                  : 'text-[#8FA3C7] hover:text-white'
              }`}
            >
              {r}d
            </button>
          ))}
        </div>
      </div>

      <div className="w-full h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -25 }}>
            <defs>
              <linearGradient id="cyanMoodGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#22D3EE" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E3A8A" strokeOpacity={0.4} />
            <XAxis
              dataKey="dateLabel"
              tick={{ fontSize: 10, fill: '#8FA3C7' }}
              tickLine={false}
              axisLine={{ stroke: '#1E3A8A', strokeOpacity: 0.5 }}
              interval={range === 7 ? 0 : 4}
            />
            <YAxis
              domain={[1, 5]}
              ticks={[1, 2, 3, 4, 5]}
              tick={{ fontSize: 11, fill: '#8FA3C7' }}
              tickFormatter={(v) => MOOD_LABELS[v]}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={3} stroke="#3B82F6" strokeDasharray="3 3" strokeOpacity={0.4} />
            <Area
              type="monotone"
              dataKey="mood"
              stroke="#22D3EE"
              strokeWidth={3}
              fill="url(#cyanMoodGrad)"
              dot={{ fill: '#3B82F6', r: 4, strokeWidth: 2, stroke: '#22D3EE' }}
              activeDot={{ r: 6, fill: '#22D3EE', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Mood scale indicators */}
      <div className="flex justify-between mt-3 px-2 pt-2 border-t border-[#3B82F6]/15">
        {Object.entries(MOOD_LABELS).map(([k, v]) => (
          <div key={k} className="flex flex-col items-center gap-1">
            <span className="text-base">{v}</span>
            <div
              className="w-4 h-1 rounded-full shadow-sm"
              style={{ background: MOOD_COLORS[k] }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
