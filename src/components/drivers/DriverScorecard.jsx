import React from 'react';
import { Modal } from '../common/Modal';
import { StatusBadge } from '../common/StatusBadge';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  TrendingUp,
  Star,
  Truck,
  Calendar,
  AlertCircle
} from 'lucide-react';

export const DriverScorecard = ({ isOpen, onClose, driver }) => {
  if (!driver) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Driver Performance Scorecard: ${driver.name}`}
      subtitle={`Commercial DL #${driver.licenseNumber} • Indian Fleet Operator since ${driver.joinDate ? driver.joinDate.split('-')[0] : '2021'}`}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        {/* Top Profile Strip */}
        <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
          <div className="relative">
            <img
              src={driver.avatar}
              alt={driver.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-purple-500/50 shadow-md"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80';
              }}
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md ring-2 ring-white dark:ring-slate-900">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{driver.name}</h3>
              <StatusBadge status={driver.status} size="sm" />
              {driver.badge && (
                <span className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
                  {driver.badge}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center justify-center sm:justify-start gap-1.5">
              <span>{driver.licenseType}</span>
              <span>•</span>
              <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-gradient-to-r from-orange-500 to-amber-500 text-white">IND</span>
              <span>{driver.hub || `${driver.state || 'India'} Depot`}</span>
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-3 mt-2 text-xs text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1 text-amber-500 dark:text-amber-400 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{driver.rating || 4.9}</span> Rating
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-medium">
                <Truck className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                {driver.assignedVehicleName && driver.assignedVehicleName !== 'None' ? driver.assignedVehicleName : 'Unassigned'}
              </span>
            </div>
          </div>
        </div>

        {/* Core KPI Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
            <p className="text-xs text-slate-500 dark:text-slate-400">Safety Index</p>
            <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{driver.safetyScore}%</p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500">Zero violations</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
            <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400 mx-auto mb-1" />
            <p className="text-xs text-slate-500 dark:text-slate-400">On-Time Rate</p>
            <p className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1">{driver.onTimeDeliveryRate}%</p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500">Above fleet avg</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
            <CheckCircle2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400 mx-auto mb-1" />
            <p className="text-xs text-slate-500 dark:text-slate-400">Completed Runs</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{driver.totalDeliveries}</p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500">Verified handoffs</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
            <MapPin className="w-5 h-5 text-amber-500 dark:text-amber-400 mx-auto mb-1" />
            <p className="text-xs text-slate-500 dark:text-slate-400">Total Distance</p>
            <p className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">{((driver.milesLogged || 100000) / 1000).toFixed(0)}k km</p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500">Highway Logged</p>
          </div>
        </div>

        {/* Scorecard Detailed Factors */}
        <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 space-y-3.5">
          <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Telematics & Driving Behavior Factors
          </h4>

          {/* Factor 1 */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-700 dark:text-slate-300 font-medium">Speed Limit Adherence (GPS Telematics)</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">99.2%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '99.2%' }} />
            </div>
          </div>

          {/* Factor 2 */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-700 dark:text-slate-300 font-medium">Smooth Braking & Cornering Index</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">96.8%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '96.8%' }} />
            </div>
          </div>

          {/* Factor 3 */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-700 dark:text-slate-300 font-medium">Fuel / Energy Efficiency Compliance</span>
              <span className="text-purple-600 dark:text-purple-400 font-semibold">94.5%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: '94.5%' }} />
            </div>
          </div>

          {/* Factor 4 */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-700 dark:text-slate-300 font-medium">Hours of Service (HOS) Rest Compliance</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold">100%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-500 rounded-full" style={{ width: '100%' }} />
            </div>
          </div>
        </div>

        {/* Recent Delivery Log History */}
        <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Recent Operational Logs</h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm">
              <div>
                <span className="font-semibold text-slate-900 dark:text-white">Corridor: Mumbai Gateway → Pune Logistics Depot</span>
                <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">Automotive Industrial Assemblies • On-Time Verified</p>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
                On-Time 100%
              </span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm">
              <div>
                <span className="font-semibold text-slate-900 dark:text-white">Corridor: Ahmedabad SEZ → Nhava Sheva Port</span>
                <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">Heavy Freight Container • Handoff Signed</p>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
                Completed
              </span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
