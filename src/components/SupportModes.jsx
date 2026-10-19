/**
 * SupportModes.jsx
 * 10 support mode cards grouped by level (Mild / Moderate / Serious).
 * Clicking a card opens the SupportModal.
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { SUPPORT_MODES, LEVEL_LABELS } from '../data/supportModes';
import SupportModal from './SupportModal';

const LEVEL_COLORS = {
  1: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300',
  2: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300',
  3: 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300',
};

const LEVEL_HEADER = {
  1: 'text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 border-emerald-200',
  2: 'text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 border-amber-200',
  3: 'text-rose-700 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/30 border-rose-200',
};

const LEVEL_DOTS = {
  1: 'bg-emerald-500',
  2: 'bg-amber-500',
  3: 'bg-rose-500',
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function SupportModes() {
  const [selectedMode, setSelectedMode] = useState(null);
  const levels = [1, 2, 3];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">
          🧩 Support Modes
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Choose what you're going through. We'll guide you through it.
        </p>
      </div>

      {levels.map(level => {
        const modesForLevel = SUPPORT_MODES.filter(m => m.level === level);
        const info = LEVEL_LABELS[level];

        return (
          <div key={level}>
            {/* Level header */}
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border mb-4 ${LEVEL_HEADER[level]}`}>
              <span className={`w-2 h-2 rounded-full ${LEVEL_DOTS[level]}`} />
              {info.label}
              <span className="ml-1 opacity-60">— {['Mild', 'Moderate', 'Serious'][level - 1]}</span>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.08 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {modesForLevel.map(mode => (
                <motion.button
                  key={mode.id}
                  variants={fadeUp}
                  onClick={() => setSelectedMode(mode)}
                  className={`text-left p-5 rounded-2xl border-2 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-violet-400 ${LEVEL_COLORS[level]}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{mode.emoji}</span>
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">{mode.title}</p>
                      <p className="text-xs mt-1 text-slate-500 dark:text-slate-400 leading-snug line-clamp-2">
                        {mode.message.slice(0, 80)}…
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 text-xs font-medium opacity-80">
                    Tap to get support →
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </div>
        );
      })}

      {/* Support modal */}
      {selectedMode && (
        <SupportModal mode={selectedMode} onClose={() => setSelectedMode(null)} />
      )}
    </div>
  );
}
