import React from 'react';
import { StatusBadge } from '../common/StatusBadge';
import {
  Gauge,
  Fuel,
  Thermometer,
  Shield,
  User,
  Package,
  Clock,
  MapPin,
  Compass,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const TelemetryCard = ({ vehicle, shipment, onClose }) => {
  if (!vehicle) {
    return (
      <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center text-slate-500 dark:text-slate-400">
        <Compass className="w-10 h-10 mx-auto text-purple-500 dark:text-purple-400 mb-2 animate-spin-slow" />
        <p className="text-sm font-medium text-slate-900 dark:text-white">Select a Vehicle to Stream Telemetry</p>
        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">Click any vehicle marker or sidebar item to trace live telemetry feeds.</p>
      </div>
    );
  }

  const isTempHigh = vehicle.engineTemp > 100;
  const isFuelLow = vehicle.fuelLevel < 25;

  return (
    <div className="bg-white dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom duration-200">
      {/* Header */}
      <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">{vehicle.name}</h3>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-transparent">
              {vehicle.plate}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{vehicle.type}</p>
        </div>
        <StatusBadge status={vehicle.status} />
      </div>

      {/* Driver info */}
      <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800/80 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300">
            <User className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">{vehicle.driverName || 'Unassigned'}</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Assigned Driver</p>
          </div>
        </div>

        <div className="text-right">
          <p className="font-mono text-xs text-slate-700 dark:text-slate-300 font-semibold">{vehicle.odometer.toLocaleString()} km</p>
          <p className="text-[10px] text-slate-400 dark:text-slate-500">Odometer</p>
        </div>
      </div>

      {/* Live Telemetry HUD Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4">
        {/* Speed */}
        <div className="bg-slate-50 dark:bg-slate-950/70 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
            <span>Speed</span>
            <Gauge className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{vehicle.speed}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">km/h</span>
          </div>
        </div>

        {/* Fuel */}
        <div className="bg-slate-50 dark:bg-slate-950/70 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
            <span>Fuel / Batt</span>
            <Fuel className={`w-3.5 h-3.5 ${isFuelLow ? 'text-rose-500 animate-pulse' : 'text-amber-500 dark:text-amber-400'}`} />
          </div>
          <div className="mt-2">
            <span className={`text-2xl font-black ${isFuelLow ? 'text-rose-500' : 'text-slate-900 dark:text-white'}`}>
              {vehicle.fuelLevel}%
            </span>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
              <div
                className={`h-full ${isFuelLow ? 'bg-rose-500' : 'bg-amber-400'}`}
                style={{ width: `${vehicle.fuelLevel}%` }}
              />
            </div>
          </div>
        </div>

        {/* Engine Temp */}
        <div className="bg-slate-50 dark:bg-slate-950/70 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
            <span>Engine Temp</span>
            <Thermometer className={`w-3.5 h-3.5 ${isTempHigh ? 'text-rose-500 animate-bounce' : 'text-emerald-500 dark:text-emerald-400'}`} />
          </div>
          <div className="mt-2">
            <span className={`text-2xl font-black ${isTempHigh ? 'text-rose-500' : 'text-slate-900 dark:text-white'}`}>
              {vehicle.engineTemp}°C
            </span>
            <p className="text-[10px] text-slate-500 mt-1">{isTempHigh ? 'High Temp Warn' : 'Nominal Temp'}</p>
          </div>
        </div>

        {/* Asset Health */}
        <div className="bg-slate-50 dark:bg-slate-950/70 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
            <span>Asset Health</span>
            <Shield className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{vehicle.healthScore}%</span>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium">Telemetry OK</p>
          </div>
        </div>
      </div>

      {/* Linked Shipment Details if present */}
      {shipment ? (
        <div className="p-3.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-500/20 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-xs font-bold text-slate-900 dark:text-white">{shipment.id}</span>
              <span className="text-[10px] text-purple-700 dark:text-purple-300 font-medium">({shipment.cargoType})</span>
            </div>
            <StatusBadge status={shipment.status} size="sm" />
          </div>

          {/* Route path */}
          <div className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-1 truncate max-w-[150px]">
              <MapPin className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 shrink-0" />
              <span className="truncate">{shipment.origin.city}</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0 mx-2" />
            <div className="flex items-center gap-1 truncate max-w-[150px]">
              <MapPin className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
              <span className="truncate">{shipment.destination.city}</span>
            </div>
          </div>

          {/* Progress bar & ETA */}
          <div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">
              <span>Delivery Progress</span>
              <span className="text-slate-900 dark:text-white font-medium">{shipment.currentProgressPercent}% • ETA {shipment.eta}</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-600 to-cyan-500"
                style={{ width: `${shipment.currentProgressPercent}%` }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 text-center">
          No active shipment assigned to this vehicle currently.
        </div>
      )}
    </div>
  );
};
