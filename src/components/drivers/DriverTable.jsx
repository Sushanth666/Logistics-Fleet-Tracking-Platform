import React from 'react';
import { StatusBadge } from '../common/StatusBadge';
import {
  Star,
  Truck,
  Phone,
  Mail,
  ShieldCheck,
  Award,
  Edit2,
  Trash2,
  ArrowUpDown
} from 'lucide-react';

export const DriverTable = ({
  drivers,
  onEdit,
  onDelete,
  onViewScorecard
}) => {
  return (
    <div className="overflow-x-auto overscroll-contain rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xl backdrop-blur-md">
      <table className="w-full text-left text-sm text-slate-800 dark:text-slate-300">
        <thead className="bg-slate-50/90 dark:bg-slate-950/70 text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider border-b border-slate-200 dark:border-slate-800">
          <tr>
            <th className="py-4 px-4 sm:px-6">Commercial Operator</th>
            <th className="py-4 px-4">License & Expiry</th>
            <th className="py-4 px-4">Regional Hub</th>
            <th className="py-4 px-4">Duty Status</th>
            <th className="py-4 px-4">Assigned Asset</th>
            <th className="py-4 px-4">Safety Index</th>
            <th className="py-4 px-4">On-Time</th>
            <th className="py-4 px-4">Deliveries</th>
            <th className="py-4 px-4 sm:px-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {drivers.map((driver) => {
            return (
              <tr
                key={driver.id}
                className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group"
              >
                {/* Operator info */}
                <td className="py-3.5 px-4 sm:px-6">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={driver.avatar}
                        alt={driver.name}
                        className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700 shadow-sm"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80';
                        }}
                      />
                      <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 ${
                        driver.status === 'on-route' ? 'bg-emerald-400' :
                        driver.status === 'available' ? 'bg-blue-400' :
                        driver.status === 'on-break' ? 'bg-amber-400' : 'bg-slate-500'
                      }`} />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>{driver.name}</span>
                        {driver.rating >= 4.9 && (
                          <span className="text-[10px] font-semibold text-amber-500 flex items-center">
                            ★ {driver.rating}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                        <a
                          href={`tel:${driver.phone}`}
                          className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                        >
                          {driver.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </td>

                {/* License */}
                <td className="py-3.5 px-4">
                  <div className="font-mono text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {driver.licenseNumber}
                  </div>
                  <div className="text-[11px] text-slate-400 dark:text-slate-500">
                    Exp: {driver.licenseExpiry || '2028-12-31'}
                  </div>
                </td>

                {/* Regional Hub */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
                    <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs">
                      IND
                    </span>
                    <span className="truncate max-w-[150px]">{driver.hub || `${driver.state || 'India'} Hub`}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    {driver.state || 'India'}
                  </span>
                </td>

                {/* Status */}
                <td className="py-3.5 px-4">
                  <StatusBadge status={driver.status} size="sm" />
                </td>

                {/* Assigned Asset */}
                <td className="py-3.5 px-4">
                  {driver.assignedVehicleName && driver.assignedVehicleName !== 'None' ? (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-white">
                      <Truck className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
                      <span className="truncate max-w-[160px]">{driver.assignedVehicleName}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 italic">Unassigned</span>
                  )}
                </td>

                {/* Safety Index */}
                <td className="py-3.5 px-4">
                  <div className="w-24">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{driver.safetyScore}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full"
                        style={{ width: `${driver.safetyScore || 95}%` }}
                      />
                    </div>
                  </div>
                </td>

                {/* On-Time Delivery */}
                <td className="py-3.5 px-4">
                  <span className="font-bold text-xs text-purple-600 dark:text-purple-400">
                    {driver.onTimeDeliveryRate}%
                  </span>
                </td>

                {/* Total Deliveries */}
                <td className="py-3.5 px-4">
                  <div className="font-bold text-xs text-slate-900 dark:text-white">
                    {driver.totalDeliveries}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {((driver.milesLogged || 100000) / 1000).toFixed(0)}k km
                  </div>
                </td>

                {/* Actions */}
                <td className="py-3.5 px-4 sm:px-6 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onViewScorecard(driver)}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 hover:bg-gradient-to-r hover:from-purple-600 hover:via-fuchsia-600 hover:to-pink-600 hover:text-white transition-all cursor-pointer shadow-sm"
                    >
                      Scorecard
                    </button>
                    <button
                      onClick={() => onEdit(driver)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Edit Driver"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDelete(driver.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                      title="Remove Driver"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
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
