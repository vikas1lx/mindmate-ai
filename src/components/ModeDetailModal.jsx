/**
 * ModeDetailModal.jsx
 * Dedicated detailed view for an active Problem Mode:
 * - Empathy header with glow
 * - Short check-in question with interactive feedback
 * - 2-3 Guided tools:
 *    1. Interactive Breathing Tool with animated visual rhythm
 *    2. Guided Journaling with interactive scratchpad & copy
 *    3. Quick actionable tips
 * - "Talk to MindMate AI" button preloaded with mode context
 * - Crisis / counselor note for serious levels
 */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Wind, BookOpen, CheckCircle2, AlertTriangle, Phone, Copy, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ModeDetailModal({ mode, onClose }) {
  const { openChat } = useApp();
  const [checkInResponse, setCheckInResponse] = useState('');
  const [journalText, setJournalText] = useState('');
  const [copied, setCopied] = useState(false);

  // Breathing tool state
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState('Inhale'); // Inhale | Hold | Exhale | Hold
  const [breathTimer, setBreathTimer] = useState(4);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Breathing rhythm loop
  useEffect(() => {
    if (!breathingActive) return;

    const b = mode?.tools?.breathing;
    const inhaleDur = b?.inhale || 4;
    const holdDur = b?.hold || 4;
    const exhaleDur = b?.exhale || 4;
    const holdAfterDur = b?.holdAfter || 0;

    const sequence = [
      { phase: 'Inhale', duration: inhaleDur },
      ...(holdDur > 0 ? [{ phase: 'Hold', duration: holdDur }] : []),
      { phase: 'Exhale', duration: exhaleDur },
      ...(holdAfterDur > 0 ? [{ phase: 'Rest', duration: holdAfterDur }] : []),
    ];

    let currentIdx = 0;
    setBreathPhase(sequence[0].phase);
    setBreathTimer(sequence[0].duration);

    const interval = setInterval(() => {
      setBreathTimer((prev) => {
        if (prev <= 1) {
          currentIdx = (currentIdx + 1) % sequence.length;
          setBreathPhase(sequence[currentIdx].phase);
          return sequence[currentIdx].duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [breathingActive, mode]);

  const handleCopyJournal = () => {
    if (!journalText.trim()) return;
    navigator.clipboard.writeText(journalText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTalkToAi = () => {
    let context = `I am going through ${mode.title}.`;
    if (checkInResponse) {
      context += ` My check-in note: "${checkInResponse}".`;
    }
    if (journalText) {
      context += ` My journal reflection: "${journalText}".`;
    }
    openChat(mode.title, context);
    onClose();
  };

  if (!mode) return null;

  return (
    <AnimatePresence>
      {/* Dark backdrop with blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-5"
        onClick={onClose}
      >
        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 30 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0A1630] border border-[#3B82F6]/30 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(34,211,238,0.15)] text-[#E6EDFF] z-50 flex flex-col"
        >
          {/* Header Banner */}
          <div
            className="relative p-6 sm:p-8 rounded-t-3xl overflow-hidden border-b border-[#3B82F6]/20"
            style={{
              background: `linear-gradient(135deg, #0F1D3D 0%, #0A1630 60%, ${mode.glowColor}22 100%)`,
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-xl bg-[#0F1D3D]/80 text-[#8FA3C7] hover:text-white hover:bg-[#3B82F6]/30 border border-[#3B82F6]/30 transition-colors"
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>

            <div className="flex items-start gap-4 pr-10">
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-xl flex-shrink-0"
                style={{
                  background: 'rgba(15, 29, 61, 0.9)',
                  border: `1px solid ${mode.glowColor}66`,
                  boxShadow: `0 0 25px ${mode.glowColor}33`,
                }}
              >
                {mode.emoji}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-medium">
                    {mode.category}
                  </span>
                  <span className="text-xs text-[#8FA3C7]">· {mode.tag} Severity</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {mode.title}
                </h2>
                <p className="text-sm text-[#8FA3C7] mt-1 leading-relaxed">
                  {mode.description}
                </p>
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6 flex-1">
            {/* 1. Short Check-In Question */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0F1D3D]/60 border border-[#3B82F6]/20">
              <h3 className="text-xs uppercase tracking-wider text-cyan-400 font-semibold mb-2">
                Step 1 · Gentle Check-In
              </h3>
              <p className="text-base text-[#E6EDFF] font-medium mb-3">
                {mode.checkInQuestion}
              </p>
              <input
                type="text"
                value={checkInResponse}
                onChange={(e) => setCheckInResponse(e.target.value)}
                placeholder="Type a sentence about what's feeling hardest right now…"
                className="w-full px-4 py-3 rounded-xl glass-input text-sm text-[#E6EDFF] placeholder-[#8FA3C7]/60"
              />
            </div>

            {/* 2. Guided Tool: Interactive Breathing */}
            {mode.tools?.breathing && (
              <div className="p-5 sm:p-6 rounded-2xl bg-[#0F1D3D]/50 border border-[#3B82F6]/25">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Wind size={18} className="text-cyan-400" />
                    <h3 className="text-sm font-semibold text-white">
                      {mode.tools.breathing.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setBreathingActive(!breathingActive)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      breathingActive
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30'
                        : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30'
                    }`}
                  >
                    {breathingActive ? 'Stop Breath Tool' : 'Start Guided Breath'}
                  </button>
                </div>

                <p className="text-xs text-[#8FA3C7] mb-4">
                  {mode.tools.breathing.instructions}
                </p>

                {/* Animated Breathing Circle */}
                {breathingActive && (
                  <div className="py-4 flex flex-col items-center justify-center">
                    <motion.div
                      animate={{
                        scale: breathPhase === 'Inhale' ? 1.35 : breathPhase === 'Hold' ? 1.35 : 0.85,
                      }}
                      transition={{
                        duration: breathTimer,
                        ease: 'easeInOut',
                      }}
                      className="w-28 h-28 rounded-full flex flex-col items-center justify-center shadow-[0_0_35px_rgba(34,211,238,0.4)] border border-cyan-400"
                      style={{
                        background: 'radial-gradient(circle, #22D3EE44 0%, #0F1D3D 80%)',
                      }}
                    >
                      <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                        {breathPhase}
                      </span>
                      <span className="text-2xl font-bold text-white mt-0.5">
                        {breathTimer}s
                      </span>
                    </motion.div>
                  </div>
                )}
              </div>
            )}

            {/* 3. Guided Tool: Reflective Journaling */}
            {mode.tools?.journaling && (
              <div className="p-5 sm:p-6 rounded-2xl bg-[#0F1D3D]/50 border border-[#3B82F6]/25">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <BookOpen size={18} className="text-blue-400" />
                    <h3 className="text-sm font-semibold text-white">
                      Reflection Prompt
                    </h3>
                  </div>
                  {journalText.trim() && (
                    <button
                      onClick={handleCopyJournal}
                      className="flex items-center gap-1 text-xs text-[#8FA3C7] hover:text-cyan-300 transition-colors"
                      title="Copy reflection to clipboard"
                    >
                      {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                  )}
                </div>

                <p className="text-xs text-cyan-300 font-medium mb-3 italic">
                  "{mode.tools.journaling.prompt}"
                </p>

                <textarea
                  value={journalText}
                  onChange={(e) => setJournalText(e.target.value)}
                  placeholder={mode.tools.journaling.placeholder || 'Write your honest thoughts here…'}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl glass-input text-xs sm:text-sm text-[#E6EDFF] placeholder-[#8FA3C7]/60 resize-none"
                />
              </div>
            )}

            {/* 4. Quick Relief Tips */}
            {mode.tools?.quickTips && (
              <div className="p-5 rounded-2xl bg-[#0F1D3D]/40 border border-[#3B82F6]/20">
                <h3 className="text-xs font-semibold text-[#8FA3C7] uppercase tracking-wider mb-3">
                  ⚡ 3 Quick Calming Moves
                </h3>
                <div className="space-y-2.5">
                  {mode.tools.quickTips.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#E6EDFF]/90">
                      <CheckCircle2 size={16} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Serious / Crisis Counselor Note */}
            {mode.counselorNote && (
              <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 flex items-start gap-3">
                <AlertTriangle size={18} className="text-rose-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs space-y-2">
                  <p className="text-rose-200/90 leading-relaxed">
                    {mode.counselorNote}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <a
                      href="tel:14416"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-600/30 hover:bg-rose-600/50 text-rose-200 font-semibold border border-rose-500/40 transition-colors"
                    >
                      <Phone size={13} />
                      Tele-MANAS: 14416 (24/7 Free)
                    </a>
                    <a
                      href="tel:9152987821"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-600/30 hover:bg-rose-600/50 text-rose-200 font-semibold border border-rose-500/40 transition-colors"
                    >
                      <Phone size={13} />
                      iCall: 9152987821
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer CTA */}
          <div className="p-5 sm:p-6 bg-[#0F1D3D]/90 border-t border-[#3B82F6]/20 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-b-3xl">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 rounded-xl text-sm font-medium text-[#8FA3C7] hover:text-white hover:bg-[#0A1630] transition-colors order-2 sm:order-1 text-center"
            >
              Done & Return to Modes
            </button>
            <button
              onClick={handleTalkToAi}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:scale-105 active:scale-95 transition-all order-1 sm:order-2"
            >
              <MessageCircle size={18} />
              Talk to MindMate AI about {mode.title}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
