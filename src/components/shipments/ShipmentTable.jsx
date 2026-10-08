import React from 'react';
import { StatusBadge } from '../common/StatusBadge';
import {
  Package,
  MapPin,
  ArrowRight,
  Eye,
  Edit2,
  Trash2,
  Truck,
  User,
  Clock
} from 'lucide-react';

export const ShipmentTable = ({
  shipments,
  onSelectShipment,
  onEditShipment,
  onDeleteShipment,
  onTrackMap
}) => {
  return (
    <div className="table-responsive-container overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xl backdrop-blur-md">
      <table className="w-full min-w-[900px] text-left text-sm text-slate-800 dark:text-slate-300">
        <thead className="bg-slate-50/90 dark:bg-slate-950/70 text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider border-b border-slate-200 dark:border-slate-800">
          <tr>
            <th className="py-4 px-4 sm:px-6">Shipment ID / Manifest</th>
            <th className="py-4 px-4">Status & Priority</th>
            <th className="py-4 px-4">Origin → Destination</th>
            <th className="py-4 px-4">Carrier & Driver</th>
            <th className="py-4 px-4">Journey Progress</th>
            <th className="py-4 px-4">ETA</th>
            <th className="py-4 px-4 sm:px-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {shipments.map((shipment) => {
            return (
              <tr
                key={shipment.id}
                className="hover:bg-purple-50/40 dark:hover:bg-slate-800/40 transition-colors group cursor-pointer"
                onClick={() => onSelectShipment(shipment)}
              >
                {/* ID & Manifest */}
                <td className="py-4 px-4 sm:px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 border border-purple-200 dark:bg-slate-800 dark:text-purple-400 dark:border-slate-700/80 flex items-center justify-center shrink-0 group-hover:border-purple-300 dark:group-hover:border-purple-500/40 transition-colors shadow-sm">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors font-mono">
                        {shipment.id}
                      </span>
                      <p className="text-xs text-slate-800 dark:text-slate-300 font-semibold">{shipment.customer}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[180px] font-medium">{shipment.cargoType}</p>
                    </div>
                  </div>
                </td>

                {/* Status & Priority */}
                <td className="py-4 px-4">
                  <div className="space-y-1">
                    <StatusBadge status={shipment.status} size="sm" />
                    <div>
                      <StatusBadge status={shipment.priority} size="sm" />
                    </div>
                  </div>
                </td>

                {/* Origin -> Destination */}
                <td className="py-4 px-4">
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>{shipment.origin.city}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{shipment.destination.city}</span>
                    </div>
                  </div>
                </td>

                {/* Carrier & Driver */}
                <td className="py-4 px-4 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                      <Truck className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                      <span className="font-mono">{shipment.assignedVehiclePlate || 'None'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-400">
                      <User className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                      <span>{shipment.assignedDriverName || 'Unassigned'}</span>
                    </div>
                  </div>
                </td>

                {/* Progress */}
                <td className="py-4 px-4">
                  <div className="space-y-1.5 min-w-[120px]">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Progress</span>
                      <span className="text-slate-900 dark:text-white font-bold">{shipment.currentProgressPercent}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${shipment.status === 'delayed' ? 'bg-rose-500' : 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600'}`}
                        style={{ width: `${shipment.currentProgressPercent}%` }}
                      />
                    </div>
                  </div>
                </td>

                {/* ETA */}
                <td className="py-4 px-4 text-xs">
                  <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                    <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    <span>{shipment.eta}</span>
                  </div>
                </td>

                {/* Actions */}
                <td className="py-4 px-4 sm:px-6 text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onSelectShipment(shipment)}
                      className="p-2 rounded-lg text-slate-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:text-purple-400 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title="View Timeline"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEditShipment(shipment)}
                      className="p-2 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 dark:hover:text-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Edit Shipment"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteShipment(shipment.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:text-rose-400 dark:hover:bg-rose-500/10 transition-colors cursor-pointer"
                      title="Delete Shipment"
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
