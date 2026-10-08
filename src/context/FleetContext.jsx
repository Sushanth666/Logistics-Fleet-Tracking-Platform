import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { fleetService } from '../services/fleetService';
import { FLEET_METRICS } from '../api/mockData';

const FleetContext = createContext(null);

export const FleetProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [metrics, setMetrics] = useState(FLEET_METRICS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Selected item state for deep-linking and drawer inspections
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [selectedShipmentId, setSelectedShipmentId] = useState(null);

  // Live simulation ticker for moving vehicles on the map
  const [isSimulationActive, setIsSimulationActive] = useState(true);
  const simulationIntervalRef = useRef(null);

  // National Logistics Gateway & Compliance Center modal state
  const [isGatewayModalOpen, setIsGatewayModalOpen] = useState(false);
  const openGatewayModal = useCallback(() => setIsGatewayModalOpen(true), []);
  const closeGatewayModal = useCallback(() => setIsGatewayModalOpen(false), []);

  // FASTag central fleet wallet
  const [fastagBalance, setFastagBalance] = useState(48250);
  const rechargeFastag = useCallback((amount) => {
    setFastagBalance(prev => prev + amount);
  }, []);

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Initial load
  const loadInitialData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [vData, dData, sData, aData] = await Promise.all([
        fleetService.getVehicles(),
        fleetService.getDrivers(),
        fleetService.getShipments(),
        fleetService.getAlerts()
      ]);
      setVehicles(vData);
      setDrivers(dData);
      setShipments(sData);
      setAlerts(aData);
    } catch (err) {
      console.error('Failed to load fleet data:', err);
      setError('Could not connect to fleet operations service. Showing local cache.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // Live simulation effect
  useEffect(() => {
    if (!isSimulationActive) {
      if (simulationIntervalRef.current) clearInterval(simulationIntervalRef.current);
      return;
    }

    simulationIntervalRef.current = setInterval(() => {
      setVehicles(prevVehicles => {
        return prevVehicles.map(vehicle => {
          if (vehicle.status !== 'in-transit') return vehicle;

          // Minor delta simulation to simulate realistic truck movement on highways
          const speedVariance = (Math.random() - 0.5) * 4;
          const newSpeed = Math.min(72, Math.max(45, Math.round(vehicle.speed + speedVariance)));
          
          // Latitude/longitude micro-drift
          const latDelta = (Math.random() - 0.48) * 0.003;
          const lngDelta = (Math.random() - 0.48) * 0.003;

          const updatedFuel = Math.max(5, +(vehicle.fuelLevel - 0.02).toFixed(1));

          return {
            ...vehicle,
            speed: newSpeed,
            fuelLevel: updatedFuel,
            location: {
              ...vehicle.location,
              lat: +(vehicle.location.lat + latDelta).toFixed(5),
              lng: +(vehicle.location.lng + lngDelta).toFixed(5)
            }
          };
        });
      });
    }, 3500);

    return () => {
      if (simulationIntervalRef.current) clearInterval(simulationIntervalRef.current);
    };
  }, [isSimulationActive]);

  // --- Vehicles CRUD ---
  const addVehicle = async (vehicleData) => {
    try {
      const created = await fleetService.addVehicle(vehicleData);
      setVehicles(prev => [created, ...prev]);
      addToast(`Vehicle ${created.name} (${created.plate}) added to fleet!`, 'success');
      return created;
    } catch (err) {
      addToast('Failed to add vehicle: ' + err.message, 'error');
      throw err;
    }
  };

  const updateVehicle = async (id, updates) => {
    try {
      const updated = await fleetService.updateVehicle(id, updates);
      setVehicles(prev => prev.map(v => v.id === id ? updated : v));
      addToast(`Vehicle ${updated.plate} updated successfully`, 'success');
      return updated;
    } catch (err) {
      addToast('Failed to update vehicle', 'error');
      throw err;
    }
  };

  const deleteVehicle = async (id) => {
    try {
      await fleetService.deleteVehicle(id);
      setVehicles(prev => prev.filter(v => v.id !== id));
      addToast(`Vehicle removed from active registry`, 'info');
      if (selectedVehicleId === id) setSelectedVehicleId(null);
    } catch (err) {
      addToast('Failed to delete vehicle', 'error');
      throw err;
    }
  };

  // --- Drivers CRUD ---
  const addDriver = async (driverData) => {
    try {
      const created = await fleetService.addDriver(driverData);
      setDrivers(prev => [created, ...prev]);
      addToast(`Driver ${created.name} registered successfully`, 'success');
      return created;
    } catch (err) {
      addToast('Failed to register driver', 'error');
      throw err;
    }
  };

  const updateDriver = async (id, updates) => {
    try {
      const updated = await fleetService.updateDriver(id, updates);
      setDrivers(prev => prev.map(d => d.id === id ? updated : d));
      addToast(`Driver ${updated.name} updated`, 'success');
      return updated;
    } catch (err) {
      addToast('Failed to update driver', 'error');
      throw err;
    }
  };

  const deleteDriver = async (id) => {
    try {
      await fleetService.deleteDriver(id);
      setDrivers(prev => prev.filter(d => d.id !== id));
      addToast('Driver removed from active roster', 'info');
    } catch (err) {
      addToast('Failed to remove driver', 'error');
      throw err;
    }
  };

  // --- Shipments CRUD ---
  const addShipment = async (shipmentData) => {
    try {
      const created = await fleetService.addShipment(shipmentData);
      setShipments(prev => [created, ...prev]);
      addToast(`Shipment ${created.id} created and queued for dispatch!`, 'success');
      return created;
    } catch (err) {
      addToast('Failed to create shipment', 'error');
      throw err;
    }
  };

  const updateShipment = async (id, updates) => {
    try {
      const updated = await fleetService.updateShipment(id, updates);
      setShipments(prev => prev.map(s => s.id === id ? updated : s));
      addToast(`Shipment ${id} updated`, 'success');
      return updated;
    } catch (err) {
      addToast('Failed to update shipment', 'error');
      throw err;
    }
  };

  const deleteShipment = async (id) => {
    try {
      await fleetService.deleteShipment(id);
      setShipments(prev => prev.filter(s => s.id !== id));
      addToast(`Shipment ${id} deleted`, 'info');
      if (selectedShipmentId === id) setSelectedShipmentId(null);
    } catch (err) {
      addToast('Failed to delete shipment', 'error');
      throw err;
    }
  };

  // --- Alerts ---
  const markAlertAsRead = async (id) => {
    try {
      const updated = await fleetService.markAlertAsRead(id);
      setAlerts(updated);
    } catch (err) {
      console.error(err);
    }
  };

  const markAllAlertsRead = async () => {
    try {
      const updated = await fleetService.markAllAlertsRead();
      setAlerts(updated);
      addToast('All notifications marked as read', 'info');
    } catch (err) {
      console.error(err);
    }
  };

  const clearAlerts = async () => {
    try {
      const empty = await fleetService.clearAlerts();
      setAlerts(empty);
      addToast('Alerts log cleared', 'info');
    } catch (err) {
      console.error(err);
    }
  };

  const restoreDefaultAlerts = async () => {
    try {
      const restored = await fleetService.restoreDefaultAlerts();
      setAlerts(restored);
      addToast('Restored 6 live fleet telemetry alerts', 'success');
      return restored;
    } catch (err) {
      console.error(err);
    }
  };

  const resetAllData = async () => {
    await fleetService.resetAllData();
    await loadInitialData();
    addToast('System database reset to initial demo configuration', 'info');
  };

  // Derived metrics
  const unreadAlertsCount = alerts.filter(a => !a.read).length;
  const activeShipmentsCount = shipments.filter(s => s.status === 'in-transit' || s.status === 'dispatched').length;
  const deliveredShipmentsCount = shipments.filter(s => s.status === 'delivered').length;
  const delayedShipmentsCount = shipments.filter(s => s.status === 'delayed').length;
  const inTransitVehiclesCount = vehicles.filter(v => v.status === 'in-transit').length;

  const value = {
    vehicles,
    drivers,
    shipments,
    alerts,
    metrics,
    loading,
    error,
    selectedVehicleId,
    setSelectedVehicleId,
    selectedShipmentId,
    setSelectedShipmentId,
    isSimulationActive,
    toggleSimulation: () => setIsSimulationActive(prev => !prev),
    toasts,
    addToast,
    removeToast,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    addDriver,
    updateDriver,
    deleteDriver,
    addShipment,
    updateShipment,
    deleteShipment,
    markAlertAsRead,
    markAllAlertsRead,
    clearAlerts,
    restoreDefaultAlerts,
    resetAllData,
    isGatewayModalOpen,
    openGatewayModal,
    closeGatewayModal,
    fastagBalance,
    rechargeFastag,
    unreadAlertsCount,
    activeShipmentsCount,
    deliveredShipmentsCount,
    delayedShipmentsCount,
    inTransitVehiclesCount,
    refreshData: loadInitialData
  };

  return (
    <FleetContext.Provider value={value}>
      {children}
    </FleetContext.Provider>
  );
};

export const useFleet = () => {
  const context = useContext(FleetContext);
  if (!context) {
    throw new Error('useFleet must be used within a FleetProvider');
  }
  return context;
};
