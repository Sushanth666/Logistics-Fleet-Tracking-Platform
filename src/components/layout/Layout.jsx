import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { ToastContainer } from '../common/Toast';
import { NationalGatewayModal } from '../compliance/NationalGatewayModal';
import { useFleet } from '../../context/FleetContext';

export const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isGatewayModalOpen, closeGatewayModal } = useFleet();

  return (
    <div className="h-screen w-full overflow-hidden bg-slate-950 text-slate-100 flex">
      {/* Sidebar navigation */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden lg:pl-64">
        <Navbar onOpenSidebar={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-300 overscroll-contain">
          <Outlet />
        </main>
      </div>

      {/* Global National Logistics Gateway & Compliance Center Modal */}
      <NationalGatewayModal isOpen={isGatewayModalOpen} onClose={closeGatewayModal} />

      {/* Global Toast Notification Overlay */}
      <ToastContainer />
    </div>
  );
};
