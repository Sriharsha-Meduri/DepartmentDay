import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowDown, ArrowRight, Clock, MapPin, ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassBars } from '../components/GlassBars';
import { MOCK_EVENTS } from '../data/mock';
import { StatsSection } from '../components/home/StatsSection';
import { HowItWorks } from '../components/home/HowItWorks';
import { ScheduleSection } from '../components/home/ScheduleSection';
import { FaqSection } from '../components/home/FaqSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';

const textContainer = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };
const textItem = { hidden: { opacity: 0, y: 40, rotateX: -20 }, show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };

export function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hrs: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: (e.clientX / window.innerWidth) * 2 - 1, y: (e.clientY / window.innerHeight) * 2 - 1 });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const targetDate = new Date('2026-04-08T00:00:00').getTime();
    const interval = setInterval(() => {
      const distance = targetDate - Date.now();
      if (distance < 0) { clearInterval(interval); return; }
      setTimeLeft({
        days: Math.floor(distance / 86400000),
        hrs: Math.floor((distance % 86400000) / 3600000),
        mins: Math.floor((distance % 3600000) / 60000),
        secs: Math.floor((distance % 60000) / 1000)
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const featuredEvents = MOCK_EVENTS.slice(0, 6);

  return (
    <div ref={containerRef}>
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex flex-col pt-24 pb-12 px-5 sm:px-8 lg:px-16 max-w-[1600px] mx-auto w-full">
        <main className="flex-1 flex flex-col lg:flex-row items-center justify-between relative w-full">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="lg:w-1/2 z-10 relative pt-4 sm:pt-10 lg:pt-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--divider)] text-[0.7rem] sm:text-sm font-medium mb-5 sm:mb-6 bg-[var(--card)] backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-dot inline-block"></span>
              April 8, 2026 · IT Department Day · it's happening 🎉
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-5 sm:mb-6"
            >
              <Link to="/event/e11" className="inline-flex items-center gap-2 rounded-full bg-emerald-600 text-white px-4 py-2 text-xs sm:text-sm font-semibold border border-emerald-500 hover:bg-emerald-700 transition-colors shadow-sm">
                Vibeathon problem statements released - View & Download
              </Link>
            </motion.div>

            <motion.h1 variants={textContainer} initial="hidden" animate="show" className="text-[2.6rem] sm:text-[4rem] lg:text-[6rem] font-medium leading-[0.95] tracking-[-0.03em] mb-5 sm:mb-8 perspective-1000">
              <motion.div variants={textItem} className="origin-bottom">Create.</motion.div>
              <motion.div variants={textItem} className="origin-bottom">Compete.</motion.div>
              <motion.div variants={textItem} className="origin-bottom animate-text-shimmer">Celebrate.</motion.div>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 0.4 }} 
              className="text-sm sm:text-lg lg:text-xl opacity-70 max-w-md mb-7 sm:mb-10 leading-relaxed font-light"
            >
              The IT Department's biggest day is here. Four technical events are open right now: quiz your knowledge, code your way out, design something brilliant, or hunt for flags. More events coming soon. No fees. No excuses.
            </motion.p>

            {/* Countdown Timer */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 0.5 }} 
              className="flex gap-2 sm:gap-4 mb-7 sm:mb-10"
            >
              {Object.entries(timeLeft).map(([unit, value]) => (
                <motion.div 
                  key={unit} 
                  whileHover={{ y: -5, scale: 1.05 }} 
                  transition={{ type: "spring", stiffness: 400, damping: 10 }} 
                  className="flex flex-col items-center justify-center bg-[var(--card)] backdrop-blur-md rounded-2xl w-14 h-14 sm:w-20 sm:h-20 border border-[var(--card-border)] shadow-sm"
                >
                  <span className="text-base sm:text-2xl font-bold">{value.toString().padStart(2, '0')}</span>
                  <span className="text-xs uppercase tracking-wider opacity-70">{unit}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 0.6 }} 
              className="flex flex-wrap items-center gap-4"
            >
              <Link to="/events">
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }} 
                  className="bg-[var(--btn)] text-[var(--btn-text)] pl-6 pr-2 py-2 rounded-full flex items-center gap-4 font-medium hover:opacity-90 transition-all group"
                >
                  Explore Events
                  <div className="w-10 h-10 rounded-full bg-[var(--highlight)] text-[#0a2e1f] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowUpRight size={20} />
                  </div>
                </motion.div>
              </Link>
              <Link to="/events">
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }} 
                  className="bg-[var(--card)] backdrop-blur-md text-[var(--text)] pl-6 pr-2 py-2 rounded-full flex items-center gap-4 font-medium hover:bg-[var(--card-hover)] transition-colors border border-[var(--card-border)] group"
                >
                  Register Now
                  <div className="w-10 h-10 rounded-full bg-[var(--btn)] text-[var(--btn-text)] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowRight size={20} />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <div className="lg:w-1/2 relative h-[260px] sm:h-[400px] lg:h-[700px] w-full mt-6 sm:mt-12 lg:mt-0 flex items-center justify-center">
            <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
              <motion.div 
                className="absolute w-[75%] h-[75%] rounded-full z-10" 
                style={{ background: 'radial-gradient(circle at 35% 35%, #aaffaa 0%, #00ff44 25%, #00aa22 80%, #004411 100%)', boxShadow: '0 20px 50px rgba(0,255,68,0.3)' }} 
                animate={{ x: mousePosition.x * -40, y: mousePosition.y * -40 }} 
                transition={{ type: "spring", stiffness: 40, damping: 20 }} 
              />
              <GlassBars />
              <motion.div 
                className="absolute w-[20%] h-[20%] rounded-full z-30 bottom-[10%] left-[10%]" 
                style={{ background: 'radial-gradient(circle at 30% 30%, #ffff66 0%, #ccff00 40%, #88aa00 80%, #445500 100%)', boxShadow: '0 10px 30px rgba(204,255,0,0.4)' }} 
                animate={{ x: mousePosition.x * 50, y: mousePosition.y * 50, rotate: mousePosition.x * 30 }} 
                transition={{ type: "spring", stiffness: 30, damping: 15 }}
              >
                <div className="absolute inset-0 rounded-full border border-white/40" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
                <div className="absolute inset-0 rounded-full border border-white/20" style={{ clipPath: 'polygon(50% 0%, 80% 50%, 50% 100%, 20% 50%)' }}></div>
              </motion.div>

              {/* Floating Event Chips */}
              <motion.div
                className="absolute top-[8%] right-[2%] z-40 bg-[var(--card-solid)] border border-[var(--divider-light)] rounded-2xl px-4 py-2.5 shadow-lg text-xs font-semibold flex items-center gap-2 animate-float"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <span className="w-2 h-2 rounded-full bg-blue-400"></span> Quiz Blitz · Mar 10
              </motion.div>
              <motion.div
                className="absolute top-[38%] right-[-4%] z-40 bg-[var(--highlight)] text-[#0a2e1f] rounded-2xl px-4 py-2.5 shadow-lg text-xs font-bold flex items-center gap-2 animate-float-slow hero-chip-right-overflow"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                ⚡ Coding Contest · Mar 10
              </motion.div>
              <motion.div
                className="absolute bottom-[28%] right-[0%] z-40 bg-[var(--card-solid)] border border-[var(--divider-light)] rounded-2xl px-4 py-2.5 shadow-lg text-xs font-semibold flex items-center gap-2 animate-float hero-chip-right-overflow"
                style={{ animationDelay: '1s' }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
              >
                <span className="w-2 h-2 rounded-full bg-purple-400"></span> Vibeathon · Mar 17 · 9:00 AM
              </motion.div>
              <motion.div
                className="absolute bottom-[8%] right-[12%] z-40 bg-[var(--btn)] text-[var(--btn-text)] rounded-2xl px-4 py-2.5 shadow-lg text-xs font-semibold flex items-center gap-2 animate-float-slow"
                style={{ animationDelay: '2s' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.6 }}
              >
                🔐 Cyber Hunt · Mar 18
              </motion.div>
            </div>
          </div>
        </main>

        {/* Scroll Indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.button whileHover={{ y: 5 }} className="w-10 h-10 rounded-full bg-[var(--card)] backdrop-blur-md flex items-center justify-center hover:bg-[var(--card-hover)] transition-colors shadow-sm border border-[var(--card-border)] text-[var(--text)]">
            <ArrowDown size={18} />
          </motion.button>
        </motion.div>
      </section>

      {/* ===== MARQUEE TICKER ===== */}
      <div className="overflow-hidden py-3.5 bg-[var(--btn)] text-[var(--btn-text)]">
        <div className="flex animate-marquee whitespace-nowrap w-max">
          {[0, 1].map((i) => (
            <span key={i} className="flex items-center">
              {['QUIZ BLITZ', 'MARCH 10 AM', 'CODING CONTEST', 'MARCH 10 PM', 'VIBEATHON', 'MARCH 17 · 9:00 AM', 'PS RELEASED', 'CYBER HUNT', 'MARCH 18', 'FREE ENTRY', 'NO EXCUSES', 'GLORY AWAITS', 'SHOW UP & WIN', 'IT DEPARTMENT', 'APRIL 8 2026', 'REGISTER FREE', 'DEPARTMENT DAY'].map((text) => (
                <span key={text} className="flex items-center">
                  <span className="text-xs font-bold tracking-[0.2em] uppercase px-5">{text}</span>
                  <span className="text-[var(--highlight)] text-base">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ===== STATS ===== */}
      <StatsSection />

      {/* ===== HOW IT WORKS ===== */}
      <HowItWorks />

      {/* ===== FEATURED EVENTS ===== */}
      <section className="py-16 px-5 sm:px-8 lg:px-16 max-w-[1600px] mx-auto relative z-20">
        <div className="mb-10 flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-4">
              The lineup ⚔️
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: 0.1 }} className="text-lg opacity-70 max-w-2xl font-light">
              Four technical showdowns open right now. More events across sports, culture & more are being announced soon. Spot something you like? Register before the seat's gone.
            </motion.p>
          </div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }}>
            <Link to="/events" className="flex items-center gap-2 font-medium hover:text-[var(--accent)] transition-colors group">
              See all events <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEvents.map((event, i) => (
            <motion.div 
              key={event.id} 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              whileHover={{ y: -12, scale: 1.02 }} 
              viewport={{ once: true, margin: "-100px" }} 
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }} 
              className="card-shine-wrap bg-[var(--card-solid)] rounded-3xl overflow-hidden border border-[var(--divider-light)] flex flex-col group hover:shadow-2xl transition-shadow duration-500"
            >
              <div className="h-48 overflow-hidden relative">
                <motion.img whileHover={{ scale: 1.1 }} transition={{ duration: 0.6 }} src={event.image} alt={event.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-[var(--badge-bg)] backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">{event.category}</span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-medium mb-2">{event.title}</h3>
                <p className="opacity-70 font-light text-sm mb-4 line-clamp-2 flex-1">{event.description}</p>
                <div className="flex items-center gap-3 text-xs opacity-50 mb-4">
                  <span className="flex items-center gap-1"><Clock size={12} /> {event.time}</span>
                  <span className="flex items-center gap-1"><MapPin size={12} /> {event.venue}</span>
                </div>
                <div className="flex items-center justify-end pt-4 border-t border-[var(--divider-light)]">
                  <Link to={`/event/${event.id}`} className="w-10 h-10 rounded-full bg-[var(--divider-light)] flex items-center justify-center group-hover:bg-[var(--btn)] group-hover:text-[var(--btn-text)] transition-colors">
                    <ArrowUpRight size={18} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== SCHEDULE ===== */}
      <ScheduleSection />

      {/* ===== FAQ ===== */}
      <FaqSection />

      {/* ===== TESTIMONIALS ===== */}
      <TestimonialsSection />

      {/* ===== MADE WITH LOVE BY ===== */}
      <section className="py-16 px-5 sm:px-8 lg:px-16 max-w-[1600px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-6 sm:mb-8">
            Made with <span className="text-[var(--accent)]">love</span> by
          </h2>

          <div className="relative bg-[var(--card)] backdrop-blur-md rounded-3xl border border-[var(--card-border)] overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500">
            {/* Rainbow accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-[var(--accent)] via-[var(--highlight)] to-purple-400" />

            <div className="p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">

                {/* Avatar + name */}
                <div className="flex-shrink-0 flex flex-col items-center lg:items-start gap-2">
                  <motion.div
                    whileHover={{ rotate: [0, -4, 4, -2, 0], scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold text-[#0a2e1f] shadow-lg select-none"
                    style={{ background: 'linear-gradient(135deg, #4ade80 0%, #ccff00 60%, #a3e635 100%)' }}
                  >
                    SM
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-medium">Sriharsha Meduri</h3>
                    <p className="text-xs opacity-40 mt-0.5">3rd yr · IT · AU</p>
                  </div>
                </div>

                {/* Middle: bio + terminal block */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-light opacity-70 leading-relaxed mb-3">
                    One sleep-deprived third-year built this entire site (design, frontend, all of it) because it sounded like a fun problem. It was. Mostly.
                  </p>

                  {/* Fake terminal */}
                  <div className="bg-[var(--card-solid)] rounded-xl border border-[var(--divider-light)] overflow-hidden mb-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 border-b border-[var(--divider-light)] bg-[var(--divider-light)]/30">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400 opacity-70"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 opacity-70"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400 opacity-70"></span>
                      <span className="ml-2 text-xs opacity-30 font-mono">build_log.sh</span>
                    </div>
                    <div className="px-4 py-3 font-mono text-xs space-y-1">
                      <div className="flex items-center gap-3 opacity-60">
                        <span className="text-[var(--accent)]">▸</span>
                        <span>coffee_consumed</span>
                        <span className="ml-auto opacity-40 italic">// yes</span>
                      </div>
                      <div className="flex items-center gap-3 opacity-60">
                        <span className="text-[var(--accent)]">▸</span>
                        <span>sleep_hours_lost</span>
                        <span className="ml-auto opacity-40 italic">// significant</span>
                      </div>
                      <div className="flex items-center gap-3 opacity-60">
                        <span className="text-[var(--accent)]">▸</span>
                        <span>stack_overflow_tabs</span>
                        <span className="ml-auto opacity-40 italic">// don't ask</span>
                      </div>
                      <div className="flex items-center gap-3 opacity-60">
                        <span className="text-[var(--accent)]">▸</span>
                        <span>bugs_fixed</span>
                        <span className="ml-auto opacity-40 italic">// most of them</span>
                      </div>
                      <div className="flex items-center gap-3 pt-1 border-t border-[var(--divider-light)] mt-1">
                        <span className="text-[var(--highlight)]">✓</span>
                        <span className="text-[var(--highlight)] font-semibold">result</span>
                        <span className="ml-auto opacity-50 italic">// you're looking at it</span>
                      </div>
                    </div>
                  </div>

                  {/* Powered by chips */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs opacity-40 font-medium uppercase tracking-wider mr-1">powered by</span>
                    {['React', 'TypeScript', 'Tailwind', 'Framer Motion', 'Vite', 'Python'].map(s => (
                      <span key={s} className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--card-solid)] border border-[var(--divider-light)] opacity-70">{s}</span>
                    ))}
                  </div>

                  <p className="text-sm opacity-50 font-light">
                    Wanna see what else I've built?{' '}
                    <a href="https://sriharshameduri.in" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] font-medium hover:underline underline-offset-4 transition-all">
                      sriharshameduri.in ↗
                    </a>
                  </p>
                </div>

                {/* Links sidebar */}
                <div className="flex-shrink-0 w-full lg:w-48 flex flex-col gap-2 self-center">
                  <a href="https://github.com/Sriharsha-Meduri" target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[var(--btn)] text-[var(--btn-text)] font-medium text-sm hover:opacity-90 transition-all hover:scale-[1.02] active:scale-95">
                    <Github size={15} /> GitHub
                  </a>
                  <a href="https://linkedin.com/in/sriharsha-meduri" target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[var(--card-solid)] border border-[var(--divider-light)] font-medium text-sm hover:bg-[var(--card-hover)] transition-all hover:scale-[1.02] active:scale-95">
                    <ExternalLink size={15} /> LinkedIn
                  </a>
                </div>

              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
