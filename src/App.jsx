/**
 * App.jsx
 * Root component:
 * - AppProvider wrapping state
 * - Ambient 3D Starfield background
 * - Sticky Glass Navbar
 * - LandingPage ↔ Dashboard routing
 * - Global panels: ChatPanel, CrisisPanel, CrisisModal (emergency alert)
 */
import { useState } from 'react';
import { AppProvider } from './context/AppContext';

// Layout
import Navbar from './components/Navbar';
import StarfieldBackground from './components/3d/StarfieldBackground';

// Pages
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

// Global floating panels & Safety Modals
import ChatPanel from './components/ChatPanel';
import CrisisPanel from './components/CrisisPanel';
import CrisisModal from './components/CrisisModal';

export default function App() {
  const [page, setPage] = useState('landing'); // 'landing' | 'dashboard'

  return (
    <AppProvider>
      {/* 3D Starfield / Particle Depth Ambient Background */}
      <StarfieldBackground />

      {/* Sticky Glass Navbar */}
      <Navbar onDashboard={page === 'dashboard'} setPage={setPage} />

      {/* Page Routing */}
      <main className="relative z-10 min-h-screen">
        {page === 'landing' && <LandingPage setPage={setPage} />}
        {page === 'dashboard' && <Dashboard />}
      </main>

      
      {/* Global Panels */}
      <ChatPanel />
      <CrisisPanel />
      <CrisisModal />

      {/* Creator Credit */}
      <footer className="relative z-10 py-5 text-center text-sm text-gray-400">
        Hosted with ❤️ by <span className="font-semibold text-cyan-400">Vikas nishad</span>
      </footer>
    </AppProvider>
  );
}
