import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { ToastContainer } from '../common/Toast';
import { NationalGatewayModal } from '../compliance/NationalGatewayModal';
import { useFleet } from '../../context/FleetContext';
import { ArrowUp } from 'lucide-react';

export const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isGatewayModalOpen, closeGatewayModal } = useFleet();
  const location = useLocation();
  const mainRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Automatically reset scroll to top of page whenever a route is clicked/changed
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setShowScrollTop(false);
  }, [location.pathname]);

  const handleScroll = (e) => {
    const top = e.currentTarget.scrollTop;
    setShowScrollTop(top > 240);
  };

  const scrollToTop = () => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-slate-950 text-slate-100 flex">
      {/* Sidebar navigation */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden lg:pl-64 relative">
        <Navbar onOpenSidebar={() => setIsSidebarOpen(true)} onScrollToTop={scrollToTop} />
        <main
          ref={mainRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-300 overscroll-contain relative z-0"
        >
          <Outlet />
        </main>

        {/* Mobile & Tablet Floating Scroll-To-Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-5 z-40 lg:hidden px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white shadow-2xl shadow-purple-600/40 border border-white/25 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5 animate-in fade-in zoom-in duration-200"
            title="Scroll to top of page"
            aria-label="Scroll to top of page"
          >
            <ArrowUp className="w-4 h-4" />
            <span className="text-xs font-bold font-mono">Top</span>
          </button>
        )}
      </div>

      {/* Global National Logistics Gateway & Compliance Center Modal */}
      <NationalGatewayModal isOpen={isGatewayModalOpen} onClose={closeGatewayModal} />

      {/* Global Toast Notification Overlay */}
      <ToastContainer />
    </div>
  );
};
