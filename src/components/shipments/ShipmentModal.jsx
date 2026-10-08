import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { useFleet } from '../../context/FleetContext';
import {
  Building2,
  Package,
  Weight,
  Clock,
  MapPin,
  Navigation,
  Truck,
  UserCheck,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  Zap,
  CheckCircle2,
  Sparkles,
  QrCode,
  FileText
} from 'lucide-react';

const POPULAR_CORRIDORS = [
  {
    name: "Mumbai ➔ Bengaluru",
    originCity: "Mumbai, MH",
    originAddress: "Bhiwandi Gateway Logistics Hub, Mumbai",
    destCity: "Bengaluru, KA",
    destAddress: "Whitefield Freight Terminal, Bengaluru",
    distanceKm: 985,
    eta: "Tomorrow, 16:00",
    highway: "NH-48 Corridor"
  },
  {
    name: "NCR ➔ Chennai",
    originCity: "Delhi NCR, HR",
    originAddress: "Manesar Auto Logistics Depot, Gurugram",
    destCity: "Chennai, TN",
    destAddress: "Sriperumbudur Industrial Hub, Chennai",
    distanceKm: 2180,
    eta: "In 3 Days, 10:00",
    highway: "NH-44 North-South"
  },
  {
    name: "Vadodara ➔ Ludhiana",
    originCity: "Vadodara, GJ",
    originAddress: "GIDC Industrial Logistics Center, Vadodara",
    destCity: "Ludhiana, PB",
    destAddress: "GT Road Dry Port Terminal, Ludhiana",
    distanceKm: 1240,
    eta: "In 2 Days, 14:00",
    highway: "NE-1 / NH-48"
  },
  {
    name: "Hyderabad ➔ Kolkata",
    originCity: "Hyderabad, TS",
    originAddress: "Genome Valley Pharma Depot, Hyderabad",
    destCity: "Kolkata, WB",
    destAddress: "Dankuni Freight Hub, Kolkata",
    distanceKm: 1490,
    eta: "In 2 Days, 18:30",
    highway: "NH-16 Coastal DFC"
  }
];

const CARGO_PRESETS = [
  "Lithium-Ion Battery Packs",
  "Automotive Spares & Engine Parts",
  "Temperature-Sensitive Pharma",
  "FMCG Packaged Goods",
  "High-Precision CNC Machinery"
];

export const ShipmentModal = ({ isOpen, onClose, shipmentToEdit = null }) => {
  const { addShipment, updateShipment, vehicles, drivers } = useFleet();

  const [formData, setFormData] = useState({
    customer: '',
    cargoType: '',
    priority: 'normal',
    weightKg: 4500,
    originCity: 'Mumbai, MH',
    originAddress: 'Bhiwandi Gateway Logistics Hub, Mumbai',
    destCity: 'Bengaluru, KA',
    destAddress: 'Whitefield Freight Terminal, Bengaluru',
    vehicleId: '',
    driverId: '',
    status: 'pending',
    eta: 'Tomorrow, 17:00',
    estimatedDistanceKm: 985
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (shipmentToEdit) {
      setFormData({
        customer: shipmentToEdit.customer || '',
        cargoType: shipmentToEdit.cargoType || '',
        priority: shipmentToEdit.priority || 'normal',
        weightKg: shipmentToEdit.weightKg ?? 4500,
        originCity: shipmentToEdit.origin?.city || '',
        originAddress: shipmentToEdit.origin?.address || '',
        destCity: shipmentToEdit.destination?.city || '',
        destAddress: shipmentToEdit.destination?.address || '',
        vehicleId: shipmentToEdit.assignedVehicleId || '',
        driverId: shipmentToEdit.assignedDriverId || '',
        status: shipmentToEdit.status || 'pending',
        eta: shipmentToEdit.eta || 'Tomorrow, 17:00',
        estimatedDistanceKm: shipmentToEdit.estimatedDistanceKm || 985
      });
    } else {
      setFormData({
        customer: '',
        cargoType: '',
        priority: 'normal',
        weightKg: 4500,
        originCity: 'Mumbai, MH',
        originAddress: 'Bhiwandi Gateway Logistics Hub, Mumbai',
        destCity: 'Bengaluru, KA',
        destAddress: 'Whitefield Freight Terminal, Bengaluru',
        vehicleId: '',
        driverId: '',
        status: 'pending',
        eta: 'Tomorrow, 17:00',
        estimatedDistanceKm: 985
      });
    }
    setErrors({});
  }, [shipmentToEdit, isOpen]);

  const handleApplyCorridor = (corridor) => {
    setFormData(prev => ({
      ...prev,
      originCity: corridor.originCity,
      originAddress: corridor.originAddress,
      destCity: corridor.destCity,
      destAddress: corridor.destAddress,
      estimatedDistanceKm: corridor.distanceKm,
      eta: corridor.eta
    }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.customer.trim()) errs.customer = 'Customer / Consignee name is required';
    if (!formData.cargoType.trim()) errs.cargoType = 'Cargo manifest description is required';
    if (!formData.originCity.trim()) errs.originCity = 'Origin city is required';
    if (!formData.destCity.trim()) errs.destCity = 'Destination city is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const assignedVehicle = vehicles.find(v => v.id === formData.vehicleId);
      const assignedDriver = drivers.find(d => d.id === formData.driverId);

      const payload = {
        customer: formData.customer,
        cargoType: formData.cargoType,
        priority: formData.priority,
        weightKg: Number(formData.weightKg),
        origin: {
          city: formData.originCity,
          address: formData.originAddress || formData.originCity,
          lat: shipmentToEdit?.origin?.lat || 19.2812,
          lng: shipmentToEdit?.origin?.lng || 73.0483
        },
        destination: {
          city: formData.destCity,
          address: formData.destAddress || formData.destCity,
          lat: shipmentToEdit?.destination?.lat || 12.8452,
          lng: shipmentToEdit?.destination?.lng || 77.6602
        },
        assignedVehicleId: formData.vehicleId || null,
        assignedVehiclePlate: assignedVehicle ? assignedVehicle.plate : 'Unassigned',
        assignedDriverId: formData.driverId || null,
        assignedDriverName: assignedDriver ? assignedDriver.name : 'Unassigned',
        status: formData.status,
        eta: formData.eta,
        estimatedDistanceKm: formData.estimatedDistanceKm || 985,
        distanceRemainingKm: formData.estimatedDistanceKm || 985,
        currentProgressPercent: shipmentToEdit ? shipmentToEdit.currentProgressPercent : (formData.status === 'in-transit' ? 20 : 0)
      };

      if (shipmentToEdit) {
        await updateShipment(shipmentToEdit.id, payload);
      } else {
        await addShipment(payload);
      }
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const selectedVehicle = vehicles.find(v => v.id === formData.vehicleId);
  const selectedDriver = drivers.find(d => d.id === formData.driverId);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-5xl"
      title={
        <div className="flex flex-wrap items-center gap-2.5">
          <span>{shipmentToEdit ? `Edit Consignment ${shipmentToEdit.id}` : 'Create Freight Dispatch Order'}</span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
            <ShieldCheck className="w-3 h-3" /> AIS-140 Verified
          </span>
        </div>
      }
      subtitle="Establish cargo manifest, national freight corridor routing, telematics tracking, and carrier allocation."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Quick Corridor Selection Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              Popular National Freight Corridors (1-Click Auto-Fill)
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {POPULAR_CORRIDORS.map(c => {
              const isActive = formData.originCity === c.originCity && formData.destCity === c.destCity;
              return (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => handleApplyCorridor(c)}
                  className={`text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-600/50 text-indigo-900 dark:text-indigo-200 ring-2 ring-indigo-500/20'
                      : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <p className="font-bold truncate">{c.name}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{c.highway} • {c.distanceKm} km</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Split: Form Left (60%), Live Waybill Right (40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Form Column (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* 1. Customer & Cargo Manifest */}
            <div className="p-4 rounded-2xl bg-slate-50/60 dark:bg-slate-800/30 border border-slate-200/80 dark:border-slate-800 space-y-3.5">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold">1</span>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Consignee & Cargo Details
                </h4>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Customer / Consignee Enterprise *
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={formData.customer}
                    onChange={e => setFormData({ ...formData, customer: e.target.value })}
                    placeholder="e.g. Reliance Retail Distribution Ltd."
                    className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-xl pl-9 pr-3.5 py-2 text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
                  />
                </div>
                {errors.customer && <p className="text-[11px] text-rose-500 font-medium mt-1">{errors.customer}</p>}
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Cargo Description *
                </label>
                <div className="relative">
                  <Package className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={formData.cargoType}
                    onChange={e => setFormData({ ...formData, cargoType: e.target.value })}
                    placeholder="e.g. Electric Vehicle Powertrain Modules"
                    className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-xl pl-9 pr-3.5 py-2 text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
                  />
                </div>
                {errors.cargoType && <p className="text-[11px] text-rose-500 font-medium mt-1">{errors.cargoType}</p>}

                {/* Cargo Quick Chips */}
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  {CARGO_PRESETS.map(preset => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setFormData({ ...formData, cargoType: preset })}
                      className="px-2 py-0.5 rounded-lg text-[10px] font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-750 text-slate-600 dark:text-slate-300 hover:border-indigo-400 hover:text-indigo-600 transition-colors cursor-pointer"
                    >
                      + {preset.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Priority Segmented Selector */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Service Level / Priority
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'normal', label: 'Standard', desc: 'Economy SLA', icon: Package, color: 'text-slate-600 dark:text-slate-300' },
                    { id: 'high', label: 'Express', desc: '48h Priority', icon: ArrowRight, color: 'text-amber-600 dark:text-amber-400' },
                    { id: 'urgent', label: 'Critical', desc: 'Real-time Radar', icon: Zap, color: 'text-rose-600 dark:text-rose-400' }
                  ].map(p => {
                    const isSelected = formData.priority === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, priority: p.id })}
                        className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-400 dark:border-indigo-500 shadow-sm'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850'
                        }`}
                      >
                        <p className={`text-xs font-bold ${p.color}`}>{p.label}</p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500">{p.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Weight & ETA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Gross Weight (kg)
                  </label>
                  <div className="relative">
                    <Weight className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="number"
                      value={formData.weightKg}
                      onChange={e => setFormData({ ...formData, weightKg: e.target.value })}
                      className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-xl pl-9 pr-3.5 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Target Delivery ETA
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      value={formData.eta}
                      onChange={e => setFormData({ ...formData, eta: e.target.value })}
                      placeholder="e.g. Tomorrow, 17:00"
                      className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-xl pl-9 pr-3.5 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Routing Corridors */}
            <div className="p-4 rounded-2xl bg-slate-50/60 dark:bg-slate-800/30 border border-slate-200/80 dark:border-slate-800 space-y-3.5">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold">2</span>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Corridor Origin & Destination
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Origin */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> Pickup Facility
                  </label>
                  <input
                    type="text"
                    value={formData.originCity}
                    onChange={e => setFormData({ ...formData, originCity: e.target.value })}
                    placeholder="Origin City (e.g. Mumbai, MH)"
                    className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  />
                  <input
                    type="text"
                    value={formData.originAddress}
                    onChange={e => setFormData({ ...formData, originAddress: e.target.value })}
                    placeholder="Facility (e.g. Bhiwandi Logistics Hub)"
                    className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  />
                  {errors.originCity && <p className="text-[11px] text-rose-500 font-medium">{errors.originCity}</p>}
                </div>

                {/* Destination */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5" /> Dropoff Destination
                  </label>
                  <input
                    type="text"
                    value={formData.destCity}
                    onChange={e => setFormData({ ...formData, destCity: e.target.value })}
                    placeholder="Destination City (e.g. Bengaluru, KA)"
                    className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                  />
                  <input
                    type="text"
                    value={formData.destAddress}
                    onChange={e => setFormData({ ...formData, destAddress: e.target.value })}
                    placeholder="Terminal (e.g. Whitefield Freight Terminal)"
                    className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                  />
                  {errors.destCity && <p className="text-[11px] text-rose-500 font-medium">{errors.destCity}</p>}
                </div>
              </div>
            </div>

            {/* 3. Fleet & Crew Allocation */}
            <div className="p-4 rounded-2xl bg-slate-50/60 dark:bg-slate-800/30 border border-slate-200/80 dark:border-slate-800 space-y-3.5">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold">3</span>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Asset & Driver Allocation
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Assign Commercial Truck
                  </label>
                  <select
                    value={formData.vehicleId}
                    onChange={e => setFormData({ ...formData, vehicleId: e.target.value })}
                    className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  >
                    <option value="">Unassigned</option>
                    {vehicles.map(v => (
                      <option key={v.id} value={v.id}>
                        {v.name} ({v.plate})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Assign Certified Pilot
                  </label>
                  <select
                    value={formData.driverId}
                    onChange={e => setFormData({ ...formData, driverId: e.target.value })}
                    className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  >
                    <option value="">Unassigned</option>
                    {drivers.map(d => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.status})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Initial Dispatch State
                  </label>
                  <select
                    value={formData.status}
                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  >
                    <option value="pending">Pending Manifest</option>
                    <option value="dispatched">Dispatched to Bay</option>
                    <option value="in-transit">En Route (In Transit)</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right Live E-Way Consignment Note Column (5 cols) */}
          <div className="lg:col-span-5 sticky top-0">
            <div className="rounded-2xl bg-slate-50 dark:bg-slate-950/90 border border-slate-200/90 dark:border-slate-800 p-5 shadow-lg relative overflow-hidden space-y-4">
              {/* Subtle background watermark */}
              <div className="absolute -right-8 -bottom-8 opacity-5 pointer-events-none">
                <Truck className="w-48 h-48 text-slate-900 dark:text-white" />
              </div>

              {/* Waybill Card Header */}
              <div className="flex items-start justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-indigo-600 dark:text-indigo-400 font-bold uppercase block">
                    National E-Way Manifest
                  </span>
                  <p className="text-sm font-black font-mono tracking-tight text-slate-900 dark:text-white mt-0.5">
                    {shipmentToEdit?.id || 'SHP-2026-NEW'}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
                    <QrCode className="w-2.5 h-2.5" /> FASTag / GST
                  </span>
                </div>
              </div>

              {/* Route Path Visualizer */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  <span className="uppercase tracking-wider">Transit Corridor</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-mono">~{formData.estimatedDistanceKm || 985} km</span>
                </div>

                <div className="relative pl-6 space-y-3.5">
                  <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-blue-500 via-indigo-500 to-emerald-500" />

                  {/* Origin Node */}
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-blue-500/20" />
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{formData.originCity || 'Origin City'}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{formData.originAddress || 'Origin Terminal'}</p>
                  </div>

                  {/* Destination Node */}
                  <div className="relative pt-1">
                    <div className="absolute -left-[21px] top-2 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{formData.destCity || 'Destination City'}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{formData.destAddress || 'Destination Terminal'}</p>
                  </div>
                </div>
              </div>

              {/* Consignee & Cargo Summary */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Consignee</p>
                  <p className="font-bold text-slate-900 dark:text-white truncate mt-0.5">
                    {formData.customer || 'Pending Client'}
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Gross Payload</p>
                  <p className="font-bold text-indigo-600 dark:text-indigo-400 truncate mt-0.5">
                    {(Number(formData.weightKg || 0) / 1000).toFixed(2)} MT ({(formData.weightKg || 0)} kg)
                  </p>
                </div>
              </div>

              {/* Carrier & Pilot Live Matching */}
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5 shadow-xs">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400">
                  <span>Assigned Fleet Carrier</span>
                  <span className="text-indigo-600 dark:text-emerald-400 font-bold">
                    {formData.priority.toUpperCase()} SLA
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-center shrink-0">
                    <Truck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {selectedVehicle ? selectedVehicle.name : 'No Truck Allocated'}
                    </p>
                    <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate">
                      {selectedVehicle ? selectedVehicle.plate : 'Select a vehicle from fleet'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center shrink-0">
                    <UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {selectedDriver ? selectedDriver.name : 'No Driver Assigned'}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                      {selectedDriver ? `Pilot Rating: ${selectedDriver.rating}★` : 'Auto-dispatch queue'}
                    </p>
                  </div>
                </div>
              </div>

              {/* ETA Bar */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/50 text-xs">
                <span className="text-[11px] text-indigo-700 dark:text-indigo-300 font-medium flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Target SLA Delivery
                </span>
                <span className="font-bold text-slate-900 dark:text-white font-mono">{formData.eta}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Footer Actions */}
        <div className="sticky -bottom-5 sm:-bottom-6 -mx-5 sm:-mx-6 px-5 sm:px-6 py-3.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3 z-20">
          <div className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>MoRTH AIS-140 GPS Telematics Link Active</span>
          </div>
          <div className="flex items-center gap-2.5 ml-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-indigo-600/25 hover:shadow-indigo-600/35 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer disabled:opacity-50"
            >
              {submitting ? (
                'Processing...'
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  {shipmentToEdit ? 'Save Changes' : 'Authorize & Dispatch Consignment'}
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
