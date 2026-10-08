import React, { useState, useEffect } from 'react';
import { Menu, Clock } from 'lucide-react';
import { useFleet } from '../../context/FleetContext';
import { AlertDropdown } from '../alerts/AlertDropdown';
import { ThemeToggle } from './ThemeToggle';
import { UserDropdown } from './UserDropdown';
import { Link } from 'react-router-dom';

// Live IST Clock component with modern glassmorphism & live pulse beacon
const ISTClock = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const istOptions = { timeZone: 'Asia/Kolkata' };

  const timeStr = now.toLocaleTimeString('en-IN', {
    ...istOptions,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  const [timeMain = '', period = ''] = timeStr.split(' ');

  const dateStr = now.toLocaleDateString('en-IN', {
    ...istOptions,
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="hidden sm:inline-flex items-center gap-3 px-3.5 py-1.5 rounded-2xl border border-slate-200/90 dark:border-purple-500/20 bg-gradient-to-r from-slate-50/80 via-white/90 to-purple-50/40 dark:from-slate-800/80 dark:via-slate-800/60 dark:to-purple-950/30 backdrop-blur-md shadow-xs shadow-slate-200/50 dark:shadow-purple-950/30 transition-all hover:border-purple-300 dark:hover:border-purple-500/40 group">
      {/* Live Beacon Dot & Icon */}
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="relative flex h-2.5 w-2.5 items-center justify-center" title="Live Clock Active">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500 shadow-sm shadow-emerald-500/50" />
        </span>
        <div className="w-6 h-6 rounded-lg bg-purple-500/10 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-105 transition-transform">
          <Clock className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Time & Date Display */}
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[13.5px] font-bold font-mono tracking-tight tabular-nums text-slate-800 dark:text-slate-100">
            {timeMain}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-300 bg-purple-100/70 dark:bg-purple-900/50 px-1 py-0.5 rounded leading-none">
            {period}
          </span>
          <span className="text-[9.5px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            IST
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-1 text-[10px] font-medium text-slate-500 dark:text-slate-400">
          <span>{dateStr}</span>
        </div>
      </div>
    </div>
  );
};

export const Navbar = ({ onOpenSidebar, onScrollToTop }) => {
  const { vehicles, inTransitVehiclesCount, activeShipmentsCount, openGatewayModal } = useFleet();

  return (
    <header
      onDoubleClick={onScrollToTop}
      className="sticky top-0 z-40 h-16 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 lg:px-8 flex items-center justify-between transition-colors duration-300"
    >
      {/* Left — Mobile Menu + Live IST Clock */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 lg:hidden cursor-pointer"
          aria-label="Open sidebar navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Live IST Clock — Tap to Scroll To Top */}
        <div
          onClick={onScrollToTop}
          className="cursor-pointer active:scale-95 transition-transform"
          title="Tap to scroll to top of page"
        >
          <ISTClock />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5">
        {/* Light / Dark Mode Toggle */}
        <ThemeToggle />

        {/* Quick Link to Map Tracking */}
        <Link
          to="/tracking"
          className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all bg-purple-100 hover:bg-purple-200 text-purple-700 border-purple-200 dark:bg-purple-600/15 dark:hover:bg-purple-600/25 dark:text-purple-300 dark:border-purple-500/30"
        >
          <span className="w-2 h-2 rounded-full bg-purple-500 dark:bg-purple-400 animate-ping" />
          Live Radar Map
        </Link>

        {/* Notifications Dropdown */}
        <AlertDropdown />

        {/* Interactive User Profile Dropdown */}
        <UserDropdown />
      </div>
    </header>
  );
};
