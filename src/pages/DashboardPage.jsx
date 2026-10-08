import React, { useState } from 'react';
import { useFleet } from '../context/FleetContext';
import { StatCard } from '../components/common/StatCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { VehicleModal } from '../components/vehicles/VehicleModal';
import { ShipmentModal } from '../components/shipments/ShipmentModal';
import { ShipmentTimeline } from '../components/shipments/ShipmentTimeline';
import {
  Truck,
  Users,
  Package,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Plus,
  ArrowRight,
  TrendingUp,
  MapPin,
  Activity,
  Compass,
  Radio,
  ExternalLink
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Link, useNavigate } from 'react-router-dom';

export const DashboardPage = () => {
  const {
    vehicles,
    drivers,
    shipments,
    alerts,
    metrics,
    loading,
    activeShipmentsCount,
    deliveredShipmentsCount,
    delayedShipmentsCount,
    inTransitVehiclesCount,
    setSelectedVehicleId
  } = useFleet();

  const navigate = useNavigate();

  // Modals state
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [isShipmentModalOpen, setIsShipmentModalOpen] = useState(false);
  const [timelineShipment, setTimelineShipment] = useState(null);

  // Mock weekly trends for rich visual analytics
  const weeklyPerformanceData = [
    { day: 'Mon', onTime: 98, delivered: 42, delayed: 1 },
    { day: 'Tue', onTime: 95, delivered: 56, delayed: 3 },
    { day: 'Wed', onTime: 97, delivered: 49, delayed: 2 },
    { day: 'Thu', onTime: 94, delivered: 61, delayed: 4 },
    { day: 'Fri', onTime: 98, delivered: 70, delayed: 1 },
    { day: 'Sat', onTime: 99, delivered: 38, delayed: 0 },
    { day: 'Sun', onTime: 96, delivered: 29, delayed: 1 }
  ];

  // Fleet Status Distribution for Pie Chart
  const idleCount = vehicles.filter(v => v.status === 'idle').length;
  const maintenanceCount = vehicles.filter(v => v.status === 'maintenance').length;
  const transitCount = inTransitVehiclesCount;

  const fleetStatusData = [
    { name: 'In Transit', value: transitCount, color: '#10B981' },
    { name: 'Idle / Ready', value: idleCount, color: '#3B82F6' },
    { name: 'Maintenance', value: maintenanceCount, color: '#F59E0B' }
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton type="card" />
        <LoadingSkeleton rows={6} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Welcome & Quick Actions Bar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 p-6 rounded-3xl shadow-xl transition-all duration-300 bg-gradient-to-r from-purple-50/90 via-white to-pink-50/80 dark:from-slate-900 dark:via-purple-950/40 dark:to-slate-900 border border-purple-100 dark:border-purple-900/40">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold border bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/30">
              Live Operations Control
            </span>
            <span className="text-slate-400 dark:text-slate-500">•</span>
            <span className="text-xs font-mono text-slate-600 dark:text-slate-400">Mumbai Central Freight Dispatch Hub</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Logistics & Fleet Command Center
          </h1>
          <p className="text-xs sm:text-sm mt-1 max-w-xl text-slate-600 dark:text-slate-300">
            Real-time telematics oversight, dynamic driver routing, active shipments, and automated vehicle health intelligence.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 pt-1 xl:pt-0">
          <button
            onClick={() => setIsShipmentModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-semibold text-xs tracking-wide shadow-lg shadow-purple-600/25 hover:opacity-95 transition-all cursor-pointer bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600"
          >
            <Package className="w-4 h-4" />
            Shipment Dispatch
          </button>
          <button
            onClick={() => setIsVehicleModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs border transition-all cursor-pointer bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-700"
          >
            <Plus className="w-4 h-4" />
            Add Vehicle
          </button>
          <Link
            to="/tracking"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs border transition-all cursor-pointer bg-purple-100 hover:bg-purple-200 text-purple-700 border-purple-200 dark:bg-cyan-500/10 dark:hover:bg-cyan-500/20 dark:text-cyan-300 dark:border-cyan-500/30"
          >
            <MapPin className="w-4 h-4" />
            Live Map Radar
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3.5 md:gap-4 xl:gap-4">
        <StatCard
          title="Total Fleet Assets"
          value={vehicles.length}
          subtext={`${inTransitVehiclesCount} currently en route`}
          change="+8.4%"
          isPositive={true}
          icon={Truck}
          colorScheme="violet"
          onClick={() => navigate('/vehicles')}
        />

        <StatCard
          title="Active Commercial Drivers"
          value={drivers.length}
          subtext={`${drivers.filter(d => d.status === 'on-route').length} on duty`}
          change="+4.2%"
          isPositive={true}
          icon={Users}
          colorScheme="cyan"
          onClick={() => navigate('/drivers')}
        />

        <StatCard
          title="Active Shipments"
          value={activeShipmentsCount}
          subtext={`${deliveredShipmentsCount} delivered today`}
          change="+12.5%"
          isPositive={true}
          icon={Package}
          colorScheme="emerald"
          onClick={() => navigate('/shipments')}
        />

        <StatCard
          title="Delayed Shipments"
          value={delayedShipmentsCount}
          subtext={delayedShipmentsCount > 0 ? "Requires dispatcher attention" : "All shipments on schedule"}
          change={delayedShipmentsCount > 0 ? "Active alert" : "0 alerts"}
          isPositive={delayedShipmentsCount === 0}
          icon={AlertTriangle}
          colorScheme={delayedShipmentsCount > 0 ? "rose" : "emerald"}
          onClick={() => navigate('/alerts')}
        />
      </div>

      {/* Analytics & Fleet Health Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Weekly Delivery Volume & Timeliness (2 Cols on desktop) */}
        <div className="xl:col-span-2 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-2">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                Delivery Performance Statistics
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Shipment volume vs 96.4% on-time benchmark SLA</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <span className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 shadow-sm" />
                Delivered
              </span>
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <span className="w-3 h-3 rounded-full bg-pink-500" />
                On-Time Rate %
              </span>
            </div>
          </div>

          <div className="h-64 mt-4 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyPerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="deliveryBarGradient" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#9333ea" />
                    <stop offset="50%" stopColor="#c026d3" />
                    <stop offset="100%" stopColor="#db2777" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.6} />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1c1230',
                    borderColor: '#352159',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="delivered" fill="url(#deliveryBarGradient)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fleet Distribution & Utilization Donut */}
        <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                Fleet Utilization
              </h2>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                {metrics.fleetUtilizationRate}%
              </span>
            </div>

            <div className="h-48 relative flex items-center justify-center mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={fleetStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {fleetStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1c1230',
                      borderColor: '#352159',
                      borderRadius: '0.5rem',
                      color: '#fff',
                      fontSize: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black text-slate-900 dark:text-white">{vehicles.length}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Total Units</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs">
            {fleetStatusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-600 dark:text-slate-300">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">{item.value} units</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real-Time Live Shipments & Operations Alert Center */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Active In-Transit Shipments (2 cols on desktop) */}
        <div className="xl:col-span-2 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Radio className="w-4 h-4 text-purple-600 dark:text-cyan-400 animate-pulse" />
                Live Dispatched Shipments
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Active priority freight currently en route to consignees</p>
            </div>
            <Link
              to="/shipments"
              className="text-xs text-purple-600 dark:text-purple-400 hover:opacity-80 font-semibold flex items-center gap-1 transition-colors"
            >
              All Shipments <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800/60 mt-2">
            {shipments.slice(0, 4).map((shipment) => (
              <div
                key={shipment.id}
                onClick={() => setTimelineShipment(shipment)}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 p-2 rounded-xl transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 dark:bg-slate-800 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors shrink-0">
                    <Package className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                        {shipment.id}
                      </span>
                      <StatusBadge status={shipment.status} size="sm" />
                      <StatusBadge status={shipment.priority} size="sm" />
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-medium mt-0.5">{shipment.customer}</p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      <span>{shipment.origin.city}</span>
                      <ArrowRight className="w-3 h-3 text-slate-400 dark:text-slate-600" />
                      <span className="text-slate-800 dark:text-slate-200">{shipment.destination.city}</span>
                    </div>
                  </div>
                </div>

                <div className="sm:text-right min-w-[130px]">
                  <p className="text-xs text-slate-500 dark:text-slate-400">ETA: <strong className="text-slate-900 dark:text-white">{shipment.eta}</strong></p>
                  <div className="flex items-center gap-2 mt-1 sm:justify-end">
                    <div className="w-24 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${shipment.status === 'delayed' ? 'bg-rose-500' : 'bg-purple-500'}`}
                        style={{ width: `${shipment.currentProgressPercent}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">{shipment.currentProgressPercent}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Alerts & Incidents Feed */}
        <div className="xl:col-span-1 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                Fleet Incident Alerts
              </h2>
              <Link
                to="/alerts"
                className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold"
              >
                View All ({alerts.length})
              </Link>
            </div>

            <div className="space-y-3 md:grid md:grid-cols-2 md:space-y-0 md:gap-3 xl:block xl:space-y-3 mt-4">
              {alerts.slice(0, 4).map((alert) => {
                const isCrit = alert.severity === 'critical';
                const isWarn = alert.severity === 'warning';

                return (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-2xl border transition-all text-xs ${
                      isCrit
                        ? 'bg-rose-50/90 border-rose-200 text-rose-900 dark:bg-rose-500/10 dark:border-rose-500/30 dark:text-rose-300'
                        : isWarn
                        ? 'bg-amber-50/90 border-amber-200 text-amber-900 dark:bg-amber-500/10 dark:border-amber-500/30 dark:text-amber-300'
                        : 'bg-slate-50 border-slate-200 text-slate-900 dark:bg-slate-950/60 dark:border-slate-800 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1 gap-2">
                      <span className="font-bold flex items-center gap-1.5 min-w-0 flex-1">
                        <StatusBadge status={alert.severity} size="sm" />
                        <span className="truncate">{alert.title}</span>
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 shrink-0">{alert.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 mt-1">{alert.message}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4 text-center">
            <Link
              to="/alerts"
              className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold inline-flex items-center gap-1.5"
            >
              Open Full Incident Operations Center
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Modals */}
      <VehicleModal
        isOpen={isVehicleModalOpen}
        onClose={() => setIsVehicleModalOpen(false)}
      />

      <ShipmentModal
        isOpen={isShipmentModalOpen}
        onClose={() => setIsShipmentModalOpen(false)}
      />

      <ShipmentTimeline
        isOpen={Boolean(timelineShipment)}
        onClose={() => setTimelineShipment(null)}
        shipment={timelineShipment}
      />
    </div>
  );
};
