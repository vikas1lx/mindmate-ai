/**
 * CrisisModal.jsx
 * Calm support card shown immediately if self-harm or crisis language is detected in the search bar or chat.
 * Displays local Indian helplines:
 * - Tele-MANAS: 14416 (24/7 Toll-free)
 * - iCall: 9152987821
 * - Vandrevala Foundation: 8376804102
 * - Emergency: 112
 * Features a calming message, breathing reset, and clear medical disclaimer.
 */
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Phone, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CrisisModal() {
  const { crisisModalAlert, setCrisisModalAlert } = useApp();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setCrisisModalAlert(false);
    };
    if (crisisModalAlert) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [crisisModalAlert, setCrisisModalAlert]);

  if (!crisisModalAlert) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4"
        onClick={() => setCrisisModalAlert(false)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg rounded-3xl bg-[#0A1630] border-2 border-rose-500/50 shadow-[0_0_50px_rgba(244,63,94,0.35)] p-6 sm:p-8 text-[#E6EDFF] overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={() => setCrisisModalAlert(false)}
            className="absolute top-5 right-5 p-2 rounded-xl bg-[#0F1D3D] text-[#8FA3C7] hover:text-white border border-rose-500/30 transition-colors"
            aria-label="Close crisis support card"
          >
            <X size={18} />
          </button>

          {/* Calm Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
              <Heart size={24} className="fill-rose-500/40 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
                Immediate Calm & Support
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                You are not alone. Please stay with us.
              </h2>
            </div>
          </div>

          <p className="text-sm text-[#E6EDFF]/90 leading-relaxed mb-6">
            We noticed words expressing intense distress or self-harm. Your life is deeply valuable, and whatever pain you are feeling right now, you do not have to carry it in silence. Real people are ready to listen and support you with warmth and zero judgment.
          </p>

          {/* Quick Helplines */}
          <div className="space-y-3 mb-6">
            {/* Tele-MANAS */}
            <a
              href="tel:14416"
              className="flex items-center justify-between p-4 rounded-2xl bg-[#0F1D3D] border border-rose-500/40 hover:border-rose-400 hover:shadow-[0_0_20px_rgba(244,63,94,0.3)] transition-all group"
            >
              <div>
                <p className="font-bold text-base text-white group-hover:text-rose-300 transition-colors">
                  Tele-MANAS (Govt. of India)
                </p>
                <p className="text-xs text-[#8FA3C7]">
                  24/7 · Toll-Free · Confidential · All Indian Languages
                </p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 font-bold text-base">
                <Phone size={16} />
                14416
              </div>
            </a>

            {/* iCall */}
            <a
              href="tel:9152987821"
              className="flex items-center justify-between p-4 rounded-2xl bg-[#0F1D3D] border border-[#3B82F6]/30 hover:border-cyan-400 transition-all group"
            >
              <div>
                <p className="font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                  iCall – TISS Psychosocial Helpline
                </p>
                <p className="text-xs text-[#8FA3C7]">
                  Mon–Sat 8am–10pm · Free counseling for students & youth
                </p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-500/20 text-cyan-300 font-bold text-sm">
                <Phone size={15} />
                9152987821
              </div>
            </a>

            {/* Vandrevala Foundation */}
            <a
              href="tel:8376804102"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-[#0F1D3D] border border-[#3B82F6]/20 hover:border-cyan-400 transition-all group"
            >
              <div>
                <p className="font-semibold text-sm text-white">
                  Vandrevala Foundation Helpline
                </p>
                <p className="text-xs text-[#8FA3C7]">24/7 Crisis Support</p>
              </div>
              <div className="text-xs font-bold text-cyan-300">
                8376804102
              </div>
            </a>
          </div>

          {/* Gentle reminder & disclaimer */}
          <div className="p-3.5 rounded-xl bg-[#0F1D3D]/50 border border-slate-700/60 text-center">
            <p className="text-xs text-[#8FA3C7] leading-relaxed">
              ⚠️ <strong className="text-slate-300">Medical Disclaimer:</strong> MindMate AI is supportive, not a replacement for professional care. In an immediate physical emergency, call <strong>112</strong> or visit the nearest hospital.
            </p>
          </div>

          {/* Action buttons */}
          <div className="mt-5 flex gap-3">
            <button
              onClick={() => setCrisisModalAlert(false)}
              className="w-full py-3 rounded-xl bg-[#0F1D3D] text-[#8FA3C7] hover:text-white font-medium text-sm transition-colors"
            >
              Close and Continue
            </button>
            <a
              href="tel:14416"
              className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <Phone size={16} />
              Call 14416 Now
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
