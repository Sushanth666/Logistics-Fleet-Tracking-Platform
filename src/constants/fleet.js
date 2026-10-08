/**
 * Fleet & Logistics Domain Constants
 */
export const VEHICLE_STATUS = {
  IN_TRANSIT: 'In Transit',
  IDLE: 'Idle',
  MAINTENANCE: 'Maintenance',
  DELAYED: 'Delayed',
};

export const SHIPMENT_STATUS = {
  IN_TRANSIT: 'In Transit',
  DELIVERED: 'Delivered',
  PENDING: 'Pending',
  EXCEPTION: 'Exception',
};

export const ALERT_SEVERITY = {
  CRITICAL: 'Critical',
  WARNING: 'Warning',
  INFO: 'Info',
};

export const COMPLIANCE_STANDARDS = {
  AIS_140: 'AIS-140 Certified (MORTH/ARAI)',
  ULIP: 'Unified Logistics Interface Platform (ULIP)',
  FASTAG: 'NETC FASTag Electronic Toll Collection',
  E_WAY_BILL: 'National E-Way Bill Portal Integration',
};
