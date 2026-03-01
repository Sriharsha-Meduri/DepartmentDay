import { Link, useLocation } from 'react-router-dom';
import { RefreshCw, X, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'My Registrations', path: '/my-registrations' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 px-8 ${
          scrolled ? 'py-4 bg-[#dcfce7]/80 backdrop-blur-xl shadow-sm border-b border-[#0a2e1f]/5' : 'py-6 bg-transparent'
        } flex justify-between items-center`}
      >
        <Link to="/" className="flex items-center gap-2 text-xl font-medium tracking-tight hover:opacity-80 transition-opacity">
          <div className="flex gap-[3px]">
            <div className="w-[3px] h-5 bg-[#0a2e1f] rounded-full"></div>
            <div className="w-[3px] h-5 bg-[#0a2e1f] rounded-full opacity-70"></div>
            <div className="w-[3px] h-5 bg-[#0a2e1f] rounded-full opacity-40"></div>
          </div>
          DeptDay '26
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          {links.map(link => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`relative hover:text-[#00aa22] transition-colors ${location.pathname === link.path ? 'text-[#00aa22]' : ''}`}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div 
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#00aa22] rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="md:hidden w-10 h-10 rounded-full bg-[#0a2e1f] text-[#dcfce7] flex items-center justify-center hover:bg-[#0a2e1f]/80 transition-colors" onClick={() => setIsOpen(true)}>
            <Menu size={16} />
          </button>
          <div className="hidden md:flex gap-3">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-10 h-10 rounded-full bg-[#0a2e1f] text-[#dcfce7] flex items-center justify-center hover:bg-[#0a2e1f]/80 transition-colors">
              <RefreshCw size={16} />
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-10 h-10 rounded-full bg-[#0a2e1f] text-[#dcfce7] flex items-center justify-center hover:bg-[#0a2e1f]/80 transition-colors">
              <X size={16} />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-[#dcfce7]/90 flex flex-col items-center justify-center"
          >
            <motion.button 
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="absolute top-6 right-8 w-12 h-12 rounded-full bg-[#0a2e1f] text-[#dcfce7] flex items-center justify-center shadow-lg"
              onClick={() => setIsOpen(false)}
            >
              <X size={20} />
            </motion.button>
            <div className="flex flex-col gap-8 text-4xl font-medium text-center">
              {links.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Link 
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`hover:text-[#00aa22] transition-colors ${location.pathname === link.path ? 'text-[#00aa22]' : ''}`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
