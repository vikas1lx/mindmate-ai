/**
 * ProblemInput.jsx
 * Custom problem input with:
 * - Crisis keyword detection → opens crisis panel
 * - Loading animation → structured AI response
 * - History of past problems and answers
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, ChevronDown, ChevronUp, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { generateResponse, detectCrisis } from '../data/aiResponses';

function ResponseCard({ entry, index }) {
  const [expanded, setExpanded] = useState(index === 0);
  const date = new Date(entry.timestamp).toLocaleString('en-IN', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card overflow-hidden"
    >
      {/* Header */}
      <button
        className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{entry.problem}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <Clock size={10} className="text-slate-400" />
            <span className="text-xs text-slate-400">{date}</span>
          </div>
        </div>
        {expanded ? <ChevronUp size={16} className="text-slate-400 ml-2 flex-shrink-0" /> : <ChevronDown size={16} className="text-slate-400 ml-2 flex-shrink-0" />}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4 border-t border-slate-100 dark:border-slate-700 pt-4">
              {/* Empathy */}
              <div className="bg-violet-50 dark:bg-violet-900/20 rounded-xl p-3">
                <p className="text-xs font-semibold text-violet-600 dark:text-violet-400 mb-1">💜 We hear you</p>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">"{entry.response.empathy}"</p>
              </div>

              {/* Understanding */}
              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">🔍 Understanding your situation</p>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{entry.response.understanding}</p>
              </div>

              {/* Steps */}
              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">📋 Steps forward</p>
                <div className="space-y-2">
                  {entry.response.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 text-xs flex items-center justify-center font-bold">
                        {i + 1}
                      </span>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Today's action */}
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-3 border border-emerald-100 dark:border-emerald-800">
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">✅ Your one action for today</p>
                <p className="text-sm text-slate-700 dark:text-slate-200 font-medium">{entry.response.todayAction}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ProblemInput() {
  const { addProblem, problemHistory, setCrisisPanelOpen } = useApp();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    // Crisis detection
    if (detectCrisis(trimmed)) {
      setCrisisPanelOpen(true);
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
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit();
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">
          💬 Tell MindMate What's On Your Mind
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Describe what you're going through and get personalized, structured support. No judgment.
        </p>
      </div>

      {/* Input area */}
      <div className="glass-card p-5">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="E.g. 'I'm really stressed about my exams and I can't sleep…' or 'I had a big argument with my family and I don't know what to do…'"
          rows={5}
          disabled={loading}
          className="w-full text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 px-4 py-3 text-slate-700 dark:text-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 resize-none leading-relaxed disabled:opacity-60"
        />

        <div className="flex items-center justify-between mt-3">
          <p className="text-xs text-slate-400">
            {text.length > 0 && `${text.length} chars · `}Ctrl+Enter to submit
          </p>
          <button
            onClick={handleSubmit}
            disabled={!text.trim() || loading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-violet-500 to-purple-600 disabled:opacity-40 hover:shadow-md hover:scale-[1.02] transition-all"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Thinking…
              </>
            ) : (
              <>
                <Send size={16} />
                Get Support
              </>
            )}
          </button>
        </div>

        {error && (
          <p className="text-xs text-red-500 mt-2">{error}</p>
        )}
      </div>

      {/* Loading animation */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass-card p-6 flex flex-col items-center gap-3"
          >
            <div className="flex gap-2">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, delay: i * 0.2, duration: 0.7 }}
                  className="w-3 h-3 rounded-full bg-violet-400"
                />
              ))}
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">MindMate is thinking…</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* History */}
      {problemHistory.length > 0 && (
        <div>
          <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-3 text-sm flex items-center gap-2">
            <Clock size={15} className="text-slate-400" />
            Past Conversations ({problemHistory.length})
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
