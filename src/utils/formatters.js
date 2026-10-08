/**
 * Formatting Utilities for Logistics & Indian Freight Operations
 */

/**
 * Format currency in Indian Rupee format (e.g. ₹1,25,000)
 */
export const formatINR = (amount) => {
  if (amount === undefined || amount === null) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format distance in kilometers (e.g. 1,450 km)
 */
export const formatKm = (km) => {
  if (km === undefined || km === null) return '0 km';
  return `${Number(km).toLocaleString('en-IN')} km`;
};

/**
 * Format weight in metric tonnes or kg
 */
export const formatWeight = (kg) => {
  if (!kg) return '0 kg';
  if (kg >= 1000) {
    return `${(kg / 1000).toFixed(1)} MT`;
  }
  return `${kg} kg`;
};

/**
 * Format timestamp in IST human readable format
 */
export const formatISTDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  });
};
