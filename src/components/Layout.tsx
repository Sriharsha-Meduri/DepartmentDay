import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AnimatePresence, motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

export function Layout() {
  const location = useLocation();
  const { darkMode } = useApp();

  return (
    <div className={`min-h-screen bg-[var(--bg)] text-[var(--text)] font-sans overflow-x-hidden flex flex-col transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main 
          key={location.pathname}
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
