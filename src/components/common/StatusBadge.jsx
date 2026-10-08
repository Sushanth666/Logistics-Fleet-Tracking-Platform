import React from 'react';

export const StatusBadge = ({ status, type = 'general', size = 'md' }) => {
  const getBadgeConfig = () => {
    const s = String(status).toLowerCase();
    
    // Vehicle & Driver Statuses
    if (s === 'in-transit' || s === 'on-route') {
      return {
        label: s === 'on-route' ? 'On Route' : 'In Transit',
        bg: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30',
        dot: 'bg-emerald-500 dark:bg-emerald-400 animate-pulse'
      };
    }
    if (s === 'available' || s === 'idle') {
      return {
        label: s === 'available' ? 'Available' : 'Idle / Standby',
        bg: 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/30',
        dot: 'bg-blue-500 dark:bg-blue-400'
      };
    }
    if (s === 'maintenance') {
      return {
        label: 'In Maintenance',
        bg: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/30',
        dot: 'bg-amber-500 dark:bg-amber-400'
      };
    }
    if (s === 'out-of-service' || s === 'off-duty') {
      return {
        label: s === 'off-duty' ? 'Off Duty' : 'Out of Service',
        bg: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-500/10 dark:text-slate-400 dark:border-slate-500/30',
        dot: 'bg-slate-400'
      };
    }
    if (s === 'on-break') {
      return {
        label: 'On Break',
        bg: 'bg-cyan-50 text-cyan-800 border-cyan-200 dark:bg-cyan-500/10 dark:text-cyan-400 dark:border-cyan-500/30',
        dot: 'bg-cyan-500 dark:bg-cyan-400'
      };
    }

    // Shipment Statuses
    if (s === 'delivered') {
      return {
        label: 'Delivered',
        bg: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30',
        dot: 'bg-emerald-500 dark:bg-emerald-400'
      };
    }
    if (s === 'delayed') {
      return {
        label: 'Delayed',
        bg: 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/30',
        dot: 'bg-rose-500 dark:bg-rose-400 animate-ping'
      };
    }
    if (s === 'dispatched') {
      return {
        label: 'Dispatched',
        bg: 'bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-500/10 dark:text-purple-300 dark:border-purple-500/30',
        dot: 'bg-purple-500 dark:bg-purple-400'
      };
    }
    if (s === 'pending') {
      return {
        label: 'Pending Dispatch',
        bg: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30',
        dot: 'bg-amber-500 dark:bg-amber-400'
      };
    }

    // Severity / Priority
    if (s === 'urgent' || s === 'critical') {
      return {
        label: s.toUpperCase(),
        bg: 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-500/15 dark:text-rose-400 dark:border-rose-500/40 font-bold',
        dot: 'bg-rose-600 dark:bg-rose-400 animate-pulse'
      };
    }
    if (s === 'high' || s === 'warning') {
      return {
        label: s.toUpperCase(),
        bg: 'bg-amber-100 text-amber-900 border-amber-200 dark:bg-amber-500/15 dark:text-amber-400 dark:border-amber-500/40 font-bold',
        dot: 'bg-amber-600 dark:bg-amber-400'
      };
    }
    if (s === 'normal' || s === 'info') {
      return {
        label: s.toUpperCase(),
        bg: 'bg-cyan-50 text-cyan-800 border-cyan-200 dark:bg-cyan-500/10 dark:text-cyan-400 dark:border-cyan-500/30 font-semibold',
        dot: 'bg-cyan-500 dark:bg-cyan-400'
      };
    }

    return {
      label: status,
      bg: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-700/30 dark:text-slate-300 dark:border-slate-600/30',
      dot: 'bg-slate-400'
    };
  };

  const { label, bg, dot } = getBadgeConfig();
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border shadow-xs ${bg} ${sizeClasses} transition-all`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      <span className="font-semibold tracking-wide">{label}</span>
    </span>
  );
};
