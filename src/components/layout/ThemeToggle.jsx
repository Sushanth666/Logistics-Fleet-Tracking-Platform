import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = () => {
  const { themeMode, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-300 cursor-pointer shadow-md select-none group ${
        isDark
          ? 'bg-slate-900/90 hover:bg-slate-800 border-purple-900/50 text-slate-200 hover:border-purple-600/50'
          : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-800 hover:border-slate-300'
      }`}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Moon className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition-transform duration-300" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500 group-hover:rotate-45 transition-transform duration-300" />
        )}
      </div>

      <span className="text-xs font-semibold hidden sm:inline">
        {isDark ? 'Dark Mode' : 'Light Mode'}
      </span>

      {/* Mode Indicator Dot */}
      <span
        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
          isDark ? 'bg-purple-400 shadow-sm shadow-purple-400' : 'bg-amber-400 shadow-sm shadow-amber-400'
        }`}
      />
    </button>
  );
};
