import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const DEFAULT_USER = {
  name: "Akash Barik",
  email: "akash.barik@bharatlogix.in",
  role: "Operations Lead",
  company: "BharatLogix India Logistics Ltd.",
  initials: "AB",
  phone: "+91 98201 44582",
  employeeId: "OP-7492",
  station: "Mumbai Central Freight Dispatch Hub, MH",
  clearance: "Tier 3 Dispatcher & AIS-140 Admin",
  dutyStatus: "On Duty",
  timezone: "Indian Standard Time (IST, UTC+05:30)"
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const session = sessionStorage.getItem('bharatlogix_session_auth');
      const remembered = localStorage.getItem('bharatlogix_remember_auth');
      if (session === 'true' || remembered === 'true') {
        return true;
      }
      // Clear legacy flags that auto-logged in by default
      localStorage.removeItem('bharatlogix_is_authenticated');
      return false;
    } catch {
      return false;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const session = sessionStorage.getItem('bharatlogix_session_auth');
      const remembered = localStorage.getItem('bharatlogix_remember_auth');
      if (session === 'true' || remembered === 'true') {
        const savedUser = localStorage.getItem('bharatlogix_auth_user_v1');
        return savedUser ? { ...DEFAULT_USER, ...JSON.parse(savedUser) } : DEFAULT_USER;
      }
      return null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (isAuthenticated && user) {
        localStorage.setItem('bharatlogix_auth_user_v1', JSON.stringify(user));
      } else {
        localStorage.removeItem('bharatlogix_auth_user_v1');
      }
    } catch (e) {
      console.warn('Error saving auth to storage:', e);
    }
  }, [user, isAuthenticated]);

  const login = async (email, password, remember = false) => {
    // Simulated network authentication
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email || !password) {
          reject(new Error('Please provide email and password.'));
          return;
        }

        // Generate initials
        const nameParts = email.split('@')[0].split('.');
        const name = nameParts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
        const initials = nameParts.map(p => p.charAt(0).toUpperCase()).join('').substring(0, 2) || 'OP';

        const authenticatedUser = {
          name: email.toLowerCase().includes('akash') ? 'Akash Barik' : name,
          email,
          role: 'Operations Lead',
          company: 'BharatLogix Enterprise Fleet',
          initials: email.toLowerCase().includes('akash') ? 'AB' : initials
        };

        setUser(authenticatedUser);
        setIsAuthenticated(true);

        if (remember) {
          localStorage.setItem('bharatlogix_remember_auth', 'true');
        } else {
          sessionStorage.setItem('bharatlogix_session_auth', 'true');
        }
        resolve(authenticatedUser);
      }, 400);
    });
  };

  const signup = async (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!userData.email || !userData.password) {
          reject(new Error('Please fill all required registration fields.'));
          return;
        }

        const initials = userData.name
          ? userData.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
          : 'OP';

        const newUser = {
          name: userData.name,
          email: userData.email,
          role: userData.role || 'Fleet Dispatcher',
          company: userData.company || 'Enterprise Logistics Co',
          initials
        };

        setUser(newUser);
        setIsAuthenticated(true);
        sessionStorage.setItem('bharatlogix_session_auth', 'true');
        resolve(newUser);
      }, 500);
    });
  };

  const updateUser = (updatedFields) => {
    setUser(prev => {
      const nextUser = { ...prev, ...updatedFields };
      if (updatedFields.name) {
        nextUser.initials = updatedFields.name
          .split(' ')
          .map(n => n[0])
          .join('')
          .toUpperCase()
          .substring(0, 2);
      }
      try {
        localStorage.setItem('bharatlogix_auth_user_v1', JSON.stringify(nextUser));
      } catch (e) {
        console.warn('Failed to persist user update', e);
      }
      return nextUser;
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    try {
      localStorage.removeItem('bharatlogix_auth_user_v1');
      localStorage.removeItem('bharatlogix_is_authenticated');
      localStorage.removeItem('bharatlogix_remember_auth');
      sessionStorage.removeItem('bharatlogix_session_auth');
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
