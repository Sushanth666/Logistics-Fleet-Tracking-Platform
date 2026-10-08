import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFleet } from '../../context/FleetContext';
import {
  Search,
  Truck,
  Package,
  Users,
  Compass,
  Radio,
  ShieldCheck,
  Zap,
  ArrowRight,
  X,
  CornerDownLeft,
  LayoutDashboard,
  Bell,
  BarChart3,
  User,
  Settings,
  Clock
} from 'lucide-react';

export const CommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const navigate = useNavigate();

  const {
    vehicles,
    shipments,
    drivers,
    openGatewayModal,
    toggleSimulation,
    isSimulationActive,
    setSelectedVehicleId
  } = useFleet();

  // Focus input whenever opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Lock body scroll when palette is open
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  // Build searchable items
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    // Navigation links
    const navItems = [
      { id: 'nav-dash', type: 'navigation', label: 'Command Dashboard', sub: 'Executive KPIs, fleet metrics & live feeds', path: '/', icon: LayoutDashboard },
      { id: 'nav-track', type: 'navigation', label: 'Live Telematics Radar Map', sub: 'Real-time GPS tracking & hardware HUD', path: '/tracking', icon: Radio },
      { id: 'nav-veh', type: 'navigation', label: 'Fleet Asset Registry', sub: 'Commercial vehicle management & specs', path: '/vehicles', icon: Truck },
      { id: 'nav-ship', type: 'navigation', label: 'Freight Shipments', sub: 'Manifest lifecycles, active routes & consignments', path: '/shipments', icon: Package },
      { id: 'nav-drv', type: 'navigation', label: 'Driver Directory & CDL', sub: 'Operator rosters & performance scorecards', path: '/drivers', icon: Users },
      { id: 'nav-alt', type: 'navigation', label: 'Incident & Alert Center', sub: 'Delayed transit & maintenance warnings', path: '/alerts', icon: Bell },
      { id: 'nav-ana', type: 'navigation', label: 'Operations Analytics', sub: 'SLA compliance, fuel efficiency & hub throughput', path: '/analytics', icon: BarChart3 },
      { id: 'nav-prof', type: 'navigation', label: 'Operator Profile', sub: 'Dispatcher credentials & duty status', path: '/profile', icon: User },
      { id: 'nav-set', type: 'navigation', label: 'Platform Settings', sub: 'System configurations & telemetry intervals', path: '/settings', icon: Settings }
    ];

    // Quick Actions
    const actionItems = [
      {
        id: 'act-gateway',
        type: 'action',
        label: 'Open MoRTH AIS-140 Gateway Compliance',
        sub: 'Inspect Vahan 4.0, Sarathi & GST E-Way Bill bridges',
        icon: ShieldCheck,
        action: () => openGatewayModal()
      },
      {
        id: 'act-sim',
        type: 'action',
        label: isSimulationActive ? 'Pause Live GPS Telemetry Simulation' : 'Resume Live GPS Telemetry Simulation',
        sub: isSimulationActive ? 'Freeze real-time vehicle movement ticker' : 'Start real-time vehicle movement ticker',
        icon: Zap,
        action: () => toggleSimulation()
      }
    ];

    if (!q) {
      return [
        ...actionItems,
        ...navItems
      ];
    }

    const filteredVehicles = vehicles
      .filter(v =>
        v.name?.toLowerCase().includes(q) ||
        v.plate?.toLowerCase().includes(q) ||
        v.driver?.toLowerCase().includes(q) ||
        v.depot?.toLowerCase().includes(q) ||
        v.class?.toLowerCase().includes(q)
      )
      .slice(0, 5)
      .map(v => ({
        id: `veh-${v.id}`,
        type: 'vehicle',
        label: `${v.name} (${v.plate})`,
        sub: `${v.class} • Driver: ${v.driver || 'Unassigned'} • Depot: ${v.depot}`,
        badge: v.status,
        icon: Truck,
        action: () => {
          setSelectedVehicleId?.(v.id);
          navigate('/tracking');
        }
      }));

    const filteredShipments = shipments
      .filter(s =>
        s.id?.toLowerCase().includes(q) ||
        s.trackingNumber?.toLowerCase().includes(q) ||
        s.cargo?.toLowerCase().includes(q) ||
        s.origin?.city?.toLowerCase().includes(q) ||
        s.destination?.city?.toLowerCase().includes(q) ||
        s.customer?.toLowerCase().includes(q)
      )
      .slice(0, 5)
      .map(s => ({
        id: `ship-${s.id}`,
        type: 'shipment',
        label: `${s.trackingNumber} — ${s.cargo}`,
        sub: `${s.origin?.city} → ${s.destination?.city} • Customer: ${s.customer}`,
        badge: s.status,
        icon: Package,
        path: '/shipments'
      }));

    const filteredDrivers = drivers
      .filter(d =>
        d.name?.toLowerCase().includes(q) ||
        d.license?.toLowerCase().includes(q) ||
        d.assignedVehicle?.toLowerCase().includes(q) ||
        d.phone?.toLowerCase().includes(q)
      )
      .slice(0, 4)
      .map(d => ({
        id: `drv-${d.id}`,
        type: 'driver',
        label: `${d.name} (${d.license})`,
        sub: `Assigned: ${d.assignedVehicle || 'None'} • Score: ${d.score || 95}%`,
        badge: d.status,
        icon: Users,
        path: '/drivers'
      }));

    const filteredNav = navItems.filter(n =>
      n.label.toLowerCase().includes(q) ||
      n.sub.toLowerCase().includes(q)
    );

    const filteredActions = actionItems.filter(a =>
      a.label.toLowerCase().includes(q) ||
      a.sub.toLowerCase().includes(q)
    );

    return [
      ...filteredVehicles,
      ...filteredShipments,
      ...filteredDrivers,
      ...filteredActions,
      ...filteredNav
    ];
  }, [query, vehicles, shipments, drivers, isSimulationActive, openGatewayModal, toggleSimulation, setSelectedVehicleId, navigate]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % (results.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + results.length) % (results.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results[selectedIndex]) {
          handleSelect(results[selectedIndex]);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector('[data-selected="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  const handleSelect = (item) => {
    onClose();
    if (item.action) {
      item.action();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-20 px-3 sm:px-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-purple-950/30 overflow-hidden flex flex-col max-h-[82vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/50">
          <Search className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 ml-1 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search vehicles, shipments, drivers, corridors, actions..."
            className="w-full bg-transparent text-sm sm:text-base font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => {
                setQuery('');
                setSelectedIndex(0);
                inputRef.current?.focus();
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[11px] font-mono font-semibold bg-slate-200/80 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-300/80 dark:border-slate-700">
              ESC
            </kbd>
          )}
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          className="flex-1 overflow-y-auto overscroll-contain p-2 space-y-1 divide-y divide-slate-100 dark:divide-slate-800/40"
        >
          {results.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <Search className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600 animate-pulse" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                No matching results found for "{query}"
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Try searching by vehicle plate, shipment ID, driver name, or city.
              </p>
            </div>
          ) : (
            results.map((item, index) => {
              const isSelected = index === selectedIndex;
              const Icon = item.icon || Compass;

              const getTypeColor = (type) => {
                switch (type) {
                  case 'vehicle':
                    return 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/25';
                  case 'shipment':
                    return 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/25';
                  case 'driver':
                    return 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25';
                  case 'action':
                    return 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/25';
                  default:
                    return 'bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/25';
                }
              };

              return (
                <div
                  key={item.id}
                  data-selected={isSelected}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 shadow-xs'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${getTypeColor(item.type)}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-md bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {item.sub}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 hidden sm:inline">
                      {item.type}
                    </span>
                    {isSelected && (
                      <CornerDownLeft className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Guide */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-[10px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-[10px]">↓</kbd>
              <span className="ml-1 hidden sm:inline">to navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-[10px]">↵</kbd>
              <span className="ml-1 hidden sm:inline">to select</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-[10px]">esc</kbd>
              <span className="ml-1 hidden sm:inline">to close</span>
            </span>
          </div>

          <span className="text-[10px] font-mono font-semibold text-purple-600 dark:text-purple-400">
            BharatLogix Omnisearch
          </span>
        </div>
      </div>
    </div>
  );
};
