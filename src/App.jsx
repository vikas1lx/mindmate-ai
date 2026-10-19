/**
 * App.jsx
 * Root component — manages page routing (landing ↔ dashboard),
 * wraps everything in AppProvider, and mounts global panels.
 */
import { useState } from 'react';
import { AppProvider } from './context/AppContext';

// Layout
import Navbar from './components/Navbar';

// Pages
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

// Always-visible global panels
import ChatPanel from './components/ChatPanel';
import CrisisPanel from './components/CrisisPanel';

export default function App() {
  const [page, setPage] = useState('landing'); // 'landing' | 'dashboard'

  return (
    <AppProvider>
      {/* Sticky navbar — present on all pages */}
      <Navbar onDashboard={page === 'dashboard'} setPage={setPage} />

      {/* Page content */}
      {page === 'landing' && <LandingPage setPage={setPage} />}
      {page === 'dashboard' && <Dashboard />}

      {/* Global panels — always mounted, visibility controlled by context */}
      <ChatPanel />
      <CrisisPanel />
    </AppProvider>
  );
}
