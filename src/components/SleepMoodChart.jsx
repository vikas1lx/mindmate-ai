/**
 * SleepMoodChart.jsx
 * Scatter chart: Sleep duration vs Mood level correlation.
 * Styled in dark navy glassmorphism with cyan/blue accents.
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
    <div className="bg-[#0A1630] rounded-xl shadow-xl border border-cyan-500/40 px-3.5 py-2.5 text-xs text-[#E6EDFF]">
      <p className="font-bold text-white mb-0.5">{d?.date}</p>
      <p className="text-[#8FA3C7]">
        Sleep: <span className="font-bold text-cyan-300">{d?.sleep} hrs</span>
      </p>
      <p className="text-[#8FA3C7]">
        Mood: <span className="text-base">{MOOD_EMOJI[d?.mood]} (Level {d?.mood}/5)</span>
      </p>
    </div>
  );
}

export default function SleepMoodChart() {
  const data = MOOD_HISTORY.map((d) => ({
    sleep: d.sleep,
    mood: d.mood,
    date: d.date,
    note: d.note,
  }));

  const colorByMood = (mood) => {
    const colors = {
      1: '#F43F5E',
      2: '#F59E0B',
      3: '#22D3EE',
      4: '#3B82F6',
      5: '#10B981',
    };
    return colors[mood] || '#38BDF8';
  };

  return (
    <div className="glass-card p-6 rounded-2xl border border-[#3B82F6]/20 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between mb-1">
        <h2 className="font-bold text-white text-base flex items-center gap-2">
          <span className="text-xl">😴</span> Sleep vs Mood Synergy
        </h2>
        <span className="text-xs text-cyan-400 font-medium">Correlation</span>
      </div>
      <p className="text-xs text-[#8FA3C7] mb-4">
        Discover how hours of restorative sleep directly elevate daily mental ease.
      </p>

      <div className="w-full h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 10, bottom: 0, left: -25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E3A8A" strokeOpacity={0.4} />
            <XAxis
              type="number"
              dataKey="sleep"
              name="Sleep"
              domain={[2, 10]}
              tickCount={5}
              label={{
                value: 'Sleep Duration (hrs)',
                position: 'insideBottom',
                offset: -2,
                fontSize: 10,
                fill: '#8FA3C7',
              }}
              tick={{ fontSize: 10, fill: '#8FA3C7' }}
              tickLine={false}
              axisLine={{ stroke: '#1E3A8A', strokeOpacity: 0.5 }}
            />
            <YAxis
              type="number"
              dataKey="mood"
              name="Mood"
              domain={[1, 5]}
              ticks={[1, 2, 3, 4, 5]}
              tickFormatter={(v) => MOOD_EMOJI[v]}
              tick={{ fontSize: 12, fill: '#8FA3C7' }}
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
                    r={6.5}
                    fill={colorByMood(payload.mood)}
                    fillOpacity={0.85}
                    stroke="#0A1630"
                    strokeWidth={2}
                    style={{
                      filter: `drop-shadow(0 0 5px ${colorByMood(payload.mood)}88)`,
                    }}
                  />
                );
              }}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <p className="text-xs text-cyan-300/80 mt-3 text-center border-t border-[#3B82F6]/15 pt-2">
        💡 High baseline resilience consistently correlates with <strong>7.5+ hours</strong> of sleep.
      </p>
    </div>
  );
}
