import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { User, LogOut, ShieldCheck, Settings, ChevronDown, Mail } from 'lucide-react';

export const UserDropdown = () => {
  const { user, logout, updateUser } = useAuth();
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
  const displayInitials =
    user?.initials?.trim() ||
    (user?.name ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '') ||
    'AB';
  const displayEmail = user?.email || 'akash.barik@bharatlogix.in';
  const dutyStatus = user?.dutyStatus || 'On Duty';

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button — Sleek Executive Capsule Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 p-1 lg:pl-1.5 lg:pr-3 rounded-full bg-slate-100/80 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 border border-slate-200/90 hover:border-purple-300 dark:border-slate-700/80 dark:hover:border-purple-500/40 shadow-2xs hover:shadow-xs transition-all duration-200 cursor-pointer group select-none"
        aria-label="User profile menu"
      >
        {/* Modern Circular Gradient Avatar with Embedded Duty Dot */}
        <div className="relative shrink-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-pink-500 p-[1.5px] shadow-xs group-hover:scale-105 transition-transform duration-200">
            <div
              className="user-avatar-badge w-full h-full rounded-full flex items-center justify-center font-black text-[11px] tracking-wider select-none shadow-inner"
              style={{
                backgroundColor: '#7c3aed',
                color: '#ffffff'
              }}
            >
              {displayInitials}
            </div>
          </div>
          {/* Duty Status Dot with Clean Ring */}
          <span
            className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ring-2 ring-white dark:ring-slate-900 shadow-xs transition-colors ${
              dutyStatus === 'On Duty'
                ? 'bg-emerald-500'
                : dutyStatus === 'On Break'
                ? 'bg-amber-400'
                : 'bg-slate-400'
            }`}
            title={`Duty Status: ${dutyStatus}`}
          />
        </div>

        {/* Name & Role (Desktop only; on mobile & tablet avatar pill is shown) */}
        <div className="hidden lg:flex flex-col text-left min-w-0 pr-0.5">
          <div className="flex items-center gap-1.5 leading-tight">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors truncate">
              {displayName}
            </span>
          </div>
          <div className="mt-0.5 leading-none">
            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 truncate">
              {displayRole}
            </span>
          </div>
        </div>

        {/* Chevron Indicator */}
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-transform group-hover:translate-y-0.5 shrink-0 hidden lg:block" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150 divide-y divide-slate-100 dark:divide-slate-800/80">
          {/* Header */}
          <div className="p-4 bg-slate-50/90 dark:bg-slate-950/70">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-slate-900 dark:text-white">{displayName}</p>
              {/* Status pill in header */}
              <span
                className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold border ${
                  dutyStatus === 'On Duty'
                    ? 'bg-emerald-100/70 text-emerald-800 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30'
                    : dutyStatus === 'On Break'
                    ? 'bg-amber-100/70 text-amber-800 border-amber-200 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30'
                    : 'bg-slate-200 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    dutyStatus === 'On Duty' ? 'bg-emerald-500' : dutyStatus === 'On Break' ? 'bg-amber-400' : 'bg-slate-400'
                  }`}
                />
                <span>{dutyStatus}</span>
              </span>
            </div>
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

          {/* Quick Duty Status Switcher inside Dropdown */}
          <div className="px-3 py-2.5 bg-slate-100/50 dark:bg-slate-950/40">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 px-0.5">
              Change Duty Status
            </p>
            <div className="grid grid-cols-3 gap-1 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
              {['On Duty', 'On Break', 'Off Duty'].map((status) => {
                const isSelected = dutyStatus === status;
                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => updateUser({ dutyStatus: status })}
                    className={`py-1 px-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                      isSelected
                        ? status === 'On Duty'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : status === 'On Break'
                          ? 'bg-amber-500 text-white shadow-xs'
                          : 'bg-slate-700 text-white'
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        status === 'On Duty'
                          ? 'bg-emerald-300'
                          : status === 'On Break'
                          ? 'bg-amber-300'
                          : 'bg-slate-400'
                      }`}
                    />
                    <span className="truncate">{status}</span>
                  </button>
                );
              })}
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
