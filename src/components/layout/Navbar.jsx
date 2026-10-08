import React, { useState, useEffect } from 'react';
import { Menu, Search, Radio } from 'lucide-react';
import { useFleet } from '../../context/FleetContext';
import { AlertDropdown } from '../alerts/AlertDropdown';
import { ThemeToggle } from './ThemeToggle';
import { UserDropdown } from './UserDropdown';
import { CommandPalette } from './CommandPalette';
import { Link } from 'react-router-dom';

export const Navbar = ({ onOpenSidebar, onScrollToTop }) => {
  const { vehicles, inTransitVehiclesCount, activeShipmentsCount, openGatewayModal } = useFleet();
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // Global keyboard shortcut listener for Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header
        onDoubleClick={onScrollToTop}
        className="sticky top-0 z-40 h-16 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-3 sm:px-5 lg:px-6 flex items-center justify-between gap-2 sm:gap-3 transition-colors duration-300"
      >
        {/* Left — Mobile / Tablet Menu Toggle + Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenSidebar}
            className="p-2 sm:p-2.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 lg:hidden cursor-pointer transition-colors"
            aria-label="Open sidebar navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Brand mark on Mobile & Tablet (when main sidebar is retracted/hidden) */}
          <Link
            to="/"
            className="lg:hidden flex items-center gap-1.5 group select-none"
          >
            <span className="font-extrabold text-sm sm:text-base tracking-tight bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
              BharatLogix
            </span>
          </Link>
        </div>

        {/* Center — Global Command & Omnisearch Bar (Ctrl+K) */}
        {/* Visible on tablet and desktop, responsively scaled so it never pushes controls off */}
        <div className="flex-1 max-w-xs md:max-w-sm lg:max-w-lg min-w-0 mx-2 md:mx-4 lg:mx-6 hidden sm:block">
          <button
            onClick={() => setIsCommandOpen(true)}
            className="w-full flex items-center justify-between px-3 sm:px-3.5 py-2 rounded-2xl bg-slate-100/80 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 border border-slate-200/90 hover:border-purple-400 dark:border-slate-700/80 dark:hover:border-purple-500/60 shadow-xs hover:shadow-md transition-all cursor-pointer group text-left"
            title="Global Quick Search (Ctrl+K)"
          >
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors min-w-0">
              <Search className="w-4 h-4 shrink-0" />
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200 truncate">
                Search fleet, shipments, corridors...
              </span>
            </div>

            <kbd className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 shadow-2xs group-hover:border-purple-400/50 transition-colors shrink-0">
              <span className="text-[11px]">Ctrl</span>K
            </kbd>
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Mobile Quick Search Icon Trigger (Only on mobile <640px) */}
          <button
            onClick={() => setIsCommandOpen(true)}
            className="sm:hidden p-2 rounded-xl text-slate-500 hover:text-purple-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-purple-400 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Search (Ctrl+K)"
            aria-label="Open search command palette"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Light / Dark Mode Toggle */}
          <ThemeToggle />

          {/* Quick Link to Map Tracking (Symbol Icon) - hidden on mobile, shown on tablet & desktop */}
          <Link
            to="/tracking"
            className="hidden sm:inline-flex relative p-2.5 rounded-xl border transition-all bg-purple-50 hover:bg-purple-100 dark:bg-purple-600/15 dark:hover:bg-purple-600/25 text-purple-700 dark:text-purple-300 border-purple-200/90 dark:border-purple-500/30 items-center justify-center cursor-pointer shadow-xs group shrink-0"
            title="Live GPS Radar Map (/tracking)"
            aria-label="Open Live Radar Map"
          >
            <Radio className="w-4 h-4 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
            </span>
          </Link>

          {/* Notifications Dropdown */}
          <AlertDropdown />

          {/* Subtle Vertical Divider */}
          <div className="h-5 w-px bg-slate-200/90 dark:bg-slate-800 mx-0.5 sm:mx-1 shrink-0" />

          {/* Interactive User Profile Dropdown */}
          <UserDropdown />
        </div>
      </header>

      {/* Global Command Palette Modal */}
      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
    </>
  );
};
