/**
 * Dashboard.jsx
 * Main dashboard layout with all widgets and sections.
 * Tabs: Overview | Support Modes | Talk to MindMate
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Grid, MessageCircle } from 'lucide-react';

// Dashboard widgets
import MoodPicker from './MoodPicker';
import MoodChart from './MoodChart';
import CauseChart from './CauseChart';
import SleepMoodChart from './SleepMoodChart';
import LowestPoint from './LowestPoint';
import EnergyStressMeters from './EnergyStressMeters';

// Support section
import SupportModes from './SupportModes';

// Problem input
import ProblemInput from './ProblemInput';

const TABS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'support', label: 'Support Modes', icon: Grid },
  { id: 'talk', label: 'Talk to MindMate', icon: MessageCircle },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-slate-50 to-emerald-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 pt-16">
      {/* Dashboard Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">
            Welcome back 👋
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 bg-white/70 dark:bg-slate-800/70 backdrop-blur p-1 rounded-2xl w-fit shadow-sm border border-slate-200 dark:border-slate-700">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === id
                  ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Icon size={15} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* ── Overview Tab ──────────────────────────────────────── */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Row 1: Mood picker + Energy/Stress */}
            <div className="grid lg:grid-cols-2 gap-5 mb-5">
              <MoodPicker />
              <EnergyStressMeters />
            </div>

            {/* Row 2: Mood chart (full width) */}
            <div className="mb-5">
              <MoodChart />
            </div>

            {/* Row 3: Cause donut + Sleep-mood scatter */}
            <div className="grid lg:grid-cols-2 gap-5 mb-5">
              <CauseChart />
              <SleepMoodChart />
            </div>

            {/* Row 4: Lowest point */}
            <LowestPoint />

            {/* Quick actions */}
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <button
                onClick={() => setActiveTab('support')}
                className="glass-card p-5 flex items-center gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all text-left group"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-2xl shadow">
                  🧩
                </div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-100 group-hover:text-violet-600 transition-colors">
                    Browse Support Modes
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    10 modes for whatever you're facing
                  </p>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('talk')}
                className="glass-card p-5 flex items-center gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all text-left group"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-2xl shadow">
                  💬
                </div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-100 group-hover:text-violet-600 transition-colors">
                    Talk to MindMate
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Share what's on your mind
                  </p>
                </div>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── Support Modes Tab ──────────────────────────────────── */}
        {activeTab === 'support' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <SupportModes />
          </motion.div>
        )}

        {/* ── Talk to MindMate Tab ───────────────────────────────── */}
        {activeTab === 'talk' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ProblemInput />
          </motion.div>
        )}
      </div>

      {/* Footer disclaimer */}
      <div className="text-center py-6 px-4 border-t border-slate-200 dark:border-slate-800">
        <p className="text-xs text-slate-400 dark:text-slate-500 max-w-2xl mx-auto">
          ⚠️ <strong>MindMate AI is not a substitute for professional medical help.</strong> If you are in crisis, contact a local helpline.{' '}
          <span className="font-medium text-slate-500">Tele-MANAS: 14416 · iCall: 9152987821</span>
        </p>
      </div>
    </div>
  );
}
