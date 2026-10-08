/**
 * Application Route Paths & Metadata
 */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  TRACKING: '/tracking',
  SHIPMENTS: '/shipments',
  VEHICLES: '/vehicles',
  DRIVERS: '/drivers',
  ALERTS: '/alerts',
  ANALYTICS: '/analytics',
  PROFILE: '/operator-profile',
  SETTINGS: '/platform-settings',
};

export const PAGE_TITLES = {
  [ROUTES.HOME]: 'Fleet Overview',
  [ROUTES.TRACKING]: 'Live Radar Map',
  [ROUTES.SHIPMENTS]: 'Active Shipments',
  [ROUTES.VEHICLES]: 'Fleet Vehicles',
  [ROUTES.DRIVERS]: 'Driver Operations',
  [ROUTES.ALERTS]: 'System Alerts',
  [ROUTES.ANALYTICS]: 'Operations Analytics',
  [ROUTES.PROFILE]: 'Operator Profile',
  [ROUTES.SETTINGS]: 'Platform Settings',
};
