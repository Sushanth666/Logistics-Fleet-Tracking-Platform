import React, { useState, useEffect } from 'react';
import { Menu, Search, Radio, Compass } from 'lucide-react';
import { useFleet } from '../../context/FleetContext';
import { AlertDropdown } from '../alerts/AlertDropdown';
import { ThemeToggle } from './ThemeToggle';
import { UserDropdown } from './UserDropdown';
import { CommandPalette } from './CommandPalette';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = ({ onOpenSidebar, onScrollToTop }) => {
  const { inTransitVehiclesCount } = useFleet();
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const location = useLocation();

  // Dynamic route context mapping for desktop breadcrumb
  const getPageInfo = (path) => {
    switch (path) {
      case '/':
        return { title: 'Fleet Overview', tag: 'Live Network' };
      case '/tracking':
        return { title: 'Radar Tracking', tag: 'GPS Live' };
      case '/shipments':
        return { title: 'Active Shipments', tag: 'Dispatch' };
      case '/vehicles':
        return { title: 'Fleet Vehicles', tag: 'AIS-140' };
      case '/drivers':
        return { title: 'Driver Operations', tag: 'Rosters' };
      case '/alerts':
        return { title: 'Critical Alerts', tag: 'Safety' };
      case '/analytics':
        return { title: 'Telemetry Analytics', tag: 'KPIs' };
      case '/operator-profile':
        return { title: 'Operator Profile', tag: 'Security' };
      case '/platform-settings':
        return { title: 'Platform Settings', tag: 'System' };
      default:
        return { title: 'Fleet Command', tag: 'AIS-140' };
    }
  };

  const pageInfo = getPageInfo(location.pathname);

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
        className="sticky top-0 z-40 h-16 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 px-3 sm:px-5 lg:px-6 flex items-center justify-between gap-3 transition-colors duration-300 select-none"
      >
        {/* Left — Mobile Drawer Trigger + Brand Logo (Mobile/Tablet) | Desktop Live Context Badge */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Mobile / Tablet Menu Button */}
          <button
            onClick={onOpenSidebar}
            className="p-2 sm:p-2.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 lg:hidden cursor-pointer transition-colors"
            aria-label="Open sidebar navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Brand mark on Mobile & Tablet */}
          <Link
            to="/"
            className="lg:hidden flex items-center gap-1.5 group select-none"
          >
            <span className="font-black text-sm sm:text-base tracking-tight bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
              BharatLogix
            </span>
          </Link>

          {/* Desktop Unique Page Context & Telematics Status (Anchors the Left Side!) */}
          <div className="hidden lg:flex items-center gap-2.5">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/70 shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 tracking-tight">
                {pageInfo.title}
              </span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                {pageInfo.tag}
              </span>
            </div>

            {/* In-Transit Fleet Pulse Badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-800/40 text-[11px] font-semibold text-purple-700 dark:text-purple-300">
              <Compass className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>{inTransitVehiclesCount || 38} In Transit</span>
            </div>
          </div>
        </div>

        {/* Center — Omnisearch Command Bar (Ctrl+K) */}
        <div className="flex-1 max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg min-w-0 mx-2 lg:mx-auto hidden sm:block">
          <button
            onClick={() => setIsCommandOpen(true)}
            className="w-full flex items-center justify-between px-3 sm:px-3.5 py-2 rounded-full bg-slate-100/80 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 border border-slate-200/90 hover:border-purple-400 dark:border-slate-700/80 dark:hover:border-purple-500/60 shadow-2xs hover:shadow-xs transition-all cursor-pointer group text-left"
            title="Global Quick Search (Ctrl+K)"
          >
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors min-w-0">
              <Search className="w-4 h-4 shrink-0" />
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200 truncate">
                Search fleet, shipments, corridors...
              </span>
            </div>

            <kbd className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 shadow-2xs group-hover:border-purple-400/50 transition-colors shrink-0">
              <span className="text-[11px]">Ctrl</span>K
            </kbd>
          </button>
        </div>

        {/* Right Controls — Segmented Utility Dock & Executive User Pill */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Mobile Quick Search Icon Trigger (Only on mobile <640px) */}
          <button
            onClick={() => setIsCommandOpen(true)}
            className="sm:hidden p-2 rounded-full text-slate-500 hover:text-purple-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-purple-400 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Search (Ctrl+K)"
            aria-label="Open search command palette"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Unified Utility Action Dock */}
          <div className="flex items-center p-1 rounded-full bg-slate-100/80 dark:bg-slate-850/70 border border-slate-200/90 dark:border-slate-750 shadow-2xs">
            <ThemeToggle className="!border-0 !shadow-none !bg-transparent hover:!bg-white dark:hover:!bg-slate-800 !rounded-full !p-2" />

            <div className="h-3.5 w-px bg-slate-200 dark:bg-slate-700/80 mx-0.5 hidden sm:block" />

            {/* Quick Link to Map Tracking */}
            <Link
              to="/tracking"
              className="hidden sm:inline-flex relative p-2 rounded-full text-purple-600 dark:text-purple-400 hover:bg-white dark:hover:bg-slate-800 transition-all items-center justify-center cursor-pointer group shrink-0"
              title="Live GPS Radar Map (/tracking)"
              aria-label="Open Live Radar Map"
            >
              <Radio className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="absolute top-1 right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-purple-500" />
              </span>
            </Link>

            <div className="h-3.5 w-px bg-slate-200 dark:bg-slate-700/80 mx-0.5" />

            {/* Notifications Dropdown inside Dock */}
            <AlertDropdown isDocked={true} />
          </div>

          {/* Interactive User Profile Dropdown Capsule Pill */}
          <UserDropdown />
        </div>
      </header>

      {/* Global Command Palette Modal */}
      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
    </>
  );
};
