import React, { useState, useMemo } from 'react';
import { useFleet } from '../context/FleetContext';
import { ShipmentTable } from '../components/shipments/ShipmentTable';
import { ShipmentModal } from '../components/shipments/ShipmentModal';
import { ShipmentTimeline } from '../components/shipments/ShipmentTimeline';
import { SearchFilterBar } from '../components/common/SearchFilterBar';
import { EmptyState } from '../components/common/EmptyState';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { StatCard } from '../components/common/StatCard';
import { useNavigate } from 'react-router-dom';
import { Package, Plus, CheckCircle2, Clock, AlertTriangle, Truck } from 'lucide-react';

export const ShipmentsPage = () => {
  const { shipments, loading, deleteShipment, setSelectedVehicleId } = useFleet();
  const navigate = useNavigate();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shipmentToEdit, setShipmentToEdit] = useState(null);
  const [timelineShipment, setTimelineShipment] = useState(null);

  const statusOptions = [
    { value: 'in-transit', label: 'In Transit' },
    { value: 'dispatched', label: 'Dispatched' },
    { value: 'pending', label: 'Pending Dispatch' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'delayed', label: 'Delayed' }
  ];

  const priorityOptions = [
    { value: 'urgent', label: 'Urgent Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'normal', label: 'Normal Priority' }
  ];

  const dateOptions = [
    { value: 'today', label: 'Today (Active)' },
    { value: 'all', label: 'All Dates' }
  ];

  const locationOptions = useMemo(() => {
    const set = new Set();
    shipments.forEach(s => {
      if (s.origin?.city) set.add(s.origin.city.split(',')[0].trim());
      if (s.destination?.city) set.add(s.destination.city.split(',')[0].trim());
    });
    return Array.from(set).sort();
  }, [shipments]);

  const filteredShipments = useMemo(() => {
    return shipments.filter(s => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        s.id.toLowerCase().includes(q) ||
        s.customer.toLowerCase().includes(q) ||
        s.cargoType.toLowerCase().includes(q) ||
        s.origin.city.toLowerCase().includes(q) ||
        s.destination.city.toLowerCase().includes(q) ||
        (s.assignedDriverName && s.assignedDriverName.toLowerCase().includes(q)) ||
        (s.assignedVehiclePlate && s.assignedVehiclePlate.toLowerCase().includes(q));

      const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || s.priority === priorityFilter;

      const matchesLocation =
        locationFilter === 'all' ||
        (s.origin?.city && s.origin.city.toLowerCase().includes(locationFilter.toLowerCase())) ||
        (s.destination?.city && s.destination.city.toLowerCase().includes(locationFilter.toLowerCase()));

      const matchesDate =
        dateFilter === 'all' ||
        (dateFilter === 'today' && (s.eta?.toLowerCase().includes('today') || s.status === 'in-transit' || s.status === 'dispatched'));

      return matchesSearch && matchesStatus && matchesPriority && matchesLocation && matchesDate;
    });
  }, [shipments, searchQuery, statusFilter, priorityFilter, locationFilter, dateFilter]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setPriorityFilter('all');
    setLocationFilter('all');
    setDateFilter('all');
  };

  const handleOpenAdd = () => {
    setShipmentToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (shipment) => {
    setShipmentToEdit(shipment);
    setIsModalOpen(true);
  };

  const handleTrackMap = (vehicleId) => {
    if (vehicleId) {
      setSelectedVehicleId(vehicleId);
      navigate('/tracking');
    }
  };

  // Metric counts
  const totalShipments = shipments.length;
  const inTransitCount = shipments.filter(s => s.status === 'in-transit').length;
  const deliveredCount = shipments.filter(s => s.status === 'delivered').length;
  const delayedCount = shipments.filter(s => s.status === 'delayed').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Package className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            Shipment Dispatch & Lifecycle Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Create freight manifests, assign commercial carriers, monitor journey milestones, and resolve delays.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:opacity-95 text-white font-semibold text-xs tracking-wide shadow-lg shadow-purple-600/25 transition-all cursor-pointer shrink-0"
        >
          <Package className="w-4 h-4" />
          Shipment Dispatch
        </button>
      </div>

      {/* Mini Stats Ribbon with Animated StatCards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3.5 md:gap-4 xl:gap-4">
        <StatCard
          title="Total Manifests"
          value={totalShipments}
          subtext="Active freight manifests"
          colorScheme="violet"
          icon={Package}
        />
        <StatCard
          title="In Transit"
          value={inTransitCount}
          subtext="En route to destination"
          colorScheme="cyan"
          icon={Truck}
        />
        <StatCard
          title="Delivered & Signed"
          value={deliveredCount}
          subtext="Delivered successfully"
          colorScheme="emerald"
          icon={CheckCircle2}
        />
        <StatCard
          title="Delayed Alert"
          value={delayedCount}
          subtext={delayedCount > 0 ? "Requires dispatcher action" : "All on schedule"}
          colorScheme={delayedCount > 0 ? "rose" : "emerald"}
          isPositive={delayedCount === 0}
          change={delayedCount > 0 ? "Active alert" : "Clear"}
          icon={AlertTriangle}
        />
      </div>

      {/* Search & Filter Bar */}
      <SearchFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search shipments by ID, customer, origin, destination, cargo..."
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        statusOptions={statusOptions}
        secondaryFilter={priorityFilter}
        onSecondaryChange={setPriorityFilter}
        secondaryOptions={priorityOptions}
        secondaryLabel="Priorities"
        locationFilter={locationFilter}
        onLocationChange={setLocationFilter}
        locationOptions={locationOptions}
        dateFilter={dateFilter}
        onDateChange={setDateFilter}
        dateOptions={dateOptions}
        onReset={handleResetFilters}
        totalResults={filteredShipments.length}
      />

      {/* Shipment Table presentation */}
      {loading ? (
        <LoadingSkeleton rows={6} />
      ) : filteredShipments.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No Shipments Found"
          description="We couldn't locate any shipments with your matching filter parameters."
          actionLabel="Dispatch New Shipment"
          onAction={handleOpenAdd}
        />
      ) : (
        <ShipmentTable
          shipments={filteredShipments}
          onSelectShipment={setTimelineShipment}
          onEditShipment={handleOpenEdit}
          onDeleteShipment={deleteShipment}
          onTrackMap={handleTrackMap}
        />
      )}

      {/* Add / Edit Shipment Modal */}
      <ShipmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        shipmentToEdit={shipmentToEdit}
      />

      {/* Timeline Modal */}
      <ShipmentTimeline
        isOpen={Boolean(timelineShipment)}
        onClose={() => setTimelineShipment(null)}
        shipment={timelineShipment}
      />
    </div>
  );
};
