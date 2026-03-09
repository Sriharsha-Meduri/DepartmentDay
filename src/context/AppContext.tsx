import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Registration, INITIAL_REGISTRATIONS } from '../data/mock';

interface AppState {
  darkMode: boolean;
  toggleDarkMode: () => void;
  registrations: Registration[];
  addRegistration: (reg: Registration) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('dept_day_theme_v2');
    return saved ? JSON.parse(saved) : true;
  });

  const [registrations, setRegistrations] = useState<Registration[]>(() => {
    const saved = localStorage.getItem('dept_day_registrations');
    return saved ? JSON.parse(saved) : INITIAL_REGISTRATIONS;
  });

  useEffect(() => {
    localStorage.setItem('dept_day_theme_v2', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('dept_day_registrations', JSON.stringify(registrations));
  }, [registrations]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const addRegistration = (reg: Registration) => {
    setRegistrations(prev => [...prev, reg]);
  };

  return (
    <AppContext.Provider value={{ darkMode, toggleDarkMode, registrations, addRegistration }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
