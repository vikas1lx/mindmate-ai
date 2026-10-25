/**
 * Navbar.jsx
 * Sticky Glassmorphism Navbar with:
 * - Brand logo with cyan/blue glow
 * - Route navigation (Home ↔ Dashboard)
 * - Quick helpline anchor
 * - Dark mode toggle
 * - Mobile responsive drawer
 */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X, Brain, Heart, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Team', href: '#team' },
];

export default function Navbar({ onDashboard, setPage }) {
  const { darkMode, setDarkMode, setCrisisPanelOpen } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navClasses = [
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
    scrolled
      ? 'bg-[#050B1A]/85 backdrop-blur-xl border-b border-[#3B82F6]/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
      : 'bg-transparent',
  ].join(' ');

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <button
            onClick={() => {
              setPage('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group text-left"
            aria-label="MindMate AI Home"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.4)] group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] transition-all">
              <Brain size={20} className="text-white" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
                MindMate <span className="text-cyan-400 text-xs px-1.5 py-0.5 rounded-md bg-cyan-500/20 border border-cyan-500/40">3D</span>
              </span>
              <span className="block text-[10px] text-[#8FA3C7] tracking-wider uppercase">AI Wellness Companion</span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            {!onDashboard &&
              NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-[#8FA3C7] hover:text-[#22D3EE] transition-colors"
                >
                  {link.label}
                </a>
              ))}

            {/* Helpline fast-access */}
            <button
              onClick={() => setCrisisPanelOpen(true)}
              className="flex items-center gap-1.5 text-xs text-rose-300 px-3 py-1.5 rounded-xl bg-rose-500/15 border border-rose-500/30 hover:bg-rose-500/25 transition-all"
            >
              <Heart size={13} className="fill-rose-400 text-rose-400" />
              <span>14416 Helpline</span>
            </button>

            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl glass-card text-[#8FA3C7] hover:text-[#E6EDFF] hover:border-cyan-400/40 transition-colors"
              aria-label="Toggle theme mode"
            >
              {darkMode ? <Sun size={17} className="text-cyan-300" /> : <Moon size={17} />}
            </button>

            {/* Page switch CTA */}
            {onDashboard ? (
              <button
                onClick={() => setPage('landing')}
                className="px-4 py-2 text-sm font-semibold text-[#8FA3C7] hover:text-white glass-card hover:border-cyan-400/50 transition-all rounded-xl"
              >
                ← Back to Home
              </button>
            ) : (
              <button
                onClick={() => {
                  setPage('dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.35)] hover:shadow-[0_0_30px_rgba(34,211,238,0.55)] hover:scale-105 active:scale-95 transition-all"
              >
                <span>Launch Dashboard</span>
                <ArrowRight size={15} />
              </button>
            )}
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setCrisisPanelOpen(true)}
              className="p-2 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs"
              aria-label="Helpline"
            >
              <Heart size={17} className="fill-rose-400" />
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl glass-card text-[#8FA3C7]"
              aria-label="Theme"
            >
              {darkMode ? <Sun size={17} className="text-cyan-300" /> : <Moon size={17} />}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-xl glass-card text-[#8FA3C7] hover:text-white"
              aria-label="Menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0A1630]/95 backdrop-blur-2xl border-b border-[#3B82F6]/30 px-5 py-5 flex flex-col gap-3 shadow-2xl"
          >
            {!onDashboard &&
              NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium text-[#8FA3C7] py-2 hover:text-cyan-300 border-b border-[#3B82F6]/10"
                >
                  {link.label}
                </a>
              ))}
            <button
              onClick={() => {
                setPage(onDashboard ? 'landing' : 'dashboard');
                setMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full py-3 mt-2 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl shadow-lg"
            >
              {onDashboard ? '← Back to Home' : 'Launch Dashboard →'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
