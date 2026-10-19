/**
 * AppContext.jsx
 * Global state: dark mode, mood data, chat panel, crisis panel visibility.
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOOD_HISTORY, TODAY_MOOD_DEFAULT, CURRENT_ENERGY, CURRENT_STRESS } from '../data/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // ─── Dark mode ───────────────────────────────────────────
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('mindmate-darkmode');
    return saved ? JSON.parse(saved) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('mindmate-darkmode', JSON.stringify(darkMode));
  }, [darkMode]);

  // ─── Mood data ───────────────────────────────────────────
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

    // Append to history
    const today = new Date().toISOString().split('T')[0];
    const updated = [
      ...moodHistory.filter(m => m.date !== today),
      { date: today, mood: mood.level, cause: mood.cause || 'general', sleep: 7, note: mood.note },
    ];
    setMoodHistory(updated);
    localStorage.setItem('mindmate-mood-history', JSON.stringify(updated));
  };

  // ─── Problem history ──────────────────────────────────────
  const [problemHistory, setProblemHistory] = useState(() => {
    const saved = localStorage.getItem('mindmate-problem-history');
    return saved ? JSON.parse(saved) : [];
  });

  const addProblem = (entry) => {
    const updated = [entry, ...problemHistory];
    setProblemHistory(updated);
    localStorage.setItem('mindmate-problem-history', JSON.stringify(updated));
  };

  // ─── Support / crisis panels ──────────────────────────────
  const [crisisPanelOpen, setCrisisPanelOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatTopic, setChatTopic] = useState('');
  const [supportPanelOpen, setSupportPanelOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState(null);

  const openChat = (topic = '') => {
    setChatTopic(topic);
    setChatOpen(true);
  };

  return (
    <AppContext.Provider value={{
      darkMode, setDarkMode,
      moodHistory, todayMood, saveTodayMood, energy, setEnergy, stress, setStress,
      problemHistory, addProblem,
      crisisPanelOpen, setCrisisPanelOpen,
      chatOpen, setChatOpen, chatTopic, openChat,
      supportPanelOpen, setSupportPanelOpen,
      selectedMode, setSelectedMode,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
