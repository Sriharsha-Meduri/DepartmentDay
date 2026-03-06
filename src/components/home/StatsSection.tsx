import { motion } from 'framer-motion';
import { CalendarDays, Users, Zap, BadgeCheck } from 'lucide-react';

export function StatsSection() {
  const stats = [
    { icon: CalendarDays, value: '4+', label: 'Events Live Now', color: 'bg-blue-100 text-blue-700', sub: 'More coming soon' },
    { icon: Users, value: '100+', label: 'Students Registered', color: 'bg-green-100 text-green-700', sub: 'And counting' },
    { icon: Zap, value: '₹0', label: 'Entry Fee', color: 'bg-yellow-100 text-yellow-700', sub: 'Completely free' },
    { icon: BadgeCheck, value: '🏆', label: 'Prizes & Certs', color: 'bg-purple-100 text-purple-700', sub: 'For every winner' },
  ];

  return (
    <section className="py-20 px-8 lg:px-16 max-w-[1600px] mx-auto relative z-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10, scale: 1.02 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-[var(--card)] backdrop-blur-md rounded-3xl p-8 border border-[var(--card-border)] text-center hover:bg-[var(--card-hover)] transition-colors shadow-sm hover:shadow-xl cursor-default"
          >
            <div className={`w-14 h-14 rounded-full ${stat.color} flex items-center justify-center mx-auto mb-4`}>
              <stat.icon size={24} />
            </div>
            <div className="text-4xl font-bold tracking-tight mb-1">{stat.value}</div>
            <div className="text-sm font-medium mb-1">{stat.label}</div>
            <div className="text-xs opacity-40 font-light">{stat.sub}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
