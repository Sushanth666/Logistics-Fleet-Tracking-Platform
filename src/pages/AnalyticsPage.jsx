import React, { useState } from 'react';
import { useFleet } from '../context/FleetContext';
import { StatCard } from '../components/common/StatCard';
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  Fuel,
  ShieldCheck,
  Truck,
  Leaf,
  Clock,
  Calendar
} from 'lucide-react';

export const AnalyticsPage = () => {
  const { metrics, vehicles, drivers, shipments } = useFleet();
  const [timeframe, setTimeframe] = useState('7d'); // '7d' | '30d' | '90d'

  // ---------- DATA SETS PER PERIOD ----------

  const allDeliveryTrends = {
    '7d': [
      { period: 'Mon', onTimeCount: 42, delayedCount: 2 },
      { period: 'Tue', onTimeCount: 54, delayedCount: 3 },
      { period: 'Wed', onTimeCount: 61, delayedCount: 1 },
      { period: 'Thu', onTimeCount: 58, delayedCount: 4 },
      { period: 'Fri', onTimeCount: 72, delayedCount: 2 },
      { period: 'Sat', onTimeCount: 39, delayedCount: 0 },
      { period: 'Sun', onTimeCount: 31, delayedCount: 1 }
    ],
    '30d': [
      { period: 'Wk 1', onTimeCount: 280, delayedCount: 14 },
      { period: 'Wk 2', onTimeCount: 315, delayedCount: 9 },
      { period: 'Wk 3', onTimeCount: 298, delayedCount: 18 },
      { period: 'Wk 4', onTimeCount: 340, delayedCount: 7 }
    ],
    '90d': [
      { period: 'Jul', onTimeCount: 1140, delayedCount: 52 },
      { period: 'Aug', onTimeCount: 1280, delayedCount: 38 },
      { period: 'Sep', onTimeCount: 1350, delayedCount: 29 }
    ]
  };

  const allFuelData = {
    '7d': [
      { period: 'Mon', idleFuelLtr: 52, electricKwh: 120 },
      { period: 'Tue', idleFuelLtr: 45, electricKwh: 145 },
      { period: 'Wed', idleFuelLtr: 38, electricKwh: 160 },
      { period: 'Thu', idleFuelLtr: 56, electricKwh: 150 },
      { period: 'Fri', idleFuelLtr: 34, electricKwh: 190 },
      { period: 'Sat', idleFuelLtr: 28, electricKwh: 110 },
      { period: 'Sun', idleFuelLtr: 24, electricKwh: 95 }
    ],
    '30d': [
      { period: 'Wk 1', idleFuelLtr: 310, electricKwh: 820 },
      { period: 'Wk 2', idleFuelLtr: 278, electricKwh: 905 },
      { period: 'Wk 3', idleFuelLtr: 295, electricKwh: 870 },
      { period: 'Wk 4', idleFuelLtr: 241, electricKwh: 960 }
    ],
    '90d': [
      { period: 'Jul', idleFuelLtr: 1240, electricKwh: 3480 },
      { period: 'Aug', idleFuelLtr: 1110, electricKwh: 3820 },
      { period: 'Sep', idleFuelLtr: 980,  electricKwh: 4150 }
    ]
  };

  const allHubData = {
    '7d': [
      { hub: 'Mumbai', outbound: 85, inbound: 92 },
      { hub: 'Delhi NCR', outbound: 64, inbound: 70 },
      { hub: 'Bengaluru', outbound: 78, inbound: 81 },
      { hub: 'Chennai', outbound: 45, inbound: 48 },
      { hub: 'Kolkata', outbound: 96, inbound: 104 },
      { hub: 'Hyderabad', outbound: 52, inbound: 55 }
    ],
    '30d': [
      { hub: 'Mumbai', outbound: 340, inbound: 368 },
      { hub: 'Delhi NCR', outbound: 256, inbound: 280 },
      { hub: 'Bengaluru', outbound: 312, inbound: 324 },
      { hub: 'Chennai', outbound: 180, inbound: 192 },
      { hub: 'Kolkata', outbound: 384, inbound: 416 },
      { hub: 'Hyderabad', outbound: 208, inbound: 220 }
    ],
    '90d': [
      { hub: 'Mumbai', outbound: 1020, inbound: 1104 },
      { hub: 'Delhi NCR', outbound: 768, inbound: 840 },
      { hub: 'Bengaluru', outbound: 936, inbound: 972 },
      { hub: 'Chennai', outbound: 540, inbound: 576 },
      { hub: 'Kolkata', outbound: 1152, inbound: 1248 },
      { hub: 'Hyderabad', outbound: 624, inbound: 660 }
    ]
  };

  // KPI values per period
  const kpiData = {
    '7d':  { sla: `${metrics.onTimeDeliveryRate}%`,  slaChange: '+1.4%',  util: `${metrics.fleetUtilizationRate}%`, utilChange: '+3.2%', fuel: `${metrics.fuelEfficiencyKmpl || 4.8} km/L`, fuelChange: '+4.8%', carbon: `${(metrics.carbonEmissionsSavedKg / 1000).toFixed(1)} tons`, carbonChange: '+18.5%' },
    '30d': { sla: '94.2%', slaChange: '+0.8%', util: '81.5%', utilChange: '+1.9%', fuel: '4.6 km/L', fuelChange: '+2.1%', carbon: '4.8 tons', carbonChange: '+11.2%' },
    '90d': { sla: '93.1%', slaChange: '+2.3%', util: '79.8%', utilChange: '+4.5%', fuel: '4.5 km/L', fuelChange: '+6.3%', carbon: '14.2 tons', carbonChange: '+24.7%' }
  };

  const deliveryTrends = allDeliveryTrends[timeframe];
  const fuelEfficiencyData = allFuelData[timeframe];
  const hubVolumeData = allHubData[timeframe];
  const kpi = kpiData[timeframe];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            Fleet Operations & Delivery Performance Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Executive telemetry intelligence, on-time delivery SLA compliance, carbon reduction, and fuel conservation.
          </p>
        </div>

        {/* Timeframe switch */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs">
          <button
            onClick={() => setTimeframe('7d')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              timeframe === '7d'
                ? 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white shadow-md shadow-purple-600/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Last 7 Days
          </button>
          <button
            onClick={() => setTimeframe('30d')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              timeframe === '30d'
                ? 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white shadow-md shadow-purple-600/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Last 30 Days
          </button>
          <button
            onClick={() => setTimeframe('90d')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              timeframe === '90d'
                ? 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white shadow-md shadow-purple-600/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Quarterly
          </button>
        </div>
      </div>

      {/* Analytics KPI Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="On-Time Delivery SLA"
          value={kpi.sla}
          subtext="Target goal: ≥ 95.0%"
          change={kpi.slaChange}
          isPositive={true}
          icon={Clock}
          colorScheme="emerald"
        />

        <StatCard
          title="Fleet Utilization"
          value={kpi.util}
          subtext="Total operating capacity"
          change={kpi.utilChange}
          isPositive={true}
          icon={Truck}
          colorScheme="violet"
        />

        <StatCard
          title="Average Fleet Mileage"
          value={kpi.fuel}
          subtext="vs previous period"
          change={kpi.fuelChange}
          isPositive={true}
          icon={Fuel}
          colorScheme="amber"
        />

        <StatCard
          title="Carbon Saved"
          value={kpi.carbon}
          subtext="Via EV routing & optimized idle"
          change={kpi.carbonChange}
          isPositive={true}
          icon={Leaf}
          colorScheme="cyan"
        />
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* On-Time Rate & Volume Chart */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-400" />
                Delivery SLA Compliance & Daily Volumes
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">On-time handoffs vs delayed occurrences</p>
            </div>
          </div>

          <div className="h-64 mt-4 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deliveryTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="period" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="onTimeCount" name="On-Time Deliveries" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="delayedCount" name="Delayed Deliveries" fill="#F43F5E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fuel Economy & EV Utilization Trends */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Fuel className="w-4 h-4 text-amber-400" />
                Fuel Conservation & Clean EV Charging (kWh)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Fleet-wide fuel consumption vs electric kWh</p>
            </div>
          </div>

          <div className="h-64 mt-4 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={fuelEfficiencyData}>
                <defs>
                  <linearGradient id="colorMpg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorKwh" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="period" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="electricKwh" name="EV Charging (kWh)" stroke="#06B6D4" fillOpacity={1} fill="url(#colorKwh)" />
                <Area type="monotone" dataKey="idleFuelLtr" name="Idle Diesel Burned (Litres)" stroke="#F59E0B" fillOpacity={1} fill="url(#colorMpg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Regional Freight Hub Throughput */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Truck className="w-4 h-4 text-purple-400" />
              Regional Logistics Hub Freight Volume
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Inbound vs Outbound freight throughput by major terminal</p>
          </div>
        </div>

        <div className="h-64 mt-4 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hubVolumeData}>
              <defs>
                <linearGradient id="outboundBarGradient" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="#9333ea" />
                  <stop offset="50%" stopColor="#c026d3" />
                  <stop offset="100%" stopColor="#db2777" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="hub" stroke="#64748b" fontSize={12} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '0.75rem',
                  color: '#fff',
                  fontSize: '12px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="outbound" name="Outbound Shipments" fill="url(#outboundBarGradient)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="inbound" name="Inbound Shipments" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
