import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowUpRight, Grid, List as ListIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_EVENTS } from '../data/mock';

export function Events() {
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'date' | 'name'>('name');

  const filteredEvents = useMemo(() => {
    return MOCK_EVENTS.filter(event => {
      const matchSearch = event.title.toLowerCase().includes(search.toLowerCase()) || 
                          event.description.toLowerCase().includes(search.toLowerCase());
      return matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }, [search, sortBy]);

  return (
    <div className="pt-32 pb-24 px-8 lg:px-16 max-w-[1600px] mx-auto min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-medium tracking-tight mb-4"
          >
            Pick your battle ⚔️
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg opacity-60 font-light max-w-lg"
          >
            Technical events are live now. More events across sports, culture and more are being announced soon. Register for what's open and check back for updates.
          </motion.p>
        </div>

        {/* Search & View Toggle */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 w-full md:w-auto"
        >
          <div className="relative flex-1 sm:w-64 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50 group-focus-within:opacity-100 group-focus-within:text-[var(--accent)] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search events..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[var(--input-bg)] backdrop-blur-md border border-[var(--card-border)] rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 transition-all font-light shadow-sm text-[var(--text)]"
            />
          </div>
          <div className="flex gap-2 bg-[var(--card)] backdrop-blur-md p-1 rounded-full border border-[var(--card-border)] relative">
            <button 
              onClick={() => setView('grid')}
              className={`relative p-2 rounded-full transition-colors z-10 ${view === 'grid' ? 'text-[var(--btn-text)]' : 'hover:bg-[var(--card-hover)]'}`}
            >
              <Grid size={20} />
            </button>
            <button 
              onClick={() => setView('list')}
              className={`relative p-2 rounded-full transition-colors z-10 ${view === 'list' ? 'text-[var(--btn-text)]' : 'hover:bg-[var(--card-hover)]'}`}
            >
              <ListIcon size={20} />
            </button>
            <motion.div 
              className="absolute top-1 bottom-1 w-[36px] bg-[var(--btn)] rounded-full shadow-md z-0"
              initial={false}
              animate={{ x: view === 'grid' ? 4 : 44 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          </div>
        </motion.div>
      </div>

      {/* Sort */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-end gap-4 text-sm font-medium mb-12 pb-6 border-b border-[var(--divider)]"
      >
        <span className="opacity-60">Sort by:</span>
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value as any)}
          className="bg-transparent border-none focus:ring-0 cursor-pointer font-medium outline-none text-[var(--text)]"
        >
          <option value="name">Name (A-Z)</option>
          <option value="date">Date (Earliest)</option>
        </select>
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
              className="col-span-full py-20 text-center font-light"
            >
              <div className="text-5xl mb-4">🕵️</div>
              <p className="text-xl opacity-60">Nothing matched that search.</p>
              <p className="text-sm opacity-40 mt-2">Try a different keyword. Or just browse everything. They're all worth it.</p>
            </motion.div>
          ) : (
            filteredEvents.map((event) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                key={event.id}
                className={`bg-[var(--card-solid)] rounded-3xl overflow-hidden border border-[var(--divider-light)] group hover:shadow-2xl transition-shadow duration-500 ${view === 'list' ? 'flex flex-row h-48' : 'flex flex-col'}`}
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
                    <span className="bg-[var(--badge-bg)] backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                      {event.category}
                    </span>
                  </div>
                </div>
                <div className={`p-6 flex flex-col flex-1 ${view === 'list' ? 'justify-center' : ''}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-medium">{event.title}</h3>
                  </div>
                  <p className={`opacity-70 font-light text-sm mb-6 ${view === 'list' ? 'line-clamp-3' : 'line-clamp-2'} flex-1`}>{event.description}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--divider-light)]">
                    <div className="flex flex-col gap-1">
                      <div className="text-sm font-medium opacity-80">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} &bull; {event.time}
                      </div>

                    </div>
                    <Link to={`/event/${event.id}`}>
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 rounded-full bg-[var(--divider-light)] flex items-center justify-center group-hover:bg-[var(--btn)] group-hover:text-[var(--btn-text)] transition-colors"
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

        {/* Coming Soon Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 rounded-3xl border-2 border-dashed border-[var(--divider)] flex flex-col items-center justify-center py-12 px-8 text-center"
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -6, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
            className="text-4xl mb-3 inline-block"
          >🔜</motion.div>
          <h3 className="text-xl font-medium mb-2">More dropping soon</h3>
          <p className="opacity-50 font-light text-sm max-w-sm">Sports. Cultural. Other stuff we can't announce yet. Keep checking back, this page isn't done filling up.</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
