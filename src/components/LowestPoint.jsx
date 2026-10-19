/**
 * LowestPoint.jsx
 * Card showing the recorded lowest mood day with details.
 */
import { motion } from 'framer-motion';
import { AlertTriangle, Calendar, Clock } from 'lucide-react';
import { LOWEST_POINT } from '../data/mockData';

const MOOD_LABELS = { 1: 'Very Low', 2: 'Low', 3: 'Okay', 4: 'Good', 5: 'Great' };

export default function LowestPoint() {
  const lp = LOWEST_POINT;
  const date = new Date(lp.date + 'T00:00:00');
  const formatted = date.toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="glass-card p-5 border-l-4 border-red-400">
      <h2 className="font-semibold text-slate-700 dark:text-slate-200 mb-3 flex items-center gap-2">
        <AlertTriangle size={18} className="text-red-400" />
        Lowest Point This Month
      </h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-100 dark:border-red-800"
      >
        <div className="flex items-start gap-3">
          <span className="text-4xl">😔</span>
          <div>
            <p className="text-sm font-semibold text-red-700 dark:text-red-300">
              Mood: {MOOD_LABELS[lp.mood]} (Level {lp.mood}/5)
            </p>
            <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar size={11} /> {formatted}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={11} /> {lp.time}
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 italic">"{lp.note}"</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 capitalize">
              Trigger: <span className="font-medium text-red-500 dark:text-red-400">{lp.cause}</span>
            </p>
          </div>
        </div>
      </motion.div>

      <p className="text-xs text-slate-400 dark:text-slate-500 mt-3">
        💡 Awareness of your lowest points helps you prepare and prevent them in the future.
      </p>
    </div>
  );
}
