/**
 * AppContext.jsx
 * Global state management for MindMate AI:
 * - Dark theme enforcement (defaulting to deep navy palette)
 * - Mood history & tracking
 * - Last visited mode persistence (localStorage)
 * - Active mode details & tools view
 * - Chat panel state with preloaded messages/context
 * - Crisis safety panel & instant emergency modal
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOOD_HISTORY, TODAY_MOOD_DEFAULT, CURRENT_ENERGY, CURRENT_STRESS } from '../data/mockData';
import { SUPPORT_MODES } from '../data/supportModes';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // ─── Theme State (Defaulting to Dark Premium Navy) ─────────
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('mindmate-darkmode');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('mindmate-darkmode', JSON.stringify(darkMode));
  }, [darkMode]);

  // ─── Last Visited Mode (localStorage persistence) ──────────
  const [lastModeId, setLastModeId] = useState(() => {
    return localStorage.getItem('mindmate-last-mode') || 'exam-stress';
  });

  const selectMode = (mode) => {
    if (!mode) {
      setSelectedMode(null);
      return;
    }
    const id = typeof mode === 'string' ? mode : mode.id;
    const found = SUPPORT_MODES.find(m => m.id === id) || mode;
    setSelectedMode(found);
    setLastModeId(id);
    localStorage.setItem('mindmate-last-mode', id);
  };

  // ─── Selected Mode for Detail View / Modal ────────────────
  const [selectedMode, setSelectedMode] = useState(null);

  // ─── Mood History & Metrics ────────────────────────────────
  const [moodHistory, setMoodHistory] = useState(() => {
    const saved = localStorage.getItem('mindmate-mood-history');
    return saved ? JSON.parse(saved) : MOOD_HISTORY;
  });

  const [todayMood, setTodayMood] = useState(() => {
    const saved = localStorage.getItem('mindmate-today-mood');
    return saved ? JSON.parse(saved) : TODAY_MOOD_DEFAULT;
  });

  const [energy, setEnergy] = useState(CURRENT_ENERGY);
  const [stress, setStress] = useState(CURRENT_STRESS);

  const saveTodayMood = (mood) => {
    setTodayMood(mood);
    localStorage.setItem('mindmate-today-mood', JSON.stringify(mood));

    const today = new Date().toISOString().split('T')[0];
    const updated = [
      ...moodHistory.filter(m => m.date !== today),
      { date: today, mood: mood.level, cause: mood.cause || 'general', sleep: 7, note: mood.note },
    ];
    setMoodHistory(updated);
    localStorage.setItem('mindmate-mood-history', JSON.stringify(updated));
  };

  // ─── Problem Input / AI Analysis History ───────────────────
  const [problemHistory, setProblemHistory] = useState(() => {
    const saved = localStorage.getItem('mindmate-problem-history');
    return saved ? JSON.parse(saved) : [];
  });

  const addProblem = (entry) => {
    const updated = [entry, ...problemHistory];
    setProblemHistory(updated);
    localStorage.setItem('mindmate-problem-history', JSON.stringify(updated));
  };

  // ─── Chat Panel State ─────────────────────────────────────
  const [chatOpen, setChatOpen] = useState(false);
  const [chatTopic, setChatTopic] = useState('');
  const [initialChatMessage, setInitialChatMessage] = useState('');

  const openChat = (topic = '', initialMessage = '') => {
    setChatTopic(topic);
    setInitialChatMessage(initialMessage);
    setChatOpen(true);
  };

  // ─── Crisis & Safety State ─────────────────────────────────
  const [crisisPanelOpen, setCrisisPanelOpen] = useState(false);
  const [crisisModalAlert, setCrisisModalAlert] = useState(false);

  const triggerCrisisAlert = () => {
    setCrisisModalAlert(true);
  };

  return (
    <AppContext.Provider
      value={{
        darkMode,
        setDarkMode,
        lastModeId,
        selectMode,
        selectedMode,
        setSelectedMode,
        moodHistory,
        todayMood,
        saveTodayMood,
        energy,
        setEnergy,
        stress,
        setStress,
        problemHistory,
        addProblem,
        chatOpen,
        setChatOpen,
        chatTopic,
        initialChatMessage,
        openChat,
        crisisPanelOpen,
        setCrisisPanelOpen,
        crisisModalAlert,
        setCrisisModalAlert,
        triggerCrisisAlert,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
