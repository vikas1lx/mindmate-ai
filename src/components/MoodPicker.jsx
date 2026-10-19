/**
 * MoodPicker.jsx
 * Today's mood: emoji picker (5 levels) with cause tag and short note.
 * Saves to LocalStorage via AppContext.
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

const MOODS = [
  { level: 1, emoji: '😔', label: 'Very Low',  color: 'bg-red-100 border-red-300 text-red-600 dark:bg-red-900/30 dark:border-red-700 dark:text-red-400' },
  { level: 2, emoji: '😕', label: 'Low',       color: 'bg-orange-100 border-orange-300 text-orange-600 dark:bg-orange-900/30 dark:border-orange-700 dark:text-orange-400' },
  { level: 3, emoji: '😐', label: 'Okay',      color: 'bg-yellow-100 border-yellow-300 text-yellow-600 dark:bg-yellow-900/30 dark:border-yellow-700 dark:text-yellow-400' },
  { level: 4, emoji: '🙂', label: 'Good',      color: 'bg-emerald-100 border-emerald-300 text-emerald-600 dark:bg-emerald-900/30 dark:border-emerald-700 dark:text-emerald-400' },
  { level: 5, emoji: '😄', label: 'Great',     color: 'bg-green-100 border-green-300 text-green-600 dark:bg-green-900/30 dark:border-green-700 dark:text-green-400' },
];

const CAUSES = ['exams', 'sleep', 'family', 'money', 'career', 'relationship', 'loneliness', 'anger', 'health', 'work', 'other'];

export default function MoodPicker() {
  const { todayMood, saveTodayMood } = useApp();
  const [selected, setSelected] = useState(todayMood?.level || null);
  const [note, setNote] = useState(todayMood?.note || '');
  const [cause, setCause] = useState(todayMood?.cause || '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!selected) return;
    saveTodayMood({ level: selected, note, cause });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="glass-card p-5">
      <h2 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
        <span className="text-xl">🌤</span> Today's Mood
      </h2>

      {/* Emoji picker */}
      <div className="flex justify-between gap-2 mb-5">
        {MOODS.map(m => (
          <button
            key={m.level}
            onClick={() => setSelected(m.level)}
            className={`flex-1 flex flex-col items-center py-3 rounded-xl border-2 transition-all ${
              selected === m.level
                ? m.color + ' scale-110 shadow-md'
                : 'border-slate-200 dark:border-slate-700 hover:border-violet-300 dark:hover:border-violet-600'
            }`}
          >
            <span className="text-2xl">{m.emoji}</span>
            <span className="text-xs mt-1 font-medium hidden sm:block">{m.label}</span>
          </button>
        ))}
      </div>

      {/* Cause tags */}
      <div className="mb-4">
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Main cause today (optional):</p>
        <div className="flex flex-wrap gap-2">
          {CAUSES.map(c => (
            <button
              key={c}
              onClick={() => setCause(cause === c ? '' : c)}
              className={`px-3 py-1 rounded-full text-xs capitalize font-medium transition-all ${
                cause === c
                  ? 'bg-violet-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-violet-100 dark:hover:bg-violet-900/30'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Note input */}
      <textarea
        value={note}
        onChange={e => setNote(e.target.value)}
        placeholder="What's on your mind? (optional)"
        rows={2}
        className="w-full text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 px-3 py-2 text-slate-700 dark:text-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 resize-none mb-3"
      />

      {/* Save button */}
      <button
        onClick={handleSave}
        disabled={!selected}
        className="w-full py-2 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-violet-500 to-purple-600 disabled:opacity-40 hover:shadow-md hover:scale-[1.02] transition-all"
      >
        {saved ? '✓ Saved!' : 'Save Today\'s Mood'}
      </button>

      <AnimatePresence>
        {saved && (
          <motion.p
            initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1"
          >
            <CheckCircle size={12} /> Mood logged! Check your trend graph below.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
