import React, { useState, useRef, useEffect } from 'react';
import { useFleet } from '../../context/FleetContext';
import { Bell, CheckCheck, AlertTriangle, AlertCircle, Info, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AlertDropdown = ({ isDocked = false, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { alerts, unreadAlertsCount, markAlertAsRead, markAllAlertsRead, restoreDefaultAlerts } = useFleet();
  const dropdownRef = useRef(null);

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
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={
          isDocked
            ? `relative p-2 rounded-full transition-all cursor-pointer text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 flex items-center justify-center ${className}`
            : `relative p-2.5 rounded-xl border transition-all cursor-pointer shadow-sm bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-800 dark:text-slate-300 dark:hover:text-white ${className}`
        }
        aria-label="View notifications"
      >
        <Bell className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        {unreadAlertsCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white shadow-md animate-pulse">
            {unreadAlertsCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute -right-12 sm:right-0 mt-3 w-[min(384px,calc(100vw-2rem))] max-w-[92vw] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-slate-900 dark:text-white">Fleet Alerts & Updates</span>
              {unreadAlertsCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-rose-100 text-rose-700 border border-rose-200 dark:bg-rose-500/20 dark:text-rose-400 dark:border-rose-500/30 font-bold">
                  {unreadAlertsCount} new
                </span>
              )}
            </div>
            {unreadAlertsCount > 0 && (
              <button
                onClick={() => markAllAlertsRead()}
                className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto overscroll-contain divide-y divide-slate-100 dark:divide-slate-800/60">
            {alerts.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500 dark:text-slate-400 space-y-2.5">
                <p>No active alerts logged</p>
                <button
                  onClick={() => restoreDefaultAlerts()}
                  className="px-3 py-1.5 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-700 dark:bg-purple-900/40 dark:hover:bg-purple-900/60 dark:text-purple-300 font-semibold text-[11px] transition-colors cursor-pointer"
                >
                  Restore 6 Fleet Alerts
                </button>
              </div>
            ) : (
              alerts.slice(0, 8).map(alert => {
                const isCrit = alert.severity === 'critical';
                const isWarn = alert.severity === 'warning';

                return (
                  <div
                    key={alert.id}
                    onClick={() => {
                      if (!alert.read) markAlertAsRead(alert.id);
                    }}
                    className={`p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer flex gap-3 items-start ${
                      !alert.read ? 'bg-purple-50/60 dark:bg-purple-950/20' : ''
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isCrit && <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />}
                      {isWarn && <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
                      {!isCrit && !isWarn && <Info className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-xs truncate ${!alert.read ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-700 dark:text-slate-300 font-medium'}`}>
                          {alert.title}
                        </p>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 shrink-0 ml-2">{alert.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">{alert.message}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="p-2.5 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800 text-center">
            <Link
              to="/alerts"
              onClick={() => setIsOpen(false)}
              className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold inline-flex items-center gap-1.5 transition-colors"
            >
              Open Incident & Alerts Center
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
