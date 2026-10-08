import { INITIAL_VEHICLES, INITIAL_DRIVERS, INITIAL_SHIPMENTS, INITIAL_ALERTS, FLEET_METRICS } from '../api/mockData';

// Keys for localStorage caching so user changes persist across page reloads
const STORAGE_KEYS = {
  VEHICLES: 'bharatlogix_vehicles_v1',
  DRIVERS: 'bharatlogix_drivers_v1',
  SHIPMENTS: 'bharatlogix_shipments_v1',
  ALERTS: 'bharatlogix_alerts_v1',
  METRICS: 'bharatlogix_metrics_v1'
};

const getStored = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn(`Error reading ${key} from storage:`, e);
    return fallback;
  }
};

const setStored = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Error writing ${key} to storage:`, e);
  }
};

// Helper for simulating async API response with network latency
const simulateNetwork = (data, delay = 250) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

export const fleetService = {
  // --- Vehicles ---
  async getVehicles() {
    const data = getStored(STORAGE_KEYS.VEHICLES, INITIAL_VEHICLES);
    return simulateNetwork([...data]);
  },

  async addVehicle(vehicle) {
    const current = getStored(STORAGE_KEYS.VEHICLES, INITIAL_VEHICLES);
    const newVehicle = {
      ...vehicle,
      id: `VEH-${Math.floor(100 + Math.random() * 900)}`,
      status: vehicle.status || 'idle',
      odometer: Number(vehicle.odometer) || 0,
      fuelLevel: Number(vehicle.fuelLevel) || 100,
      healthScore: Number(vehicle.healthScore) || 98,
      speed: 0,
      location: vehicle.location || {
        lat: 19.2812,
        lng: 73.0483,
        address: "Bhiwandi Freight Terminal Hub, Mumbai, MH",
        heading: 0
      }
    };
    const updated = [newVehicle, ...current];
    setStored(STORAGE_KEYS.VEHICLES, updated);
    return simulateNetwork(newVehicle);
  },

  async updateVehicle(id, updates) {
    const current = getStored(STORAGE_KEYS.VEHICLES, INITIAL_VEHICLES);
    const updated = current.map(v => v.id === id ? { ...v, ...updates } : v);
    setStored(STORAGE_KEYS.VEHICLES, updated);
    const modified = updated.find(v => v.id === id);
    return simulateNetwork(modified);
  },

  async deleteVehicle(id) {
    const current = getStored(STORAGE_KEYS.VEHICLES, INITIAL_VEHICLES);
    const updated = current.filter(v => v.id !== id);
    setStored(STORAGE_KEYS.VEHICLES, updated);
    return simulateNetwork(true);
  },

  // --- Drivers ---
  async getDrivers() {
    const data = getStored(STORAGE_KEYS.DRIVERS, INITIAL_DRIVERS);
    return simulateNetwork([...data]);
  },

  async addDriver(driver) {
    const current = getStored(STORAGE_KEYS.DRIVERS, INITIAL_DRIVERS);
    const newDriver = {
      ...driver,
      id: `DRV-${String(current.length + 1).padStart(2, '0')}`,
      status: driver.status || 'available',
      rating: 5.0,
      totalDeliveries: 0,
      milesLogged: 0,
      safetyScore: 98,
      onTimeDeliveryRate: 100,
      avatar: driver.avatar || '/assets/drivers/drv-01.jpg'
    };
    const updated = [newDriver, ...current];
    setStored(STORAGE_KEYS.DRIVERS, updated);
    return simulateNetwork(newDriver);
  },

  async updateDriver(id, updates) {
    const current = getStored(STORAGE_KEYS.DRIVERS, INITIAL_DRIVERS);
    const updated = current.map(d => d.id === id ? { ...d, ...updates } : d);
    setStored(STORAGE_KEYS.DRIVERS, updated);
    const modified = updated.find(d => d.id === id);
    return simulateNetwork(modified);
  },

  async deleteDriver(id) {
    const current = getStored(STORAGE_KEYS.DRIVERS, INITIAL_DRIVERS);
    const updated = current.filter(d => d.id !== id);
    setStored(STORAGE_KEYS.DRIVERS, updated);
    return simulateNetwork(true);
  },

  // --- Shipments ---
  async getShipments() {
    const data = getStored(STORAGE_KEYS.SHIPMENTS, INITIAL_SHIPMENTS);
    return simulateNetwork([...data]);
  },

  async addShipment(shipment) {
    const current = getStored(STORAGE_KEYS.SHIPMENTS, INITIAL_SHIPMENTS);
    const newShipment = {
      ...shipment,
      id: `SHP-${Math.floor(8800 + Math.random() * 1000)}`,
      status: shipment.status || 'pending',
      currentProgressPercent: 0,
      events: [
        {
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
          title: "Shipment Manifest Created",
          status: "completed"
        }
      ]
    };
    const updated = [newShipment, ...current];
    setStored(STORAGE_KEYS.SHIPMENTS, updated);
    return simulateNetwork(newShipment);
  },

  async updateShipment(id, updates) {
    const current = getStored(STORAGE_KEYS.SHIPMENTS, INITIAL_SHIPMENTS);
    const updated = current.map(s => s.id === id ? { ...s, ...updates } : s);
    setStored(STORAGE_KEYS.SHIPMENTS, updated);
    const modified = updated.find(s => s.id === id);
    return simulateNetwork(modified);
  },

  async deleteShipment(id) {
    const current = getStored(STORAGE_KEYS.SHIPMENTS, INITIAL_SHIPMENTS);
    const updated = current.filter(s => s.id !== id);
    setStored(STORAGE_KEYS.SHIPMENTS, updated);
    return simulateNetwork(true);
  },

  // --- Alerts ---
  async getAlerts() {
    const data = getStored(STORAGE_KEYS.ALERTS, null);
    // If no data is stored or alerts were cleared/empty, populate the 6 alerts
    if (!data || !Array.isArray(data) || data.length === 0) {
      setStored(STORAGE_KEYS.ALERTS, INITIAL_ALERTS);
      return simulateNetwork([...INITIAL_ALERTS]);
    }
    return simulateNetwork([...data]);
  },

  async markAlertAsRead(id) {
    const current = getStored(STORAGE_KEYS.ALERTS, INITIAL_ALERTS);
    const updated = current.map(a => a.id === id ? { ...a, read: true } : a);
    setStored(STORAGE_KEYS.ALERTS, updated);
    return simulateNetwork(updated);
  },

  async markAllAlertsRead() {
    const current = getStored(STORAGE_KEYS.ALERTS, INITIAL_ALERTS);
    const updated = current.map(a => ({ ...a, read: true }));
    setStored(STORAGE_KEYS.ALERTS, updated);
    return simulateNetwork(updated);
  },

  async clearAlerts() {
    setStored(STORAGE_KEYS.ALERTS, []);
    return simulateNetwork([]);
  },

  async restoreDefaultAlerts() {
    setStored(STORAGE_KEYS.ALERTS, INITIAL_ALERTS);
    return simulateNetwork([...INITIAL_ALERTS]);
  },

  // Reset to initial mock dataset
  async resetAllData() {
    localStorage.removeItem(STORAGE_KEYS.VEHICLES);
    localStorage.removeItem(STORAGE_KEYS.DRIVERS);
    localStorage.removeItem(STORAGE_KEYS.SHIPMENTS);
    localStorage.removeItem(STORAGE_KEYS.ALERTS);
    return simulateNetwork(true);
  }
};
