import React, { useEffect } from 'react';
import { StatusBadge } from '../common/StatusBadge';
import {
  X,
  Truck,
  Fuel,
  Gauge,
  Thermometer,
  Wrench,
  Calendar,
  User,
  ShieldCheck,
  AlertTriangle,
  History,
  Navigation
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const VehicleDetailsDrawer = ({ vehicle, onClose, onEdit, onTrackMap }) => {
  useEffect(() => {
    if (vehicle) {
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = prevOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [vehicle, onClose]);

  if (!vehicle) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 drawer-backdrop transition-opacity cursor-pointer"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 h-full overflow-y-auto overscroll-contain p-6 shadow-2xl z-10 animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{vehicle.name}</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-mono text-xs text-purple-600 dark:text-purple-400 font-semibold">{vehicle.plate}</span>
                <span className="text-slate-400 dark:text-slate-600">•</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{vehicle.type}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6 space-y-6">
          {/* Status and Action banner */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Current Status</p>
              <div className="mt-1">
                <StatusBadge status={vehicle.status} size="md" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onClose();
                  onTrackMap(vehicle.id);
                }}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:opacity-95 text-white shadow-md shadow-purple-600/20 transition-all cursor-pointer"
              >
                Track on Map
              </button>
              <button
                onClick={() => {
                  onClose();
                  onEdit(vehicle);
                }}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              >
                Edit Asset
              </button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs">
                <Gauge className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                <span>Speed</span>
              </div>
              <p className="text-xl font-bold text-slate-900 dark:text-white mt-1.5">{vehicle.speed} <span className="text-xs font-normal text-slate-500">km/h</span></p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs">
                <Fuel className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                <span>Fuel Level</span>
              </div>
              <p className="text-xl font-bold text-slate-900 dark:text-white mt-1.5">{vehicle.fuelLevel}%</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs">
                <Thermometer className="w-4 h-4 text-rose-500 dark:text-rose-400" />
                <span>Engine Temp</span>
              </div>
              <p className="text-xl font-bold text-slate-900 dark:text-white mt-1.5">{vehicle.engineTemp}°C</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                <span>Health Score</span>
              </div>
              <p className="text-xl font-bold text-slate-900 dark:text-white mt-1.5">{vehicle.healthScore}%</p>
            </div>
          </div>

          {/* Location & Driver */}
          <div className="space-y-3 p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Assignment & Telemetry</h4>
            
            <div className="flex items-center justify-between text-sm py-2 border-b border-slate-200 dark:border-slate-800/60">
              <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <User className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                Assigned Driver
              </span>
              <span className="font-semibold text-slate-900 dark:text-white">{vehicle.driverName || 'Unassigned'}</span>
            </div>

            <div className="flex items-center justify-between text-sm py-2 border-b border-slate-200 dark:border-slate-800/60">
              <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                Last Known GPS
              </span>
              <span className="text-right text-xs text-slate-700 dark:text-slate-300 font-mono">
                {vehicle.location?.lat.toFixed(4)}, {vehicle.location?.lng.toFixed(4)}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm py-2 border-b border-slate-200 dark:border-slate-800/60">
              <span className="text-slate-500 dark:text-slate-400">Current Address / Hub</span>
              <span className="text-right text-xs text-slate-700 dark:text-slate-300 max-w-[240px] truncate">
                {vehicle.location?.address}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm py-2">
              <span className="text-slate-500 dark:text-slate-400">Total Odometer</span>
              <span className="font-mono font-semibold text-slate-900 dark:text-white">{vehicle.odometer.toLocaleString()} km</span>
            </div>
          </div>

          {/* Maintenance & Inspections */}
          <div className="space-y-3 p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Wrench className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              Maintenance Schedule
            </h4>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Last Service Date</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1">{vehicle.lastServiceDate || '2026-08-01'}</p>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Next Service Due</p>
                <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 mt-1">{vehicle.nextServiceDue || '2026-11-01'}</p>
              </div>
            </div>
          </div>

          {/* Activity Logs */}
          <div className="space-y-3 p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <History className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              Recent Asset Telematics History
            </h4>

            <div className="space-y-2.5 pt-1 text-xs">
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 dark:emerald-400 mt-1.5 shrink-0" />
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-200">Pre-trip safety diagnostic check passed (100%)</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">Today, 06:15 AM</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 mt-1.5 shrink-0" />
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-200">Engine oil pressure & transmission temp nominal</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">Today, 09:30 AM</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-purple-500 dark:bg-purple-400 mt-1.5 shrink-0" />
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-200">GPS transponder ping received with 10ms latency</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">Just now</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
