import React, { useEffect, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { StatusBadge } from '../common/StatusBadge';
import { useTheme } from '../../context/ThemeContext';
import { Fuel, Gauge, User, Package, Navigation, Battery, Compass } from 'lucide-react';

// Robust Error Boundary for Leaflet Map
class MapErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('FleetMap render caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="relative w-full h-full min-h-[400px] rounded-2xl flex flex-col items-center justify-center p-6 bg-slate-900 border border-slate-800 text-center">
          <Compass className="w-12 h-12 text-purple-400 mb-3 animate-spin" />
          <h3 className="text-base font-bold text-white">Live Radar Initializing</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm">
            Telematics coordinate radar is reconnecting. Click below to refresh the map view.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="mt-4 px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 transition-colors shadow-lg shadow-purple-600/30 cursor-pointer"
          >
            Reload Radar Canvas
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const INDIA_CORRIDORS = [
  { id: 'all', label: '🇮🇳 Pan-India', center: [21.7679, 78.8718], zoom: 5 },
  { id: 'west', label: 'Western DFC (Bhiwandi/GJ)', center: [20.8, 73.0], zoom: 7 },
  { id: 'north', label: 'Northern Corridor (NCR/PB)', center: [29.2, 76.6], zoom: 7 },
  { id: 'south', label: 'Southern Hubs (BLR/MAA)', center: [13.1, 78.6], zoom: 7 },
  { id: 'east', label: 'Eastern Corridor (CCU/PAT)', center: [23.6, 86.8], zoom: 7 }
];

// Controller to fly or fit map bounds when selected vehicle or shipment changes
const MapController = ({ selectedVehicle, activeRegion }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedVehicle && selectedVehicle.location) {
      map.flyTo([selectedVehicle.location.lat, selectedVehicle.location.lng], 9, {
        duration: 1.2,
        easeLinearity: 0.25
      });
    }
  }, [selectedVehicle, map]);

  useEffect(() => {
    if (activeRegion) {
      const region = INDIA_CORRIDORS.find(c => c.id === activeRegion);
      if (region) {
        map.flyTo(region.center, region.zoom, {
          duration: 1.0,
          easeLinearity: 0.25
        });
      }
    }
  }, [activeRegion, map]);

  useEffect(() => {
    // Invalidate size on mount and window resize for flawless mobile rendering
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);

    const handleResize = () => {
      map.invalidateSize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [map]);

  return null;
};

// Custom DivIcon generator for modern aesthetics and zero broken PNG dependencies
const createCustomIcon = (vehicle, isSelected) => {
  const isMoving = vehicle.status === 'in-transit';
  const isMaint = vehicle.status === 'maintenance';

  let colorBg = 'bg-blue-600';
  let ringColor = 'ring-blue-400/40';

  if (isMoving) {
    colorBg = 'bg-emerald-500';
    ringColor = 'ring-emerald-400/50';
  } else if (isMaint) {
    colorBg = 'bg-amber-500';
    ringColor = 'ring-amber-400/50';
  }

  const html = `
    <div class="relative flex items-center justify-center">
      ${isMoving ? `<span class="animate-ping absolute inline-flex h-8 w-8 rounded-full ${colorBg} opacity-60"></span>` : ''}
      <div class="relative flex items-center justify-center w-8 h-8 rounded-full ${colorBg} text-white shadow-xl ring-2 ${ringColor} ${isSelected ? 'scale-125 ring-4 ring-white' : ''} transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
          <path d="M15 18H9"/>
          <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/>
          <circle cx="17" cy="18" r="2"/>
          <circle cx="7" cy="18" r="2"/>
        </svg>
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-vehicle-div-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18]
  });
};

const createWaypointIcon = (type, label) => {
  const isPickup = type === 'pickup';
  const color = isPickup ? '#3B82F6' : '#10B981';

  const html = `
    <div class="flex items-center justify-center">
      <div style="background-color: ${color};" class="w-6 h-6 rounded-full text-white flex items-center justify-center font-bold text-[10px] shadow-lg ring-2 ring-white/70">
        ${isPickup ? 'P' : 'D'}
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-waypoint-div-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -14]
  });
};

const FleetMapInner = ({
  vehicles = [],
  shipments = [],
  selectedVehicleId,
  onSelectVehicle,
  mapStyle = 'dark' // 'dark' | 'standard'
}) => {
  const [activeRegion, setActiveRegion] = React.useState('all');

  const selectedVehicle = useMemo(() => {
    return vehicles.find(v => v.id === selectedVehicleId);
  }, [vehicles, selectedVehicleId]);

  // Find associated shipment for route polyline
  const activeShipment = useMemo(() => {
    if (!selectedVehicle) return null;
    return shipments.find(s => s.assignedVehicleId === selectedVehicle.id || s.id === selectedVehicle.currentShipmentId);
  }, [selectedVehicle, shipments]);

  const { isDark } = useTheme();

  // Original OpenStreetMap (OSM) tiles - authentic, free, and zero API key watermarks
  const isLight = !isDark;
  const isNightMap = mapStyle === 'dark';
  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  // Construct route coordinates if active shipment exists
  const routePoints = useMemo(() => {
    if (!activeShipment || !selectedVehicle) return null;
    return [
      [activeShipment.origin.lat, activeShipment.origin.lng],
      [selectedVehicle.location.lat, selectedVehicle.location.lng],
      [activeShipment.destination.lat, activeShipment.destination.lng]
    ];
  }, [activeShipment, selectedVehicle]);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-slate-100 dark:bg-slate-950">
      {/* Floating Corridor Selector Controls */}
      <div className="absolute top-2.5 left-2.5 right-2.5 sm:right-auto z-[1000] flex items-center gap-1.5 p-1.5 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 shadow-lg text-[11px] overflow-x-auto overscroll-contain no-scrollbar">
        {INDIA_CORRIDORS.map(c => (
          <button
            key={c.id}
            onClick={() => setActiveRegion(c.id)}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer shrink-0 whitespace-nowrap ${
              activeRegion === c.id
                ? 'bg-purple-600 text-white shadow-sm font-semibold'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <MapContainer
        key={`leaflet-map-${mapStyle}-${isLight ? 'light' : 'dark'}`}
        center={[21.7679, 78.8718]}
        zoom={5}
        scrollWheelZoom={true}
        attributionControl={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution=""
          url={tileUrl}
          maxZoom={19}
          className={isNightMap ? 'leaflet-tiles-night' : ''}
        />

        <MapController selectedVehicle={selectedVehicle} activeRegion={activeRegion} />

        {/* Route Polyline for selected vehicle */}
        {routePoints && (
          <>
            <Polyline
              positions={routePoints}
              pathOptions={{
                color: '#A855F7',
                weight: 4,
                opacity: 0.85,
                dashArray: '8, 8',
                lineCap: 'round'
              }}
            />
            {/* Origin marker */}
            <Marker
              position={[activeShipment.origin.lat, activeShipment.origin.lng]}
              icon={createWaypointIcon('pickup', activeShipment.origin.city)}
            >
              <Popup>
                <div className="p-1">
                  <p className="text-xs font-bold text-blue-500 dark:text-blue-400">PICKUP HUB</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{activeShipment.origin.city}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{activeShipment.origin.address}</p>
                </div>
              </Popup>
            </Marker>

            {/* Destination marker */}
            <Marker
              position={[activeShipment.destination.lat, activeShipment.destination.lng]}
              icon={createWaypointIcon('delivery', activeShipment.destination.city)}
            >
              <Popup>
                <div className="p-1">
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">DESTINATION DROP-OFF</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{activeShipment.destination.city}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{activeShipment.destination.address}</p>
                  <p className="text-xs text-purple-600 dark:text-purple-400 font-medium mt-1">ETA: {activeShipment.eta}</p>
                </div>
              </Popup>
            </Marker>
          </>
        )}

        {/* Vehicle Markers */}
        {vehicles.map((vehicle) => {
          if (!vehicle.location || !vehicle.location.lat) return null;
          const isSelected = vehicle.id === selectedVehicleId;

          return (
            <Marker
              key={vehicle.id}
              position={[vehicle.location.lat, vehicle.location.lng]}
              icon={createCustomIcon(vehicle, isSelected)}
              eventHandlers={{
                click: () => onSelectVehicle(vehicle.id)
              }}
            >
              <Popup>
                <div className="p-2 space-y-2 min-w-[210px]">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white text-sm block">{vehicle.name}</span>
                      <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 font-semibold">{vehicle.plate}</span>
                    </div>
                    <StatusBadge status={vehicle.status} size="sm" />
                  </div>

                  <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1.5 font-sans">
                    <Navigation className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
                    <span>{vehicle.location.address}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <Gauge className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                      <span>{vehicle.speed} km/h</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <Fuel className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                      <span>{vehicle.fuelLevel}% Diesel</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                      {vehicle.driverName}
                    </span>
                    <button
                      onClick={() => onSelectVehicle(vehicle.id)}
                      className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 cursor-pointer"
                    >
                      Focus Asset →
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export const FleetMap = (props) => (
  <MapErrorBoundary>
    <FleetMapInner {...props} />
  </MapErrorBoundary>
);
