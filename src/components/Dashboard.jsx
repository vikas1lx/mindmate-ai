/**
 * Dashboard.jsx
 * Redesigned Dark, Premium, 3D-Style Dashboard:
 * - Default first page: 3D Problem Search Bar + Suggested Cards + 20 Problem Modes Grid
 * - Tab navigation: Explore Modes (First Page) | Wellness Overview | AI Companion
 * - Preserves all analytics widgets, charts, and API logic
 * - Includes medical disclaimer and helpline anchors
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Grid, BarChart3, MessageSquare, ArrowRight, X, Heart } from 'lucide-react';

// Problem Modes & Search (First Page)
import ProblemSearchBar from './ProblemSearchBar';
import ProblemModesGrid from './ProblemModesGrid';
import ModeDetailModal from './ModeDetailModal';
import Card3DTilt from './3d/Card3DTilt';

// Analytics & Overview Widgets (Preserved functionality)
import MoodPicker from './MoodPicker';
import MoodChart from './MoodChart';
import CauseChart from './CauseChart';
import SleepMoodChart from './SleepMoodChart';
import LowestPoint from './LowestPoint';
import EnergyStressMeters from './EnergyStressMeters';

// AI Problem Assistant
import ProblemInput from './ProblemInput';

import { useApp } from '../context/AppContext';

const TABS = [
  { id: 'modes', label: 'Explore Modes', icon: Grid, badge: '20' },
  { id: 'overview', label: 'Wellness Overview', icon: BarChart3 },
  { id: 'talk', label: 'AI Companion', icon: MessageSquare },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('modes'); // 'modes' is the first page
  const [suggestedModes, setSuggestedModes] = useState([]);
  const { selectedMode, setSelectedMode, selectMode, setCrisisPanelOpen } = useApp();

  return (
    <div className="min-h-screen bg-[#050B1A] text-[#E6EDFF] pt-20 pb-20 relative overflow-hidden">
      {/* Background ambient radial glow spots */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#1D4ED8]/15 via-[#22D3EE]/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-b border-[#3B82F6]/15 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
                <Sparkles size={12} />
                MindMate 3D Wellness
              </span>
              <span className="text-xs text-[#8FA3C7]">
                {new Date().toLocaleDateString('en-IN', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Welcome back to your <span className="gradient-text">inner calm</span>
            </h1>
          </div>

          {/* Quick urgent helpline pill */}
          <button
            onClick={() => setCrisisPanelOpen(true)}
            className="self-start md:self-auto flex items-center gap-2 px-3.5 py-2 rounded-xl bg-rose-500/15 text-rose-300 border border-rose-500/30 text-xs font-semibold hover:bg-rose-500/25 transition-all shadow-sm"
          >
            <Heart size={14} className="fill-rose-400 text-rose-400 animate-pulse" />
            <span>Need Help? Tele-MANAS: 14416</span>
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl glass-card w-fit max-w-full overflow-x-auto scrollbar-none border border-[#3B82F6]/20">
          {TABS.map(({ id, label, icon: Icon, badge }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(34,211,238,0.3)] scale-[1.02]'
                    : 'text-[#8FA3C7] hover:text-[#E6EDFF] hover:bg-[#0F1D3D]/60'
                }`}
                aria-pressed={isActive}
              >
                <Icon size={16} />
                <span>{label}</span>
                {badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-black/20 text-white' : 'bg-cyan-500/20 text-cyan-300'
                    }`}
                  >
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Explore Modes (First Page Redesign) */}
        {activeTab === 'modes' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-10"
          >
            {/* 1. Large Top Centered Problem Search Bar */}
            <div className="text-center space-y-3 pt-2">
              <p className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
                Natural Language Problem Solver
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Describe how you feel in everyday words
              </h2>
              <ProblemSearchBar
                onSuggestedModes={(modes) => setSuggestedModes(modes)}
                suggestedModes={suggestedModes}
              />
            </div>

            {/* Suggested For You Cards (Appears upon submit when matching modes found) */}
            <AnimatePresence>
              {suggestedModes.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="p-6 rounded-3xl bg-gradient-to-br from-[#0F1D3D] via-[#0A1630] to-[#0F1D3D] border-2 border-cyan-400/50 shadow-[0_0_35px_rgba(34,211,238,0.25)] relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Sparkles size={18} className="text-cyan-400 animate-spin-slow" />
                      <h3 className="font-bold text-base sm:text-lg text-white">
                        Suggested For You
                      </h3>
                      <span className="text-xs text-[#8FA3C7]">
                        · Based on your current problem
                      </span>
                    </div>
                    <button
                      onClick={() => setSuggestedModes([])}
                      className="text-xs text-[#8FA3C7] hover:text-white p-1 rounded-lg hover:bg-[#050B1A] flex items-center gap-1"
                    >
                      <X size={14} /> Clear suggestions
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {suggestedModes.map((mode) => (
                      <Card3DTilt
                        key={mode.id}
                        onClick={() => selectMode(mode)}
                        glowColor={mode.glowColor}
                        className="p-5 bg-[#0A1630]/90 border border-cyan-400/40 hover:border-cyan-300"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-3xl">{mode.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-white text-base truncate">
                                {mode.title}
                              </h4>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-medium">
                                {mode.category}
                              </span>
                            </div>
                            <p className="text-xs text-[#8FA3C7] mt-1 line-clamp-2">
                              {mode.description}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 text-xs text-cyan-300 flex items-center justify-end gap-1 font-semibold">
                          <span>Open guided relief</span>
                          <ArrowRight size={13} />
                        </div>
                      </Card3DTilt>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 2. 20 Problem Modes Grid */}
            <div className="space-y-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  20 Guided Problem Modes
                </h3>
                <p className="text-xs sm:text-sm text-[#8FA3C7] mt-1">
                  Choose what fits your experience. Each card includes custom 3D depth, breathing exercises, journaling prompts, and AI chat.
                </p>
              </div>

              <ProblemModesGrid />
            </div>
          </motion.div>
        )}

        {/* Tab 2: Wellness Overview (Preserved analytics widgets) */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-6"
          >
            {/* Row 1: Mood Picker + Energy/Stress Meters */}
            <div className="grid lg:grid-cols-2 gap-6">
              <MoodPicker />
              <EnergyStressMeters />
            </div>

            {/* Row 2: Mood Chart (Trend) */}
            <div>
              <MoodChart />
            </div>

            {/* Row 3: Cause Distribution + Sleep vs Mood */}
            <div className="grid lg:grid-cols-2 gap-6">
              <CauseChart />
              <SleepMoodChart />
            </div>

            {/* Row 4: Lowest Point analysis */}
            <LowestPoint />
          </motion.div>
        )}

        {/* Tab 3: AI Companion (Talk to MindMate) */}
        {activeTab === 'talk' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <ProblemInput />
          </motion.div>
        )}

        {/* Footer Medical Disclaimer */}
        <div className="pt-8 border-t border-[#3B82F6]/15 text-center space-y-2">
          <p className="text-xs text-[#8FA3C7] max-w-3xl mx-auto leading-relaxed">
            ⚠️ <strong>Medical Disclaimer:</strong> MindMate AI is supportive, not a replacement for professional medical or mental health care. If you are experiencing a crisis or severe distress, please connect with a qualified professional or call <strong className="text-white">Tele-MANAS (14416)</strong> or <strong className="text-white">iCall (9152987821)</strong>.
          </p>
          <p className="text-[11px] text-[#8FA3C7]/60">
            MindMate AI · 3D Mental Wellness Companion · WCAG AA Contrast · 60fps Experience
          </p>
        </div>
      </div>

      {/* Mode Detail View Modal (Mounts whenever a mode is selected) */}
      {selectedMode && (
        <ModeDetailModal
          mode={selectedMode}
          onClose={() => setSelectedMode(null)}
        />
      )}
    </div>
  );
}
