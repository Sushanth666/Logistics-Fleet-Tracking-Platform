import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = ({ showLabel = false, className = '' }) => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs select-none flex items-center justify-center group ${
        isDark
          ? 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/80 hover:border-purple-500/50 text-slate-200'
          : 'bg-white hover:bg-slate-100 border-slate-200 hover:border-amber-400/50 text-slate-700'
      } ${className}`}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? (
        <Moon className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition-transform duration-300" />
      ) : (
        <Sun className="w-4 h-4 text-amber-500 group-hover:rotate-45 transition-transform duration-300" />
      )}
      {showLabel && (
        <span className="text-xs font-semibold ml-2">
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </span>
      )}
    </button>
  );
};
