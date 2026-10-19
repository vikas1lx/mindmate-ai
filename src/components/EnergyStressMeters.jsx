/**
 * EnergyStressMeters.jsx
 * Animated gauge/progress meters for Energy and Stress levels (0-100).
 */
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

function Meter({ label, value, color, emoji, description }) {
  const percent = Math.min(100, Math.max(0, value));
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2 p-4">
      {/* SVG Gauge */}
      <div className="relative w-24 h-24">
        <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
          {/* Track */}
          <circle
            cx="48" cy="48" r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-slate-200 dark:text-slate-700"
          />
          {/* Progress */}
          <motion.circle
            cx="48" cy="48" r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          />
        </svg>
        {/* Center value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-slate-700 dark:text-slate-200">{percent}</span>
          <span className="text-xs text-slate-400">%</span>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          {emoji} {label}
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{description}</p>
      </div>

      {/* Slider to adjust */}
    </div>
  );
}

function getEnergyDesc(v) {
  if (v >= 80) return 'Energized & focused';
  if (v >= 60) return 'Moderate energy';
  if (v >= 40) return 'Slightly drained';
  return 'Low energy — rest up!';
}

function getStressDesc(v) {
  if (v <= 20) return 'Calm & relaxed';
  if (v <= 40) return 'Mildly stressed';
  if (v <= 60) return 'Moderate stress';
  if (v <= 80) return 'High stress today';
  return 'Very high — breathe!';
}

export default function EnergyStressMeters() {
  const { energy, stress, setEnergy, setStress } = useApp();

  return (
    <div className="glass-card p-5">
      <h2 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
        <span className="text-xl">⚡</span> Energy & Stress
      </h2>

      <div className="grid grid-cols-2 divide-x divide-slate-200 dark:divide-slate-700">
        <Meter
          label="Energy"
          value={energy}
          color="#34d399"
          emoji="⚡"
          description={getEnergyDesc(energy)}
        />
        <Meter
          label="Stress"
          value={stress}
          color="#f87171"
          emoji="🌡"
          description={getStressDesc(stress)}
        />
      </div>

      {/* Sliders */}
      <div className="mt-4 space-y-3 px-2">
        <div>
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>⚡ Adjust Energy</span>
            <span className="font-medium text-emerald-500">{energy}%</span>
          </div>
          <input
            type="range" min={0} max={100} value={energy}
            onChange={e => setEnergy(Number(e.target.value))}
            className="w-full accent-emerald-500 h-1.5 rounded-full"
          />
        </div>
        <div>
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>🌡 Adjust Stress</span>
            <span className="font-medium text-red-400">{stress}%</span>
          </div>
          <input
            type="range" min={0} max={100} value={stress}
            onChange={e => setStress(Number(e.target.value))}
            className="w-full accent-red-400 h-1.5 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
