import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    role: '3rd Year, CSE',
    quote: 'Department Day was the highlight of my college life. The hackathon pushed me to build something I never thought I could in 24 hours. The energy in the room was absolutely electric.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=priya',
    accent: 'from-blue-400 to-cyan-400',
  },
  {
    name: 'Rahul Menon',
    role: '2nd Year, ECE',
    quote: 'The futsal tournament was incredibly well organized. Fair referees, great sportsmanship, and the crowd support made every goal feel like a World Cup moment. Cannot wait for next year.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=rahul',
    accent: 'from-green-400 to-lime-400',
  },
  {
    name: 'Ananya Reddy',
    role: '4th Year, IT',
    quote: 'I participated in the debate and the creative writing event. Both were challenging and rewarding. The coordinators were super helpful and the judging was fully transparent.',
    rating: 4,
    avatar: 'https://i.pravatar.cc/150?u=ananya',
    accent: 'from-purple-400 to-pink-400',
  },
  {
    name: 'Karthik Nair',
    role: '1st Year, MECH',
    quote: 'As a first-year I was nervous about participating, but the volunteers were welcoming and the vibe was great. I ended up winning 3rd place in chess. Didn\'t see that coming.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=karthik',
    accent: 'from-orange-400 to-yellow-400',
  },
  {
    name: 'Divya Krishnan',
    role: '2nd Year, IT',
    quote: 'The Vibeathon was unreal. We had four hours to build a web app from scratch and somehow pulled it off. The judges actually understood good design. Definitely doing it again.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=divya',
    accent: 'from-rose-400 to-red-400',
  },
  {
    name: 'Arun Prakash',
    role: '3rd Year, CSE',
    quote: 'Cyber Hunt was the most fun I\'ve had in college. Stayed up until 3 AM solving CTF challenges with my team. We placed 2nd. The problems were genuinely clever and fair.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=arun',
    accent: 'from-teal-400 to-green-400',
  },
];

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[number] }) {
  return (
    <div className="testimonial-card w-80 flex-shrink-0 bg-[var(--card)] backdrop-blur-md rounded-3xl p-6 border border-[var(--card-border)] flex flex-col gap-4 mx-3 hover:bg-[var(--card-hover)] transition-colors card-shine-wrap">
      <div className="flex items-start justify-between">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, j) => (
            <Star key={j} size={14} className={j < t.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} />
          ))}
        </div>
        <Quote size={18} className="opacity-20 flex-shrink-0" />
      </div>
      <p className="opacity-65 font-light leading-relaxed text-sm flex-1 line-clamp-4">"{t.quote}"</p>
      <div className="flex items-center gap-3 pt-3 border-t border-[var(--divider-light)]">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.accent} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
          {t.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <div className="font-medium text-sm">{t.name}</div>
          <div className="text-xs opacity-40">{t.role}</div>
        </div>
      </div>
    </div>
  );
}

// 4 copies of each set so the -50% loop looks seamless at any viewport width
const ROW1 = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];
const ROW2 = [...TESTIMONIALS.slice().reverse(), ...TESTIMONIALS.slice().reverse(), ...TESTIMONIALS.slice().reverse(), ...TESTIMONIALS.slice().reverse()];

export function TestimonialsSection() {
  return (
    <section className="py-16 px-0 relative z-20 overflow-hidden">
      {/* Heading */}
      <div className="px-5 sm:px-8 lg:px-16 max-w-[1600px] mx-auto mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-4"
        >
          What they said last time 💬
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.1 }}
          className="text-lg opacity-70 max-w-2xl font-light"
        >
          These are real quotes from students who showed up to previous Department Day editions. Your turn to add one.
        </motion.p>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="overflow-hidden mb-4">
        <div className="flex animate-marquee-medium w-max">
          {ROW1.map((t, i) => <Fragment key={`r1-${i}`}><TestimonialCard t={t} /></Fragment>)}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="overflow-hidden">
        <div className="flex animate-marquee-reverse w-max">
          {ROW2.map((t, i) => <Fragment key={`r2-${i}`}><TestimonialCard t={t} /></Fragment>)}
        </div>
      </div>
    </section>
  );
}


