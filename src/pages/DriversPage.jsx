import React, { useState, useMemo } from 'react';
import { useFleet } from '../context/FleetContext';
import { DriverCard } from '../components/drivers/DriverCard';
import { DriverTable } from '../components/drivers/DriverTable';
import { DriverModal } from '../components/drivers/DriverModal';
import { DriverScorecard } from '../components/drivers/DriverScorecard';
import { SearchFilterBar } from '../components/common/SearchFilterBar';
import { EmptyState } from '../components/common/EmptyState';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { StatCard } from '../components/common/StatCard';
import {
  Users,
  Plus,
  Star,
  ShieldCheck,
  CheckCircle2,
  LayoutGrid,
  List,
  Sparkles,
  MapPin,
  Flame,
  Award
} from 'lucide-react';

export const DriversPage = () => {
  const { drivers, loading, deleteDriver } = useFleet();

  // View mode
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [licenseFilter, setLicenseFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [onlyTopSafety, setOnlyTopSafety] = useState(false);

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [driverToEdit, setDriverToEdit] = useState(null);
  const [scorecardDriver, setScorecardDriver] = useState(null);

  const statusOptions = [
    { value: 'available', label: 'Available Standby' },
    { value: 'on-route', label: 'On Route Active' },
    { value: 'on-break', label: 'On Break' },
    { value: 'off-duty', label: 'Off Duty' }
  ];

  const licenseOptions = [
    { value: 'Commercial Class A', label: 'Class A - Heavy Transport' },
    { value: 'Commercial Class A - HazMat', label: 'Class A - HazMat' },
    { value: 'Commercial Class A - Tanker', label: 'Class A - Tanker' },
    { value: 'Commercial Class B', label: 'Class B Standard' },
    { value: 'Commercial Class B - EV Specialized', label: 'Class B - EV Specialized' }
  ];

  const locationOptions = useMemo(() => {
    const set = new Set();
    drivers.forEach(d => {
      if (d.state) set.add(d.state.trim());
      else if (d.hub) set.add(d.hub.split(',').pop().trim());
    });
    return Array.from(set).sort();
  }, [drivers]);

  const filteredDrivers = useMemo(() => {
    return drivers.filter(d => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        d.name.toLowerCase().includes(q) ||
        d.email.toLowerCase().includes(q) ||
        d.licenseNumber.toLowerCase().includes(q) ||
        (d.hub && d.hub.toLowerCase().includes(q)) ||
        (d.state && d.state.toLowerCase().includes(q)) ||
        (d.specialty && d.specialty.toLowerCase().includes(q)) ||
        (d.assignedVehicleName && d.assignedVehicleName.toLowerCase().includes(q));

      const matchesStatus = statusFilter === 'all' || d.status === statusFilter;
      const matchesLicense = licenseFilter === 'all' || d.licenseType === licenseFilter;
      const matchesLocation = locationFilter === 'all' ||
        (d.state && d.state.toLowerCase().includes(locationFilter.toLowerCase())) ||
        (d.hub && d.hub.toLowerCase().includes(locationFilter.toLowerCase()));
      const matchesTopSafety = !onlyTopSafety || (d.safetyScore || 0) >= 98;

      return matchesSearch && matchesStatus && matchesLicense && matchesLocation && matchesTopSafety;
    });
  }, [drivers, searchQuery, statusFilter, licenseFilter, locationFilter, onlyTopSafety]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setLicenseFilter('all');
    setLocationFilter('all');
    setOnlyTopSafety(false);
  };

  const handleOpenAdd = () => {
    setDriverToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (driver) => {
    setDriverToEdit(driver);
    setIsModalOpen(true);
  };

  // Metric counts
  const totalDrivers = drivers.length;
  const onRouteCount = drivers.filter(d => d.status === 'on-route').length;
  const availableCount = drivers.filter(d => d.status === 'available').length;
  const offDutyCount = drivers.filter(d => d.status === 'off-duty' || d.status === 'on-break').length;
  const avgSafetyScore = (
    drivers.reduce((acc, curr) => acc + (curr.safetyScore || 95), 0) / (drivers.length || 1)
  ).toFixed(1);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🇮🇳</span>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              Indian Fleet Driver & Operator Directory
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Commercial CDL compliance, multi-state route availability, safety indices, and telematics telemetry across Indian regional hubs.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-center">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-850 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Modern Cards View"
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline">Cards</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Fleet Roster Table View"
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">Roster</span>
            </button>
          </div>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:opacity-95 text-white font-semibold text-xs tracking-wide shadow-lg shadow-purple-600/25 transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            Register Driver
          </button>
        </div>
      </div>

      {/* Mini Stats Ribbon with Animated StatCards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Indian Drivers"
          value={totalDrivers}
          subtext="Certified commercial roster"
          colorScheme="violet"
          icon={Users}
        />
        <StatCard
          title="On Route Active"
          value={onRouteCount}
          subtext="Interstate haul transit"
          colorScheme="emerald"
          icon={CheckCircle2}
        />
        <StatCard
          title="Available Standby"
          value={availableCount}
          subtext="Ready for dispatch call"
          colorScheme="cyan"
          icon={ShieldCheck}
        />
        <StatCard
          title="Avg Safety Benchmark"
          value={`${avgSafetyScore}%`}
          subtext="Zero incident compliance"
          colorScheme="amber"
          icon={Star}
        />
      </div>

      {/* Quick Status Chips */}
      <div className="flex items-center gap-2 overflow-x-auto overscroll-contain pb-1 text-xs">
        <button
          onClick={() => { setStatusFilter('all'); setOnlyTopSafety(false); }}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
            statusFilter === 'all' && !onlyTopSafety
              ? 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white shadow-md shadow-purple-600/25'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <span>All Operators</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/10 dark:bg-white/10">{totalDrivers}</span>
        </button>

        <button
          onClick={() => { setStatusFilter('on-route'); setOnlyTopSafety(false); }}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
            statusFilter === 'on-route' && !onlyTopSafety
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>On Route Active</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/10 dark:bg-white/10">{onRouteCount}</span>
        </button>

        <button
          onClick={() => { setStatusFilter('available'); setOnlyTopSafety(false); }}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
            statusFilter === 'available' && !onlyTopSafety
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-blue-400" />
          <span>Available Standby</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/10 dark:bg-white/10">{availableCount}</span>
        </button>

        <button
          onClick={() => { setStatusFilter('off-duty'); setOnlyTopSafety(false); }}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
            statusFilter === 'off-duty' && !onlyTopSafety
              ? 'bg-slate-700 text-white shadow-md shadow-slate-700/25'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-slate-400" />
          <span>Off Duty / Break</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/10 dark:bg-white/10">{offDutyCount}</span>
        </button>

        <button
          onClick={() => setOnlyTopSafety(!onlyTopSafety)}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
            onlyTopSafety
              ? 'bg-amber-500 text-white shadow-md shadow-amber-500/25'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span>Top Safety (≥ 98%)</span>
        </button>
      </div>

      {/* Filter Bar */}
      <SearchFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search by name (e.g. Rajesh Sharma), hub, DL license, vehicle..."
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        statusOptions={statusOptions}
        secondaryFilter={licenseFilter}
        onSecondaryChange={setLicenseFilter}
        secondaryOptions={licenseOptions}
        secondaryLabel="License Classes"
        locationFilter={locationFilter}
        onLocationChange={setLocationFilter}
        locationOptions={locationOptions}
        onReset={handleResetFilters}
        totalResults={filteredDrivers.length}
      />

      {/* Drivers Content: Grid vs Table */}
      {loading ? (
        <LoadingSkeleton type="card" />
      ) : filteredDrivers.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No Drivers Found"
          description="We couldn't match any registered driver with your query. Try resetting filters."
          actionLabel="Register Driver"
          onAction={handleOpenAdd}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredDrivers.map(driver => (
            <DriverCard
              key={driver.id}
              driver={driver}
              onEdit={handleOpenEdit}
              onDelete={deleteDriver}
              onViewScorecard={setScorecardDriver}
            />
          ))}
        </div>
      ) : (
        <DriverTable
          drivers={filteredDrivers}
          onEdit={handleOpenEdit}
          onDelete={deleteDriver}
          onViewScorecard={setScorecardDriver}
        />
      )}

      {/* Add / Edit Driver Modal */}
      <DriverModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        driverToEdit={driverToEdit}
      />

      {/* Scorecard Modal */}
      <DriverScorecard
        isOpen={Boolean(scorecardDriver)}
        onClose={() => setScorecardDriver(null)}
        driver={scorecardDriver}
      />
    </div>
  );
};
