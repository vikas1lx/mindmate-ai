/**
 * SleepMoodChart.jsx
 * Scatter chart: Sleep hours vs Mood level (correlation view).
 */
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ZAxis,
} from 'recharts';
import { MOOD_HISTORY } from '../data/mockData';

const MOOD_EMOJI = { 1: '😔', 2: '😕', 3: '😐', 4: '🙂', 5: '😄' };

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 px-3 py-2 text-sm">
      <p className="font-semibold text-slate-700 dark:text-slate-200">{d?.date}</p>
      <p className="text-slate-600 dark:text-slate-300">Sleep: <span className="font-medium">{d?.sleep}h</span></p>
      <p className="text-slate-600 dark:text-slate-300">Mood: <span className="text-lg">{MOOD_EMOJI[d?.mood]}</span></p>
    </div>
  );
}

export default function SleepMoodChart() {
  const data = MOOD_HISTORY.map(d => ({
    sleep: d.sleep,
    mood: d.mood,
    date: d.date,
    note: d.note,
  }));

  // Color dots by mood level
  const colorByMood = (mood) => {
    const colors = { 1: '#f87171', 2: '#fb923c', 3: '#facc15', 4: '#4ade80', 5: '#34d399' };
    return colors[mood] || '#a78bfa';
  };

  return (
    <div className="glass-card p-5">
      <h2 className="font-semibold text-slate-700 dark:text-slate-200 mb-1 flex items-center gap-2">
        <span className="text-xl">😴</span> Sleep vs Mood
      </h2>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        How sleep duration correlates with your mood.
      </p>

      <ResponsiveContainer width="100%" height={200}>
        <ScatterChart margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.5} />
          <XAxis
            type="number"
            dataKey="sleep"
            name="Sleep"
            domain={[2, 10]}
            tickCount={5}
            label={{ value: 'Sleep (hrs)', position: 'insideBottom', offset: -2, fontSize: 10, fill: '#94a3b8' }}
            tick={{ fontSize: 10, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            type="number"
            dataKey="mood"
            name="Mood"
            domain={[1, 5]}
            ticks={[1, 2, 3, 4, 5]}
            tickFormatter={v => MOOD_EMOJI[v]}
            tick={{ fontSize: 12, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={false}
          />
          <ZAxis range={[60, 60]} />
          <Tooltip content={<CustomTooltip />} />
          <Scatter
            data={data}
            shape={(props) => {
              const { cx, cy, payload } = props;
              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={6}
                  fill={colorByMood(payload.mood)}
                  fillOpacity={0.8}
                  stroke="#fff"
                  strokeWidth={1.5}
                />
              );
            }}
          />
        </ScatterChart>
      </ResponsiveContainer>

      <p className="text-xs text-slate-400 dark:text-slate-500 mt-3 text-center">
        Tip: Most high-mood days have 7+ hours of sleep. 🌙
      </p>
    </div>
  );
}
