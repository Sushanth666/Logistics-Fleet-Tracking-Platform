import React, { useState, useMemo } from 'react';
import { useFleet } from '../context/FleetContext';
import { VehicleTable } from '../components/vehicles/VehicleTable';
import { VehicleModal } from '../components/vehicles/VehicleModal';
import { VehicleDetailsDrawer } from '../components/vehicles/VehicleDetailsDrawer';
import { SearchFilterBar } from '../components/common/SearchFilterBar';
import { EmptyState } from '../components/common/EmptyState';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { StatCard } from '../components/common/StatCard';
import { useNavigate } from 'react-router-dom';
import { Truck, Plus, Fuel, Wrench, ShieldCheck, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

export const VehiclesPage = () => {
  const { vehicles, loading, deleteVehicle, setSelectedVehicleId } = useFleet();
  const navigate = useNavigate();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vehicleToEdit, setVehicleToEdit] = useState(null);
  const [drawerVehicle, setDrawerVehicle] = useState(null);

  // Filter options
  const statusOptions = [
    { value: 'in-transit', label: 'In Transit' },
    { value: 'idle', label: 'Idle / Standby' },
    { value: 'maintenance', label: 'Under Maintenance' },
    { value: 'out-of-service', label: 'Out of Service' }
  ];

  const typeOptions = [
    { value: 'Heavy Semi-Truck', label: 'Heavy Semi-Truck' },
    { value: 'Semi-Trailer', label: 'Semi-Trailer' },
    { value: 'Refrigerated Carrier', label: 'Refrigerated Carrier' },
    { value: 'Electric Sprinter Van', label: 'Electric Sprinter Van' },
    { value: 'Delivery Van', label: 'Delivery Van' }
  ];

  const locationOptions = useMemo(() => {
    const set = new Set();
    vehicles.forEach(v => {
      if (v.location?.address) {
        const parts = v.location.address.split(',');
        if (parts.length >= 2) {
          set.add(parts[parts.length - 2].trim());
        }
      }
    });
    return Array.from(set).sort();
  }, [vehicles]);

  // Filtered vehicles
  const filteredVehicles = useMemo(() => {
    return vehicles.filter(v => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        v.name.toLowerCase().includes(query) ||
        v.plate.toLowerCase().includes(query) ||
        (v.driverName && v.driverName.toLowerCase().includes(query)) ||
        (v.location?.address && v.location.address.toLowerCase().includes(query));

      const matchesStatus = statusFilter === 'all' || v.status === statusFilter;
      const matchesType = typeFilter === 'all' || v.type === typeFilter;
      const matchesLocation =
        locationFilter === 'all' ||
        (v.location?.address && v.location.address.toLowerCase().includes(locationFilter.toLowerCase()));

      return matchesSearch && matchesStatus && matchesType && matchesLocation;
    });
  }, [vehicles, searchQuery, statusFilter, typeFilter, locationFilter]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setTypeFilter('all');
    setLocationFilter('all');
  };

  const handleOpenAdd = () => {
    setVehicleToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (vehicle) => {
    setVehicleToEdit(vehicle);
    setIsModalOpen(true);
  };

  const handleTrackOnMap = (id) => {
    setSelectedVehicleId(id);
    navigate('/tracking');
  };

  // Quick summary stats
  const totalCount = vehicles.length;
  const transitCount = vehicles.filter(v => v.status === 'in-transit').length;
  const idleCount = vehicles.filter(v => v.status === 'idle').length;
  const maintCount = vehicles.filter(v => v.status === 'maintenance').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Title & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Truck className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            Fleet Vehicles & Asset Registry
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Maintain vehicle diagnostics, assigned drivers, fuel reserves, odometer, and service intervals.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:opacity-95 text-white font-semibold text-xs tracking-wide shadow-lg shadow-purple-600/25 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Vehicle Asset
        </button>
      </div>

      {/* Mini Stats Ribbon with Animated StatCards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3.5 md:gap-4 xl:gap-4">
        <StatCard
          title="Total Assets"
          value={totalCount}
          subtext="Registered commercial vehicles"
          colorScheme="violet"
          icon={Truck}
        />
        <StatCard
          title="In Transit"
          value={transitCount}
          subtext="Active line haul routes"
          colorScheme="emerald"
          icon={Truck}
        />
        <StatCard
          title="Idle / Standby"
          value={idleCount}
          subtext="Available for dispatch"
          colorScheme="cyan"
          icon={Clock}
        />
        <StatCard
          title="In Maintenance"
          value={maintCount}
          subtext={maintCount > 0 ? "Depot service bays" : "All vehicles operational"}
          colorScheme={maintCount > 0 ? "amber" : "emerald"}
          isPositive={maintCount === 0}
          change={maintCount > 0 ? "Service" : "Optimal"}
          icon={AlertTriangle}
        />
      </div>

      {/* Search & Filter Bar */}
      <SearchFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Filter vehicles by model, plate, driver, depot..."
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        statusOptions={statusOptions}
        secondaryFilter={typeFilter}
        onSecondaryChange={setTypeFilter}
        secondaryOptions={typeOptions}
        secondaryLabel="Classes"
        locationFilter={locationFilter}
        onLocationChange={setLocationFilter}
        locationOptions={locationOptions}
        onReset={handleResetFilters}
        totalResults={filteredVehicles.length}
      />

      {/* Data Presentation */}
      {loading ? (
        <LoadingSkeleton rows={5} />
      ) : filteredVehicles.length === 0 ? (
        <EmptyState
          icon={Truck}
          title="No Vehicles Matched"
          description="We couldn't find any fleet asset matching your criteria. Reset filters or register a new vehicle."
          actionLabel="Register Vehicle"
          onAction={handleOpenAdd}
        />
      ) : (
        <VehicleTable
          vehicles={filteredVehicles}
          onSelectVehicle={setDrawerVehicle}
          onEditVehicle={handleOpenEdit}
          onDeleteVehicle={deleteVehicle}
          onTrackMap={handleTrackOnMap}
        />
      )}

      {/* Add / Edit Modal */}
      <VehicleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        vehicleToEdit={vehicleToEdit}
      />

      {/* Details & Telematics Drawer */}
      <VehicleDetailsDrawer
        vehicle={drawerVehicle}
        onClose={() => setDrawerVehicle(null)}
        onEdit={handleOpenEdit}
        onTrackMap={handleTrackOnMap}
      />
    </div>
  );
};
