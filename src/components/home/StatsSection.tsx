import type { ElementType } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { CalendarDays, Users, Zap, BadgeCheck } from 'lucide-react';

/** Counts from 0 → target when the ref enters the viewport */
function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, target, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.floor(v)),
    });
    return ctrl.stop;
  }, [inView, target]);

  return (
    <span ref={ref} className="animate-num-glow">
      {display}{suffix}
    </span>
  );
}

export function StatsSection() {
  const stats: {
    icon: ElementType;
    value: string;
    countTarget?: number;
    countSuffix?: string;
    label: string;
    color: string;
    sub: string;
  }[] = [
    { icon: CalendarDays, value: '4+',  countTarget: 4,   countSuffix: '+',  label: 'Events Live Now',   color: 'bg-blue-100   text-blue-700',   sub: '& more dropping soon' },
    { icon: Users,        value: '100+', countTarget: 100, countSuffix: '+', label: 'Students In',       color: 'bg-green-100  text-green-700',  sub: 'and growing fast'     },
    { icon: Zap,          value: '₹0',  label: 'Entry Fee',                  color: 'bg-yellow-100 text-yellow-700', sub: 'yes, really. free.'  },
    { icon: BadgeCheck,   value: '🏆',  label: 'Prizes & Certs',             color: 'bg-purple-100 text-purple-700', sub: "don't hold back"     },
  ];

  return (
    <section className="py-12 px-8 lg:px-16 max-w-[1600px] mx-auto relative z-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10, scale: 1.02 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="card-shine-wrap bg-[var(--card)] backdrop-blur-md rounded-3xl p-8 border border-[var(--card-border)] text-center hover:bg-[var(--card-hover)] transition-colors shadow-sm hover:shadow-xl cursor-default"
          >
            <motion.div
              whileHover={{ scale: 1.15 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              className={`w-14 h-14 rounded-full ${stat.color} flex items-center justify-center mx-auto mb-4`}
            >
              <stat.icon size={24} />
            </motion.div>
            <div className="text-4xl font-bold tracking-tight mb-1">
              {stat.countTarget !== undefined
                ? <CountUp target={stat.countTarget} suffix={stat.countSuffix} />
                : <span className="animate-num-glow">{stat.value}</span>
              }
            </div>
            <div className="text-sm font-medium mb-1">{stat.label}</div>
            <div className="text-xs opacity-40 font-light">{stat.sub}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

