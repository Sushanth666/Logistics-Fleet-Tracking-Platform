import React from 'react';
import { Modal } from '../common/Modal';
import { StatusBadge } from '../common/StatusBadge';
import {
  Package,
  MapPin,
  Clock,
  Truck,
  User,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const ShipmentTimeline = ({ isOpen, onClose, shipment }) => {
  if (!shipment) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Live Shipment Tracking: ${shipment.id}`}
      subtitle={`Customer: ${shipment.customer} • Priority: ${shipment.priority.toUpperCase()}`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Status header & progress bar */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">Current Status</p>
              <div className="mt-1">
                <StatusBadge status={shipment.status} size="md" />
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs text-slate-400">Estimated Delivery</p>
              <p className="text-sm font-bold text-white mt-0.5">{shipment.eta}</p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
              <span>Delivery Journey</span>
              <span className="font-semibold text-white">{shipment.currentProgressPercent}% Complete</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  shipment.status === 'delayed'
                    ? 'bg-rose-500'
                    : 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600'
                }`}
                style={{ width: `${shipment.currentProgressPercent}%` }}
              />
            </div>
          </div>

          {shipment.delayReason && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              <div>
                <strong className="font-semibold block">Delay Incident Reported:</strong>
                {shipment.delayReason}
              </div>
            </div>
          )}
        </div>

        {/* Origin to Destination */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800">
            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase mb-1">
              <MapPin className="w-4 h-4" />
              Pickup Origin
            </div>
            <p className="text-base font-bold text-white">{shipment.origin.city}</p>
            <p className="text-xs text-slate-400 mt-0.5">{shipment.origin.address}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase mb-1">
              <MapPin className="w-4 h-4" />
              Destination Consignee
            </div>
            <p className="text-base font-bold text-white">{shipment.destination.city}</p>
            <p className="text-xs text-slate-400 mt-0.5">{shipment.destination.address}</p>
          </div>
        </div>

        {/* Vehicle & Driver assignment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950/40 border border-slate-800 text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-slate-400">Assigned Vehicle</p>
              <p className="font-bold text-white text-sm">{shipment.assignedVehiclePlate || 'Unassigned'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20">
              <User className="w-4 h-4" />
            </div>
            <div>
              <p className="text-slate-400">Dispatched Driver</p>
              <p className="font-bold text-white text-sm">{shipment.assignedDriverName || 'Unassigned'}</p>
            </div>
          </div>
        </div>

        {/* Milestone Events Timeline */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Milestone Timeline & Checkpoints</h4>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
            {(shipment.events || []).map((event, index) => {
              const isCompleted = event.status === 'completed';
              const isAlert = event.status === 'alert';

              return (
                <div key={index} className="relative flex items-start gap-4">
                  {/* Dot */}
                  <span
                    className={`absolute -left-6 top-1 w-4 h-4 rounded-full border-2 border-slate-900 ${
                      isAlert
                        ? 'bg-rose-500 ring-4 ring-rose-500/20'
                        : isCompleted
                        ? 'bg-emerald-500 ring-4 ring-emerald-500/20'
                        : 'bg-slate-700'
                    }`}
                  />

                  <div className="flex-1">
                    <div className="flex items-baseline justify-between">
                      <p className={`text-sm font-semibold ${isAlert ? 'text-rose-400' : isCompleted ? 'text-white' : 'text-slate-400'}`}>
                        {event.title}
                      </p>
                      <span className="text-[11px] font-mono text-slate-500">{event.timestamp}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
};
