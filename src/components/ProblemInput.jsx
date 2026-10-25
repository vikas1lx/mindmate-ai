/**
 * ProblemInput.jsx
 * Structured AI Problem Assistant:
 * - Textarea with Ctrl+Enter shortcut
 * - Immediate crisis detection
 * - Structured response breakdown: Empathy, Understanding, Steps, Today's Action
 * - History of past conversations
 * - Styled in dark navy glassmorphism with cyan/blue glow accents
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, ChevronDown, ChevronUp, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { generateResponse, detectCrisis } from '../data/aiResponses';

function ResponseCard({ entry, index }) {
  const [expanded, setExpanded] = useState(index === 0);
  const date = new Date(entry.timestamp).toLocaleString('en-IN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl overflow-hidden border border-[#3B82F6]/20 shadow-md"
    >
      {/* Header */}
      <button
        className="w-full flex items-center justify-between p-4 text-left hover:bg-[#3B82F6]/10 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1 min-w-0 pr-2">
          <p className="text-sm font-semibold text-white truncate">{entry.problem}</p>
          <div className="flex items-center gap-1.5 mt-1">
            <Clock size={11} className="text-cyan-400" />
            <span className="text-xs text-[#8FA3C7]">{date}</span>
          </div>
        </div>
        {expanded ? (
          <ChevronUp size={18} className="text-cyan-400 flex-shrink-0" />
        ) : (
          <ChevronDown size={18} className="text-[#8FA3C7] flex-shrink-0" />
        )}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-4 border-t border-[#3B82F6]/20 pt-4 bg-[#0A1630]/60">
              {/* Empathy */}
              <div className="bg-[#0F1D3D] rounded-xl p-3.5 border border-[#3B82F6]/25">
                <p className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Sparkles size={12} /> MindMate Empathy
                </p>
                <p className="text-sm text-[#E6EDFF] italic leading-relaxed">
                  "{entry.response.empathy}"
                </p>
              </div>

              {/* Understanding */}
              <div>
                <p className="text-xs font-bold text-[#8FA3C7] uppercase tracking-wider mb-1">
                  🔍 Understanding What's Happening
                </p>
                <p className="text-xs sm:text-sm text-[#E6EDFF]/90 leading-relaxed">
                  {entry.response.understanding}
                </p>
              </div>

              {/* Steps forward */}
              <div>
                <p className="text-xs font-bold text-[#8FA3C7] uppercase tracking-wider mb-2">
                  📋 Guided Steps Forward
                </p>
                <div className="space-y-2">
                  {entry.response.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-2.5 bg-[#0F1D3D]/50 p-2.5 rounded-xl border border-[#3B82F6]/15">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs flex items-center justify-center font-bold">
                        {i + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-[#E6EDFF] leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Today's one action */}
              <div className="bg-emerald-950/30 rounded-xl p-3.5 border border-emerald-500/30">
                <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <CheckCircle2 size={13} /> Your 1 Actionable Move For Today
                </p>
                <p className="text-sm text-[#E6EDFF] font-semibold">{entry.response.todayAction}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ProblemInput() {
  const { addProblem, problemHistory, triggerCrisisAlert } = useApp();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    // Crisis detection check
    if (detectCrisis(trimmed)) {
      triggerCrisisAlert();
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await generateResponse(trimmed);
      addProblem({
        id: Date.now(),
        timestamp: new Date().toISOString(),
        problem: trimmed,
        response,
      });
      setText('');
    } catch {
      setError('Something went wrong generating advice. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 flex items-center gap-2">
          <span>💬</span> Structured MindMate AI Consultation
        </h2>
        <p className="text-xs sm:text-sm text-[#8FA3C7]">
          Describe what you are navigating in detail. MindMate will parse the emotional roots and provide step-by-step clarity.
        </p>
      </div>

      {/* Input card */}
      <div className="glass-card p-6 rounded-2xl border border-[#3B82F6]/25 shadow-xl">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="E.g. 'I'm experiencing intense pressure between college exams and parental expectations, and I've started procrastinating out of fear…'"
          rows={5}
          disabled={loading}
          className="w-full text-sm rounded-xl glass-input px-4 py-3 text-[#E6EDFF] placeholder-[#8FA3C7]/60 resize-none leading-relaxed"
        />

        <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
          <p className="text-xs text-[#8FA3C7]">
            {text.length > 0 && `${text.length} characters · `}Press Ctrl+Enter to submit
          </p>
          <button
            onClick={handleSubmit}
            disabled={!text.trim() || loading}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 to-cyan-500 disabled:opacity-40 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:scale-105 active:scale-95 transition-all"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Formulating guidance…</span>
              </>
            ) : (
              <>
                <Send size={16} />
                <span>Get Step-by-Step Guidance</span>
              </>
            )}
          </button>
        </div>

        {error && <p className="text-xs text-rose-400 mt-2">{error}</p>}
      </div>

      {/* History */}
      {problemHistory.length > 0 && (
        <div className="space-y-3 pt-4">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Clock size={16} className="text-cyan-400" />
            Previous Reflections & Solutions ({problemHistory.length})
          </h3>
          <div className="space-y-3">
            {problemHistory.map((entry, i) => (
              <ResponseCard key={entry.id} entry={entry} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
