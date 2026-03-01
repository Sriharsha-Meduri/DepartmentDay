import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ArrowUpRight, Grid, List as ListIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MOCK_EVENTS, Category, Section } from '../data/mock';

export function Events() {
  const { section, setSection } = useApp();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category | 'ALL'>('ALL');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'date' | 'name'>('name');

  const filteredEvents = useMemo(() => {
    return MOCK_EVENTS.filter(event => {
      const matchSection = event.section === section;
      const matchCategory = category === 'ALL' || event.category === category;
      const matchSearch = event.title.toLowerCase().includes(search.toLowerCase()) || 
                          event.description.toLowerCase().includes(search.toLowerCase());
      return matchSection && matchCategory && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }, [section, category, search, sortBy]);

  return (
    <div className="pt-32 pb-24 px-8 lg:px-16 max-w-[1600px] mx-auto min-h-screen">
      
      {/* Header & Section Toggle */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-medium tracking-tight mb-6"
          >
            Events
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex bg-white/40 backdrop-blur-md p-1 rounded-full border border-white/50 w-fit relative"
          >
            <button 
              onClick={() => setSection('BOYS')}
              className={`relative px-8 py-3 rounded-full font-medium transition-all z-10 ${section === 'BOYS' ? 'text-[#dcfce7]' : 'text-[#0a2e1f] hover:bg-white/50'}`}
            >
              Boys Section
            </button>
            <button 
              onClick={() => setSection('GIRLS')}
              className={`relative px-8 py-3 rounded-full font-medium transition-all z-10 ${section === 'GIRLS' ? 'text-[#dcfce7]' : 'text-[#0a2e1f] hover:bg-white/50'}`}
            >
              Girls Section
            </button>
            <motion.div 
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#0a2e1f] rounded-full shadow-md z-0"
              initial={false}
              animate={{ x: section === 'BOYS' ? 4 : '100%' }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          </motion.div>
        </div>

        {/* Search & View Toggle */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 w-full md:w-auto"
        >
          <div className="relative flex-1 sm:w-64 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50 group-focus-within:opacity-100 group-focus-within:text-[#00aa22] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search events..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/40 backdrop-blur-md border border-white/50 rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#00aa22]/50 transition-all font-light shadow-sm"
            />
          </div>
          <div className="flex gap-2 bg-white/40 backdrop-blur-md p-1 rounded-full border border-white/50 relative">
            <button 
              onClick={() => setView('grid')}
              className={`relative p-2 rounded-full transition-colors z-10 ${view === 'grid' ? 'text-[#dcfce7]' : 'hover:bg-white/50'}`}
            >
              <Grid size={20} />
            </button>
            <button 
              onClick={() => setView('list')}
              className={`relative p-2 rounded-full transition-colors z-10 ${view === 'list' ? 'text-[#dcfce7]' : 'hover:bg-white/50'}`}
            >
              <ListIcon size={20} />
            </button>
            <motion.div 
              className="absolute top-1 bottom-1 w-[36px] bg-[#0a2e1f] rounded-full shadow-md z-0"
              initial={false}
              animate={{ x: view === 'grid' ? 4 : 44 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap items-center justify-between gap-6 mb-12 pb-6 border-b border-[#0a2e1f]/10"
      >
        <div className="flex flex-wrap gap-2">
          <span className="flex items-center gap-2 text-sm font-medium opacity-60 mr-4">
            <Filter size={16} /> Category:
          </span>
          {['ALL', 'TECHNICAL', 'NON-TECHNICAL', 'INDOOR', 'OUTDOOR'].map((cat) => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={cat}
              onClick={() => setCategory(cat as any)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${category === cat ? 'bg-[#ccff00] text-[#0a2e1f] shadow-sm' : 'bg-white/40 hover:bg-white/60 border border-white/50'}`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        <div className="flex items-center gap-4 text-sm font-medium">
          <span className="opacity-60">Sort by:</span>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-transparent border-none focus:ring-0 cursor-pointer font-medium outline-none"
          >
            <option value="name">Name (A-Z)</option>
            <option value="date">Date (Earliest)</option>
          </select>
        </div>
      </motion.div>

      {/* Events Grid/List */}
      <motion.div 
        layout
        className={view === 'grid' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8" : "flex flex-col gap-6"}
      >
        <AnimatePresence mode="popLayout">
          {filteredEvents.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="col-span-full py-20 text-center opacity-60 font-light text-xl"
            >
              No events found matching your criteria.
            </motion.div>
          ) : (
            filteredEvents.map((event, i) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                key={event.id}
                className={`bg-white rounded-3xl overflow-hidden shadow-sm border border-[#0a2e1f]/5 group hover:shadow-2xl transition-shadow duration-500 ${view === 'list' ? 'flex flex-row h-48' : 'flex flex-col'}`}
              >
                <div className={`relative overflow-hidden ${view === 'list' ? 'w-1/3 h-full' : 'h-56 w-full'}`}>
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-[#0a2e1f]">
                      {event.category}
                    </span>
                  </div>
                </div>
                <div className={`p-6 flex flex-col flex-1 ${view === 'list' ? 'justify-center' : ''}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-medium">{event.title}</h3>
                    {view === 'list' && (
                      <span className="bg-[#ccff00]/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-[#0a2e1f]">
                        {event.section}
                      </span>
                    )}
                  </div>
                  <p className={`opacity-70 font-light text-sm mb-6 ${view === 'list' ? 'line-clamp-3' : 'line-clamp-2'} flex-1`}>{event.description}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#0a2e1f]/5">
                    <div className="flex flex-col gap-1">
                      <div className="text-sm font-medium opacity-80">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • {event.time}
                      </div>
                      <div className="text-xs font-light opacity-60">
                        {event.registeredCount} Registered
                      </div>
                    </div>
                    <Link to={`/event/${event.id}`}>
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 rounded-full bg-[#0a2e1f]/5 flex items-center justify-center group-hover:bg-[#0a2e1f] group-hover:text-[#dcfce7] transition-colors"
                      >
                        <ArrowUpRight size={20} />
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
