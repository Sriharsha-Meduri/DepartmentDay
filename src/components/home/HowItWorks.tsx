import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const STEPS = [
  {
    number: '01',
    title: 'Browse Events',
    description: 'Explore our curated collection of events across four exciting categories. Filter by your interests, check out the details, and find the perfect competition for you.'
  },
  {
    number: '02',
    title: 'Pick Your Section',
    description: 'Choose between the Boys Section and Girls Section to see events tailored for you. Each section features its own dedicated pool of competitions and activities.'
  },
  {
    number: '03',
    title: 'Register Online',
    description: 'Fill out a quick two-step registration form with your details. Upload a profile picture, select your department and year, and lock in your spot instantly.'
  },
  {
    number: '04',
    title: 'Show Up and Compete',
    description: 'Arrive at the venue on event day, check in with your registration ID, and give it your best shot. Climb the leaderboard and take home the glory.'
  }
];

export function HowItWorks() {
  return (
    <section className="py-32 px-8 lg:px-16 max-w-[1600px] mx-auto relative z-20">
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
          Getting involved is simple. Four easy steps stand between you and the most exciting two days of the academic year.
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
            className="relative"
          >
            <div className="text-7xl font-bold text-[#0a2e1f]/5 mb-4 leading-none">{step.number}</div>
            <h3 className="text-xl font-medium mb-3">{step.title}</h3>
            <p className="opacity-60 font-light leading-relaxed text-sm">{step.description}</p>
            {i < STEPS.length - 1 && (
              <div className="hidden lg:block absolute top-8 right-0 translate-x-1/2 w-8 h-[2px] bg-[#0a2e1f]/10"></div>
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
            className="bg-[#0a2e1f] text-[#dcfce7] pl-8 pr-3 py-3 rounded-full font-medium hover:bg-[#0a2e1f]/90 transition-colors group inline-flex items-center gap-4"
          >
            Start Browsing Events
            <div className="w-10 h-10 rounded-full bg-[#ccff00] text-[#0a2e1f] flex items-center justify-center group-hover:scale-110 transition-transform">
              <ArrowRight size={20} />
            </div>
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
}
