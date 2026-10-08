import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  MapPin,
  Package,
  Truck,
  Users,
  Bell,
  BarChart3,
  Activity,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  User,
  Settings
} from 'lucide-react';
import { useFleet } from '../../context/FleetContext';

export const Sidebar = ({ isOpen, onClose }) => {
  const {
    unreadAlertsCount,
    isSimulationActive,
    toggleSimulation,
    resetAllData,
    openGatewayModal
  } = useFleet();

  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isOpen]);

  const coreNavItems = [
    { label: 'Operations Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Live GPS Tracking', path: '/tracking', icon: MapPin },
    { label: 'Shipment Dispatch', path: '/shipments', icon: Package },
    { label: 'Fleet Assets', path: '/vehicles', icon: Truck },
    { label: 'Drivers Roster', path: '/drivers', icon: Users },
    { label: 'Alerts & Incidents', path: '/alerts', icon: Bell, badge: unreadAlertsCount },
    { label: 'Performance Analytics', path: '/analytics', icon: BarChart3 }
  ];

  const systemNavItems = [
    { label: 'Operator Profile', path: '/profile', icon: User },
    { label: 'Platform Settings', path: '/settings', icon: Settings }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 overscroll-contain ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-fuchsia-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-600/30 ring-1 ring-white/20">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center text-lg font-black tracking-tight leading-none">
                <span className="text-slate-950 dark:text-white">Bharat</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 dark:from-purple-400 dark:via-fuchsia-400 dark:to-pink-400">
                  Logix
                </span>
                <span className="ml-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 inline-flex items-center gap-1">
                  <svg className="w-3.5 h-2.5 rounded-[2px] overflow-hidden shadow-xs shrink-0" viewBox="0 0 640 480" aria-label="India Flag">
                    <path fill="#f93" d="M0 0h640v160H0z"/>
                    <path fill="#fff" d="M0 160h640v160H0z"/>
                    <path fill="#128807" d="M0 320h640v160H0z"/>
                    <circle cx="320" cy="240" r="40" fill="#008"/>
                    <circle cx="320" cy="240" r="34" fill="#fff"/>
                    <circle cx="320" cy="240" r="10" fill="#008"/>
                  </svg>
                  <span>IND</span>
                </span>
              </div>
              <span className="text-[10px] tracking-wider uppercase font-bold text-purple-700 dark:text-purple-300 block mt-1">
                National Fleet OS v2.4
              </span>
            </div>
          </div>
        </div>

        {/* Live Simulation Pill */}
        <div className="p-3 mx-3 my-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-purple-900/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isSimulationActive ? 'bg-emerald-400' : 'bg-slate-400'}`} />
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isSimulationActive ? 'bg-emerald-500' : 'bg-slate-400'}`} />
              </span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Live Telematics</span>
            </div>

            <button
              onClick={toggleSimulation}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                isSimulationActive
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400 hover:opacity-90 border border-emerald-200 dark:border-emerald-500/30'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title={isSimulationActive ? 'Pause GPS Telemetry Simulation' : 'Resume GPS Telemetry Simulation'}
            >
              {isSimulationActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isSimulationActive ? 'Active' : 'Paused'}</span>
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-1 space-y-1 overflow-y-auto overscroll-contain">
          <div className="space-y-0.5">
            {coreNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 1024) onClose();
                }}
                className={({ isActive }) =>
                  `group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white shadow-md shadow-purple-600/30 font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`
                }
              >
                <div className="flex items-center gap-2.5">
                  <item.icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>{item.label}</span>
                </div>

                {item.badge > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          {/* System & Profile Category Divider */}
          <div className="pt-3 pb-1 px-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Account & Settings
            </p>
          </div>

          <div className="space-y-0.5">
            {systemNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 1024) onClose();
                }}
                className={({ isActive }) =>
                  `group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white shadow-md shadow-purple-600/30 font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`
                }
              >
                <div className="flex items-center gap-2.5">
                  <item.icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>{item.label}</span>
                </div>
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Sidebar Footer: National Logistics Gateway & Compliance Center */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/40 space-y-2">
          {/* Interactive National Gateway Status Card */}
          <button
            type="button"
            onClick={openGatewayModal}
            className="w-full p-2.5 rounded-xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 hover:from-emerald-500/20 hover:to-indigo-500/20 border border-emerald-500/20 dark:border-emerald-500/30 text-left transition-all cursor-pointer group shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Govt ULIP & AIS-140
              </span>
              <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-300 dark:border-emerald-700">
                4/4 Live
              </span>
            </div>
            <div className="flex items-center justify-between mt-1 text-[10px] text-slate-500 dark:text-slate-400">
              <span className="truncate">FASTag • EWB • Vahan</span>
              <span className="group-hover:translate-x-0.5 transition-transform text-emerald-600 dark:text-emerald-400 font-semibold shrink-0">
                Hub →
              </span>
            </div>
          </button>

          {/* Action Row */}
          <div className="flex items-center gap-2 pt-0.5">
            <button
              type="button"
              onClick={openGatewayModal}
              className="flex-1 py-1.5 px-2 rounded-xl text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
              <span>Compliance</span>
            </button>

            <button
              type="button"
              onClick={resetAllData}
              className="py-1.5 px-2.5 rounded-xl text-[11px] font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white bg-white dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 transition-all flex items-center justify-center gap-1 cursor-pointer shadow-sm"
              title="Reset Database to Standard Fleet"
            >
              <RotateCcw className="w-3 h-3 text-slate-400" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
