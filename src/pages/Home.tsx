import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowDown, Sparkles, Layers, Zap, ArrowRight, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassBars } from '../components/GlassBars';
import { useApp } from '../context/AppContext';
import { MOCK_EVENTS } from '../data/mock';
import { StatsSection } from '../components/home/StatsSection';
import { HowItWorks } from '../components/home/HowItWorks';
import { ScheduleSection } from '../components/home/ScheduleSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { FaqSection } from '../components/home/FaqSection';

const CATEGORIES = [
  { icon: Sparkles, title: "Technical", desc: "Put your problem-solving skills to the test with coding competitions, hackathons, debugging challenges, and tech quizzes. Perfect for those who think in algorithms and dream in code.", color: "bg-blue-100 text-blue-800", cat: 'TECHNICAL' as const },
  { icon: Layers, title: "Non-Technical", desc: "Showcase your creativity and communication through debates, essay writing, quiz bowls, and artistic performances. No coding required, just raw talent and quick thinking.", color: "bg-purple-100 text-purple-800", cat: 'NON-TECHNICAL' as const },
  { icon: Zap, title: "Indoor", desc: "Strategic minds and steady hands take center stage with chess tournaments, table tennis matches, carrom battles, and board game showdowns in climate-controlled comfort.", color: "bg-orange-100 text-orange-800", cat: 'INDOOR' as const },
  { icon: ArrowUpRight, title: "Outdoor", desc: "Burn off that energy on the field with futsal, relay races, tug of war, and athletics. These events reward speed, strength, teamwork, and sheer determination.", color: "bg-green-100 text-green-800", cat: 'OUTDOOR' as const }
];

const textContainer = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };
const textItem = { hidden: { opacity: 0, y: 40, rotateX: -20 }, show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };

export function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const { setSection } = useApp();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: (e.clientX / window.innerWidth) * 2 - 1, y: (e.clientY / window.innerHeight) * 2 - 1 });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const targetDate = new Date('2026-04-15T00:00:00').getTime();
    const interval = setInterval(() => {
      const distance = targetDate - Date.now();
      if (distance < 0) { clearInterval(interval); return; }
      setTimeLeft({
        days: Math.floor(distance / 86400000),
        hours: Math.floor((distance % 86400000) / 3600000),
        minutes: Math.floor((distance % 3600000) / 60000),
        seconds: Math.floor((distance % 60000) / 1000)
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const featuredEvents = MOCK_EVENTS.slice(0, 6);

  return (
    <div ref={containerRef}>
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex flex-col pt-24 pb-12 px-8 lg:px-16 max-w-[1600px] mx-auto w-full">
        <main className="flex-1 flex flex-col lg:flex-row items-center justify-between relative w-full">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="lg:w-1/2 z-10 relative pt-12 lg:pt-0">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="inline-block px-4 py-1.5 rounded-full border border-[#0a2e1f]/20 text-sm font-medium mb-6 bg-white/20 backdrop-blur-sm">
              April 15-16, 2026 | Department Day
            </motion.div>
            <motion.h1 variants={textContainer} initial="hidden" animate="show" className="text-[4rem] sm:text-[5rem] lg:text-[6rem] font-medium leading-[0.95] tracking-[-0.03em] mb-8 perspective-1000">
              <motion.div variants={textItem} className="origin-bottom">Celebrate</motion.div>
              <motion.div variants={textItem} className="origin-bottom">Excellence &</motion.div>
              <motion.div variants={textItem} className="origin-bottom">Innovation.</motion.div>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-lg lg:text-xl opacity-70 max-w-md mb-10 leading-relaxed font-light">
              Two days of fierce competition, creative expression, and unforgettable moments. From coding battles to athletic showdowns, Department Day 2026 brings together the best talent across every discipline.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="flex gap-4 mb-10">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <motion.div key={unit} whileHover={{ y: -5, scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }} className="flex flex-col items-center justify-center bg-white/40 backdrop-blur-md rounded-2xl w-20 h-20 border border-white/50 shadow-sm">
                  <span className="text-2xl font-bold">{value.toString().padStart(2, '0')}</span>
                  <span className="text-xs uppercase tracking-wider opacity-70">{unit}</span>
                </motion.div>
              ))}
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-wrap items-center gap-4">
              <Link to="/events" onClick={() => setSection('BOYS')}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-[#0a2e1f] text-[#dcfce7] pl-6 pr-2 py-2 rounded-full flex items-center gap-4 font-medium hover:bg-[#0a2e1f]/90 transition-colors group">
                  Boys Section
                  <div className="w-10 h-10 rounded-full bg-[#ccff00] text-[#0a2e1f] flex items-center justify-center group-hover:scale-110 transition-transform"><ArrowUpRight size={20} /></div>
                </motion.div>
              </Link>
              <Link to="/events" onClick={() => setSection('GIRLS')}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-white/50 backdrop-blur-md text-[#0a2e1f] pl-6 pr-2 py-2 rounded-full flex items-center gap-4 font-medium hover:bg-white/70 transition-colors border border-[#0a2e1f]/10 group">
                  Girls Section
                  <div className="w-10 h-10 rounded-full bg-[#0a2e1f] text-[#dcfce7] flex items-center justify-center group-hover:scale-110 transition-transform"><ArrowUpRight size={20} /></div>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
          <div className="lg:w-1/2 relative h-[500px] lg:h-[700px] w-full mt-12 lg:mt-0 flex items-center justify-center">
            <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
              <motion.div className="absolute w-[75%] h-[75%] rounded-full z-10" style={{ background: 'radial-gradient(circle at 35% 35%, #aaffaa 0%, #00ff44 25%, #00aa22 80%, #004411 100%)', boxShadow: '0 20px 50px rgba(0,255,68,0.3)' }} animate={{ x: mousePosition.x * -40, y: mousePosition.y * -40 }} transition={{ type: "spring", stiffness: 40, damping: 20 }} />
              <GlassBars />
              <motion.div className="absolute w-[20%] h-[20%] rounded-full z-30 bottom-[10%] left-[10%]" style={{ background: 'radial-gradient(circle at 30% 30%, #ffff66 0%, #ccff00 40%, #88aa00 80%, #445500 100%)', boxShadow: '0 10px 30px rgba(204,255,0,0.4)' }} animate={{ x: mousePosition.x * 50, y: mousePosition.y * 50, rotate: mousePosition.x * 30 }} transition={{ type: "spring", stiffness: 30, damping: 15 }}>
                <div className="absolute inset-0 rounded-full border border-white/40" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
                <div className="absolute inset-0 rounded-full border border-white/20" style={{ clipPath: 'polygon(50% 0%, 80% 50%, 50% 100%, 20% 50%)' }}></div>
              </motion.div>
            </div>
          </div>
        </main>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.button whileHover={{ y: 5 }} className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center hover:bg-white/50 transition-colors shadow-sm border border-[#0a2e1f]/10 text-[#0a2e1f]"><ArrowDown size={18} /></motion.button>
        </motion.div>
      </section>

      {/* ===== STATS ===== */}
      <StatsSection />

      {/* ===== CATEGORIES ===== */}
      <section className="py-32 px-8 lg:px-16 max-w-[1600px] mx-auto relative z-20 bg-[#dcfce7]">
        <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="text-4xl lg:text-5xl font-medium tracking-tight mb-4">Event Categories</motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: 0.1 }} className="text-lg opacity-70 max-w-2xl font-light">Four distinct categories designed to challenge every kind of talent. Whether you thrive behind a screen, on the field, at a chessboard, or on stage, there is a place for you here.</motion.p>
          </div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }}>
            <Link to="/events" className="flex items-center gap-2 font-medium hover:text-[#00aa22] transition-colors group">View all events <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></Link>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CATEGORIES.map((cat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -10, scale: 1.02 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: i * 0.1 }} className="bg-white/40 backdrop-blur-lg rounded-3xl p-8 border border-white/50 hover:bg-white/80 transition-colors cursor-pointer group shadow-sm hover:shadow-xl">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${cat.color}`}><cat.icon size={24} /></div>
              <h3 className="text-2xl font-medium mb-3 group-hover:text-[#00aa22] transition-colors">{cat.title}</h3>
              <p className="opacity-70 font-light leading-relaxed text-sm mb-4">{cat.desc}</p>
              <div className="text-xs font-medium opacity-50 uppercase tracking-wider">{MOCK_EVENTS.filter(e => e.category === cat.cat).length} Events</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <HowItWorks />

      {/* ===== FEATURED EVENTS ===== */}
      <section className="py-32 px-8 lg:px-16 max-w-[1600px] mx-auto relative z-20">
        <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="text-4xl lg:text-5xl font-medium tracking-tight mb-4">Featured Events</motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: 0.1 }} className="text-lg opacity-70 max-w-2xl font-light">A handpicked selection of the most anticipated events this year. These are the ones everyone is talking about, so do not miss your chance to be part of the action.</motion.p>
          </div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }}>
            <Link to="/events" className="flex items-center gap-2 font-medium hover:text-[#00aa22] transition-colors group">See all events <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></Link>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEvents.map((event, i) => (
            <motion.div key={event.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -12, scale: 1.02 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: i * 0.1 }} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#0a2e1f]/5 flex flex-col group hover:shadow-2xl transition-shadow duration-500">
              <div className="h-48 overflow-hidden relative">
                <motion.img whileHover={{ scale: 1.1 }} transition={{ duration: 0.6 }} src={event.image} alt={event.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-[#0a2e1f]">{event.category}</span>
                  <span className="bg-[#ccff00]/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-[#0a2e1f]">{event.section}</span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-medium mb-2">{event.title}</h3>
                <p className="opacity-70 font-light text-sm mb-4 line-clamp-2 flex-1">{event.description}</p>
                <div className="flex items-center gap-3 text-xs opacity-50 mb-4">
                  <span className="flex items-center gap-1"><Clock size={12} /> {event.time}</span>
                  <span className="flex items-center gap-1"><MapPin size={12} /> {event.venue}</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#0a2e1f]/5">
                  <div className="text-sm font-medium opacity-60">{event.registeredCount} Registered</div>
                  <Link to={`/event/${event.id}`} className="w-10 h-10 rounded-full bg-[#0a2e1f]/5 flex items-center justify-center group-hover:bg-[#0a2e1f] group-hover:text-[#dcfce7] transition-colors"><ArrowUpRight size={18} /></Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== SCHEDULE ===== */}
      <ScheduleSection />

      {/* ===== TESTIMONIALS ===== */}
      <TestimonialsSection />

      {/* ===== FAQ ===== */}
      <FaqSection />
    </div>
  );
}
