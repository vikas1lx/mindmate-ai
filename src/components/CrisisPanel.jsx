/**
 * CrisisPanel.jsx
 * Always-visible floating "Need urgent help?" button + sliding crisis support panel.
 * Contains: 4-7-8 breathing exercise, Indian helplines (Tele-MANAS: 14416, iCall, Vandrevala),
 * and trusted-person prompt.
 * z-index: 60 — always above modals and chat panel.
 */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Heart, Wind } from 'lucide-react';
import { useApp } from '../context/AppContext';

// Simple animated breathing guide (4-7-8)
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

    const currentPhase = PHASES.find((p) => p.name === phase);
    setCount(currentPhase.duration);

    countTimer = setInterval(() => {
      setCount((prev) => {
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
    inhale: 'from-blue-500 to-cyan-400',
    hold: 'from-indigo-600 to-blue-500',
    exhale: 'from-teal-500 to-emerald-400',
  };
  const SCALE = { inhale: 1.35, hold: 1.35, exhale: 0.9 };

  return (
    <div className="bg-[#0F1D3D]/70 border border-[#3B82F6]/25 rounded-2xl p-5 text-center shadow-lg">
      <h3 className="font-semibold text-white mb-1 flex items-center justify-center gap-2 text-sm">
        <Wind size={16} className="text-cyan-400" />
        4-7-8 Calming Breath
      </h3>
      <p className="text-xs text-[#8FA3C7] mb-4">
        Activates your parasympathetic nervous system in 60 seconds
      </p>

      {/* Animated circle */}
      <div className="flex justify-center mb-4">
        <motion.div
          animate={{ scale: active ? SCALE[phase] : 1 }}
          transition={{
            duration: phase === 'inhale' ? 4 : phase === 'hold' ? 0.5 : 8,
            ease: 'easeInOut',
          }}
          className={`w-20 h-20 rounded-full bg-gradient-to-br ${PHASE_COLORS[phase]} flex flex-col items-center justify-center shadow-[0_0_25px_rgba(34,211,238,0.35)]`}
        >
          <span className="text-white font-bold text-xl">{active ? count : '▶'}</span>
          <span className="text-white/90 text-[10px] uppercase tracking-wider font-semibold">
            {active ? PHASE_LABELS[phase] : 'Start'}
          </span>
        </motion.div>
      </div>

      <button
        onClick={() => {
          setActive(!active);
          setPhase('inhale');
        }}
        className={`px-5 py-2.5 rounded-xl font-semibold text-xs text-white transition-all ${
          active
            ? 'bg-rose-500 hover:bg-rose-600'
            : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]'
        }`}
      >
        {active ? 'Stop Exercise' : 'Start 4-7-8 Breathing'}
      </button>
    </div>
  );
}

export default function CrisisPanel() {
  const { crisisPanelOpen, setCrisisPanelOpen } = useApp();

  return (
    <>
      {/* Floating persistent button — fixed bottom-6 right-6, always visible (z-60) */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: 'spring' }}
        onClick={() => setCrisisPanelOpen(true)}
        className="fixed bottom-6 right-6 z-[60] flex items-center gap-2.5 px-4 sm:px-5 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 text-white font-semibold text-sm shadow-[0_0_25px_rgba(244,63,94,0.45)] hover:scale-105 hover:shadow-[0_0_35px_rgba(244,63,94,0.6)] active:scale-95 transition-all border border-rose-400/40"
        aria-label="Open urgent helpline assistance"
      >
        <Heart size={18} className="fill-white animate-pulse" />
        <span className="hidden sm:inline">Need urgent help?</span>
        <span className="sm:hidden">Urgent Help</span>
      </motion.button>

      {/* Sliding panel */}
      <AnimatePresence>
        {crisisPanelOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[59]"
              onClick={() => setCrisisPanelOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed bottom-0 left-0 right-0 md:left-auto md:right-6 md:bottom-20 md:w-[440px] z-[60] bg-[#0A1630] border border-rose-500/40 rounded-t-3xl md:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] max-h-[92vh] overflow-y-auto text-[#E6EDFF]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-[#3B82F6]/20 bg-[#0F1D3D]/90">
                <div className="flex items-center gap-2.5">
                  <Heart size={20} className="text-rose-500 fill-rose-500" />
                  <h2 className="font-bold text-white text-base">You're not alone 💜</h2>
                </div>
                <button
                  onClick={() => setCrisisPanelOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#0F1D3D] flex items-center justify-center text-[#8FA3C7] hover:text-white border border-[#3B82F6]/30 transition-colors"
                  aria-label="Close help panel"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-5 space-y-5">
                {/* Breathing exercise */}
                <BreathingExercise />

                {/* Helplines (India) */}
                <div className="bg-[#0F1D3D]/70 rounded-2xl p-4 border border-rose-500/35">
                  <div className="flex items-center gap-2 mb-3">
                    <Phone size={16} className="text-rose-400" />
                    <h3 className="font-semibold text-rose-300 text-sm">
                      India Mental Health Helplines (24/7)
                    </h3>
                  </div>
                  <div className="space-y-2.5">
                    <a
                      href="tel:14416"
                      className="flex items-center justify-between p-3.5 bg-[#0A1630] rounded-xl hover:border-rose-400 border border-rose-500/30 hover:shadow-[0_0_15px_rgba(244,63,94,0.3)] transition-all group"
                    >
                      <div>
                        <p className="font-bold text-white text-sm group-hover:text-rose-300 transition-colors">
                          Tele-MANAS
                        </p>
                        <p className="text-[11px] text-[#8FA3C7]">
                          Govt. Helpline · Free · 24/7 · Confidential
                        </p>
                      </div>
                      <div className="text-rose-400 font-bold text-lg group-hover:scale-105 transition-transform flex items-center gap-1.5">
                        <Phone size={15} />
                        14416
                      </div>
                    </a>

                    <a
                      href="tel:9152987821"
                      className="flex items-center justify-between p-3 bg-[#0A1630] rounded-xl hover:border-cyan-400 border border-[#3B82F6]/25 transition-all group"
                    >
                      <div>
                        <p className="font-semibold text-white text-sm group-hover:text-cyan-300 transition-colors">
                          iCall – TISS
                        </p>
                        <p className="text-[11px] text-[#8FA3C7]">
                          Free counseling · Students & young adults
                        </p>
                      </div>
                      <div className="text-cyan-400 font-semibold text-sm group-hover:scale-105 transition-transform">
                        9152987821
                      </div>
                    </a>

                    <a
                      href="tel:8376804102"
                      className="flex items-center justify-between p-3 bg-[#0A1630] rounded-xl hover:border-cyan-400 border border-[#3B82F6]/20 transition-all group"
                    >
                      <div>
                        <p className="font-semibold text-white text-sm">
                          Vandrevala Foundation
                        </p>
                        <p className="text-[11px] text-[#8FA3C7]">
                          24/7 crisis support · Multi-language
                        </p>
                      </div>
                      <div className="text-cyan-400 font-semibold text-sm">
                        8376804102
                      </div>
                    </a>
                  </div>
                </div>

                {/* Talk to someone you trust */}
                <div className="bg-[#0F1D3D]/50 rounded-2xl p-4 border border-[#3B82F6]/20">
                  <h3 className="font-semibold text-cyan-300 text-sm mb-2 flex items-center gap-2">
                    🫂 Talk to someone you trust
                  </h3>
                  <p className="text-xs sm:text-sm text-[#E6EDFF]/85 leading-relaxed">
                    Think of one person who has shown you kindness — a friend, family member, roommate, or mentor. You don't need a polished speech. You can simply text: <em className="text-cyan-300 font-medium">"I'm having a hard evening and could use a brief call or company."</em>
                  </p>
                </div>

                {/* Disclaimer */}
                <p className="text-[11px] text-[#8FA3C7] text-center leading-relaxed pb-2 border-t border-[#3B82F6]/15 pt-3">
                  ⚠️ <strong>Disclaimer:</strong> MindMate AI is supportive, not a replacement for professional care. In an emergency, please call <strong>112</strong>.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
