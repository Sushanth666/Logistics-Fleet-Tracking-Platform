# BharatLogix | National Fleet & Logistics Operations Platform

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![Compliance](https://img.shields.io/badge/AIS--140-Certified-emerald)](https://morth.nic.in/)
[![Gateway](https://img.shields.io/badge/ULIP-Integrated-purple)](https://gati-shakti.nic.in/)

**BharatLogix** is an enterprise-grade, real-time logistics operations and fleet telematics platform designed specifically for commercial freight carriers, multi-modal transport operators, and national supply chain dispatchers across India.

The platform unifies live GPS radar tracking, AIS-140 compliance monitoring, driver safety scorecards, shipment lifecycle management, and emergency response into a high-performance command center.

---

## 📌 Executive Summary

Modern logistics across Indian freight corridors (Delhi–Mumbai Expressway, Golden Quadrilateral, NH-44) requires seamless coordination between dispatched consignments, commercial vehicle telemetry, and national regulatory gateways. 

**BharatLogix** delivers a high-contrast, responsive operations interface that enables logistics dispatchers and fleet managers to:
- **Track fleet assets in real-time** with interactive GPS maps, speedometers, and fuel consumption monitors.
- **Ensure regulatory compliance** with built-in AIS-140 GPS standards and Government ULIP (Unified Logistics Interface Platform) verification.
- **Manage drivers and consignments** with digitized freight manifests, safety scorecards, and automated ETA calculation.
- **Respond to critical alerts** such as geofence deviations, speeding, vehicle maintenance flags, and delivery delays.

---

## 🇮🇳 National Compliance & Telematics Integration

BharatLogix comes pre-configured with operational standards tailored for Indian freight:

| Standard / System | Description | Integration Level |
| :--- | :--- | :--- |
| **AIS-140 Telematics** | Ministry of Road Transport & Highways (MoRTH) certified vehicle location tracking (VLTD) and SOS panic button feeds. | Built-in telemetry metrics & device health checks |
| **ULIP Gateway** | Unified Logistics Interface Platform integration linking VAHAN, SARATHI, FASTag, and FOIS. | Interactive National Gateway Modal (`/compliance`) |
| **E-Way Bill & GST** | Real-time consignment validity tracking with automated expiry countdowns. | Dispatched freight manifests & milestone tracker |
| **NETC FASTag** | Electronic toll deduction tracking across national toll plazas. | Route expenses & corridor waypoint verification |
| **IST Operations Clock** | Indian Standard Time (UTC+05:30) live clock ticker synchronized with dispatch schedules. | Sidebar & desktop telemetry feeds |

---

## 🌟 Core Modules & Platform Capabilities

### 1. Operations Command Center (`/`)
- **Executive KPIs**: Real-time counters for active vehicles, drivers on duty, en-route consignments, and critical incidents.
- **Fleet Utilization Engine**: Donut chart visualizing asset allocation (*In Transit*, *Idle / Standby*, *Under Maintenance*).
- **Delivery SLA Trends**: Analytics tracking on-time performance against contractual delivery benchmarks.
- **Live Dispatched Feed**: Instant access to ongoing shipments with transit progress bars and dynamic ETAs.

### 2. Live GPS Telematics Radar (`/tracking`)
- **Interactive Leaflet Mapping**: Powered by Carto Dark Matter and High-Contrast Street view tiles.
- **Simulated Fleet Telemetry**: Real-time vehicle coordinate drift, speed fluctuations, fuel decay, and engine temperature.
- **Heads-Up Display (HUD)**: Speedometer gauge, battery percentage, engine coolant monitoring, and asset health ratings.
- **Corridor Polyline Waypoints**: Visualizes pickup hubs, current GPS coordinates, and drop-off destinations.

### 3. Commercial Vehicle Fleet (`/vehicles`)
- **Asset Registry**: Detailed catalog of commercial trucks, electric freight vans, reefer containers, and heavy haulers.
- **Telemetry Drawer**: In-depth inspection sheet displaying service history, odometer readings, and diagnostic error codes.
- **Vehicle Registration Modal**: Add or edit vehicles with custom capacity, fuel specifications, and assigned depots.

### 4. Driver Roster & Safety Scorecards (`/drivers`)
- **Directory**: Driver roster featuring Commercial Driver License (CDL) credentials, phone numbers, and duty states.
- **Safety Scorecards**: Analytics evaluating speed compliance, harsh braking frequency, and Hours of Service (HOS).
- **Duty Toggle**: Instant status toggles (*On Route*, *Available*, *On Break*, *Off Duty*).

### 5. Freight Consignments & Shipments (`/shipments`)
- **Manifest Management**: Create, edit, and dispatch consignments with cargo descriptions, priority flags, and tonnages.
- **Journey Timeline Tracker**: Visual milestone roadmap tracking warehouse departure, expressway checkpoints, and consignee signoffs.
- **Carrier Assignment**: Link freight directly to licensed vehicles and available drivers.

### 6. Incident Management & Alerts (`/alerts`)
- **Categorized Feeds**: Filter between delayed shipments, mechanical maintenance warnings, and route advisories.
- **Severity Tiers**: Instant color-coded classification (*Critical*, *Warning*, *Info*).
- **Actions**: Mark alerts as acknowledged, clear notifications, or filter by unread status.

### 7. Universal Command Palette (`Ctrl + K`)
- Omnisearch shortcut (`Ctrl + K` or `Cmd + K`) enabling keyboard-driven navigation across vehicles, shipments, drivers, and actions.

### 8. Operator Profile & Platform Settings (`/profile`, `/settings`)
- **Dispatcher Profile**: Customizable operator info, security clearance tiers, and live duty status indicators (*On Duty*, *On Break*, *Off Duty*).
- **System Settings**: Telemetry polling intervals, geofencing alert sensitivity, speed alert thresholds, and local storage data backups.

---

## 📁 Enterprise Layered Architecture

The project is structured following enterprise React layered design principles with `@/` path aliasing:

```text
src/
├── api/
│   └── mockData.js          # Realistic logistics seed data & freight corridors
├── components/              # Modular component architecture
│   ├── common/              # Atomic UI design system (Modal, StatCard, Badge, Toast, Skeleton)
│   ├── layout/              # Application shell (Navbar, Sidebar, CommandPalette, UserDropdown)
│   ├── alerts/              # Incident notifications and dropdown drawer
│   ├── compliance/          # National ULIP & AIS-140 compliance modal
│   ├── drivers/             # Driver scorecards, tables, and modal editors
│   ├── map/                 # Leaflet GIS tracking map and telemetry cards
│   ├── shipments/           # Freight tables, modals, and journey timelines
│   ├── vehicles/            # Fleet asset tables, spec drawers, and modals
│   └── index.js             # Unified components barrel export
├── constants/               # Single Source of Truth constants
│   ├── routes.js            # Route URLs and page titles
│   ├── fleet.js             # Domain enums, status codes, and standards
│   └── index.js             # Constants barrel export
├── context/                 # Global state management
│   ├── AuthContext.jsx      # Session state, dispatcher credentials, and duty status
│   ├── FleetContext.jsx     # Fleet CRUD, GPS simulation engine, and alert feed
│   ├── ThemeContext.jsx     # Dark, Light, Violet, Midnight multi-theme engine
│   └── index.js             # Context barrel export
├── hooks/                   # Custom reusable React hooks
│   ├── useAnimatedTabTitle.js # Dynamic browser tab alert indicators
│   └── index.js             # Hooks barrel export
├── pages/                   # View screens and routing targets
│   ├── DashboardPage.jsx
│   ├── TrackingPage.jsx
│   ├── VehiclesPage.jsx
│   ├── DriversPage.jsx
│   ├── ShipmentsPage.jsx
│   ├── AlertsPage.jsx
│   ├── AnalyticsPage.jsx
│   ├── OperatorProfilePage.jsx
│   ├── PlatformSettingsPage.jsx
│   ├── LoginPage.jsx
│   ├── SignupPage.jsx
│   └── index.js             # Pages barrel export
├── routes/                  # Routing architecture
│   ├── AppRoutes.jsx        # Declarative route configuration
│   ├── ProtectedRoute.jsx   # Session authentication guard
│   └── index.js             # Routes barrel export
├── services/                # Business logic & API abstraction
│   ├── fleetService.js      # Asynchronous data service with localStorage caching
│   └── index.js             # Services barrel export
├── utils/                   # Pure utility functions
│   ├── formatters.js        # Currency (₹ INR), distance (km), weight (MT), IST dates
│   ├── statusHelpers.js     # Color badges, severity tags, and telemetry helpers
│   └── index.js             # Utilities barrel export
├── App.jsx                  # Clean application bootstrap
├── index.css                # Global Tailwind styles & design tokens
└── main.jsx                 # React 18 DOM mount entry point
```

---

## 🛠️ Technology Stack

- **Core**: React 19, JavaScript (ESNext), HTML5
- **Build System**: Vite 8 with Hot Module Replacement (HMR)
- **Styling**: Tailwind CSS 3.4 with custom CSS variable design tokens
- **Routing**: React Router 7 (`BrowserRouter`, `Routes`, `Route`, `Outlet`, `Navigate`)
- **GIS Mapping**: Leaflet 1.9 & React-Leaflet (`MapContainer`, `TileLayer`, `Marker`, `Polyline`, `divIcon`)
- **Data Visualization**: Recharts (`ResponsiveContainer`, `BarChart`, `PieChart`, `AreaChart`)
- **Icons**: Lucide React
- **Portals**: React DOM Portal for top-layer modal window stacking

---

## ⚡ Quick Start & Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Local Development

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd "Logistics & Fleet Tracking Platform"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```
   The production-ready assets will be bundled in the `dist/` directory.

---

## 🔐 Demo Credentials

The platform includes mock session persistence so you can test authentication immediately:

- **Email**: `akash.barik@bharatlogix.in`
- **Password**: Any password (simulated authentication)
- **Default Role**: Operations Lead & AIS-140 Dispatch Admin
- **Station**: Mumbai Central Freight Dispatch Hub, MH

*(You can also use `/signup` to register a new operator account or edit your details in `/profile`.)*

---

## 📄 License

This project is licensed under the **MIT License**. Built for enterprise logistics management and commercial fleet tracking operations.
