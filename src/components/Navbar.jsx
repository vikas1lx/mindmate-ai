/**
 * Navbar.jsx
 * Sticky navbar with logo, nav links, dark mode toggle, and CTA button.
 */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X, Brain } from 'lucide-react';
import { useApp } from '../context/AppContext';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Team', href: '#team' },
];

export default function Navbar({ onDashboard, setPage }) {
  const { darkMode, setDarkMode } = useApp();
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
      ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-md'
      : 'bg-transparent',
  ].join(' ');

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => setPage('landing')}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-emerald-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Brain size={18} className="text-white" />
            </div>
            <span className="font-bold text-lg gradient-text">MindMate AI</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {!onDashboard && NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              >
                {link.label}
              </a>
            ))}

            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-violet-100 dark:hover:bg-violet-900/30 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* CTA */}
            {onDashboard ? (
              <button
                onClick={() => setPage('landing')}
                className="px-4 py-2 text-sm font-medium text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 rounded-xl transition-colors"
              >
                ← Back to Home
              </button>
            ) : (
              <button
                onClick={() => setPage('dashboard')}
                className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl shadow hover:shadow-lg hover:scale-105 transition-all"
              >
                Open Dashboard
              </button>
            )}
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-100 dark:border-slate-800 px-4 py-4 flex flex-col gap-3"
          >
            {!onDashboard && NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-slate-700 dark:text-slate-300 py-2 hover:text-violet-600"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => { setPage(onDashboard ? 'landing' : 'dashboard'); setMenuOpen(false); }}
              className="w-full py-2 text-sm font-semibold text-white bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl"
            >
              {onDashboard ? '← Back to Home' : 'Open Dashboard'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
