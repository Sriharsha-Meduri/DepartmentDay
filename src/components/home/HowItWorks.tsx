import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const STEPS = [
  {
    number: '01',
    title: 'Pick Your Event',
    description: 'Quiz Blitz, Coding Contest, Vibeathon, or Cyber Hunt — browse all four, check the rules, see the dates, and decide where you want to leave your mark.',
    emoji: '🎯'
  },
  {
    number: '02',
    title: 'Team Up or Solo',
    description: 'Some events are solo, some need a squad. Get your classmates together, decide your strategy, and build the team that is going to dominate.',
    emoji: '🤝'
  },
  {
    number: '03',
    title: 'Register Free',
    description: 'Quick two-step form — name, reg number, department, done. No fees, no hassle. Just lock in your spot before it fills up.',
    emoji: '⚡'
  },
  {
    number: '04',
    title: 'Show Up & Win',
    description: 'Come to the IT Department on event day with your college ID, bring your A-game, and make your batch proud. Glory awaits.',
    emoji: '🏆'
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 px-8 lg:px-16 max-w-[1600px] mx-auto relative z-20 scroll-mt-24">
      <div className="mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl lg:text-5xl font-medium tracking-tight mb-4"
        >
          How It Works
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.1 }}
          className="text-lg opacity-70 max-w-2xl font-light"
        >
          Getting involved is simple. Four easy steps between you and the most legendary day of your college year.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {STEPS.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative bg-[var(--card)] backdrop-blur-md rounded-3xl p-8 border border-[var(--card-border)] hover:bg-[var(--card-hover)] transition-colors shadow-sm hover:shadow-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-4xl">{step.emoji}</span>
              <div className="text-4xl font-bold opacity-10 leading-none">{step.number}</div>
            </div>
            <h3 className="text-xl font-medium mb-3">{step.title}</h3>
            <p className="opacity-60 font-light leading-relaxed text-sm">{step.description}</p>
            {i < STEPS.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 w-8 h-[2px] bg-[var(--divider)] z-10"></div>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ delay: 0.6 }}
        className="mt-16 text-center"
      >
        <Link to="/events">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[var(--btn)] text-[var(--btn-text)] pl-8 pr-3 py-3 rounded-full font-medium hover:opacity-90 transition-all group inline-flex items-center gap-4"
          >
            Start Registering Now
            <div className="w-10 h-10 rounded-full bg-[var(--highlight)] text-[#0a2e1f] flex items-center justify-center group-hover:scale-110 transition-transform">
              <ArrowRight size={20} />
            </div>
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
}
