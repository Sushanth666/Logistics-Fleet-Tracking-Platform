import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { Layout } from '../components/layout/Layout';
import {
  LoginPage,
  SignupPage,
  DashboardPage,
  TrackingPage,
  VehiclesPage,
  DriversPage,
  ShipmentsPage,
  AlertsPage,
  AnalyticsPage,
  OperatorProfilePage,
  PlatformSettingsPage,
} from '../pages';

export const AppRoutes = () => {
  return (
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
  );
};
