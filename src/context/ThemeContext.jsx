import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(() => {
    try {
      return localStorage.getItem('bharatlogix_mode') || localStorage.getItem('logipulse_mode') || 'dark';
    } catch {
      return 'dark';
    }
  });

  const isDark = themeMode === 'dark';

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove('light', 'theme-light');
      root.classList.add('dark', 'theme-violet');
    } else {
      root.classList.remove('dark', 'theme-violet');
      root.classList.add('light', 'theme-light');
    }

    try {
      localStorage.setItem('bharatlogix_mode', themeMode);
    } catch (e) {
      console.warn('Could not persist theme mode:', e);
    }
  }, [themeMode, isDark]);

  const toggleTheme = () => {
    setThemeMode(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
