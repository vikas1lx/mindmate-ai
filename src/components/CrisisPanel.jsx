/**
 * CrisisPanel.jsx
 * Always-visible floating "Need help now?" button + sliding crisis support panel.
 * Contains: breathing exercise, Indian helplines, and trusted-person prompt.
 * z-index: 60 — always above modals and chat panel.
 */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Heart, Wind } from 'lucide-react';
import { useApp } from '../context/AppContext';

// Simple animated breathing guide
function BreathingExercise() {
  const [phase, setPhase] = useState('inhale'); // inhale | hold | exhale
  const [count, setCount] = useState(4);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) return;
    const PHASES = [
      { name: 'inhale', duration: 4, next: 'hold' },
      { name: 'hold', duration: 7, next: 'exhale' },
      { name: 'exhale', duration: 8, next: 'inhale' },
    ];
    let timer;
    let countTimer;

    const currentPhase = PHASES.find(p => p.name === phase);
    setCount(currentPhase.duration);

    countTimer = setInterval(() => {
      setCount(prev => {
        if (prev <= 1) {
          clearInterval(countTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    timer = setTimeout(() => {
      setPhase(currentPhase.next);
    }, currentPhase.duration * 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countTimer);
    };
  }, [phase, active]);

  const PHASE_LABELS = { inhale: 'Breathe In', hold: 'Hold', exhale: 'Breathe Out' };
  const PHASE_COLORS = {
    inhale: 'from-blue-400 to-cyan-400',
    hold: 'from-violet-400 to-indigo-400',
    exhale: 'from-emerald-400 to-teal-400',
  };
  const SCALE = { inhale: 1.3, hold: 1.3, exhale: 0.9 };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-5 text-center">
      <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-1 flex items-center justify-center gap-2">
        <Wind size={16} className="text-blue-500" />
        4-7-8 Breathing
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Activates your calm nervous system in seconds
      </p>

      {/* Animated circle */}
      <div className="flex justify-center mb-4">
        <motion.div
          animate={{ scale: active ? SCALE[phase] : 1 }}
          transition={{ duration: phase === 'inhale' ? 4 : phase === 'hold' ? 0.5 : 8, ease: 'easeInOut' }}
          className={`w-20 h-20 rounded-full bg-gradient-to-br ${PHASE_COLORS[phase]} flex flex-col items-center justify-center shadow-lg`}
        >
          <span className="text-white font-bold text-xl">{active ? count : '▶'}</span>
          <span className="text-white/80 text-xs">{active ? PHASE_LABELS[phase] : 'Start'}</span>
        </motion.div>
      </div>

      <button
        onClick={() => { setActive(!active); setPhase('inhale'); }}
        className={`px-5 py-2 rounded-xl font-semibold text-sm text-white bg-gradient-to-r ${active ? 'from-red-400 to-rose-500' : 'from-blue-500 to-indigo-600'} hover:shadow-md transition-all`}
      >
        {active ? 'Stop' : 'Start Breathing Exercise'}
      </button>
    </div>
  );
}

export default function CrisisPanel() {
  const { crisisPanelOpen, setCrisisPanelOpen } = useApp();

  return (
    <>
      {/* Floating button — fixed bottom-right, always visible (z-60) */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        onClick={() => setCrisisPanelOpen(true)}
        className="fixed bottom-6 right-6 z-[60] flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-700 text-white font-semibold text-sm shadow-2xl hover:scale-105 hover:shadow-violet-500/30 transition-all"
        aria-label="Open help panel"
      >
        <Heart size={16} className="fill-current animate-pulse" />
        <span className="hidden sm:inline">Need help now?</span>
        <span className="sm:hidden">Help</span>
      </motion.button>

      {/* Sliding panel */}
      <AnimatePresence>
        {crisisPanelOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[59]"
              onClick={() => setCrisisPanelOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed bottom-0 left-0 right-0 md:left-auto md:right-6 md:bottom-20 md:w-[420px] z-[60] bg-white dark:bg-slate-900 rounded-t-3xl md:rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Heart size={20} className="text-rose-500 fill-rose-500" />
                  <h2 className="font-bold text-slate-800 dark:text-slate-100">You're not alone 💜</h2>
                </div>
                <button
                  onClick={() => setCrisisPanelOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-5 space-y-5">
                {/* Breathing exercise */}
                <BreathingExercise />

                {/* Helplines */}
                <div className="bg-rose-50 dark:bg-rose-900/20 rounded-2xl p-4 border border-rose-100 dark:border-rose-800">
                  <div className="flex items-center gap-2 mb-3">
                    <Phone size={16} className="text-rose-500" />
                    <h3 className="font-semibold text-rose-700 dark:text-rose-300 text-sm">
                      India Mental Health Helplines
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <a href="tel:14416" className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-xl hover:shadow-md transition-all group">
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm">Tele-MANAS</p>
                        <p className="text-xs text-slate-500">Govt. helpline · Free · 24/7 · Confidential</p>
                      </div>
                      <div className="text-rose-600 dark:text-rose-400 font-bold text-lg group-hover:scale-110 transition-transform">
                        14416
                      </div>
                    </a>
                    <a href="tel:9152987821" className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-xl hover:shadow-md transition-all group">
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm">iCall – TISS</p>
                        <p className="text-xs text-slate-500">Free counseling · Students & young adults</p>
                      </div>
                      <div className="text-rose-600 dark:text-rose-400 font-bold text-sm group-hover:scale-110 transition-transform">
                        9152987821
                      </div>
                    </a>
                    <a href="tel:8376804102" className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-xl hover:shadow-md transition-all group">
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm">Vandrevala Foundation</p>
                        <p className="text-xs text-slate-500">24/7 crisis support · All languages</p>
                      </div>
                      <div className="text-rose-600 dark:text-rose-400 font-bold text-sm group-hover:scale-110 transition-transform">
                        8376804102
                      </div>
                    </a>
                  </div>
                </div>

                {/* Talk to someone */}
                <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-4 border border-emerald-100 dark:border-emerald-800">
                  <h3 className="font-semibold text-emerald-700 dark:text-emerald-300 text-sm mb-2 flex items-center gap-2">
                    🫂 Talk to someone you trust
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Think of one person who has shown you kindness before — a friend, family member, teacher, or neighbour. 
                    You don't need to explain everything. Just say: <em className="font-medium text-emerald-700 dark:text-emerald-400">"I'm having a hard time and I could use some company."</em>
                  </p>
                </div>

                {/* Disclaimer */}
                <p className="text-xs text-slate-400 dark:text-slate-500 text-center leading-relaxed pb-2">
                  ⚠️ MindMate AI is not a substitute for professional help. If you are in immediate danger, please call 112.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
