import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { FleetProvider } from './context/FleetContext';
import { ThemeProvider } from './context/ThemeContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Layout } from './components/layout/Layout';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DashboardPage } from './pages/DashboardPage';
import { TrackingPage } from './pages/TrackingPage';
import { VehiclesPage } from './pages/VehiclesPage';
import { DriversPage } from './pages/DriversPage';
import { ShipmentsPage } from './pages/ShipmentsPage';
import { AlertsPage } from './pages/AlertsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { OperatorProfilePage } from './pages/OperatorProfilePage';
import { PlatformSettingsPage } from './pages/PlatformSettingsPage';
import { useLocation } from 'react-router-dom';
import { useAnimatedTabTitle } from './hooks/useAnimatedTabTitle';

const TabTitleController = () => {
  useAnimatedTabTitle();
  return null;
};

// Global route scroll listener: Ensures every page opens at the very top on mobile, tablet, and desktop
const ScrollToTopOnNavigate = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const mainEl = document.querySelector('main');
    if (mainEl) {
      mainEl.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname]);

  return null;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FleetProvider>
          <TabTitleController />
          <BrowserRouter>
            <ScrollToTopOnNavigate />
            <Routes>
              {/* Public Authentication Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* Protected Operations Dashboard Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Layout />}>
                  <Route index element={<DashboardPage />} />
                  <Route path="tracking" element={<TrackingPage />} />
                  <Route path="shipments" element={<ShipmentsPage />} />
                  <Route path="vehicles" element={<VehiclesPage />} />
                  <Route path="drivers" element={<DriversPage />} />
                  <Route path="alerts" element={<AlertsPage />} />
                  <Route path="analytics" element={<AnalyticsPage />} />
                  <Route path="profile" element={<OperatorProfilePage />} />
                  <Route path="settings" element={<PlatformSettingsPage />} />
                </Route>
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </FleetProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
