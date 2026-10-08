import React, { useState, useMemo } from 'react';
import { useFleet } from '../context/FleetContext';
import { FleetMap } from '../components/map/FleetMap';
import { TelemetryCard } from '../components/map/TelemetryCard';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  Search,
  Truck,
  Filter,
  Play,
  Pause,
  MapPin,
  Layers,
  Compass,
  Radio,
  X,
  Gauge,
  Fuel
} from 'lucide-react';

export const TrackingPage = () => {
  const {
    vehicles,
    shipments,
    selectedVehicleId,
    setSelectedVehicleId,
    isSimulationActive,
    toggleSimulation
  } = useFleet();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [mapStyle, setMapStyle] = useState('standard'); // 'standard' (Original Maps) | 'dark' (Night Ops)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [mobileTab, setMobileTab] = useState('map'); // 'map' | 'vehicles'

  // Filtered vehicles for sidebar list
  const filteredVehicles = useMemo(() => {
    return vehicles.filter(v => {
      const matchesSearch =
        v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (v.driverName && v.driverName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (v.location?.address && v.location.address.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = statusFilter === 'all' || v.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [vehicles, searchQuery, statusFilter]);

  // Selected vehicle & its linked active shipment
  const activeVehicle = useMemo(() => {
    return vehicles.find(v => v.id === selectedVehicleId) || vehicles[0] || null;
  }, [vehicles, selectedVehicleId]);

  const activeShipment = useMemo(() => {
    if (!activeVehicle) return null;
    return shipments.find(s => s.assignedVehicleId === activeVehicle.id || s.id === activeVehicle.currentShipmentId);
  }, [shipments, activeVehicle]);

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Top Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-3.5 sm:p-4 rounded-2xl shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 sm:p-2.5 rounded-xl bg-purple-100 text-purple-700 border border-purple-200 dark:bg-purple-500/10 dark:border-purple-500/20 dark:text-purple-400 shrink-0">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div className="min-w-0">
            <h1 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2 truncate">
              🇮🇳 Pan-India GPS Telematics & Corridor Radar
            </h1>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 flex-wrap mt-0.5">
              <span>National Highway corridors, freight routes & telemetry</span>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                Golden Quadrilateral Live
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Map style toggle */}
          <button
            onClick={() => setMapStyle(prev => prev === 'dark' ? 'standard' : 'dark')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Map: {mapStyle === 'dark' ? 'Night Ops' : 'Street'}</span>
          </button>

          {/* Simulation Toggle */}
          <button
            onClick={toggleSimulation}
            className={`inline-flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isSimulationActive
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {isSimulationActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>GPS: {isSimulationActive ? 'STREAMING' : 'PAUSED'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Segmented View Switcher */}
      <div className="flex lg:hidden items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm">
        <button
          onClick={() => setMobileTab('map')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            mobileTab === 'map'
              ? 'bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-300 shadow-md shadow-purple-500/10'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Radio className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          <span>Live Radar Map</span>
        </button>
        <button
          onClick={() => setMobileTab('vehicles')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            mobileTab === 'vehicles'
              ? 'bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-300 shadow-md shadow-purple-500/10'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Truck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          <span>Fleet Vehicles ({filteredVehicles.length})</span>
        </button>
      </div>

      {/* Main Map & Interactive Sidebar Layout */}
      <div className="relative flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:h-[720px]">
        {/* Vehicles Selection Sidebar (4 cols on desktop, tabbed on mobile) */}
        <div className={`lg:col-span-4 h-[560px] lg:h-full flex-col bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden backdrop-blur-md ${
          mobileTab === 'vehicles' ? 'flex' : 'hidden lg:flex'
        }`}>
          {/* Search & Filter Header */}
          <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 space-y-2.5 bg-slate-50/70 dark:bg-slate-950/60">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Filter by plate, driver, route..."
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-8 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Status Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto overscroll-contain pb-1 text-xs no-scrollbar">
              {['all', 'in-transit', 'idle', 'maintenance'].map(statusKey => (
                <button
                  key={statusKey}
                  onClick={() => setStatusFilter(statusKey)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    statusFilter === statusKey
                      ? 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white shadow-md shadow-purple-600/20'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {statusKey === 'all' ? 'All' : statusKey === 'in-transit' ? 'In Transit' : statusKey === 'idle' ? 'Idle' : 'Service'}
                </button>
              ))}
            </div>
          </div>

          {/* Vehicles List */}
          <div className="flex-1 overflow-y-auto overscroll-contain divide-y divide-slate-100 dark:divide-slate-800/60 p-2 space-y-1">
            {filteredVehicles.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                No vehicles match current search filter
              </div>
            ) : (
              filteredVehicles.map(vehicle => {
                const isSelected = activeVehicle?.id === vehicle.id;

                return (
                  <div
                    key={vehicle.id}
                    onClick={() => {
                      setSelectedVehicleId(vehicle.id);
                      setMobileTab('map');
                    }}
                    className={`p-3 rounded-xl transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-purple-50/80 dark:bg-purple-950/40 border-purple-300 dark:border-purple-500/50 shadow-md ring-1 ring-purple-300 dark:ring-purple-500/30'
                        : 'bg-slate-50/60 dark:bg-slate-950/30 border-slate-200/60 dark:border-transparent hover:bg-purple-50/40 dark:hover:bg-slate-800/40 hover:border-purple-200 dark:hover:border-slate-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white text-xs">{vehicle.name}</span>
                          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                            {vehicle.plate}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{vehicle.driverName || 'No Driver'}</p>
                      </div>
                      <StatusBadge status={vehicle.status} size="sm" />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-2 pt-2 border-t border-slate-200/70 dark:border-slate-800/60">
                      <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
                        <Gauge className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        {vehicle.speed} km/h
                      </span>
                      <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
                        <Fuel className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                        {vehicle.fuelLevel}%
                      </span>
                      <span className="truncate max-w-[110px] text-slate-400 dark:text-slate-500 text-[10px]">
                        {vehicle.location?.address}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Map Container + HUD Overlay (8 cols on desktop, tabbed on mobile) */}
        <div className={`lg:col-span-8 flex-col gap-4 relative lg:h-full ${
          mobileTab === 'map' ? 'flex' : 'hidden lg:flex'
        }`}>
          <div className="h-[420px] sm:h-[480px] lg:h-auto lg:flex-1 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl relative min-h-[380px]">
            <FleetMap
              vehicles={filteredVehicles}
              shipments={shipments}
              selectedVehicleId={activeVehicle?.id}
              onSelectVehicle={id => setSelectedVehicleId(id)}
              mapStyle={mapStyle}
            />
          </div>

          {/* Active Vehicle HUD Card */}
          {activeVehicle && (
            <div className="shrink-0">
              <TelemetryCard
                vehicle={activeVehicle}
                shipment={activeShipment}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
