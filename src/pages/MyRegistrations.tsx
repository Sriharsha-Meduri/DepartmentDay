import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Search, CheckCircle2, Clock, Calendar, MapPin, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MOCK_EVENTS } from '../data/mock';

export function MyRegistrations() {
  const { registrations } = useApp();
  const [search, setSearch] = useState('');

  const filteredRegs = registrations.filter(reg => {
    const event = MOCK_EVENTS.find(e => e.id === reg.eventId);
    return event?.title.toLowerCase().includes(search.toLowerCase()) || 
           reg.regNo.toLowerCase().includes(search.toLowerCase());
  });

  const handleDownload = (regId: string) => {
    // Mock download functionality
    alert(`Downloading confirmation for ${regId}`);
  };

  return (
    <div className="pt-32 pb-24 px-8 lg:px-16 max-w-[1400px] mx-auto min-h-screen">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-6xl font-medium tracking-tight mb-4"
          >
            My Registrations
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg opacity-70 font-light"
          >
            Manage and view your registered events for Department Day 2026.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative w-full md:w-72"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" size={18} />
          <input 
            type="text" 
            placeholder="Search registrations..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/40 backdrop-blur-md border border-white/50 rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#0a2e1f]/20 transition-all font-light"
          />
        </motion.div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredRegs.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full py-20 text-center opacity-60 font-light text-xl"
            >
              No registrations found. <Link to="/events" className="underline font-medium hover:text-[#00aa22]">Browse events</Link>
            </motion.div>
          ) : (
            filteredRegs.map((reg, i) => {
              const event = MOCK_EVENTS.find(e => e.id === reg.eventId);
              if (!event) return null;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  key={reg.id}
                  className="bg-white rounded-[2rem] p-8 shadow-sm border border-[#0a2e1f]/5 flex flex-col md:flex-row gap-8 relative overflow-hidden group hover:shadow-xl transition-all duration-300"
                >
                  {/* Status Badge */}
                  <div className="absolute top-6 right-8 flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-[#dcfce7] text-[#00aa22]">
                    <CheckCircle2 size={14} /> {reg.status}
                  </div>

                  <div className="w-full md:w-1/3 aspect-square md:aspect-auto md:h-full rounded-2xl overflow-hidden relative">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                      <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-[#0a2e1f]">
                        {event.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col">
                    <div className="mb-6 pr-24">
                      <h3 className="text-2xl font-medium mb-2">{event.title}</h3>
                      <p className="opacity-60 text-sm font-light">Reg ID: <span className="font-mono font-medium">{reg.id}</span></p>
                    </div>

                    <div className="space-y-3 mb-8 flex-1">
                      <div className="flex items-center gap-3 text-sm opacity-80">
                        <Calendar size={16} className="text-[#00aa22]" />
                        {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-3 text-sm opacity-80">
                        <Clock size={16} className="text-[#00aa22]" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-3 text-sm opacity-80">
                        <MapPin size={16} className="text-[#00aa22]" />
                        {event.venue}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-[#0a2e1f]/10 mt-auto">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#dcfce7] flex items-center justify-center text-[#0a2e1f] font-medium text-sm">
                          {reg.fullName.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-medium">{reg.fullName}</div>
                          <div className="text-xs opacity-60 font-mono">{reg.regNo}</div>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDownload(reg.id)}
                        className="w-10 h-10 rounded-full bg-[#0a2e1f]/5 flex items-center justify-center hover:bg-[#0a2e1f] hover:text-[#dcfce7] transition-colors group/btn"
                        title="Download Ticket"
                      >
                        <Download size={18} className="group-hover/btn:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
