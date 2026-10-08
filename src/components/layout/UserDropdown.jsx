import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { User, LogOut, ShieldCheck, Settings, ChevronDown, Mail } from 'lucide-react';

export const UserDropdown = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsOpen(false);
    logout();
    navigate('/login');
  };

  const displayName = user?.name || 'Akash Barik';
  const displayRole = user?.role || 'Operations Lead';
  const displayInitials = user?.initials || 'AB';
  const displayEmail = user?.email || 'akash.barik@bharatlogix.in';

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 pl-2 border-l border-slate-200 dark:border-slate-800 hover:opacity-90 transition-opacity cursor-pointer group"
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-500 via-fuchsia-500 to-pink-500 p-0.5 shadow-md shadow-purple-500/20 group-hover:ring-2 ring-purple-400/40 transition-all">
          <div className="w-full h-full rounded-[10px] bg-white dark:bg-slate-900 flex items-center justify-center font-bold text-xs text-purple-700 dark:text-white">
            {displayInitials}
          </div>
        </div>
        <div className="hidden xl:block text-left">
          <div className="flex items-center gap-1">
            <p className="text-xs font-semibold text-slate-900 dark:text-white leading-tight">{displayName}</p>
            <ChevronDown className="w-3 h-3 text-slate-500 group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-white transition-colors" />
          </div>
          <p className="text-[10px] font-semibold text-purple-600 dark:text-purple-300">{displayRole}</p>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150 divide-y divide-slate-100 dark:divide-slate-800/80">
          {/* Header */}
          <div className="p-4 bg-slate-50/90 dark:bg-slate-950/70">
            <p className="text-xs font-bold text-slate-900 dark:text-white">{displayName}</p>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 mt-1 truncate">
              <Mail className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400 shrink-0" />
              <span className="truncate">{displayEmail}</span>
            </div>
            <div className="mt-2.5 flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-purple-100 text-purple-800 border border-purple-200 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/30">
                {displayRole}
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active Session
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="p-1.5 space-y-0.5 text-xs">
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-700 hover:text-purple-700 hover:bg-purple-50 dark:text-slate-200 dark:hover:text-white dark:hover:bg-slate-800 transition-colors text-left cursor-pointer group"
            >
              <User className="w-4 h-4 text-purple-600 dark:text-purple-400 transition-transform group-hover:scale-110" />
              <span className="font-semibold">Operator Profile</span>
            </Link>

            <Link
              to="/settings"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-700 hover:text-purple-700 hover:bg-purple-50 dark:text-slate-200 dark:hover:text-white dark:hover:bg-slate-800 transition-colors text-left cursor-pointer group"
            >
              <Settings className="w-4 h-4 text-slate-500 group-hover:text-purple-600 dark:text-slate-400 dark:group-hover:text-purple-400 transition-transform group-hover:scale-110" />
              <span className="font-semibold">Platform Settings</span>
            </Link>
          </div>

          {/* Logout Action */}
          <div className="p-1.5">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10 transition-colors text-left font-semibold cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-rose-500" />
              <span>Sign Out of Platform</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
