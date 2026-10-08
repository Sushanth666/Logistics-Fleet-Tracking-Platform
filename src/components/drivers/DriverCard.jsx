import React from 'react';
import { StatusBadge } from '../common/StatusBadge';
import {
  Star,
  Truck,
  Phone,
  Mail,
  ShieldCheck,
  Award,
  Clock,
  Edit2,
  Trash2,
  ExternalLink,
  MapPin,
  TrendingUp,
  Flame,
  CheckCircle2
} from 'lucide-react';

export const DriverCard = ({
  driver,
  onEdit,
  onDelete,
  onViewScorecard
}) => {
  const isHighSafety = (driver.safetyScore || 95) >= 97;

  return (
    <div className="group relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-400 dark:hover:border-purple-500/60 shadow-sm hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-950/40 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Top Gradient Micro-Strip */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${
        driver.status === 'on-route'
          ? 'from-purple-600 via-fuchsia-600 to-pink-600'
          : driver.status === 'available'
          ? 'from-blue-500 via-indigo-500 to-cyan-500'
          : driver.status === 'on-break'
          ? 'from-amber-400 to-orange-500'
          : 'from-slate-400 to-slate-500'
      }`} />

      <div className="p-5 flex-1 flex flex-col justify-between">
        {/* Hub / State Tag & Status Badge */}
        <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100 dark:border-slate-800/80 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium truncate">
            <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs">
              IND
            </span>
            <span className="truncate max-w-[170px]" title={driver.hub || driver.state || 'India'}>
              {driver.hub || `${driver.state || 'India'} Hub`}
            </span>
          </div>

          <StatusBadge status={driver.status} size="sm" />
        </div>

        {/* Profile Identity */}
        <div className="flex items-start gap-3.5">
          <div className="relative shrink-0">
            <div className="w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-slate-100 dark:ring-slate-800 group-hover:ring-purple-500/50 shadow-md transition-all duration-300">
              <img
                src={driver.avatar}
                alt={driver.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80';
                }}
              />
            </div>

            {/* Verified Shield Badge */}
            <div
              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md ring-2 ring-white dark:ring-slate-900"
              title="Verified Commercial License"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors truncate">
                {driver.name}
              </h3>
            </div>

            {/* License Tag */}
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-mono text-[11px] font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/90 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700/60 truncate">
                {driver.licenseNumber}
              </span>
            </div>

            {/* Rating & Experience */}
            <div className="flex items-center gap-2 mt-1.5 text-xs">
              <div className="flex items-center gap-1 font-bold text-amber-500 dark:text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{driver.rating || 4.9}</span>
              </div>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                {driver.experienceYears} yrs exp
              </span>
            </div>
          </div>
        </div>

        {/* Driver Badge Tag */}
        {driver.badge && (
          <div className="mt-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border border-purple-100 dark:border-purple-800/50">
              {driver.badge}
            </span>
          </div>
        )}

        {/* Assigned Vehicle Card */}
        <div className="mt-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 min-w-0">
            <div className={`p-1.5 rounded-lg ${driver.assignedVehicleId ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'}`}>
              <Truck className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold truncate text-[12px]">
                {driver.assignedVehicleName && driver.assignedVehicleName !== 'None' ? driver.assignedVehicleName : 'No Vehicle Assigned'}
              </p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500">
                {driver.assignedVehicleId ? 'Active Asset Telemetry' : 'Standby / Unallocated'}
              </p>
            </div>
          </div>

          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
            driver.assignedVehicleId
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
              : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
          }`}>
            {driver.assignedVehicleId ? 'Assigned' : 'Available'}
          </span>
        </div>

        {/* Performance Telemetry Gauges (Modern Redesign) */}
        <div className="mt-3.5 grid grid-cols-3 gap-2 text-center">
          {/* Safety Score with mini-progress bar */}
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60 flex flex-col justify-between">
            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Safety Score
            </span>
            <div className="my-1">
              <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                {driver.safetyScore}%
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${driver.safetyScore || 95}%` }}
              />
            </div>
          </div>

          {/* On-Time Rate */}
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60 flex flex-col justify-between">
            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              On-Time
            </span>
            <div className="my-1">
              <span className="text-base font-black text-purple-600 dark:text-purple-400">
                {driver.onTimeDeliveryRate}%
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                style={{ width: `${driver.onTimeDeliveryRate || 95}%` }}
              />
            </div>
          </div>

          {/* Deliveries */}
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60 flex flex-col justify-between">
            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Deliveries
            </span>
            <div className="my-1">
              <span className="text-base font-black text-slate-900 dark:text-white">
                {driver.totalDeliveries}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
              {((driver.milesLogged || 100000) / 1000).toFixed(0)}k km
            </span>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <a
            href={`tel:${driver.phone}`}
            className="flex items-center gap-1.5 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            title="Call Operator"
          >
            <Phone className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span className="font-medium">{driver.phone}</span>
          </a>

          <a
            href={`mailto:${driver.email}`}
            className="flex items-center gap-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors truncate max-w-[140px]"
            title={driver.email}
          >
            <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{driver.email.split('@')[0]}</span>
          </a>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-3 bg-slate-50/80 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
        <button
          onClick={() => onViewScorecard(driver)}
          className="flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white shadow-sm hover:shadow-md hover:shadow-purple-600/25 hover:opacity-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Award className="w-3.5 h-3.5" />
          <span>View Scorecard</span>
        </button>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(driver)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all cursor-pointer"
            title="Edit Driver Profile"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(driver.id)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-transparent hover:border-rose-200 dark:hover:border-rose-900/40 transition-all cursor-pointer"
            title="Remove Driver"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
