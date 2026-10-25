/**
 * ProblemSearchBar.jsx
 * Top centered, large glass input for natural language problem matching.
 * Features:
 * - Autocomplete dropdown of mode names while typing
 * - Voice input via SpeechRecognition (with visual pulse indicator)
 * - Immediate crisis keyword check (triggers calm support alert card before anything else)
 * - Matches 1-3 suggested modes on submit
 * - Fallback: Sends text to MindMate AI chat if no modes match
 */
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Mic, MicOff, ArrowRight, X } from 'lucide-react';
import { SUPPORT_MODES, matchQueryToModes } from '../data/supportModes';
import { detectCrisis } from '../data/aiResponses';
import { useApp } from '../context/AppContext';

export default function ProblemSearchBar({ onSuggestedModes }) {
  const { selectMode, openChat, triggerCrisisAlert } = useApp();
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredModes, setFilteredModes] = useState([]);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Autocomplete suggestions as user types
  useEffect(() => {
    const trimmed = query.trim().toLowerCase();
    if (trimmed.length > 0) {
      const matches = SUPPORT_MODES.filter(m =>
        m.title.toLowerCase().includes(trimmed) ||
        m.keywords.some(k => k.includes(trimmed)) ||
        m.description.toLowerCase().includes(trimmed)
      ).slice(0, 5);
      setFilteredModes(matches);
      setShowDropdown(matches.length > 0);
    } else {
      setFilteredModes([]);
      setShowDropdown(false);
    }
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Voice recognition support
  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Voice recognition is not supported in this browser. Please try Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
        // Automatically analyze voice input
        processQuery(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error('Speech recognition error:', err);
      setIsListening(false);
    }
  };

  const processQuery = (textToProcess) => {
    const text = (textToProcess || query).trim();
    if (!text) return;

    // 1. Safety check for crisis language
    if (detectCrisis(text)) {
      triggerCrisisAlert();
      return;
    }

    // 2. Keyword & intent matching to 1-3 best modes
    const matches = matchQueryToModes(text);

    if (matches.length > 0) {
      onSuggestedModes(matches);
      setShowDropdown(false);
    } else {
      // 3. Fallback: send text to MindMate AI chat as first message
      openChat('Your Query', text);
      onSuggestedModes([]);
      setShowDropdown(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    processQuery(query);
  };

  const handleSelectAutocomplete = (mode) => {
    setQuery(mode.title);
    setShowDropdown(false);
    selectMode(mode);
  };

  return (
    <div ref={containerRef} className="w-full max-w-3xl mx-auto relative z-30">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          {/* Leading search icon */}
          <div className="absolute left-4 sm:left-5 text-cyan-400 pointer-events-none flex items-center justify-center">
            <Search size={22} className="opacity-90" />
          </div>

          {/* Large Glass Input */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.trim().length > 0 && setShowDropdown(true)}
            placeholder="What's on your mind today? (e.g. can't sleep, exam tomorrow…)"
            className="w-full pl-12 sm:pl-14 pr-24 sm:pr-28 py-4 sm:py-5 rounded-2xl glass-input text-base sm:text-lg placeholder-[#8FA3C7]/60 shadow-[0_10px_35px_rgba(0,0,0,0.4)]"
            aria-label="Search problems or feelings"
          />

          {/* Right Action Buttons */}
          <div className="absolute right-3 sm:right-4 flex items-center gap-1.5 sm:gap-2">
            {query.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  onSuggestedModes([]);
                }}
                className="p-2 rounded-xl text-[#8FA3C7] hover:text-[#E6EDFF] hover:bg-[#0F1D3D] transition-colors"
                aria-label="Clear search"
              >
                <X size={17} />
              </button>
            )}

            {/* Voice Input Mic Button */}
            <button
              type="button"
              onClick={handleVoiceInput}
              className={`p-2.5 rounded-xl transition-all ${
                isListening
                  ? 'bg-rose-500/30 text-rose-300 animate-pulse border border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.5)]'
                  : 'text-cyan-400 hover:text-white hover:bg-cyan-500/20'
              }`}
              title={isListening ? 'Listening… click to stop' : 'Speak your thoughts'}
              aria-label={isListening ? 'Stop listening' : 'Start voice input'}
            >
              {isListening ? <MicOff size={19} /> : <Mic size={19} />}
            </button>

            {/* Submit Arrow */}
            <button
              type="submit"
              className="p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold flex items-center gap-1.5 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:scale-105 active:scale-95 transition-all"
              aria-label="Find guidance"
            >
              <span className="hidden sm:inline text-sm">Find</span>
              <ArrowRight size={17} />
            </button>
          </div>
        </div>

        {/* Listening Indicator Banner */}
        <AnimatePresence>
          {isListening && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="mt-2 text-center text-xs text-cyan-300 font-medium flex items-center justify-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              Listening to your voice… speak freely
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      {/* Autocomplete Dropdown */}
      <AnimatePresence>
        {showDropdown && filteredModes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 right-0 top-full mt-2 rounded-2xl glass-card overflow-hidden z-50 border border-cyan-500/30 shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
          >
            <div className="p-2 text-xs font-semibold text-[#8FA3C7] uppercase tracking-wider px-4 py-2 border-b border-[#3B82F6]/20 flex items-center justify-between">
              <span>Matching Modes</span>
              <span className="text-[10px] text-cyan-400 font-normal">Select to open</span>
            </div>
            <div className="divide-y divide-[#3B82F6]/10">
              {filteredModes.map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => handleSelectAutocomplete(mode)}
                  className="w-full px-4 py-3 text-left flex items-center gap-3.5 hover:bg-[#3B82F6]/15 transition-colors group"
                >
                  <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                    {mode.emoji}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-[#E6EDFF] group-hover:text-cyan-300 transition-colors">
                        {mode.title}
                      </p>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#3B82F6]/20 text-cyan-300 border border-[#3B82F6]/30">
                        {mode.category}
                      </span>
                    </div>
                    <p className="text-xs text-[#8FA3C7] truncate mt-0.5">
                      {mode.description}
                    </p>
                  </div>
                  <ArrowRight size={15} className="text-[#8FA3C7] group-hover:text-cyan-300 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
