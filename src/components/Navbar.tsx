import { Link, useLocation, useNavigate } from 'react-router-dom';
import { X, Menu, Sun, Moon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pendingScroll = useRef<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fire pending scroll once we've actually landed on '/'
  // 1. Wait 150ms for ScrollToTop + React paint to settle.
  // 2. Jump to the section.
  // 3. Nudge 1px down then back up across two rAFs — this forces every
  //    IntersectionObserver (including Framer Motion's whileInView) to
  //    re-evaluate the new viewport, so no elements stay invisible.
  useEffect(() => {
    if (location.pathname === '/' && pendingScroll.current) {
      const id = pendingScroll.current;
      pendingScroll.current = null;
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'instant', block: 'start' });
          requestAnimationFrame(() => {
            window.scrollBy({ top: 1, behavior: 'instant' });
            requestAnimationFrame(() => {
              window.scrollBy({ top: -1, behavior: 'instant' });
            });
          });
        }
      }, 150);
    }
  }, [location.pathname]);

  const pageLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
  ];

  const sectionLinks = [
    { name: 'How it Works', id: 'how-it-works' },
    { name: 'Schedule', id: 'schedule' },
    { name: 'FAQ', id: 'faq' },
  ];

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      pendingScroll.current = id;
      navigate('/');
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 px-8 ${
          scrolled 
            ? 'py-4 bg-[var(--nav-scrolled)] backdrop-blur-xl shadow-sm border-b border-[var(--divider-light)]' 
            : 'py-6 bg-transparent'
        } flex justify-between items-center`}
      >
        <Link
          to="/"
          onClick={() => {
            if (location.pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="flex items-center gap-2 text-xl font-medium tracking-tight hover:opacity-80 transition-opacity text-[var(--text)]"
        >
          <div className="flex gap-[3px]">
            <div className="w-[3px] h-5 bg-[var(--text)] rounded-full"></div>
            <div className="w-[3px] h-5 bg-[var(--text)] rounded-full opacity-70"></div>
            <div className="w-[3px] h-5 bg-[var(--text)] rounded-full opacity-40"></div>
          </div>
          Udbhav '26
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          {pageLinks.map(link => (
            <Link 
              key={link.path} 
              to={link.path}
              onClick={() => {
                if (link.path === '/' && location.pathname === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className={`relative hover:text-[var(--accent)] transition-colors ${location.pathname === link.path ? 'text-[var(--accent)]' : 'text-[var(--text)]'}`}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div 
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--accent)] rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
          <div className="w-px h-5 bg-[var(--divider)]"></div>
          {sectionLinks.map(link => (
            <button 
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="relative hover:text-[var(--accent)] transition-colors text-[var(--text)] opacity-70 hover:opacity-100"
            >
              {link.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            onClick={toggleDarkMode}
            className="w-10 h-10 rounded-full bg-[var(--btn)] text-[var(--btn-text)] flex items-center justify-center hover:opacity-80 transition-all"
            aria-label="Toggle dark mode"
          >
            <AnimatePresence mode="wait">
              {darkMode ? (
                <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Sun size={16} />
                </motion.div>
              ) : (
                <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Moon size={16} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden w-10 h-10 rounded-full bg-[var(--btn)] text-[var(--btn-text)] flex items-center justify-center"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={18} />
          </button>
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
            className="fixed inset-0 z-[60] bg-[var(--mobile-menu-bg)] flex flex-col items-center justify-center"
          >
            <motion.button 
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="absolute top-6 right-8 w-12 h-12 rounded-full bg-[var(--btn)] text-[var(--btn-text)] flex items-center justify-center shadow-lg"
              onClick={() => setIsOpen(false)}
            >
              <X size={20} />
            </motion.button>
            <div className="flex flex-col gap-8 text-4xl font-medium text-center">
              {pageLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Link 
                    to={link.path}
                    onClick={() => {
                      setIsOpen(false);
                      if (link.path === '/' && location.pathname === '/') {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className={`hover:text-[var(--accent)] transition-colors ${location.pathname === link.path ? 'text-[var(--accent)]' : 'text-[var(--text)]'}`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <div className="w-16 h-px bg-[var(--divider)] mx-auto"></div>
              {sectionLinks.map((link, i) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: (pageLinks.length + i) * 0.1 }}
                >
                  <button 
                    onClick={() => scrollToSection(link.id)}
                    className="hover:text-[var(--accent)] transition-colors text-[var(--text)] text-2xl opacity-70 hover:opacity-100"
                  >
                    {link.name}
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
