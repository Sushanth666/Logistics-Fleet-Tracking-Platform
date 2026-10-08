# BharatLogix | Enterprise Logistics & Fleet Tracking Platform

A modern, production-grade frontend operations platform for managing enterprise logistics, commercial fleet vehicles, CDL drivers, active shipments, live GPS telemetry, and incident response.

Built with **React.js**, **Tailwind CSS**, **React Router v7**, **Leaflet**, and **Recharts**.

---

## 🌟 Key Platform Modules & Capabilities

### 1. Operations Command Dashboard (`/`)
- **Executive KPIs**: Real-time count of total vehicles, on-duty drivers, active shipments, and delay incident alerts.
- **Delivery Performance Analytics**: Interactive bar charts visualizing daily delivered shipments against on-time benchmarks.
- **Fleet Utilization Engine**: Real-time donut chart breaking down in-transit, standby/idle, and maintenance asset distribution.
- **Live Dispatched Shipments Feed**: Quick overview of en-route freight manifests with progress bars and ETA countdowns.
- **Incident Alerts Stream**: Immediate visibility of vehicle diagnostic flags, critical delays, and route advisories.

### 2. Live GPS Telematics Radar (`/tracking`)
- **Interactive Leaflet Map**: Powered by Carto Dark Matter tiles with support for street view switching.
- **Custom Hardware DivIcons**: Zero-dependency animated vehicle icons with status-based glowing pulse animations.
- **Origin & Destination Waypoint Routing**: Polyline paths connecting pickup points, current GPS position, and dropoff locations.
- **Telemetry Heads-Up Display (HUD)**: Real-time speedometer gauge, fuel/battery percentage, engine temperature threshold monitor, and asset health ratings.
- **Live Simulation Engine**: Toggleable real-time GPS simulation that dynamically drifts vehicle coordinates, speed, and fuel consumption.

### 3. Vehicle & Asset Management (`/vehicles`)
- **Full Asset Registry**: Comprehensive table and grid views displaying vehicle class, license plate, model, driver assignment, and current depot.
- **Add / Edit Vehicle Modal**: Complete validation for vehicle class, license plate, initial fuel, odometer, and capacity limits.
- **Deep Telematics Drawer**: In-depth inspection sheet displaying service intervals, past diagnostic scans, and maintenance history.

### 4. Driver Roster & Safety Scorecards (`/drivers`)
- **Operator Profiles**: Driver directory featuring Commercial Driver License (CDL) numbers, classifications, and contact info.
- **Availability Status**: Quick tracking of drivers who are *On Route*, *Available*, *On Break*, or *Off Duty*.
- **Performance Scorecards**: Detailed modal breakdown of safety scores, on-time delivery rates, total mileage, and driving behavior metrics (smooth braking, speed limit adherence, and HOS compliance).

### 5. Shipment Dispatch & Lifecycle (`/shipments`)
- **Freight Manifest Management**: Create, edit, and track consignments with custom cargo descriptions, priority flags, and weights.
- **Assigned Carrier & Driver**: Direct linkage between active shipments, assigned vehicles, and dispatched drivers.
- **Milestone Timeline Tracker**: Visual journey tracker illustrating origin dispatch, highway waypoints, checkpoints, and consignee signoffs.

### 6. Universal Search & Advanced Filters
- Integrated multi-attribute filtering across all modules:
  - Keyword search (Plate, driver name, shipment ID, city, customer)
  - Status filters (In Transit, Standby, Maintenance, Delayed, Delivered)
  - Secondary classification filters (Vehicle class, CDL license type, priority tier)
  - One-click reset filters and active count summary.

### 7. Alerts & Incident Operations Center (`/alerts`)
- Categorized notifications for:
  - **Delayed Shipments**: Critical alerts with incident root causes and revised ETAs.
  - **Vehicle Maintenance**: Low fuel warnings, engine coolant temp alerts, and overdue inspection notices.
  - **Delivery Updates**: Waypoint clearances and final consignee signatures.
  - **Driver Notifications**: Shift starts, compliance alerts, and rest intervals.
- Actions: Filter by category, filter by severity (*Critical*, *Warning*, *Info*), unread filter, individual acknowledge, and bulk mark as read.

---

## 🛠️ Technology Stack

- **Framework**: React.js 19 + Vite 8
- **Routing**: React Router 7 (`BrowserRouter`, `Routes`, `Route`, `Outlet`, `Navigate`)
- **Styling**: Tailwind CSS 3.4 with custom enterprise dark mode palette & glassmorphism
- **Mapping & Geo**: Leaflet 1.9 + React-Leaflet 5 (`MapContainer`, `TileLayer`, `Marker`, `Popup`, `Polyline`, `divIcon`)
- **Visual Analytics**: Recharts 3.10 (`BarChart`, `AreaChart`, `PieChart`, `ResponsiveContainer`)
- **Icons**: Lucide React
- **State Management**: React Context (`FleetContext`) with local storage persistence and mock API service abstraction layer (`fleetService.js`)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd "Logistics & Fleet Tracking Platform"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```
   The production bundle will be generated in the `dist/` directory.

---

## 🌐 Deployment to Netlify / Vercel

### Deploying to Netlify
1. Connect your repository to Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. For single-page app routing, ensure `_redirects` or `netlify.toml` contains:
   ```toml
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

### Deploying to Vercel
1. Import the Git repository in Vercel.
2. Framework preset: **Vite**
3. Build command: `npm run build`
4. Output directory: `dist`
5. Click **Deploy**.

---

## 📁 Project Architecture

```
src/
├── api/
│   └── mockData.js          # Realistic enterprise logistics seed data
├── context/
│   └── FleetContext.jsx     # Central state, CRUD operations, live simulation ticker, toasts
├── services/
│   └── fleetService.js      # Async API service abstraction with simulated latency & localStorage
├── components/
│   ├── layout/
│   │   ├── Layout.jsx       # Root layout wrapper
│   │   ├── Sidebar.jsx      # Collapsible sidebar navigation & live telematics switch
│   │   └── Navbar.jsx       # Top navigation, status indicator, alert bell, profile
│   ├── common/
│   │   ├── StatCard.jsx     # KPI statistical indicator card with micro-animations
│   │   ├── StatusBadge.jsx  # Color-coded glowing status pill
│   │   ├── SearchFilterBar.jsx # Advanced multi-parameter filter toolbar
│   │   ├── Modal.jsx        # Accessible dialog window with ESC / backdrop dismiss
│   │   ├── EmptyState.jsx   # Friendly empty state display
│   │   ├── LoadingSkeleton.jsx # Skeleton loaders for tables & cards
│   │   └── Toast.jsx        # Notification alert banners
│   ├── map/
│   │   ├── FleetMap.jsx     # High-performance Leaflet map with dynamic routes & divIcons
│   │   └── TelemetryCard.jsx # Live telemetry Heads-Up Display (HUD)
│   ├── vehicles/
│   │   ├── VehicleTable.jsx
│   │   ├── VehicleModal.jsx
│   │   └── VehicleDetailsDrawer.jsx
│   ├── drivers/
│   │   ├── DriverCard.jsx
│   │   ├── DriverModal.jsx
│   │   └── DriverScorecard.jsx
│   ├── shipments/
│   │   ├── ShipmentTable.jsx
│   │   ├── ShipmentModal.jsx
│   │   └── ShipmentTimeline.jsx
│   └── alerts/
│       └── AlertDropdown.jsx
└── pages/
    ├── DashboardPage.jsx    # Operations command center & KPI breakdown
    ├── TrackingPage.jsx     # Live GPS radar & telemetry HUD
    ├── VehiclesPage.jsx     # Fleet asset management & technical specs
    ├── DriversPage.jsx      # Driver directory & CDL compliance scorecards
    ├── ShipmentsPage.jsx    # Freight dispatch & milestone tracking
    ├── AlertsPage.jsx       # Incident management center
    └── AnalyticsPage.jsx    # SLA compliance, fuel economy & hub throughput
```

---

## 📝 License
MIT License. Built for enterprise fleet logistics and telemetry tracking operations.
