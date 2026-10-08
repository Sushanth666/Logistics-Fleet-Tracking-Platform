import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useFleet } from '../context/FleetContext';
import { StatCard } from '../components/common/StatCard';
import {
  User,
  Mail,
  Phone,
  Building2,
  ShieldCheck,
  Award,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Activity,
  KeyRound,
  FileText,
  Save,
  Radio,
  Sparkles,
  Zap
} from 'lucide-react';

export const OperatorProfilePage = () => {
  const { user, updateUser } = useAuth();
  const { vehicles, shipments, alerts } = useFleet();

  const [formData, setFormData] = useState({
    name: user?.name || 'Priya Sharma',
    email: user?.email || 'priya.sharma@bharatlogix.in',
    phone: user?.phone || '+91 98201 44582',
    station: user?.station || 'Mumbai Central Freight Dispatch Hub, MH',
    timezone: user?.timezone || 'Indian Standard Time (IST, UTC+05:30)',
    dutyStatus: user?.dutyStatus || 'On Duty'
  });

  const [isSavedToast, setIsSavedToast] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'security' | 'activity'

  const operatorName = formData.name || user?.name || 'Priya Sharma';
  const initials = user?.initials || operatorName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'PS';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDutyChange = (status) => {
    setFormData(prev => ({ ...prev, dutyStatus: status }));
    updateUser({ dutyStatus: status });
    showToast();
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUser(formData);
    showToast();
  };

  const showToast = () => {
    setIsSavedToast(true);
    setTimeout(() => setIsSavedToast(false), 3000);
  };

  const recentOperatorActions = [
    {
      id: 'act-1',
      action: 'Authorized Route Optimization',
      target: 'VEH-101 (Tata Prima 5530.S) - NH-48 Express Bypass',
      time: '12 mins ago',
      category: 'telematics',
      status: 'Applied'
    },
    {
      id: 'act-2',
      action: 'Acknowledged Critical Temperature Alert',
      target: 'VEH-104 (Eicher Pro 6035) - Ranipet Tollway',
      time: '34 mins ago',
      category: 'alert',
      status: 'Resolved'
    },
    {
      id: 'act-3',
      action: 'Dispatched High-Priority Pharmaceutical Freight',
      target: 'SHP-8822 (Sanand Auto Logistics Hub)',
      time: '1 hour ago',
      category: 'dispatch',
      status: 'En Route'
    },
    {
      id: 'act-4',
      action: 'Assigned Relief Driver Gurpreet Dhillon',
      target: 'VEH-106 (Mahindra Blazo X 49)',
      time: '2 hours ago',
      category: 'driver',
      status: 'Confirmed'
    },
    {
      id: 'act-5',
      action: 'Telemetry Health Clearance Check',
      target: 'All 8 Active National Fleet Units',
      time: '3 hours ago',
      category: 'system',
      status: 'Passed (100%)'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Toast Notification */}
      {isSavedToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-emerald-600 text-white font-semibold text-xs shadow-2xl shadow-emerald-500/30 animate-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-white" />
          <span>Operator Profile & Session Settings saved successfully!</span>
        </div>
      )}

      {/* Header Banner - Image 2 Refined with Image 4 StatCard Design Archetype */}
      <div className="group relative overflow-hidden rounded-3xl p-6 lg:p-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
        {/* Top Radiant Highlight Bar (Signature StatCard design from Image 4) */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 opacity-90 group-hover:opacity-100 transition-opacity" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-1">
          <div className="flex items-center gap-5">
            {/* Avatar Badge with gradient ring */}
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-purple-600 via-fuchsia-600 to-pink-500 p-0.5 shadow-xl shadow-purple-600/20">
                <div className="w-full h-full rounded-[14px] bg-white dark:bg-slate-900 flex items-center justify-center font-black text-2xl text-purple-700 dark:text-purple-300">
                  {initials}
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 flex items-center justify-center shadow-sm" title="Active Telematics Session">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {operatorName}
                </h1>

                {/* Operations Lead Badge with beacon dot */}
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 text-purple-800 border border-purple-200 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/30 shadow-sm inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400" />
                  {user?.role || 'Operations Lead'}
                </span>

                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700">
                  ID: OP-7492
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  {formData.email}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-pink-600 dark:text-pink-400" />
                  {formData.station}
                </span>
              </div>
            </div>
          </div>

          {/* Duty Status Selector */}
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950/60 p-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
            {['On Duty', 'On Break', 'Off Duty'].map((status) => {
              const isSelected = formData.dutyStatus === status;
              return (
                <button
                  key={status}
                  onClick={() => handleDutyChange(status)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? status === 'On Duty'
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                        : status === 'On Break'
                        ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30'
                        : 'bg-slate-700 text-white'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        status === 'On Duty'
                          ? 'bg-emerald-300'
                          : status === 'On Break'
                          ? 'bg-amber-300'
                          : 'bg-slate-400'
                      }`}
                    />
                    {status}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/80">
          {[
            { id: 'overview', label: 'Operator Overview & Credentials', icon: User },
            { id: 'security', label: 'Security & Telematics Access', icon: ShieldCheck },
            { id: 'activity', label: 'Audit Activity Log', icon: Activity }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-md shadow-purple-600/20'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* KPI Performance Metrics with Animated StatCards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-3 lg:gap-3.5 xl:gap-4">
        <StatCard
          title="Total Dispatches"
          value="384"
          subtext="100% On Schedule"
          change={100}
          isPositive={true}
          colorScheme="violet"
          icon={Zap}
        />
        <StatCard
          title="Dispatch SLA Rate"
          value="99.4%"
          subtext="Top Tier Operator"
          colorScheme="rose"
          icon={Award}
        />
        <StatCard
          title="Incidents Resolved"
          value="48"
          subtext="Avg response: 1.4m"
          colorScheme="emerald"
          icon={ShieldCheck}
        />
        <StatCard
          title="Assigned Fleet Units"
          value={`${vehicles.length} Units`}
          subtext="Live GPS Monitored"
          colorScheme="cyan"
          icon={Radio}
        />
      </div>

      {/* Tab 1: Overview & Edit Form - Image 1 Refined with Image 4 StatCard Design Archetype */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Edit Form Card (Image 1 Left) */}
          <div className="lg:col-span-2 group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all p-6 lg:p-7 space-y-6">
            {/* Top Radiant Highlight Bar (Signature StatCard design from Image 4) */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 opacity-90 group-hover:opacity-100 transition-opacity" />

            <div className="flex items-start gap-3.5 border-b border-slate-100 dark:border-slate-800 pb-4">
              {/* Tinted Rounded Icon Box */}
              <div className="p-2.5 rounded-2xl border bg-purple-100 text-purple-700 border-purple-200/90 shadow-sm dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/30 shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    Operator Personal & Work Credentials
                  </h2>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Manage your dispatcher profile details, central contact information, and operating headquarters.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Operations Role
                  </label>
                  <input
                    type="text"
                    value={user?.role || 'Operations Lead'}
                    disabled
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-purple-700 dark:text-purple-300 font-semibold cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Dispatch Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Direct Phone Line
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Dispatch Station Hub
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      name="station"
                      value={formData.station}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Operating Timezone
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <select
                      name="timezone"
                      value={formData.timezone}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                    >
                      <option value="Indian Standard Time (IST, UTC+05:30)">Indian Standard Time (IST, UTC+05:30) - Default</option>
                      <option value="UTC (Coordinated Universal Time)">UTC (Universal Time)</option>
                      <option value="Gulf Standard Time (GST, UTC+4)">Gulf Standard Time (GST, Dubai)</option>
                      <option value="Singapore Time (SGT, UTC+8)">Singapore Time (SGT)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-xs tracking-wide bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:opacity-95 shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>

          {/* Side Summary & Badges - Image 1 Right */}
          <div className="space-y-6">
            {/* Certifications & Clearances Card */}
            <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all p-6 space-y-4">
              {/* Top Radiant Highlight Bar (Signature StatCard design from Image 4) */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-400 opacity-90 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl border bg-emerald-100 text-emerald-800 border-emerald-200/90 shadow-sm dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Certifications & Clearances
                    </h3>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Verified Government & Logistics Credentials</p>
                </div>
              </div>

              <div className="space-y-3 pt-1">
                {/* Item 1 */}
                <div className="p-3.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/30 flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300 shrink-0 mt-0.5 shadow-sm">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      <p className="text-xs font-bold text-slate-900 dark:text-white">Tier 3 Telematics Lead</p>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                      Authorized for high-risk route changes, override dispatches, and emergency telemetry halts.
                    </p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 shrink-0 mt-0.5 shadow-sm">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <p className="text-xs font-bold text-slate-900 dark:text-white">MoRTH & AIS-140 National Logistics Certified</p>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                      Compliant with Ministry of Road Transport & Highways guidelines, FASTag & E-Way Bill dispatch standards.
                    </p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300 shrink-0 mt-0.5 shadow-sm">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <p className="text-xs font-bold text-slate-900 dark:text-white">HAZMAT Clearance Level 2</p>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                      Certified to dispatch hazardous goods & temperature-controlled pharmaceutical cargo.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Shift Session Card */}
            <div className="group relative overflow-hidden p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all space-y-3">
              {/* Top Radiant Highlight Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 opacity-90 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-500" />
                  <span className="text-xs font-bold tracking-wider uppercase text-cyan-700 dark:text-cyan-300">
                    Active Shift Session
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  Live Session
                </span>
              </div>

              <h4 className="text-xl font-black text-slate-900 dark:text-white">
                Dispatch Shift #884
              </h4>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Logged in since 06:14 AM IST • Connected via BharatLogix Fleet Engine v2.4 (Encrypted TLS 1.3)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Security & Authorization */}
      {activeTab === 'security' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group relative overflow-hidden p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all space-y-5">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl border bg-purple-100 text-purple-700 border-purple-200/90 shadow-sm dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/30 shrink-0">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Access Credentials & 2FA</h3>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Multi-Factor Security Status</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Hardware Key / TOTP 2FA</p>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">Enabled (YubiKey 5 NFC)</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300">
                  Protected
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Password Expiry</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Changed 18 days ago • 72 days remaining</p>
                </div>
                <button
                  onClick={() => alert('Password reset verification link sent to your operator email.')}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Change
                </button>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Active Session Token</p>
                  <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...</p>
                </div>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  Valid
                </span>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all space-y-5">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-400 opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl border bg-emerald-100 text-emerald-800 border-emerald-200/90 shadow-sm dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Security Audit Policy</h3>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">SOC-2 Type II Compliance Tracking</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <p>
                As an <strong>Operations Lead</strong>, every telematics modification, vehicle route adjustment, and shipment cancellation is logged to an immutable SOC-2 audit ledger.
              </p>
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Audit Node:</span>
                  <span className="font-mono text-purple-600 dark:text-purple-400">in-central-lead-node-01</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Last Telemetry Sync:</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">Live (3.0s ping)</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Role Authority:</span>
                  <span className="text-purple-700 dark:text-purple-300 font-bold">Unrestricted Dispatch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Recent Activity Log */}
      {activeTab === 'activity' && (
        <div className="group relative overflow-hidden p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all space-y-5">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 opacity-90 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl border bg-purple-100 text-purple-700 border-purple-200/90 shadow-sm dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/30 shrink-0">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Operations Lead Action Stream
                  </h2>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Real-time chronological log of actions executed under {operatorName}'s dispatcher session.
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/30">
              Live Feed
            </span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {recentOperatorActions.map((item) => (
              <div key={item.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 px-2 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold text-xs shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{item.action}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.target}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30">
                    {item.status}
                  </span>
                  <span className="text-[11px] text-slate-400 whitespace-nowrap">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
