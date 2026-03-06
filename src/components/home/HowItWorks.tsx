import type { ReactNode, MouseEvent as RMouseEvent } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/** 3-D perspective tilt that follows cursor within the card bounds */
function TiltCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotX = useSpring(useTransform(rawY, [-0.5, 0.5], [9, -9]), { stiffness: 200, damping: 25 });
  const rotY = useSpring(useTransform(rawX, [-0.5, 0.5], [-9, 9]), { stiffness: 200, damping: 25 });

  function onMove(e: RMouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width - 0.5);
    rawY.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() { rawX.set(0); rawY.set(0); }

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d', perspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const STEPS = [
  {
    number: '01',
    title: 'Pick Your Poison',
    description: 'Quiz Blitz if you live for trivia. Coding Contest if your terminal is your best friend. Vibeathon if design is your thing. Cyber Hunt if you want to feel like a hacker. Four events. One of them has your name on it.',
    emoji: '🎯'
  },
  {
    number: '02',
    title: 'Solo or Squad',
    description: 'Some events are solo glory, some need a crew. Round up your classmates, argue about strategy for 20 minutes, then show up as a unit. Bonds formed under competition hit different.',
    emoji: '🤝'
  },
  {
    number: '03',
    title: 'Register in 30 Seconds',
    description: 'Name. Reg number. Done. No essay questions, no interviews, no hidden fee at checkout. Just lock in your spot before someone else does. Seriously, it fills up.',
    emoji: '⚡'
  },
  {
    number: '04',
    title: 'Show Up. Go Off.',
    description: 'Come early, grab your seat, and show the entire IT department what you\'re made of. Trophies wait for no one. Your batch is watching. Make it count.',
    emoji: '🏆'
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 px-8 lg:px-16 max-w-[1600px] mx-auto relative z-20 scroll-mt-24">
      <div className="mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl lg:text-5xl font-medium tracking-tight mb-4"
        >
          Your game plan 🗺️
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.1 }}
          className="text-lg opacity-70 max-w-2xl font-light"
        >
          Seriously, it's this simple. Four steps between you and the most chaotic, competitive, glorious day of your college year.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
        {STEPS.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="h-full"
          >
            <TiltCard className="h-full relative bg-[var(--card)] backdrop-blur-md rounded-3xl p-8 border border-[var(--card-border)] hover:bg-[var(--card-hover)] transition-colors shadow-sm hover:shadow-xl flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl">{step.emoji}</span>
                <div className="text-4xl font-bold opacity-10 leading-none">{step.number}</div>
              </div>
              <h3 className="text-xl font-medium mb-3">{step.title}</h3>
              <p className="opacity-60 font-light leading-relaxed text-sm flex-1">{step.description}</p>
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 w-8 h-[2px] bg-[var(--divider)] z-10"></div>
              )}
            </TiltCard>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ delay: 0.6 }}
        className="mt-12 text-center"
      >
        <Link to="/events">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[var(--btn)] text-[var(--btn-text)] pl-8 pr-3 py-3 rounded-full font-medium hover:opacity-90 transition-all group inline-flex items-center gap-4"
          >
            I'm in. Let's go 🔥
            <div className="w-10 h-10 rounded-full bg-[var(--highlight)] text-[#0a2e1f] flex items-center justify-center group-hover:scale-110 transition-transform">
              <ArrowRight size={20} />
            </div>
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
}
