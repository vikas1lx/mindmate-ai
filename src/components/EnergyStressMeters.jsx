/**
 * EnergyStressMeters.jsx
 * Animated circular gauge meters for Energy and Stress levels (0-100).
 * Deep navy theme with neon cyan/emerald and rose accents.
 */
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

function Meter({ label, value, color, emoji, description }) {
  const percent = Math.min(100, Math.max(0, value));
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2 p-3 sm:p-4">
      {/* SVG Gauge */}
      <div className="relative w-24 h-24">
        <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
          {/* Background Track */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke="rgba(59, 130, 246, 0.15)"
            strokeWidth="8"
          />
          {/* Progress */}
          <motion.circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
            style={{
              filter: `drop-shadow(0 0 6px ${color}88)`,
            }}
          />
        </svg>
        {/* Center value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-extrabold text-white">{percent}</span>
          <span className="text-[10px] text-[#8FA3C7] font-semibold">%</span>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm font-bold text-white flex items-center justify-center gap-1">
          <span>{emoji}</span> {label}
        </p>
        <p className="text-[11px] text-[#8FA3C7] mt-0.5">{description}</p>
      </div>
    </div>
  );
}

function getEnergyDesc(v) {
  if (v >= 80) return 'Fully charged & focused';
  if (v >= 60) return 'Moderate working energy';
  if (v >= 40) return 'Slightly drained';
  return 'Low battery — needs rest';
}

function getStressDesc(v) {
  if (v <= 20) return 'Calm & serene';
  if (v <= 40) return 'Mild background tension';
  if (v <= 60) return 'Moderate pressure';
  if (v <= 80) return 'High stress — breathe';
  return 'Overloaded — pause now';
}

export default function EnergyStressMeters() {
  const { energy, stress, setEnergy, setStress } = useApp();

  return (
    <div className="glass-card p-6 rounded-2xl border border-[#3B82F6]/20 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-white text-base flex items-center gap-2">
          <span className="text-xl">⚡</span> Energy & Stress Gauges
        </h2>
        <span className="text-xs text-cyan-400 font-medium">Real-Time State</span>
      </div>

      <div className="grid grid-cols-2 divide-x divide-[#3B82F6]/20 bg-[#0F1D3D]/40 rounded-2xl border border-[#3B82F6]/15 mb-4">
        <Meter
          label="Energy"
          value={energy}
          color="#22D3EE"
          emoji="⚡"
          description={getEnergyDesc(energy)}
        />
        <Meter
          label="Stress"
          value={stress}
          color="#F43F5E"
          emoji="🌡"
          description={getStressDesc(stress)}
        />
      </div>

      {/* Adjust Sliders */}
      <div className="space-y-3 px-1">
        <div>
          <div className="flex justify-between text-xs text-[#8FA3C7] mb-1">
            <span>⚡ Adjust Energy</span>
            <span className="font-bold text-cyan-400">{energy}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={energy}
            onChange={(e) => setEnergy(Number(e.target.value))}
            className="w-full accent-cyan-400 h-1.5 rounded-full bg-[#050B1A] cursor-pointer"
          />
        </div>
        <div>
          <div className="flex justify-between text-xs text-[#8FA3C7] mb-1">
            <span>🌡 Adjust Stress</span>
            <span className="font-bold text-rose-400">{stress}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={stress}
            onChange={(e) => setStress(Number(e.target.value))}
            className="w-full accent-rose-500 h-1.5 rounded-full bg-[#050B1A] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
