import React, { useState, useEffect } from 'react';
import LandingView from './views/LandingView';
import LoginView from './views/LoginView';
import DashboardView from './views/DashboardView';
import { AnimatePresence, motion } from 'framer-motion';

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [isDarkMode, setIsDarkMode] = useState(false);

  console.log('App.jsx: Current View:', currentView);

  // Sync dark mode class with state
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen w-full bg-white dark:bg-slate-950 transition-colors duration-500 overflow-x-hidden ${isDarkMode ? 'dark' : ''}`}>
      <AnimatePresence mode="wait">
        {currentView === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <LandingView onNavigate={setCurrentView} />
          </motion.div>
        )}

        {currentView === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <LoginView onNavigate={setCurrentView} />
          </motion.div>
        )}

        {currentView !== 'landing' && currentView !== 'login' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <DashboardView 
              onLogout={() => setCurrentView('landing')} 
              isDarkMode={isDarkMode} 
              setIsDarkMode={setIsDarkMode} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
