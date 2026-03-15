import { motion } from 'framer-motion';
import { Clock, Calendar, MapPin } from 'lucide-react';

const SCHEDULE = [
  {
    date: 'Mar 10',
    fullDate: 'Tuesday, March 10',
    time: '10:00 AM',
    title: 'Quiz Blitz',
    description: 'Rapid-fire technical quiz covering programming fundamentals, data structures, algorithms, and current tech trends. Three rounds: written, buzzer, and rapid fire.',
    venue: 'IT Department',
    emoji: '🧠',
    color: 'bg-blue-500',
  },
  {
    date: 'Mar 10',
    fullDate: 'Tuesday, March 10',
    time: '02:00 PM',
    title: 'Coding Contest',
    description: 'Competitive programming showdown with 6 algorithmic problems of increasing difficulty. Duration: 2 hours. Languages allowed: C, C++, Java, Python.',
    venue: 'IT Department',
    emoji: '⚡',
    color: 'bg-yellow-500',
  },
  {
    date: 'Mar 17',
    fullDate: 'Tuesday, March 17',
    time: '09:00 AM',
    title: 'Vibeathon',
    description: 'Problem statements released. Build sprint starts at 9:00 AM. Team size: up to 4 members.',
    venue: 'IT Department',
    emoji: '🎨',
    color: 'bg-purple-500',
  },
  {
    date: 'Mar 18',
    fullDate: 'Wednesday, March 18',
    time: '01:00 PM',
    title: 'Cyber Hunt',
    description: 'Capture The Flag cybersecurity challenge involving cryptography, steganography, web exploitation, and forensics. Duration: 3 hours.',
    venue: 'IT Department',
    emoji: '🔐',
    color: 'bg-green-500',
  },
];

export function ScheduleSection() {
  return (
    <section id="schedule" className="py-16 px-5 sm:px-8 lg:px-16 max-w-[1600px] mx-auto relative z-20 scroll-mt-24">
      <div className="mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-4"
        >
          Lock in your dates 📅
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.1 }}
          className="text-lg opacity-70 max-w-2xl font-light"
        >
          Four technical events across March. More events dropping soon. Screenshot this. Set a reminder. Tell your friends. No excuses for missing out.
        </motion.p>
      </div>

      {/* Timeline layout: date | gutter (line + dot) | card */}
      <div className="relative">
        {/* Animated vertical line spanning all items */}
        <motion.div
          className="hidden sm:block absolute left-[7.75rem] top-4 w-px bg-gradient-to-b from-[var(--accent)] via-[var(--accent)] to-transparent"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ originY: 0, bottom: '2rem' }}
        />

        <div className="space-y-6">
          {SCHEDULE.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-6 items-start group"
            >
              {/* Date + time column */}
              <div className="schedule-date-col w-28 flex-shrink-0 pt-5 space-y-1 relative">
                <div className="flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)]">
                  <Calendar size={13} />
                  {item.date}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium opacity-40">
                  <Clock size={12} />
                  {item.time}
                </div>

                {/* Timeline dot (only on sm+) */}
                <motion.div
                  className={`hidden sm:block absolute -right-[0.15rem] top-[1.35rem] w-3 h-3 rounded-full ${item.color} border-2 border-[var(--bg)] z-10 shadow-md`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 + 0.3, duration: 0.3, type: 'spring', stiffness: 400 }}
                />
              </div>

              {/* Card */}
              <motion.div
                whileHover={{ x: 6, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="card-shine-wrap flex-1 bg-[var(--card)] backdrop-blur-md rounded-2xl p-5 border border-[var(--card-border)] group-hover:bg-[var(--card-hover)] transition-colors hover:shadow-lg"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{item.emoji}</span>
                    <h3 className="text-lg font-medium">{item.title}</h3>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-medium opacity-40 bg-[var(--divider-light)] px-3 py-1 rounded-full w-fit">
                    <MapPin size={11} /> {item.venue}
                  </span>
                </div>
                <p className="opacity-55 font-light text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

