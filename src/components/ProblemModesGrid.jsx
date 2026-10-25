/**
 * ProblemModesGrid.jsx
 * Responsive grid of the 20 Problem Modes:
 * - Category filter chips (All, Study, Mind, Relationships, Life)
 * - 3D glass cards with 3D tilt on hover and custom blue/cyan glows
 * - Staggered entrance animation
 * - Last visited mode indicator (remembered in localStorage)
 * - Fully keyboard navigable
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Clock } from 'lucide-react';
import { SUPPORT_MODES, CATEGORIES } from '../data/supportModes';
import Card3DTilt from './3d/Card3DTilt';
import { useApp } from '../context/AppContext';

export default function ProblemModesGrid() {
  const { lastModeId, selectMode, selectedMode } = useApp();
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredModes = activeCategory === 'All'
    ? SUPPORT_MODES
    : SUPPORT_MODES.filter(m => m.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <div className="w-full space-y-6">
      {/* Category Filter Chips */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none w-full sm:w-auto">
          {CATEGORIES.map((cat) => {
            const count = cat === 'All' ? SUPPORT_MODES.length : SUPPORT_MODES.filter(m => m.category === cat).length;
            const isSelected = activeCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 flex-shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(34,211,238,0.35)] scale-105'
                    : 'glass-card text-[#8FA3C7] hover:text-[#E6EDFF] hover:border-cyan-500/40'
                }`}
                aria-pressed={isSelected}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-black/20 text-white' : 'bg-[#0F1D3D] text-[#8FA3C7]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-[#8FA3C7]">
          <Sparkles size={14} className="text-cyan-400" />
          <span>Interactive 3D Cards · Click to Explore Tools</span>
        </div>
      </div>

      {/* Responsive Grid of 20 3D Glass Cards */}
      <motion.div
        key={activeCategory}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
      >
        <AnimatePresence mode="popLayout">
          {filteredModes.map((mode) => {
            const isLastVisited = mode.id === lastModeId;
            const isActive = selectedMode?.id === mode.id;

            return (
              <motion.div
                key={mode.id}
                variants={itemVariants}
                layout
                className="h-full"
              >
                <Card3DTilt
                  onClick={() => selectMode(mode)}
                  glowColor={mode.glowColor}
                  isActive={isActive}
                  ariaLabel={`Open ${mode.title} support mode`}
                  className="p-5 h-full flex flex-col justify-between"
                >
                  <div>
                    {/* Top row: Emoji & Category Badge */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-md flex-shrink-0"
                        style={{
                          background: 'rgba(15, 29, 61, 0.85)',
                          border: `1px solid ${mode.glowColor}55`,
                          boxShadow: `0 0 15px ${mode.glowColor}25`,
                        }}
                      >
                        {mode.emoji}
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#0F1D3D] text-cyan-300 border border-[#3B82F6]/30 font-medium">
                          {mode.category}
                        </span>
                        {isLastVisited && (
                          <span className="flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                            <Clock size={9} />
                            Last Visited
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Mode Title & One-line Description */}
                    <h3 className="font-bold text-base sm:text-lg text-[#E6EDFF] group-hover:text-cyan-300 transition-colors">
                      {mode.title}
                    </h3>
                    <p className="text-xs text-[#8FA3C7] mt-1.5 leading-relaxed line-clamp-2">
                      {mode.description}
                    </p>
                  </div>

                  {/* Bottom Action Hint */}
                  <div className="mt-4 pt-3 border-t border-[#3B82F6]/15 flex items-center justify-between text-xs text-[#8FA3C7] group-hover:text-cyan-300 transition-colors">
                    <span className="text-[11px] font-medium">Open Tools & Breath</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card3DTilt>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
