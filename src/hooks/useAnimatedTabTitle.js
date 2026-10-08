import { useEffect, useRef } from 'react';
import { useFleet } from '../context/FleetContext';

/**
 * useAnimatedTabTitle
 * Creates a smooth moving marquee animation for the browser tab title
 * reflecting live fleet telematics, en-route vehicles, and platform status.
 */
export const useAnimatedTabTitle = () => {
  const {
    vehicles,
    inTransitVehiclesCount,
    activeShipmentsCount,
    unreadAlertsCount,
    isSimulationActive
  } = useFleet();

  const animationRef = useRef(null);
  const positionRef = useRef(0);

  useEffect(() => {
    // Construct the live operational status ticker string
    const statusBeacon = isSimulationActive ? '🟢 Live GPS' : '⏸️ GPS Paused';
    const alertPart = unreadAlertsCount > 0 ? `🚨 ${unreadAlertsCount} Alerts` : '⚡ 99.4% SLA';
    const enRoutePart = `🚛 ${inTransitVehiclesCount}/${vehicles.length || 8} En Route`;
    const shipmentPart = `📦 ${activeShipmentsCount} Shipments`;

    const marqueeText = ` 🇮🇳 BharatLogix India  •  ${enRoutePart}  •  ${shipmentPart}  •  ${statusBeacon}  •  ${alertPart}  •  📡 Pan-India Freight Radar  • `;

    let currentPos = positionRef.current % marqueeText.length;

    // Moving marquee animation interval
    const interval = setInterval(() => {
      // If the document is hidden/backgrounded, show an attention badge
      if (document.hidden) {
        if (unreadAlertsCount > 0) {
          document.title = `🔔 (${unreadAlertsCount}) Active Alerts | BharatLogix`;
        } else {
          document.title = `📍 [${inTransitVehiclesCount} En Route] BharatLogix Live`;
        }
        return;
      }

      // Smooth moving marquee rotation
      const animatedTitle =
        marqueeText.substring(currentPos) + marqueeText.substring(0, currentPos);

      document.title = animatedTitle;
      currentPos = (currentPos + 1) % marqueeText.length;
      positionRef.current = currentPos;
    }, 280);

    return () => {
      clearInterval(interval);
    };
  }, [
    vehicles.length,
    inTransitVehiclesCount,
    activeShipmentsCount,
    unreadAlertsCount,
    isSimulationActive
  ]);
};
