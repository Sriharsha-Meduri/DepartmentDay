import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Registration, INITIAL_REGISTRATIONS, Section } from '../data/mock';

interface AppState {
  section: Section;
  setSection: (section: Section) => void;
  registrations: Registration[];
  addRegistration: (reg: Registration) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [section, setSection] = useState<Section>('BOYS');
  const [registrations, setRegistrations] = useState<Registration[]>(() => {
    const saved = localStorage.getItem('dept_day_registrations');
    return saved ? JSON.parse(saved) : INITIAL_REGISTRATIONS;
  });

  useEffect(() => {
    localStorage.setItem('dept_day_registrations', JSON.stringify(registrations));
  }, [registrations]);

  const addRegistration = (reg: Registration) => {
    setRegistrations(prev => [...prev, reg]);
  };

  return (
    <AppContext.Provider value={{ section, setSection, registrations, addRegistration }}>
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
