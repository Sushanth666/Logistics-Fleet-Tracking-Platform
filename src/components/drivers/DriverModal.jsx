import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '../common/Modal';
import { useFleet } from '../../context/FleetContext';
import {
  User,
  Mail,
  Phone,
  Award,
  ShieldCheck,
  Truck,
  Calendar,
  CreditCard,
  Sparkles,
  QrCode,
  FileCheck,
  CheckCircle2,
  Clock,
  Star,
  Activity,
  AlertCircle,
  Upload,
  Camera,
  Trash2,
  Check,
  Image as ImageIcon
} from 'lucide-react';

const DRIVER_PRESETS = [
  {
    name: "Vikram Malhotra",
    email: "vikram.m@bharatlogix.in",
    phone: "+91 98201 44810",
    licenseNumber: "DL-04-2021-99238",
    licenseType: "Commercial Class A",
    experienceYears: 12,
    avatar: "/assets/drivers/drv-01.jpg",
    status: "available",
    tag: "Heavy Multi-Axle Captain"
  },
  {
    name: "Gurpreet Singh",
    email: "gurpreet.s@bharatlogix.in",
    phone: "+91 98112 55902",
    licenseNumber: "PB-10-2019-48201",
    licenseType: "Commercial Class A - HazMat",
    experienceYears: 14,
    avatar: "/assets/drivers/drv-11.jpg",
    status: "available",
    tag: "HazMat Chemical Specialist"
  },
  {
    name: "Kavita Rao",
    email: "kavita.r@bharatlogix.in",
    phone: "+91 98450 12894",
    licenseNumber: "KA-05-2022-77194",
    licenseType: "Commercial Class B - EV Specialized",
    experienceYears: 7,
    avatar: "/assets/drivers/drv-03.jpg",
    status: "available",
    tag: "Clean EV Urban Pilot"
  },
  {
    name: "Rajesh Sharma",
    email: "rajesh.s@bharatlogix.in",
    phone: "+91 98290 33819",
    licenseNumber: "RJ-14-2020-63910",
    licenseType: "Commercial Class A - Tanker",
    experienceYears: 10,
    avatar: "/assets/drivers/drv-04.jpg",
    status: "available",
    tag: "Interstate Express Master"
  }
];

export const DriverModal = ({ isOpen, onClose, driverToEdit = null }) => {
  const { addDriver, updateDriver, vehicles } = useFleet();
  const fileInputRef = useRef(null);

  const [uploadFileName, setUploadFileName] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'available',
    licenseNumber: '',
    licenseType: 'Commercial Class A',
    licenseExpiry: '2029-12-31',
    experienceYears: 8,
    assignedVehicleId: '',
    avatar: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (driverToEdit) {
      setFormData({
        name: driverToEdit.name || '',
        email: driverToEdit.email || '',
        phone: driverToEdit.phone || '',
        status: driverToEdit.status || 'available',
        licenseNumber: driverToEdit.licenseNumber || '',
        licenseType: driverToEdit.licenseType || 'Commercial Class A',
        licenseExpiry: driverToEdit.licenseExpiry || '2029-12-31',
        experienceYears: driverToEdit.experienceYears ?? 8,
        assignedVehicleId: driverToEdit.assignedVehicleId || '',
        avatar: driverToEdit.avatar || ''
      });
      setUploadFileName(driverToEdit.avatar ? 'Current Driver Photo' : '');
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '+91 ',
        status: 'available',
        licenseNumber: '',
        licenseType: 'Commercial Class A',
        licenseExpiry: '2029-12-31',
        experienceYears: 8,
        assignedVehicleId: '',
        avatar: ''
      });
      setUploadFileName('');
    }
    setUploadError('');
    setErrors({});
  }, [driverToEdit, isOpen]);

  const processFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (PNG, JPG, or WEBP)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image exceeds 5MB size limit. Please upload a smaller photo.');
      return;
    }

    setUploadError('');
    setUploadFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target.result;
      setFormData(prev => ({ ...prev, avatar: result }));
      setErrors(prev => ({ ...prev, avatar: null }));
    };
    reader.onerror = () => {
      setUploadError('Failed to read image file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleRemovePhoto = () => {
    setFormData(prev => ({ ...prev, avatar: '' }));
    setUploadFileName('');
    setUploadError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleApplyPreset = (preset) => {
    setFormData(prev => ({
      ...prev,
      name: preset.name,
      email: preset.email,
      phone: preset.phone,
      licenseNumber: preset.licenseNumber,
      licenseType: preset.licenseType,
      experienceYears: preset.experienceYears,
      avatar: preset.avatar,
      status: preset.status
    }));
    setUploadFileName(`${preset.name.toLowerCase().replace(/\s+/g, '_')}.jpg`);
    setUploadError('');
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full driver name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid corporate email required';
    if (!formData.licenseNumber.trim()) errs.licenseNumber = 'Commercial DL license number required';
    if (formData.experienceYears < 1) errs.experienceYears = 'Minimum 1 year experience required';
    if (!formData.avatar) errs.avatar = 'Driver photo is required. Please upload a portrait photo.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const assignedVehicle = vehicles.find(v => v.id === formData.assignedVehicleId);
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        status: formData.status,
        licenseNumber: formData.licenseNumber.toUpperCase().trim(),
        licenseType: formData.licenseType,
        licenseExpiry: formData.licenseExpiry,
        experienceYears: Number(formData.experienceYears),
        assignedVehicleId: formData.assignedVehicleId || null,
        assignedVehicleName: assignedVehicle ? assignedVehicle.name : 'None',
        avatar: formData.avatar || '/assets/drivers/drv-01.jpg'
      };

      if (driverToEdit) {
        await updateDriver(driverToEdit.id, payload);
      } else {
        await addDriver(payload);
      }
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const assignedVehicle = vehicles.find(v => v.id === formData.assignedVehicleId);

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20';
      case 'on-route':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200 dark:border-blue-500/20';
      case 'on-break':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'available': return 'Standby / Available';
      case 'on-route': return 'On Active Route';
      case 'on-break': return 'Rest & Break';
      default: return 'Off Duty';
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-5xl"
      title={
        <div className="flex flex-wrap items-center gap-2.5">
          <span>{driverToEdit ? `Edit Pilot Profile: ${driverToEdit.name}` : "Register Commercial Fleet Pilot"}</span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
            <ShieldCheck className="w-3 h-3" /> SARATHI / MoRTH VERIFIED
          </span>
        </div>
      }
      subtitle="Establish commercial driver licensing, duty status verification, telematics pilot link, and asset pairing."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Quick Driver Specialization Presets Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              Popular Pilot Profiles & Specializations (1-Click Auto-Fill)
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {DRIVER_PRESETS.map(preset => {
              const isActive = formData.name === preset.name && formData.licenseNumber === preset.licenseNumber;
              return (
                <button
                  key={preset.licenseNumber}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className={`text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-600/50 text-indigo-900 dark:text-indigo-200 ring-2 ring-indigo-500/20'
                      : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <p className="font-bold truncate">{preset.name}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">{preset.tag}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Split: Form Left (7 cols), Live CDL Pass Right (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Form Column (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* 1. Identity & Credentials */}
            <div className="p-4 rounded-2xl bg-slate-50/60 dark:bg-slate-800/30 border border-slate-200/80 dark:border-slate-800 space-y-3.5">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold">1</span>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Pilot Identity & Licensing
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Full Pilot Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Vikram Malhotra"
                      className="w-full bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 font-medium"
                    />
                  </div>
                  {errors.name && <p className="text-[10px] text-rose-500 font-medium mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Commercial DL Number *
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={formData.licenseNumber}
                      onChange={e => setFormData({ ...formData, licenseNumber: e.target.value.toUpperCase() })}
                      placeholder="e.g. DL-04-2021-99238"
                      className="w-full bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 font-mono font-bold"
                    />
                  </div>
                  {errors.licenseNumber && <p className="text-[10px] text-rose-500 font-medium mt-1">{errors.licenseNumber}</p>}
                </div>
              </div>

              {/* Driver Photo Upload */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                    Driver Photo Upload <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                    MoRTH Digital Photo ID
                  </span>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {formData.avatar ? (
                  <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-sm">
                    <div className="relative shrink-0">
                      <img
                        src={formData.avatar}
                        alt="Uploaded Driver"
                        className="w-14 h-14 rounded-xl object-cover ring-2 ring-indigo-500/40"
                      />
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-white rounded-full flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                        {uploadFileName || "Driver Portrait Photo"}
                      </p>
                      <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 shrink-0" /> Photo attached for driver ID
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-2.5 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-xl transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        Change
                      </button>
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="p-1.5 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer"
                        title="Remove photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all ${
                      isDragging
                        ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30'
                        : 'border-slate-300 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 bg-slate-50/60 dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center gap-1.5">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          Click to upload driver photo <span className="text-slate-400 font-normal">or drag & drop</span>
                        </p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                          PNG, JPG or WEBP (Max 5MB)
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {uploadError && (
                  <p className="text-[11px] text-rose-500 font-medium mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" /> {uploadError}
                  </p>
                )}
                {errors.avatar && (
                  <p className="text-[11px] text-rose-500 font-medium mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" /> {errors.avatar}
                  </p>
                )}
              </div>
            </div>

            {/* 2. Specialization, Experience & Duty Status */}
            <div className="p-4 rounded-2xl bg-slate-50/60 dark:bg-slate-800/30 border border-slate-200/80 dark:border-slate-800 space-y-3.5">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold">2</span>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Qualifications & Duty Status
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    CDL Classification
                  </label>
                  <select
                    value={formData.licenseType}
                    onChange={e => setFormData({ ...formData, licenseType: e.target.value })}
                    className="w-full bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 font-medium"
                  >
                    <option value="Commercial Class A">Commercial Class A (Multi-Axle Combination)</option>
                    <option value="Commercial Class A - HazMat">Commercial Class A - HazMat Certified</option>
                    <option value="Commercial Class A - Tanker">Commercial Class A - Tanker Certified</option>
                    <option value="Commercial Class B">Commercial Class B (Heavy Freight Carrier)</option>
                    <option value="Commercial Class B - EV Specialized">Commercial Class B - EV Specialized</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Driving Experience (Years)
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="number"
                      min="1"
                      max="45"
                      value={formData.experienceYears}
                      onChange={e => setFormData({ ...formData, experienceYears: e.target.value })}
                      className="w-full bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 font-bold"
                    />
                  </div>
                  {errors.experienceYears && <p className="text-[10px] text-rose-500 font-medium mt-1">{errors.experienceYears}</p>}
                </div>
              </div>

              {/* Duty Status Selector */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Initial Pilot Duty Status
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { key: 'available', label: 'Standby / Ready', color: 'emerald' },
                    { key: 'on-route', label: 'On Route', color: 'blue' },
                    { key: 'on-break', label: 'Rest Break', color: 'amber' },
                    { key: 'off-duty', label: 'Off Duty', color: 'slate' }
                  ].map(item => {
                    const isActive = formData.status === item.key;
                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => setFormData({ ...formData, status: item.key })}
                        className={`py-2 px-2.5 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                          isActive
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 3. Contact & Vehicle Allocation */}
            <div className="p-4 rounded-2xl bg-slate-50/60 dark:bg-slate-800/30 border border-slate-200/80 dark:border-slate-800 space-y-3.5">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold">3</span>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Contact Records & Vehicle Allocation
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Corporate Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="pilot@bharatlogix.in"
                      className="w-full bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 font-medium"
                    />
                  </div>
                  {errors.email && <p className="text-[10px] text-rose-500 font-medium mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Direct Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98201 00000"
                      className="w-full bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 font-mono font-medium"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Assigned Fleet Carrier Asset
                </label>
                <div className="relative">
                  <Truck className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <select
                    value={formData.assignedVehicleId}
                    onChange={e => setFormData({ ...formData, assignedVehicleId: e.target.value })}
                    className="w-full bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 font-medium"
                  >
                    <option value="">No Vehicle Assigned (Standby Pool)</option>
                    {vehicles.map(v => (
                      <option key={v.id} value={v.id}>
                        {v.name} • [{v.plate}] — {v.status.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right Preview Column (5 cols) - Live Commercial CDL Pilot Pass */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-50 to-slate-100/70 dark:from-slate-900/70 dark:to-slate-950/70 rounded-2xl p-4 sm:p-5 border border-slate-200/90 dark:border-slate-800 space-y-4 lg:sticky lg:top-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-mono block">
                  GOVT OF INDIA // SARATHI CDL PASS
                </span>
                <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                  {formData.licenseNumber || "PENDING CREDENTIAL"}
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 text-[10px] font-mono font-bold">
                <QrCode className="w-3 h-3" />
                <span>AIS-140 PILOT</span>
              </div>
            </div>

            {/* Pilot Photo & Identity Header */}
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3.5">
              <div className="relative shrink-0">
                {formData.avatar ? (
                  <img
                    src={formData.avatar}
                    alt={formData.name || "Pilot"}
                    className="w-14 h-14 rounded-xl object-cover ring-2 ring-indigo-500/30"
                    onError={(e) => {
                      e.target.src = '/assets/drivers/drv-01.jpg';
                    }}
                  />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-400">
                    <Camera className="w-6 h-6 stroke-[1.5]" />
                  </div>
                )}
                <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 ${
                  formData.status === 'available' ? 'bg-emerald-500' :
                  formData.status === 'on-route' ? 'bg-blue-500' :
                  formData.status === 'on-break' ? 'bg-amber-500' : 'bg-slate-400'
                }`} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    {formData.name || "Commercial Pilot"}
                  </h3>
                  <div className="flex items-center gap-0.5 text-amber-500 text-[10px] font-bold">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>4.9</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {formData.experienceYears} Years Heavy Freight Service
                </p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border ${getStatusColor(formData.status)}`}>
                    <Activity className="w-2.5 h-2.5" />
                    {getStatusBadge(formData.status)}
                  </span>
                </div>
              </div>
            </div>

            {/* Commercial Smart Card License Banner */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white shadow-md relative overflow-hidden">
              <div className="absolute right-0 top-0 opacity-10 pointer-events-none p-2">
                <CreditCard className="w-24 h-24 text-white" />
              </div>
              <div className="relative z-10 space-y-2">
                <div className="flex items-center justify-between text-[10px] text-slate-300 font-mono">
                  <span>REPUBLIC OF INDIA</span>
                  <span>COMMERCIAL DRIVER LICENSE</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">🇮🇳</span>
                  <span className="font-mono text-base font-extrabold tracking-wider text-amber-300">
                    {formData.licenseNumber || "DL-00-0000-00000"}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-700/60 text-[10px] text-slate-300">
                  <span className="truncate max-w-[170px]">{formData.licenseType}</span>
                  <span className="font-mono text-emerald-400">EXP: {formData.licenseExpiry}</span>
                </div>
              </div>
            </div>

            {/* Assigned Vehicle Card */}
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                ASSIGNED CARRIER ASSET
              </span>
              {assignedVehicle ? (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                      {assignedVehicle.name}
                    </p>
                    <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                      {assignedVehicle.plate} • {assignedVehicle.type}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400 italic">
                  <Truck className="w-4 h-4 text-slate-400" />
                  <span>No carrier assigned (Standby Pilot Pool)</span>
                </div>
              )}
            </div>

            {/* Compliance & Telematics Checkpoints */}
            <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between text-emerald-800 dark:text-emerald-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Aadhaar & Police Verification
                </span>
                <span className="font-bold text-[10px] uppercase font-mono">Verified</span>
              </div>
              <div className="flex items-center justify-between text-emerald-800 dark:text-emerald-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Telematics AIS-140 Bio-Link
                </span>
                <span className="font-bold text-[10px] uppercase font-mono">Linked</span>
              </div>
              <div className="flex items-center justify-between text-emerald-800 dark:text-emerald-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Medical & Vision Clearance
                </span>
                <span className="font-bold text-[10px] uppercase font-mono">Cleared</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium text-[11px]">Sarathi Commercial DL Telematics Sync: ACTIVE</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 shadow-md shadow-indigo-600/25 transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2"
            >
              <FileCheck className="w-4 h-4 text-white" />
              <span>{submitting ? 'Registering...' : driverToEdit ? 'Save Driver Changes' : 'Register Commercial Driver'}</span>
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
