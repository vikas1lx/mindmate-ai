/**
 * MoodPicker.jsx
 * Today's mood: 5 emoji levels with cause tags and reflection note.
 * Saves to LocalStorage via AppContext.
 * Styled in dark navy glassmorphism with cyan/blue accents.
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

const MOODS = [
  { level: 1, emoji: '😔', label: 'Very Low', color: 'border-red-500/60 bg-red-950/30 text-red-300' },
  { level: 2, emoji: '😕', label: 'Low', color: 'border-amber-500/60 bg-amber-950/30 text-amber-300' },
  { level: 3, emoji: '😐', label: 'Okay', color: 'border-cyan-500/60 bg-cyan-950/30 text-cyan-300' },
  { level: 4, emoji: '🙂', label: 'Good', color: 'border-blue-500/60 bg-blue-950/30 text-blue-300' },
  { level: 5, emoji: '😄', label: 'Great', color: 'border-emerald-500/60 bg-emerald-950/30 text-emerald-300' },
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
    <div className="glass-card p-6 rounded-2xl border border-[#3B82F6]/20 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-white text-base flex items-center gap-2">
          <span className="text-xl">🌤</span> Today's Mood Check-In
        </h2>
        <span className="text-xs text-cyan-400 font-medium">Daily Tracker</span>
      </div>

      {/* Emoji picker */}
      <div className="flex justify-between gap-2 mb-5">
        {MOODS.map((m) => (
          <button
            key={m.level}
            onClick={() => setSelected(m.level)}
            className={`flex-1 flex flex-col items-center py-3.5 rounded-xl border transition-all ${
              selected === m.level
                ? m.color + ' scale-105 shadow-[0_0_15px_rgba(34,211,238,0.3)] ring-1 ring-cyan-400'
                : 'border-[#3B82F6]/20 bg-[#0F1D3D]/50 hover:border-cyan-400/40 text-[#8FA3C7]'
            }`}
            aria-label={`Select mood ${m.label}`}
          >
            <span className="text-2xl sm:text-3xl">{m.emoji}</span>
            <span className="text-[11px] mt-1 font-semibold hidden sm:block">{m.label}</span>
          </button>
        ))}
      </div>

      {/* Cause tags */}
      <div className="mb-4">
        <p className="text-xs text-[#8FA3C7] mb-2 font-medium">Primary trigger or focus today (optional):</p>
        <div className="flex flex-wrap gap-1.5">
          {CAUSES.map((c) => (
            <button
              key={c}
              onClick={() => setCause(cause === c ? '' : c)}
              className={`px-3 py-1 rounded-full text-xs capitalize font-medium transition-all ${
                cause === c
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_12px_rgba(34,211,238,0.3)]'
                  : 'bg-[#0F1D3D] text-[#8FA3C7] border border-[#3B82F6]/20 hover:border-cyan-400/40 hover:text-white'
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
        onChange={(e) => setNote(e.target.value)}
        placeholder="What's making you feel this way? (optional)"
        rows={2}
        className="w-full text-xs sm:text-sm rounded-xl glass-input px-3.5 py-2.5 text-[#E6EDFF] placeholder-[#8FA3C7]/60 resize-none mb-3"
      />

      {/* Save button */}
      <button
        onClick={handleSave}
        disabled={!selected}
        className="w-full py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 disabled:opacity-40 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:scale-[1.01] active:scale-[0.99] transition-all"
      >
        {saved ? '✓ Saved to Trends!' : "Save Today's Mood"}
      </button>

      <AnimatePresence>
        {saved && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-cyan-300 mt-2.5 flex items-center gap-1.5 justify-center font-medium"
          >
            <CheckCircle2 size={14} className="text-cyan-400" />
            Mood logged! Check your updated trend graphs below.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
