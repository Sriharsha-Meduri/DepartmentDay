import { motion } from 'framer-motion';
import { CalendarDays, Users, Layers, MapPin } from 'lucide-react';
import { MOCK_EVENTS } from '../../data/mock';

export function StatsSection() {
  const totalRegistered = MOCK_EVENTS.reduce((sum, e) => sum + e.registeredCount, 0);
  const uniqueVenues = [...new Set(MOCK_EVENTS.map(e => e.venue))].length;

  const stats = [
    { icon: CalendarDays, value: MOCK_EVENTS.length + '+', label: 'Events Planned', color: 'bg-blue-100 text-blue-700' },
    { icon: Users, value: totalRegistered + '+', label: 'Registrations So Far', color: 'bg-green-100 text-green-700' },
    { icon: Layers, value: '4', label: 'Event Categories', color: 'bg-purple-100 text-purple-700' },
    { icon: MapPin, value: uniqueVenues + '+', label: 'Campus Venues', color: 'bg-orange-100 text-orange-700' },
  ];

  return (
    <section className="py-20 px-8 lg:px-16 max-w-[1600px] mx-auto relative z-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-white/50 backdrop-blur-md rounded-3xl p-8 border border-white/60 text-center hover:bg-white/70 transition-colors shadow-sm"
          >
            <div className={`w-14 h-14 rounded-full ${stat.color} flex items-center justify-center mx-auto mb-4`}>
              <stat.icon size={24} />
            </div>
            <div className="text-4xl font-bold tracking-tight mb-1">{stat.value}</div>
            <div className="text-sm opacity-60 font-medium">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
