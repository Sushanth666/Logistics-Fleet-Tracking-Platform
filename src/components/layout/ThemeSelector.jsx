import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Palette, Check, Sparkles, Sun, Moon } from 'lucide-react';

export const ThemeSelector = () => {
  const { currentTheme, setTheme, themes, activeThemeObj } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const activeTheme = activeThemeObj || (themes && themes.find(t => t.id === currentTheme)) || (themes && themes[0]) || {
    name: 'Cyber Violet',
    preview: { primary: '#a855f7', secondary: '#ec4899' }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all cursor-pointer shadow-md"
        title="Change Platform Color Theme"
      >
        <Palette className="w-4 h-4 text-purple-400" />
        <span className="hidden sm:inline text-xs font-semibold">{activeTheme?.name || 'Cyber Violet'}</span>
        <div className="flex items-center -space-x-1 ml-1">
          <span
            className="w-2.5 h-2.5 rounded-full ring-1 ring-slate-900"
            style={{ backgroundColor: activeTheme?.preview?.primary || '#a855f7' }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full ring-1 ring-slate-900"
            style={{ backgroundColor: activeTheme?.preview?.secondary || '#ec4899' }}
          />
        </div>
      </button>

      {/* Themes Dropdown */}
      {isOpen && (
        <div className="absolute -right-12 sm:right-0 mt-3 w-[min(384px,calc(100vw-2rem))] max-w-[92vw] rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div className="p-3.5 bg-slate-950/70 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="font-bold text-sm text-white">Visual Color Palettes</span>
            </div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              {themes.length} Presets
            </span>
          </div>

          <div className="p-2 space-y-1.5 max-h-[380px] overflow-y-auto overscroll-contain">
            {themes.map((theme) => {
              const isSelected = currentTheme === theme.id;

              return (
                <div
                  key={theme.id}
                  onClick={() => {
                    setTheme(theme.id);
                    setIsOpen(false);
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-slate-800 border-purple-500/60 shadow-lg ring-1 ring-purple-500/40'
                      : 'bg-slate-950/40 border-slate-800 hover:bg-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Swatch preview stack */}
                    <div
                      className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center p-1 relative shadow-inner"
                      style={{ backgroundColor: theme.preview.bg }}
                    >
                      <div className="w-5 h-5 rounded-lg flex items-center justify-center" style={{ backgroundColor: theme.preview.card }}>
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.preview.primary }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{theme.name}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                          theme.category === 'Light'
                            ? 'bg-amber-400/20 text-amber-300'
                            : 'bg-purple-400/20 text-purple-300'
                        }`}>
                          {theme.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{theme.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {isSelected && (
                      <span className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white flex items-center justify-center shadow-md shadow-purple-600/30">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
