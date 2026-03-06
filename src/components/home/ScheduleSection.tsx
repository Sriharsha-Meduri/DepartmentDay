import { motion } from 'framer-motion';
import { Clock, Calendar } from 'lucide-react';

const SCHEDULE = [
  {
    date: 'Mar 9',
    fullDate: 'Monday, March 9',
    time: '10:00 AM',
    title: 'Quiz Blitz',
    description: 'Rapid-fire technical quiz covering programming fundamentals, data structures, algorithms, and current tech trends. Three rounds: written, buzzer, and rapid fire.',
    venue: 'IT Department',
  },
  {
    date: 'Mar 10',
    fullDate: 'Tuesday, March 10',
    time: '01:00 PM',
    title: 'Coding Contest',
    description: 'Competitive programming showdown with 6 algorithmic problems of increasing difficulty. Duration: 2 hours. Languages allowed: C, C++, Java, Python.',
    venue: 'IT Department',
  },
  {
    date: 'Mar 17',
    fullDate: 'Tuesday, March 17',
    time: '10:00 AM',
    title: 'Vibeathon',
    description: 'Build the most creative and visually stunning web application in 4 hours. Judged on design, creativity, functionality, and overall vibe.',
    venue: 'IT Department',
  },
  {
    date: 'Mar 18',
    fullDate: 'Wednesday, March 18',
    time: '01:00 PM',
    title: 'Cyber Hunt',
    description: 'Capture The Flag cybersecurity challenge involving cryptography, steganography, web exploitation, and forensics. Duration: 3 hours.',
    venue: 'IT Department',
  },
];

export function ScheduleSection() {
  return (
    <section id="schedule" className="py-32 px-8 lg:px-16 max-w-[1600px] mx-auto relative z-20 scroll-mt-24">
      <div className="mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl lg:text-5xl font-medium tracking-tight mb-4"
        >
          Event Schedule
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.1 }}
          className="text-lg opacity-70 max-w-2xl font-light"
        >
          Four technical events spread across March. Mark your dates and come prepared to compete.
        </motion.p>
      </div>

      <div className="space-y-4">
        {SCHEDULE.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex gap-6 items-start group"
          >
            <div className="w-36 flex-shrink-0 pt-1 space-y-1">
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--accent)]">
                <Calendar size={14} />
                {item.date}
              </div>
              <div className="flex items-center gap-2 text-sm font-medium opacity-50">
                <Clock size={14} />
                {item.time}
              </div>
            </div>
            <div className="flex-1 bg-[var(--card)] backdrop-blur-md rounded-2xl p-6 border border-[var(--card-border)] group-hover:bg-[var(--card-hover)] transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                <h3 className="text-lg font-medium">{item.title}</h3>
                <span className="text-xs font-medium opacity-50 bg-[var(--divider-light)] px-3 py-1 rounded-full w-fit">{item.venue}</span>
              </div>
              <p className="opacity-60 font-light text-sm leading-relaxed">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
