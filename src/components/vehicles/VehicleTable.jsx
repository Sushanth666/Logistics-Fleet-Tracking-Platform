import React from 'react';
import { StatusBadge } from '../common/StatusBadge';
import {
  Truck,
  Edit2,
  Trash2,
  Eye,
  Fuel,
  Gauge,
  User,
  MapPin,
  ShieldCheck
} from 'lucide-react';

export const VehicleTable = ({
  vehicles,
  onSelectVehicle,
  onEditVehicle,
  onDeleteVehicle,
  onTrackMap
}) => {
  return (
    <div className="table-responsive-container overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xl backdrop-blur-md">
      <table className="w-full min-w-[920px] text-left text-sm text-slate-800 dark:text-slate-300">
        <thead className="bg-slate-50/90 dark:bg-slate-950/70 text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider border-b border-slate-200 dark:border-slate-800">
          <tr>
            <th className="py-4 px-4 sm:px-6">Vehicle Asset</th>
            <th className="py-4 px-4">Status</th>
            <th className="py-4 px-4">Assigned Driver</th>
            <th className="py-4 px-4">Telemetry / Fuel</th>
            <th className="py-4 px-4">Health</th>
            <th className="py-4 px-4">Location / Depot</th>
            <th className="py-4 px-4 sm:px-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {vehicles.map((vehicle) => {
            const isFuelLow = vehicle.fuelLevel < 25;

            return (
              <tr
                key={vehicle.id}
                className="hover:bg-purple-50/40 dark:hover:bg-slate-800/40 transition-colors group cursor-pointer"
                onClick={() => onSelectVehicle(vehicle)}
              >
                {/* Vehicle Asset */}
                <td className="py-4 px-4 sm:px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 border border-purple-200 dark:bg-slate-800 dark:text-purple-400 dark:border-slate-700/80 flex items-center justify-center shrink-0 group-hover:border-purple-300 dark:group-hover:border-purple-500/40 transition-colors shadow-sm">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                        {vehicle.name}
                      </span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-transparent">
                          {vehicle.plate}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{vehicle.type}</span>
                      </div>
                    </div>
                  </div>
                </td>

                {/* Status */}
                <td className="py-4 px-4">
                  <StatusBadge status={vehicle.status} />
                </td>

                {/* Assigned Driver */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-purple-600 dark:text-slate-500" />
                    <span className={`text-xs font-semibold ${vehicle.driverName && vehicle.driverName !== 'Unassigned' ? 'text-slate-900 dark:text-white' : 'text-slate-400 italic'}`}>
                      {vehicle.driverName || 'Unassigned'}
                    </span>
                  </div>
                </td>

                {/* Telemetry / Fuel */}
                <td className="py-4 px-4">
                  <div className="space-y-1.5 min-w-[130px]">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1 font-medium text-slate-600 dark:text-slate-400">
                        <Gauge className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        {vehicle.speed} km/h
                      </span>
                      <span className={`font-bold ${isFuelLow ? 'text-rose-500' : 'text-slate-700 dark:text-slate-300'}`}>
                        {vehicle.fuelLevel}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${isFuelLow ? 'bg-rose-500' : 'bg-emerald-500'}`}
                        style={{ width: `${vehicle.fuelLevel}%` }}
                      />
                    </div>
                  </div>
                </td>

                {/* Health */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className={`w-4 h-4 ${vehicle.healthScore > 85 ? 'text-emerald-500' : 'text-amber-500'}`} />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{vehicle.healthScore}%</span>
                  </div>
                </td>

                {/* Location */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 max-w-[200px] truncate">
                    <MapPin className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
                    <span className="truncate">{vehicle.location?.address}</span>
                  </div>
                </td>

                {/* Actions */}
                <td className="py-4 px-4 sm:px-6 text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onTrackMap(vehicle.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:text-cyan-400 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title="View on Live Radar Map"
                    >
                      <MapPin className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onSelectVehicle(vehicle)}
                      className="p-2 rounded-lg text-slate-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:text-purple-400 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEditVehicle(vehicle)}
                      className="p-2 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 dark:hover:text-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Edit Vehicle"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteVehicle(vehicle.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:text-rose-400 dark:hover:bg-rose-500/10 transition-colors cursor-pointer"
                      title="Remove Vehicle"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
