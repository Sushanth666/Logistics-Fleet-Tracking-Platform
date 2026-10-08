import React, { useState } from 'react';
import { useFleet } from '../context/FleetContext';
import { useTheme } from '../context/ThemeContext';
import {
  Settings,
  Radio,
  Sliders,
  Bell,
  Gauge,
  Compass,
  Database,
  RotateCcw,
  Download,
  CheckCircle2,
  Save,
  Volume2,
  VolumeX,
  Shield,
  Layers,
  MapPin,
  Sparkles
} from 'lucide-react';

export const PlatformSettingsPage = () => {
  const { isSimulationActive, toggleSimulation, resetAllData } = useFleet();
  const { themeMode, toggleTheme, isDark } = useTheme();

  // Load saved settings or use defaults
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('bharatlogix_platform_settings');
      return saved
        ? JSON.parse(saved)
        : {
            telemetryInterval: '3s',
            mapDefaultZoom: '6',
            mapTileStyle: 'OpenStreetMap India National Grid',
            overspeedLimit: '80',
            lowFuelThreshold: '20',
            engineTempLimit: '105',
            distanceUnit: 'km',
            volumeUnit: 'liters',
            tempUnit: 'celsius',
            timeFormat: '12h',
            soundAlerts: true,
            browserPush: true,
            driverSms: true,
            dailyDigest: true,
            retentionDays: '60'
          };
    } catch {
      return {
        telemetryInterval: '3s',
        mapDefaultZoom: '6',
        mapTileStyle: 'OpenStreetMap India National Grid',
        overspeedLimit: '80',
        lowFuelThreshold: '20',
        engineTempLimit: '105',
        distanceUnit: 'km',
        volumeUnit: 'liters',
        tempUnit: 'celsius',
        timeFormat: '12h',
        soundAlerts: true,
        browserPush: true,
        driverSms: true,
        dailyDigest: true,
        retentionDays: '60'
      };
    }
  });

  const [activeTab, setActiveTab] = useState('telematics');
  const [showToast, setShowToast] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelectChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = (e) => {
    if (e) e.preventDefault();
    try {
      localStorage.setItem('bharatlogix_platform_settings', JSON.stringify(settings));
    } catch (err) {
      console.warn(err);
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(settings, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `bharatlogix_settings_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-emerald-600 text-white font-semibold text-xs shadow-2xl shadow-emerald-500/30 animate-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-white" />
          <span>Platform telematics & operational settings updated successfully!</span>
        </div>
      )}

      {/* Header Banner - Image 3 Refined with Image 4 StatCard Design Archetype */}
      <div className="group relative overflow-hidden rounded-3xl p-6 lg:p-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
        {/* Top Radiant Highlight Bar (Signature StatCard design from Image 4) */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 opacity-90 group-hover:opacity-100 transition-opacity" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-1">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 text-purple-800 border border-purple-200 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/30 shadow-sm inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400" />
                System Administration
              </span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">BharatLogix Fleet OS v2.4</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Platform & Telematics Settings
            </h1>
            <p className="text-xs sm:text-sm mt-1.5 max-w-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              Configure live telematics ping rates, incident trigger thresholds, regional units, and fleet notification rules.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportData}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs border transition-all cursor-pointer bg-white hover:bg-slate-50 text-slate-700 border-slate-200/90 shadow-sm dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-700"
            >
              <Download className="w-4 h-4 text-slate-500" />
              Export Config
            </button>
            <button
              onClick={handleSaveSettings}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-xs tracking-wide shadow-lg shadow-purple-600/25 hover:opacity-95 transition-all cursor-pointer bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200/80 dark:border-slate-800 pb-3">
        {[
          { id: 'telematics', label: 'Telemetry & GPS Radar', icon: Radio },
          { id: 'thresholds', label: 'Safety & Incident Thresholds', icon: Gauge },
          { id: 'units', label: 'Units & Regional Formats', icon: Sliders },
          { id: 'notifications', label: 'Notification Channels', icon: Bell },
          { id: 'data', label: 'Data & Maintenance', icon: Database }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white shadow-md shadow-purple-600/25'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Telemetry & GPS Radar */}
      {activeTab === 'telematics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: GPS Radar Simulation & Sampling */}
          <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all p-6 space-y-5">
            {/* Top Radiant Highlight Bar (Signature StatCard design from Image 4) */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 opacity-90 group-hover:opacity-100 transition-opacity" />

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl border bg-purple-100 text-purple-700 border-purple-200/90 shadow-sm dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/30 shrink-0">
                <Radio className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    GPS Radar Simulation & Sampling
                  </h3>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Live Vehicle Telemetry Frequency</p>
              </div>
            </div>

            <div className="space-y-4 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  GPS Telemetry Refresh Interval
                </label>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">
                  Controls how frequently active vehicles report latitude, longitude, and speed changes.
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {['1s (Extreme)', '3s (Optimal)', '10s (Eco)'].map(interval => (
                    <button
                      key={interval}
                      onClick={() => handleSelectChange('telemetryInterval', interval)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        settings.telemetryInterval === interval
                          ? 'bg-purple-100 border-purple-400 text-purple-800 dark:bg-purple-600/20 dark:border-purple-500 dark:text-purple-300'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {interval}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Active Simulation Engine</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Live route interpolation on the interactive Leaflet map.
                  </p>
                </div>
                <button
                  onClick={toggleSimulation}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSimulationActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {isSimulationActive ? 'Running' : 'Paused'}
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Map View Layer Defaults */}
          <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all p-6 space-y-5">
            {/* Top Radiant Highlight Bar (Signature StatCard design from Image 4) */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 opacity-90 group-hover:opacity-100 transition-opacity" />

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl border bg-cyan-100 text-cyan-800 border-cyan-200/90 shadow-sm dark:bg-cyan-500/20 dark:text-cyan-300 dark:border-cyan-500/30 shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Map View Layer Defaults
                  </h3>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Tile Provider & Default Viewport</p>
              </div>
            </div>

            <div className="space-y-4 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Default Map Tile Provider
                </label>
                <select
                  value={settings.mapTileStyle}
                  onChange={(e) => handleSelectChange('mapTileStyle', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="CartoDB Dark / Light Adaptive">CartoDB Dark / Light Adaptive (Recommended)</option>
                  <option value="OpenStreetMap Standard">OpenStreetMap Standard</option>
                  <option value="Satellite Hybrid">Satellite Hybrid (High Bandwidth)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Default Map Centering Zoom
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="10"
                    max="16"
                    value={settings.mapDefaultZoom}
                    onChange={(e) => handleSelectChange('mapDefaultZoom', e.target.value)}
                    className="flex-1 accent-purple-600"
                  />
                  <span className="font-mono text-xs font-bold text-purple-600 dark:text-purple-400">
                    Zoom Level {settings.mapDefaultZoom}x
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Safety & Incident Thresholds */}
      {activeTab === 'thresholds' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Overspeed Limit */}
          <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all p-6 space-y-4">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl border bg-rose-100 text-rose-700 border-rose-200/90 shadow-sm dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/30 shrink-0">
                <Gauge className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Overspeed Incident Limit</h4>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Telemetry Speed Alerts</p>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Trigger high-priority alert when vehicle telemetry crosses threshold.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <select
                value={settings.overspeedLimit}
                onChange={(e) => handleSelectChange('overspeedLimit', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="60">60 KM/H (Urban / Hazardous Cargo)</option>
                <option value="80">80 KM/H (MoRTH Highway Limit / AIS-140)</option>
                <option value="100">100 KM/H (National Expressway Limit)</option>
              </select>
            </div>
          </div>

          {/* Card 2: Low Fuel Threshold */}
          <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all p-6 space-y-4">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl border bg-amber-100 text-amber-800 border-amber-200/90 shadow-sm dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30 shrink-0">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Low Fuel Warning Trigger</h4>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Tank Level Depletion</p>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Notify dispatcher when tank percentage falls below threshold.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <select
                value={settings.lowFuelThreshold}
                onChange={(e) => handleSelectChange('lowFuelThreshold', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="15">15% Remaining</option>
                <option value="20">20% Remaining (Standard)</option>
                <option value="25">25% Remaining (Conservative)</option>
              </select>
            </div>
          </div>

          {/* Card 3: Engine Temp Limit */}
          <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all p-6 space-y-4">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl border bg-purple-100 text-purple-700 border-purple-200/90 shadow-sm dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/30 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Engine Temp Critical Limit</h4>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Cooling System Alarms</p>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Threshold for cooling system alert to prevent vehicle breakdown.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <select
                value={settings.engineTempLimit}
                onChange={(e) => handleSelectChange('engineTempLimit', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="95">95°C (Nominal Operating Temp)</option>
                <option value="105">105°C (Manufacturer Max Safety)</option>
                <option value="115">115°C (Critical Overheat Alarm)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Units & Formats */}
      {activeTab === 'units' && (
        <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all max-w-3xl p-6 space-y-6">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-400 opacity-90 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl border bg-emerald-100 text-emerald-800 border-emerald-200/90 shadow-sm dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30 shrink-0">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Display Units & Localization
                </h3>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Regional Standards & Metric Units</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Distance & Speed
              </label>
              <select
                value={settings.distanceUnit}
                onChange={(e) => handleSelectChange('distanceUnit', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="km">Metric (Kilometers, KM/H) - Default India</option>
                <option value="miles">Imperial (Miles, MPH)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Fuel Volume
              </label>
              <select
                value={settings.volumeUnit}
                onChange={(e) => handleSelectChange('volumeUnit', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="liters">Metric Liters (L) - Default India</option>
                <option value="gallons">US Gallons (gal)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Engine Temperature
              </label>
              <select
                value={settings.tempUnit}
                onChange={(e) => handleSelectChange('tempUnit', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="celsius">Celsius (°C) - Default India</option>
                <option value="fahrenheit">Fahrenheit (°F)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Dispatch Time Display
              </label>
              <select
                value={settings.timeFormat}
                onChange={(e) => handleSelectChange('timeFormat', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="12h">12-Hour (AM / PM)</option>
                <option value="24h">24-Hour (Military Time)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Notifications */}
      {activeTab === 'notifications' && (
        <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all max-w-3xl p-6 space-y-5">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 opacity-90 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl border bg-purple-100 text-purple-700 border-purple-200/90 shadow-sm dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/30 shrink-0">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Operations Lead Notification Preferences
                </h3>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Real-Time Chimes & System Dispatches</p>
            </div>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 pt-1">
            {[
              {
                key: 'soundAlerts',
                title: 'Audio Chime on Critical Incidents',
                desc: 'Audible chime for severe engine temperature spikes and overspeed triggers.'
              },
              {
                key: 'browserPush',
                title: 'Browser Desktop Notifications',
                desc: 'Instant notifications when a shipment is delivered or goes delayed.'
              },
              {
                key: 'driverSms',
                title: 'Automated SMS Alerts to Assigned Drivers',
                desc: 'Text driver upon route assignment or emergency bypass change.'
              },
              {
                key: 'dailyDigest',
                title: 'End-of-Shift Operations SLA Digest',
                desc: 'Nightly email summary of fleet utilization and on-time scorecards.'
              }
            ].map(item => (
              <div key={item.key} className="py-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
                </div>
                <button
                  onClick={() => handleToggle(item.key)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                    settings[item.key] ? 'bg-purple-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      settings[item.key] ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Data Management & Reset */}
      {activeTab === 'data' && (
        <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all max-w-3xl p-6 space-y-6">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 opacity-90 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl border bg-rose-100 text-rose-700 border-rose-200/90 shadow-sm dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/30 shrink-0">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Telemetry Storage & Demo State
                </h3>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Baseline Reset & Cache Purge</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/30 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-rose-800 dark:text-rose-300">Reset Demo Data & Telemetry</p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                Restores the initial 8 vehicles, 7 drivers, active shipments, and default alerts to their baseline factory configuration.
              </p>
            </div>
            <button
              onClick={() => {
                if (window.confirm('Reset all fleet vehicles, drivers, and shipments to factory state?')) {
                  resetAllData();
                }
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white transition-colors cursor-pointer shrink-0"
            >
              Reset Data
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
