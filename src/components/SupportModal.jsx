/**
 * SupportModal.jsx
 * Modal shown when a support mode card is clicked.
 * Shows: empathy message, steps, quick exercise, "Talk to MindMate" button.
 * For Level 3: shows counselor suggestion.
 */
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, MessageCircle, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';

const LEVEL_ACCENT = {
  1: 'from-emerald-400 to-teal-500',
  2: 'from-amber-400 to-orange-500',
  3: 'from-rose-400 to-pink-500',
};

export default function SupportModal({ mode, onClose }) {
  const { openChat } = useApp();

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Prevent body scroll while modal open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal panel */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[640px] max-h-[90vh] overflow-y-auto z-50 rounded-3xl shadow-2xl bg-white dark:bg-slate-900"
        onClick={e => e.stopPropagation()}
      >
        {/* Header gradient */}
        <div className={`bg-gradient-to-r ${LEVEL_ACCENT[mode.level]} p-6 rounded-t-3xl relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
          >
            <X size={16} />
          </button>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{mode.emoji}</span>
            <div>
              <p className="text-white/70 text-sm font-medium">{mode.tag} Support</p>
              <h2 className="text-white text-xl font-bold">{mode.title}</h2>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Empathy message */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4">
            <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed italic">
              "{mode.message}"
            </p>
          </div>

          {/* Steps */}
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-3 text-sm">
              📋 Step-by-step support
            </h3>
            <div className="space-y-2">
              {mode.steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{step}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick exercise */}
          <div className="bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 rounded-2xl p-4 border border-violet-100 dark:border-violet-800">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={16} className="text-violet-500" />
              <h3 className="font-semibold text-violet-700 dark:text-violet-300 text-sm">
                Quick Exercise: {mode.exercise.name}
              </h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {mode.exercise.description}
            </p>
          </div>

          {/* Level 3 counselor note */}
          {mode.level === 3 && mode.counselorNote && (
            <div className="bg-rose-50 dark:bg-rose-900/20 rounded-2xl p-4 border border-rose-100 dark:border-rose-800">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={16} className="text-rose-500" />
                <h3 className="font-semibold text-rose-700 dark:text-rose-300 text-sm">
                  A gentle note
                </h3>
              </div>
              <p className="text-sm text-rose-700 dark:text-rose-300 leading-relaxed">
                {mode.counselorNote}
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-medium text-rose-600 dark:text-rose-400">
                <div className="bg-rose-100 dark:bg-rose-900/30 rounded-lg px-3 py-2 text-center">
                  📞 Tele-MANAS: 14416
                </div>
                <div className="bg-rose-100 dark:bg-rose-900/30 rounded-lg px-3 py-2 text-center">
                  📞 iCall: 9152987821
                </div>
              </div>
            </div>
          )}

          {/* Talk to MindMate button */}
          <button
            onClick={() => { openChat(mode.title); onClose(); }}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-white bg-gradient-to-r from-violet-500 to-purple-600 hover:shadow-lg hover:scale-[1.02] transition-all"
          >
            <MessageCircle size={18} />
            Talk to MindMate about {mode.title}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
