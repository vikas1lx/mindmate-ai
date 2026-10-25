/**
 * LowestPoint.jsx
 * Displays the monthly lowest recorded mood day to identify triggers and cultivate awareness.
 * Styled in dark navy glassmorphism with warning border and crisp contrast.
 */
import { motion } from 'framer-motion';
import { AlertCircle, Calendar, Clock } from 'lucide-react';
import { LOWEST_POINT } from '../data/mockData';

const MOOD_LABELS = { 1: 'Very Low', 2: 'Low', 3: 'Okay', 4: 'Good', 5: 'Great' };

export default function LowestPoint() {
  const lp = LOWEST_POINT;
  const date = new Date(lp.date + 'T00:00:00');
  const formatted = date.toLocaleDateString('en-IN', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="glass-card p-6 rounded-2xl border-l-4 border-l-rose-500 border-t border-r border-b border-[#3B82F6]/20 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-white text-base flex items-center gap-2">
          <AlertCircle size={20} className="text-rose-400" />
          Vulnerability Awareness · Lowest Point
        </h2>
        <span className="text-xs text-rose-400/90 font-medium">Growth Insight</span>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-[#0F1D3D]/60 rounded-xl p-4 sm:p-5 border border-rose-500/25 flex flex-col sm:flex-row items-start gap-4"
      >
        <span className="text-4xl sm:text-5xl flex-shrink-0">😔</span>
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p className="text-sm sm:text-base font-bold text-rose-300">
              Mood: {MOOD_LABELS[lp.mood]} (Level {lp.mood}/5)
            </p>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/30">
              Trigger: {lp.cause}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#8FA3C7]">
            <span className="flex items-center gap-1">
              <Calendar size={13} className="text-cyan-400" /> {formatted}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={13} className="text-cyan-400" /> {lp.time}
            </span>
          </div>

          <p className="text-sm text-[#E6EDFF] italic pt-1">
            "{lp.note}"
          </p>
        </div>
      </motion.div>

      <p className="text-xs text-[#8FA3C7] mt-3">
        💡 Recognizing which triggers precede your low moments allows you to apply calming tools proactively before overwhelm sets in.
      </p>
    </div>
  );
}
