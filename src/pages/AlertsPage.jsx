import React, { useState, useMemo } from 'react';
import { useFleet } from '../context/FleetContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { EmptyState } from '../components/common/EmptyState';
import { StatCard, AnimatedNumber } from '../components/common/StatCard';
import {
  Bell,
  CheckCheck,
  Trash2,
  AlertTriangle,
  AlertCircle,
  ShieldAlert,
  Flame,
  Activity,
  Info,
  Clock,
  ExternalLink,
  Filter,
  CheckCircle2,
  Truck,
  Package,
  Users,
  RotateCcw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AlertsPage = () => {
  const {
    alerts,
    markAlertAsRead,
    markAllAlertsRead,
    clearAlerts,
    restoreDefaultAlerts,
    setSelectedVehicleId
  } = useFleet();

  const navigate = useNavigate();

  const [categoryFilter, setCategoryFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [onlyUnread, setOnlyUnread] = useState(false);

  const categories = [
    { id: 'all', label: 'All Alerts' },
    { id: 'Shipment', label: 'Delayed Shipments' },
    { id: 'Vehicle', label: 'Vehicle Maintenance' },
    { id: 'Delivery', label: 'Delivery Updates' },
    { id: 'Driver', label: 'Driver Status' }
  ];

  const filteredAlerts = useMemo(() => {
    return alerts.filter(a => {
      const matchesCategory = categoryFilter === 'all' || a.category === categoryFilter;
      const matchesSeverity = severityFilter === 'all' || a.severity === severityFilter;
      const matchesUnread = !onlyUnread || !a.read;
      return matchesCategory && matchesSeverity && matchesUnread;
    });
  }, [alerts, categoryFilter, severityFilter, onlyUnread]);

  const unreadCount = alerts.filter(a => !a.read).length;
  const criticalCount = alerts.filter(a => a.severity === 'critical').length;
  const warningCount = alerts.filter(a => a.severity === 'warning').length;
  const infoCount = alerts.filter(a => a.severity === 'info').length;

  const handleResolveAction = (alert) => {
    markAlertAsRead(alert.id);
    if (alert.category === 'Shipment') {
      navigate('/shipments');
    } else if (alert.category === 'Vehicle') {
      setSelectedVehicleId(alert.relatedEntityId);
      navigate('/vehicles');
    } else if (alert.category === 'Driver') {
      navigate('/drivers');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Bell className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            Alerts & Incident Operations Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Real-time telemetry event alerts, highway delay notices, vehicle maintenance warnings, and compliance notifications.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={restoreDefaultAlerts}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-md shadow-purple-600/25 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Restore 6 Alerts
          </button>

          {unreadCount > 0 && (
            <button
              onClick={markAllAlertsRead}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
            >
              <CheckCheck className="w-4 h-4 text-emerald-400" />
              Mark All as Read
            </button>
          )}

          {alerts.length > 0 && (
            <button
              onClick={clearAlerts}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-500/30 transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4 text-rose-400" />
              Clear Log
            </button>
          )}
        </div>
      </div>

      {/* Cyber Command Center Incident Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3.5 md:gap-4 xl:gap-4">
        {/* Card 1: Active Incidents */}
        <div
          onClick={() => {
            setCategoryFilter('all');
            setSeverityFilter('all');
            setOnlyUnread(false);
          }}
          className={`group relative overflow-hidden rounded-2xl bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl p-3.5 sm:p-4 md:p-3.5 lg:p-4 xl:p-5 border transition-all duration-300 ease-out cursor-pointer shadow-sm hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 flex flex-col justify-between h-full ${
            severityFilter === 'all' && !onlyUnread
              ? 'border-purple-500 ring-2 ring-purple-500/30 dark:ring-purple-500/40'
              : 'border-slate-200/90 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-500/50'
          }`}
        >
          {/* Top Cyber Laser Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 opacity-90 group-hover:h-2 transition-all duration-300" />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/8 via-fuchsia-500/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="relative z-10 flex flex-col justify-between h-full space-y-2">
            <div className="flex items-start justify-between gap-1.5 md:gap-2">
              <div className="flex items-center gap-1.5 flex-1 min-h-[2.25rem] md:min-h-[2.5rem]">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
                </span>
                <p className="text-[10px] sm:text-[10.5px] md:text-[10px] lg:text-[10.5px] xl:text-[11px] font-black uppercase tracking-wider text-purple-700 dark:text-purple-300 leading-snug line-clamp-2">
                  Active Incidents
                </p>
              </div>

              <div className="p-2 sm:p-2 md:p-2 lg:p-2.5 xl:p-3 rounded-xl xl:rounded-2xl bg-purple-100 text-purple-700 border border-purple-200/90 shadow-sm shadow-purple-500/20 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shrink-0">
                <Activity className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-4 md:h-4 lg:w-4.5 lg:h-4.5 xl:w-5 xl:h-5" />
              </div>
            </div>

            <div className="flex items-center justify-between gap-1.5 min-h-[2.25rem] md:min-h-[2.5rem]">
              <span className="text-2xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl font-black text-slate-900 dark:text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-fuchsia-600 transition-colors shrink-0">
                <AnimatedNumber value={alerts.length} duration={1100} />
              </span>
              <span className="text-[10px] md:text-[10px] lg:text-[11px] font-semibold text-slate-500 dark:text-slate-400 shrink-0">
                Total Telemetry
              </span>
            </div>

            <div className="relative z-10 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-1 min-h-[2rem] md:min-h-[2.25rem] text-[9.5px] sm:text-[10px]">
              <span className="px-1.5 py-0.5 rounded-md font-bold bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200/60 dark:border-rose-900/40 shrink-0 whitespace-nowrap">
                {criticalCount} Critical
              </span>
              <span className="px-1.5 py-0.5 rounded-md font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200/60 dark:border-amber-900/40 shrink-0 whitespace-nowrap">
                {warningCount} Warning
              </span>
              <span className="px-1.5 py-0.5 rounded-md font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/40 shrink-0 whitespace-nowrap">
                {infoCount} Info
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Critical Priority */}
        <div
          onClick={() => {
            setSeverityFilter('critical');
            setOnlyUnread(false);
          }}
          className={`group relative overflow-hidden rounded-2xl bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl p-3.5 sm:p-4 md:p-3.5 lg:p-4 xl:p-5 border transition-all duration-300 ease-out cursor-pointer shadow-sm hover:shadow-xl hover:shadow-rose-500/15 hover:-translate-y-1 flex flex-col justify-between h-full ${
            severityFilter === 'critical'
              ? 'border-rose-500 ring-2 ring-rose-500/30 dark:ring-rose-500/40'
              : 'border-slate-200/90 dark:border-slate-800 hover:border-rose-300 dark:hover:border-rose-500/50'
          }`}
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 opacity-90 group-hover:h-2 transition-all duration-300" />
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/8 via-pink-500/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="relative z-10 flex flex-col justify-between h-full space-y-2">
            <div className="flex items-start justify-between gap-1.5 md:gap-2">
              <div className="flex items-center gap-1.5 flex-1 min-h-[2.25rem] md:min-h-[2.5rem]">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-90" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
                </span>
                <p className="text-[10px] sm:text-[10.5px] md:text-[10px] lg:text-[10.5px] xl:text-[11px] font-black uppercase tracking-wider text-rose-700 dark:text-rose-400 leading-snug line-clamp-2">
                  Critical Priority
                </p>
              </div>

              <div className="relative shrink-0">
                <div className="p-2 sm:p-2 md:p-2 lg:p-2.5 xl:p-3 rounded-xl xl:rounded-2xl bg-rose-100 text-rose-800 border border-rose-200/90 shadow-sm shadow-rose-500/20 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Flame className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-4 md:h-4 lg:w-4.5 lg:h-4.5 xl:w-5 xl:h-5 text-rose-600 dark:text-rose-400" />
                </div>
                {criticalCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between gap-1.5 min-h-[2.25rem] md:min-h-[2.5rem]">
              <span className="text-2xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl font-black text-rose-600 dark:text-rose-400 tracking-tight shrink-0">
                <AnimatedNumber value={criticalCount} duration={1100} />
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 md:px-1.5 lg:px-2 py-0.5 rounded-full text-[9px] sm:text-[9.5px] md:text-[9.5px] lg:text-[10px] font-extrabold uppercase bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30 animate-pulse shrink-0 whitespace-nowrap">
                Immediate SLA
              </span>
            </div>

            <div className="relative z-10 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-1 min-h-[2rem] md:min-h-[2.25rem] text-[10.5px] md:text-[10px] lg:text-[11px]">
              <span className="text-slate-600 dark:text-slate-400 font-medium truncate flex-1 min-w-0 mr-1">
                Requires instant dispatch
              </span>
              <span className="font-mono text-[9px] md:text-[9px] lg:text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase px-1.5 py-0.5 rounded bg-rose-50 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-900/40 shrink-0 whitespace-nowrap">
                P1 Urgent
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Warning Advisories */}
        <div
          onClick={() => {
            setSeverityFilter('warning');
            setOnlyUnread(false);
          }}
          className={`group relative overflow-hidden rounded-2xl bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl p-3.5 sm:p-4 md:p-3.5 lg:p-4 xl:p-5 border transition-all duration-300 ease-out cursor-pointer shadow-sm hover:shadow-xl hover:shadow-amber-500/15 hover:-translate-y-1 flex flex-col justify-between h-full ${
            severityFilter === 'warning'
              ? 'border-amber-500 ring-2 ring-amber-500/30 dark:ring-amber-500/40'
              : 'border-slate-200/90 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-500/50'
          }`}
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 opacity-90 group-hover:h-2 transition-all duration-300" />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/8 via-orange-500/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="relative z-10 flex flex-col justify-between h-full space-y-2">
            <div className="flex items-start justify-between gap-1.5 md:gap-2">
              <div className="flex items-center gap-1.5 flex-1 min-h-[2.25rem] md:min-h-[2.5rem]">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                </span>
                <p className="text-[10px] sm:text-[10.5px] md:text-[10px] lg:text-[10.5px] xl:text-[11px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-400 leading-snug line-clamp-2">
                  Warning Advisories
                </p>
              </div>

              <div className="p-2 sm:p-2 md:p-2 lg:p-2.5 xl:p-3 rounded-xl xl:rounded-2xl bg-amber-100 text-amber-800 border border-amber-200/90 shadow-sm shadow-amber-500/20 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shrink-0">
                <ShieldAlert className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-4 md:h-4 lg:w-4.5 lg:h-4.5 xl:w-5 xl:h-5 text-amber-600 dark:text-amber-400" />
              </div>
            </div>

            <div className="flex items-center justify-between gap-1.5 min-h-[2.25rem] md:min-h-[2.5rem]">
              <span className="text-2xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl font-black text-amber-600 dark:text-amber-400 tracking-tight shrink-0">
                <AnimatedNumber value={warningCount} duration={1100} />
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 md:px-1.5 lg:px-2 py-0.5 rounded-full text-[9px] sm:text-[9.5px] md:text-[9.5px] lg:text-[10px] font-bold uppercase bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30 shrink-0 whitespace-nowrap">
                Threshold Watch
              </span>
            </div>

            <div className="relative z-10 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-1 min-h-[2rem] md:min-h-[2.25rem] text-[10.5px] md:text-[10px] lg:text-[11px]">
              <span className="text-slate-600 dark:text-slate-400 font-medium truncate flex-1 min-w-0 mr-1">
                Telemetry threshold alerts
              </span>
              <span className="font-mono text-[9px] md:text-[9px] lg:text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/40 shrink-0 whitespace-nowrap">
                P2 Caution
              </span>
            </div>
          </div>
        </div>

        {/* Card 4: Unread Items */}
        <div
          onClick={() => {
            setOnlyUnread(!onlyUnread);
            setSeverityFilter('all');
          }}
          className={`group relative overflow-hidden rounded-2xl bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl p-3.5 sm:p-4 md:p-3.5 lg:p-4 xl:p-5 border transition-all duration-300 ease-out cursor-pointer shadow-sm hover:shadow-xl hover:shadow-cyan-500/15 hover:-translate-y-1 flex flex-col justify-between h-full ${
            onlyUnread
              ? 'border-cyan-500 ring-2 ring-cyan-500/30 dark:ring-cyan-500/40'
              : 'border-slate-200/90 dark:border-slate-800 hover:border-cyan-300 dark:hover:border-cyan-500/50'
          }`}
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 opacity-90 group-hover:h-2 transition-all duration-300" />
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/8 via-blue-500/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="relative z-10 flex flex-col justify-between h-full space-y-2">
            <div className="flex items-start justify-between gap-1.5 md:gap-2">
              <div className="flex items-center gap-1.5 flex-1 min-h-[2.25rem] md:min-h-[2.5rem]">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
                </span>
                <p className="text-[10px] sm:text-[10.5px] md:text-[10px] lg:text-[10.5px] xl:text-[11px] font-black uppercase tracking-wider text-cyan-700 dark:text-cyan-400 leading-snug line-clamp-2">
                  Unread Items
                </p>
              </div>

              <div className="p-2 sm:p-2 md:p-2 lg:p-2.5 xl:p-3 rounded-xl xl:rounded-2xl bg-cyan-100 text-cyan-800 border border-cyan-200/90 shadow-sm shadow-cyan-500/20 dark:bg-cyan-500/20 dark:text-cyan-300 dark:border-cyan-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shrink-0">
                <Bell className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-4 md:h-4 lg:w-4.5 lg:h-4.5 xl:w-5 xl:h-5 text-cyan-600 dark:text-cyan-400" />
              </div>
            </div>

            <div className="flex items-center justify-between gap-1.5 min-h-[2.25rem] md:min-h-[2.5rem]">
              <span className="text-2xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl font-black text-cyan-600 dark:text-cyan-400 tracking-tight shrink-0">
                <AnimatedNumber value={unreadCount} duration={1100} />
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 md:px-1.5 lg:px-2 py-0.5 rounded-full text-[9px] sm:text-[9.5px] md:text-[9.5px] lg:text-[10px] font-bold uppercase bg-cyan-100 text-cyan-800 dark:bg-cyan-500/20 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/30 shrink-0 whitespace-nowrap">
                Action Queue
              </span>
            </div>

            <div className="relative z-10 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-1 min-h-[2rem] md:min-h-[2.25rem] text-[10.5px] md:text-[10px] lg:text-[11px]">
              <span className="text-slate-600 dark:text-slate-400 font-medium truncate flex-1 min-w-0 mr-1">
                Pending operator review
              </span>
              <span className="font-mono text-[9px] md:text-[9px] lg:text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase px-1.5 py-0.5 rounded bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200/60 dark:border-cyan-900/40 shrink-0 whitespace-nowrap">
                {unreadCount > 0 ? `${unreadCount} New` : 'All Clear'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Categories & Filter Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl backdrop-blur-md space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto overscroll-contain pb-1 text-xs">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  categoryFilter === cat.id
                    ? 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white shadow-md shadow-purple-600/25'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800/80 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Severity & Unread Filter */}
          <div className="flex items-center gap-2">
            <select
              value={severityFilter}
              onChange={e => setSeverityFilter(e.target.value)}
              className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 cursor-pointer shadow-sm"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="warning">Warning</option>
              <option value="info">Informational</option>
            </select>

            <button
              onClick={() => setOnlyUnread(!onlyUnread)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer shadow-sm ${
                onlyUnread
                  ? 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-600/20 dark:text-purple-300 dark:border-purple-500/40'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              Unread Only
            </button>
          </div>
        </div>
      </div>

      {/* Alerts Feed */}
      {filteredAlerts.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {alerts.length === 0 ? 'Alerts Log Cleared' : 'All Clear — No Matching Alerts'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mt-1 mb-4">
            {alerts.length === 0
              ? 'Alerts log was cleared. You can instantly restore the 6 live telemetry alerts anytime.'
              : 'There are currently no active warnings or incidents matching your chosen filters.'}
          </p>
          {alerts.length === 0 ? (
            <button
              onClick={restoreDefaultAlerts}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Restore 6 Live Telemetry Alerts
            </button>
          ) : (
            <button
              onClick={() => {
                setCategoryFilter('all');
                setSeverityFilter('all');
                setOnlyUnread(false);
              }}
              className="text-xs text-purple-600 dark:text-purple-400 font-semibold hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredAlerts.map(alert => {
            const isCrit = alert.severity === 'critical';
            const isWarn = alert.severity === 'warning';

            return (
              <div
                key={alert.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm ${
                  !alert.read ? 'ring-1 ring-purple-500/30' : ''
                } ${
                  isCrit
                    ? 'bg-rose-50/90 border-rose-200 hover:border-rose-300 dark:bg-rose-950/20 dark:border-rose-500/40 dark:hover:border-rose-500/60'
                    : isWarn
                    ? 'bg-amber-50/90 border-amber-200 hover:border-amber-300 dark:bg-amber-950/20 dark:border-amber-500/40 dark:hover:border-amber-500/60'
                    : 'bg-white border-slate-200 hover:border-slate-300 dark:bg-slate-900/90 dark:border-slate-800 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-2xl shrink-0 border ${
                    isCrit ? 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-500/20 dark:text-rose-400 dark:border-rose-500/30' :
                    isWarn ? 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30' :
                    'bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-500/20 dark:text-cyan-400 dark:border-cyan-500/30'
                  }`}>
                    {isCrit && <AlertCircle className="w-6 h-6" />}
                    {isWarn && <AlertTriangle className="w-6 h-6" />}
                    {!isCrit && !isWarn && <Info className="w-6 h-6" />}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400">{alert.id}</span>
                      <StatusBadge status={alert.severity} size="sm" />
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
                        {alert.category}
                      </span>
                      {!alert.read && (
                        <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
                      )}
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                      {alert.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
                      {alert.message}
                    </p>

                    <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{alert.timestamp}</span>
                      {alert.relatedEntityId && (
                        <>
                          <span>•</span>
                          <span>Entity Ref: <strong className="text-slate-700 dark:text-slate-300 font-semibold">{alert.relatedEntityId}</strong></span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Action buttons */}
                <div className="flex items-center gap-2 shrink-0 md:flex-col md:items-end">
                  {!alert.read && (
                    <button
                      onClick={() => markAlertAsRead(alert.id)}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 shadow-sm dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 dark:border-slate-700 transition-colors cursor-pointer"
                    >
                      Acknowledge
                    </button>
                  )}
                  <button
                    onClick={() => handleResolveAction(alert)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:opacity-95 text-white transition-all cursor-pointer shadow-md shadow-purple-600/25"
                  >
                    <span>Investigate</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
