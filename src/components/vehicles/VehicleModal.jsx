import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { useFleet } from '../../context/FleetContext';
import {
  Truck,
  ShieldCheck,
  CreditCard,
  Gauge,
  BatteryCharging,
  Fuel,
  MapPin,
  UserCheck,
  Sparkles,
  Weight,
  Activity,
  FileCheck,
  QrCode,
  Zap,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const VEHICLE_PRESETS = [
  {
    name: "Tata Prima 5530.S #111",
    plate: "MH-04-EB-8472",
    type: "Tata Prima Heavy Hauler",
    payloadCapacity: 35000,
    fuelLevel: 95,
    odometer: 18400,
    healthScore: 98,
    address: "Bhiwandi Freight Gateway Hub, Mumbai, MH",
    tag: "Heavy Interstate Hauler"
  },
  {
    name: "BharatBenz 3528R #112",
    plate: "GJ-01-AX-9912",
    type: "BharatBenz Multi-Axle Carrier",
    payloadCapacity: 28000,
    fuelLevel: 90,
    odometer: 24500,
    healthScore: 96,
    address: "Sanand Industrial Depot, Ahmedabad, GJ",
    tag: "Multi-Axle Express"
  },
  {
    name: "Ashok Leyland 4220 #113",
    plate: "TN-09-CD-3481",
    type: "Ashok Leyland Semi-Trailer",
    payloadCapacity: 32000,
    fuelLevel: 85,
    odometer: 31200,
    healthScore: 97,
    address: "Sriperumbudur Auto Logistics, Chennai, TN",
    tag: "Heavy Semi-Trailer"
  },
  {
    name: "Tata Ultra T.7 EV #114",
    plate: "DL-01-EV-5021",
    type: "Tata Ultra Clean EV Van",
    payloadCapacity: 7500,
    fuelLevel: 100,
    odometer: 8900,
    healthScore: 99,
    address: "Electronic City Depot, Bengaluru, KA",
    tag: "Zero-Emission Green EV"
  }
];

export const VehicleModal = ({ isOpen, onClose, vehicleToEdit = null }) => {
  const { addVehicle, updateVehicle, drivers } = useFleet();

  const [formData, setFormData] = useState({
    name: '',
    plate: '',
    type: 'Tata Prima Heavy Hauler',
    status: 'idle',
    driverId: '',
    fuelLevel: 95,
    odometer: 18500,
    healthScore: 98,
    payloadCapacity: 35000,
    address: 'Bhiwandi Freight Gateway Hub, Mumbai, MH'
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (vehicleToEdit) {
      setFormData({
        name: vehicleToEdit.name || '',
        plate: vehicleToEdit.plate || '',
        type: vehicleToEdit.type || 'Tata Prima Heavy Hauler',
        status: vehicleToEdit.status || 'idle',
        driverId: vehicleToEdit.driverId || '',
        fuelLevel: vehicleToEdit.fuelLevel ?? 95,
        odometer: vehicleToEdit.odometer ?? 0,
        healthScore: vehicleToEdit.healthScore ?? 98,
        payloadCapacity: vehicleToEdit.payloadCapacity ?? 35000,
        address: vehicleToEdit.location?.address || 'Bhiwandi Freight Gateway Hub, Mumbai, MH'
      });
    } else {
      setFormData({
        name: '',
        plate: '',
        type: 'Tata Prima Heavy Hauler',
        status: 'idle',
        driverId: '',
        fuelLevel: 95,
        odometer: 18500,
        healthScore: 98,
        payloadCapacity: 35000,
        address: 'Bhiwandi Freight Gateway Hub, Mumbai, MH'
      });
    }
    setErrors({});
  }, [vehicleToEdit, isOpen]);

  const handleApplyPreset = (preset) => {
    setFormData(prev => ({
      ...prev,
      name: preset.name,
      plate: preset.plate,
      type: preset.type,
      payloadCapacity: preset.payloadCapacity,
      fuelLevel: preset.fuelLevel,
      odometer: preset.odometer,
      healthScore: preset.healthScore,
      address: preset.address
    }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Vehicle model/name is required';
    if (!formData.plate.trim()) errs.plate = 'Registration number plate is required';
    if (formData.fuelLevel < 0 || formData.fuelLevel > 100) errs.fuelLevel = 'Energy/Fuel level must be 0-100%';
    if (formData.odometer < 0) errs.odometer = 'Odometer cannot be negative';
    if (formData.payloadCapacity <= 0) errs.payloadCapacity = 'Payload capacity must be greater than 0';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const assignedDriver = drivers.find(d => d.id === formData.driverId);
      const payload = {
        name: formData.name,
        plate: formData.plate.toUpperCase().trim(),
        type: formData.type,
        status: formData.status,
        driverId: formData.driverId || null,
        driverName: assignedDriver ? assignedDriver.name : 'Unassigned',
        fuelLevel: Number(formData.fuelLevel),
        odometer: Number(formData.odometer),
        healthScore: Number(formData.healthScore),
        payloadCapacity: Number(formData.payloadCapacity),
        location: {
          lat: vehicleToEdit?.location?.lat || 19.2812,
          lng: vehicleToEdit?.location?.lng || 73.0483,
          address: formData.address,
          heading: 0
        }
      };

      if (vehicleToEdit) {
        await updateVehicle(vehicleToEdit.id, payload);
      } else {
        await addVehicle(payload);
      }
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const selectedDriver = drivers.find(d => d.id === formData.driverId);
  const isElectric = formData.type.toLowerCase().includes('ev') || formData.type.toLowerCase().includes('electric');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-5xl"
      title={
        <div className="flex flex-wrap items-center gap-2.5">
          <span>{vehicleToEdit ? `Edit Commercial Asset: ${vehicleToEdit.plate}` : "Register New Fleet Vehicle Asset"}</span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
            <ShieldCheck className="w-3 h-3" /> AIS-140 Compliant
          </span>
        </div>
      }
      subtitle="Establish telematics telemetry, commercial payload ratings, powertrain specifications, and pilot allocation."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Quick Vehicle Config Presets Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              Popular Commercial Truck Configurations (1-Click Auto-Fill)
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {VEHICLE_PRESETS.map(preset => {
              const isActive = formData.name === preset.name && formData.plate === preset.plate;
              return (
                <button
                  key={preset.plate}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className={`text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-600/50 text-indigo-900 dark:text-indigo-200 ring-2 ring-indigo-500/20'
                      : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <p className="font-bold truncate">{preset.name.split('#')[0]}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 font-mono">{preset.plate} • {preset.payloadCapacity / 1000} MT</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Split: Form Left (7 cols), Live Asset Passport Right (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Form Column (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* 1. Asset Model & Number Plate */}
            <div className="p-4 rounded-2xl bg-slate-50/60 dark:bg-slate-800/30 border border-slate-200/80 dark:border-slate-800 space-y-3.5">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold">1</span>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Chassis & Registration Credentials
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Vehicle Model & Asset Code *
                  </label>
                  <div className="relative">
                    <Truck className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Tata Prima 5530.S #115"
                      className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-xl pl-9 pr-3.5 py-2 text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
                    />
                  </div>
                  {errors.name && <p className="text-[11px] text-rose-500 font-medium mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Registration Plate (HSRP) *
                  </label>
                  <div className="relative">
                    <CreditCard className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      value={formData.plate}
                      onChange={e => setFormData({ ...formData, plate: e.target.value.toUpperCase() })}
                      placeholder="e.g. MH-04-EB-8472"
                      className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-xl pl-9 pr-3.5 py-2 text-xs font-mono font-bold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all uppercase"
                    />
                  </div>
                  {errors.plate && <p className="text-[11px] text-rose-500 font-medium mt-1">{errors.plate}</p>}
                </div>
              </div>

              {/* Commercial Class Selection */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Commercial Vehicle Class & Configuration
                </label>
                <select
                  value={formData.type}
                  onChange={e => setFormData({ ...formData, type: e.target.value })}
                  className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                >
                  <option value="Tata Prima Heavy Hauler">Tata Prima Heavy Hauler (5530.S - Tractor Trailer)</option>
                  <option value="BharatBenz Multi-Axle Carrier">BharatBenz Multi-Axle Carrier (3528R - 35 MT)</option>
                  <option value="Ashok Leyland Semi-Trailer">Ashok Leyland Semi-Trailer (AVTR 4220 - 42 MT)</option>
                  <option value="Mahindra Blazo Heavy Hauler">Mahindra Blazo Heavy Hauler (X 49 - FuelSmart)</option>
                  <option value="Eicher Pro Refrigerated Carrier">Eicher Pro Refrigerated Carrier (6028 - Cold-Chain)</option>
                  <option value="Tata Ultra Clean EV Van">Tata Ultra Clean EV Van (T.7 EV - Zero Emissions)</option>
                </select>
              </div>

              {/* Status Segmented Cards */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Initial Operational Readiness
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'idle', label: 'Idle / Standby', desc: 'Ready for route', color: 'text-emerald-600 dark:text-emerald-400' },
                    { id: 'in-transit', label: 'In Transit', desc: 'En route active', color: 'text-indigo-600 dark:text-indigo-400' },
                    { id: 'maintenance', label: 'Maintenance', desc: 'Depot overhaul', color: 'text-amber-600 dark:text-amber-400' }
                  ].map(s => {
                    const isSelected = formData.status === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, status: s.id })}
                        className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-400 dark:border-indigo-500 shadow-xs'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850'
                        }`}
                      >
                        <p className={`text-xs font-bold ${s.color}`}>{s.label}</p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500">{s.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 2. Telematics & Powertrain */}
            <div className="p-4 rounded-2xl bg-slate-50/60 dark:bg-slate-800/30 border border-slate-200/80 dark:border-slate-800 space-y-3.5">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold">2</span>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Powertrain Telemetry & Capacity
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Rated Payload Capacity (kg)
                  </label>
                  <div className="relative">
                    <Weight className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="number"
                      value={formData.payloadCapacity}
                      onChange={e => setFormData({ ...formData, payloadCapacity: e.target.value })}
                      placeholder="e.g. 35000"
                      className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-xl pl-9 pr-3.5 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                    />
                  </div>
                  <span className="text-[10px] text-indigo-600 dark:text-indigo-400 mt-1 block">
                    Equivalent to {(Number(formData.payloadCapacity || 0) / 1000).toFixed(1)} Metric Tonnes (MT)
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    {isElectric ? 'Battery State of Charge (%)' : 'Fuel Tank Level (%)'}
                  </label>
                  <div className="relative">
                    {isElectric ? (
                      <BatteryCharging className="w-4 h-4 absolute left-3 top-3 text-emerald-500" />
                    ) : (
                      <Fuel className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    )}
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.fuelLevel}
                      onChange={e => setFormData({ ...formData, fuelLevel: e.target.value })}
                      className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-xl pl-9 pr-3.5 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Odometer Reading (km)
                  </label>
                  <div className="relative">
                    <Gauge className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="number"
                      min="0"
                      value={formData.odometer}
                      onChange={e => setFormData({ ...formData, odometer: e.target.value })}
                      className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-xl pl-9 pr-3.5 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Diagnostic Health Index (%)
                  </label>
                  <div className="relative">
                    <Activity className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.healthScore}
                      onChange={e => setFormData({ ...formData, healthScore: e.target.value })}
                      className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-xl pl-9 pr-3.5 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Base Depot & Driver Allocation */}
            <div className="p-4 rounded-2xl bg-slate-50/60 dark:bg-slate-800/30 border border-slate-200/80 dark:border-slate-800 space-y-3.5">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold">3</span>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Base Depot Location & Assigned Pilot
                </h4>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Assigned Commercial Hub / Current Bay
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    placeholder="e.g. Bhiwandi Freight Gateway Hub Bay 4, Mumbai, MH"
                    className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-xl pl-9 pr-3.5 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Assign Certified Commercial Pilot
                </label>
                <div className="relative">
                  <select
                    value={formData.driverId}
                    onChange={e => setFormData({ ...formData, driverId: e.target.value })}
                    className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  >
                    <option value="">Unassigned (Standby Pool)</option>
                    {drivers.map(d => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.hub}) - {d.status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right Live Digital Asset Passport Column (5 cols) */}
          <div className="lg:col-span-5 sticky top-0">
            <div className="rounded-2xl bg-slate-50 dark:bg-slate-950/90 border border-slate-200/90 dark:border-slate-800 p-5 shadow-lg relative overflow-hidden space-y-4">
              {/* Subtle background watermark */}
              <div className="absolute -right-8 -bottom-8 opacity-5 pointer-events-none">
                <Truck className="w-48 h-48 text-slate-900 dark:text-white" />
              </div>

              {/* Passport Header */}
              <div className="flex items-start justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-indigo-600 dark:text-indigo-400 font-bold uppercase block">
                    National Fleet Asset Passport
                  </span>
                  <p className="text-sm font-black font-mono tracking-tight text-slate-900 dark:text-white mt-0.5">
                    {vehicleToEdit?.id || 'VEH-2026-NEW'}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
                    <QrCode className="w-2.5 h-2.5" /> FASTag ETC Ready
                  </span>
                </div>
              </div>

              {/* HSRP Number Plate Display */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  <span className="uppercase tracking-wider">HSRP Registration Plate</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold text-[10px] uppercase">
                    ● {formData.status.toUpperCase()}
                  </span>
                </div>

                {/* Indian High-Security Plate Badge */}
                <div className="flex items-center border-2 border-slate-800 dark:border-slate-300 rounded-lg overflow-hidden bg-amber-50 dark:bg-slate-950 shadow-inner">
                  <div className="bg-blue-700 text-white px-2 py-2 flex flex-col items-center justify-center border-r border-slate-800 dark:border-slate-400 shrink-0">
                    <span className="text-[8px] font-extrabold tracking-tighter">IND</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-0.5" />
                  </div>
                  <div className="px-3 py-1 flex-1 text-center">
                    <span className="font-mono text-base font-black tracking-widest text-slate-900 dark:text-white">
                      {formData.plate || "MH-04-EB-8472"}
                    </span>
                  </div>
                </div>

                <p className="text-xs font-bold text-slate-900 dark:text-white truncate mt-1">
                  {formData.name || "Commercial Truck Asset"}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  {formData.type}
                </p>
              </div>

              {/* Telematics Gauges Summary */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Health</p>
                  <p className="font-bold text-emerald-600 dark:text-emerald-400 text-sm mt-0.5">
                    {formData.healthScore}%
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                    {isElectric ? 'Battery' : 'Fuel'}
                  </p>
                  <p className="font-bold text-indigo-600 dark:text-indigo-400 text-sm mt-0.5">
                    {formData.fuelLevel}%
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Odometer</p>
                  <p className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">
                    {((formData.odometer || 0) / 1000).toFixed(0)}k km
                  </p>
                </div>
              </div>

              {/* Payload & Depot Hub */}
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400">
                  <span>Gross Rated Payload</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                    {(Number(formData.payloadCapacity || 0) / 1000).toFixed(1)} Metric Tonnes
                  </span>
                </div>

                <div className="flex items-center gap-2.5 pt-1 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <p className="text-slate-700 dark:text-slate-300 truncate text-[11px]">
                    {formData.address || "Bhiwandi Freight Gateway Hub, Mumbai"}
                  </p>
                </div>
              </div>

              {/* Assigned Pilot Matching */}
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5 shadow-xs">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400">
                  <span>Assigned Commercial Pilot</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    {selectedDriver ? 'ALLOCATED' : 'STANDBY POOL'}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center shrink-0">
                    <UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {selectedDriver ? selectedDriver.name : 'No Driver Assigned'}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                      {selectedDriver ? `${selectedDriver.licenseNumber} • Rating: ${selectedDriver.rating}★` : 'Asset ready in central dispatch pool'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Telematics Link Status */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/50 text-xs">
                <span className="text-[11px] text-indigo-700 dark:text-indigo-300 font-medium flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" /> AIS-140 GPS Telematics
                </span>
                <span className="font-bold text-slate-900 dark:text-white font-mono">10-sec Heartbeat Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Footer Actions */}
        <div className="sticky -bottom-5 sm:-bottom-6 -mx-5 sm:-mx-6 px-5 sm:px-6 py-3.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3 z-20">
          <div className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>MoRTH AIS-140 Fleet Registration Terminal</span>
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
                'Processing Asset...'
              ) : (
                <>
                  <FileCheck className="w-4 h-4" />
                  {vehicleToEdit ? 'Save Asset Changes' : 'Register Asset & Activate GPS'}
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
