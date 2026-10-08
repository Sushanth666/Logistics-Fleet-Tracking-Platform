import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { ThemeProvider, AuthProvider, FleetProvider } from './context';
import { AppRoutes } from './routes';
import { useAnimatedTabTitle } from './hooks';

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
            <AppRoutes />
          </BrowserRouter>
        </FleetProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
