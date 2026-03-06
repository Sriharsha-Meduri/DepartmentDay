import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, MapPin, Users, Phone, ArrowRight, Gift, Sparkles, Target, Star } from 'lucide-react';
import { MOCK_EVENTS } from '../data/mock';
import { useRef } from 'react';

const PRIZES = [
  { place: '🥇 1st Place', reward: 'Trophy + Certificate + Cash Prize', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
  { place: '🥈 2nd Place', reward: 'Silver Medal + Certificate', color: 'bg-gray-100 text-gray-700 border-gray-300' },
  { place: '🥉 3rd Place', reward: 'Bronze Medal + Certificate', color: 'bg-amber-100 text-amber-800 border-amber-300' },
];

export function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const event = MOCK_EVENTS.find(e => e.id === id);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-8">
        <div className="text-7xl mb-6">👀</div>
        <h1 className="text-4xl font-medium mb-3">That event ghosted us.</h1>
        <p className="opacity-60 mb-2 font-light">Either it doesn't exist, or it got removed.</p>
        <p className="opacity-40 text-sm mb-8 font-light">Either way, there are four very real events waiting for you.</p>
        <Link to="/events" className="bg-[var(--btn)] text-[var(--btn-text)] px-8 py-3 rounded-full font-medium hover:opacity-90 transition-colors">Show me what's real →</Link>
      </div>
    );
  }

  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } };

  return (
    <div className="min-h-screen pb-24" ref={containerRef}>
      {/* Hero Banner with Parallax */}
      <div className="h-[60vh] min-h-[420px] relative overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/40 to-transparent" />
        </motion.div>
        <div className="absolute inset-0 px-5 sm:px-8 lg:px-16 max-w-[1600px] mx-auto flex flex-col justify-end pb-6 sm:pb-12 pt-20 sm:pt-24">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link to="/events" className="inline-flex items-center gap-2 text-sm font-medium hover:text-[var(--accent)] transition-colors mb-8 bg-[var(--card)] backdrop-blur-md px-4 py-2 rounded-full border border-[var(--card-border)] w-fit">
              <ArrowLeft size={16} /> Back to Events
            </Link>
          </motion.div>
          <div className="flex flex-wrap gap-3 mb-4">
            <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="bg-[var(--badge-bg)] backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium shadow-sm">
              {event.category}
            </motion.span>
          </div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="text-3xl sm:text-5xl lg:text-7xl font-medium tracking-tight">
            {event.title}
          </motion.h1>
        </div>
      </div>

      {/* Content Grid */}
      <div className="px-5 sm:px-8 lg:px-16 max-w-[1600px] mx-auto mt-6 sm:mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* About */}
            <motion.section variants={containerVariants} initial="hidden" animate="show">
              <motion.h2 variants={itemVariants} className="text-3xl font-medium mb-6">About the Event</motion.h2>
              <motion.p variants={itemVariants} className="text-xl lg:text-2xl opacity-80 font-light leading-relaxed">{event.description}</motion.p>
            </motion.section>

            {/* What to Expect */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="bg-[var(--card)] backdrop-blur-md rounded-3xl p-8 border border-[var(--card-border)] shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-medium mb-6 flex items-center gap-3">
                <Sparkles className="text-[var(--accent)]" /> What to Expect
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0"><Target size={18} /></div>
                  <div>
                    <h4 className="font-medium mb-1">You will sweat. That's the point.</h4>
                    <p className="opacity-60 font-light text-sm leading-relaxed">Everyone in that room wants the same trophy. It's going to get intense, competitive, and honestly a little chaotic. Show up ready.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0"><Users size={18} /></div>
                  <div>
                    <h4 className="font-medium mb-1">Judged by actual humans</h4>
                    <p className="opacity-60 font-light text-sm leading-relaxed">Not a script, not an algorithm. Real faculty who've seen every trick in the book. Come ready to impress, not just participate.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0"><Star size={18} /></div>
                  <div>
                    <h4 className="font-medium mb-1">You'll make weird friends</h4>
                    <p className="opacity-60 font-light text-sm leading-relaxed">You'll end up talking to someone you've never spoken to before. That's a feature. Some of the best college friendships start at competitions like this.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center flex-shrink-0"><Gift size={18} /></div>
                  <div>
                    <h4 className="font-medium mb-1">Actual prizes. Not stickers.</h4>
                    <p className="opacity-60 font-light text-sm leading-relaxed">Trophies, certificates, and cash. The kind of thing you screenshot, WhatsApp your family, and quietly add to your resume.</p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Prizes */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="bg-[var(--card-solid)] rounded-3xl p-8 shadow-sm border border-[var(--divider-light)]">
              <h2 className="text-2xl font-medium mb-6 flex items-center gap-3"><Gift className="text-[var(--accent)]" /> Prizes & Recognition</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {PRIZES.map((prize, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }} className={`rounded-2xl p-6 border text-center ${prize.color}`}>
                    <div className="text-lg font-medium mb-2">{prize.place}</div>
                    <div className="text-sm opacity-80 font-light">{prize.reward}</div>
                  </motion.div>
                ))}
              </div>
              <p className="text-sm opacity-50 font-light text-center">Every single person who shows up walks out with a Certificate of Participation. Show up, compete, get certified. It's that straightforward.</p>
            </motion.section>

            {/* Quick Tips */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }} className="bg-[var(--btn)] text-[var(--btn-text)] rounded-3xl p-8">
              <h3 className="text-xl font-medium mb-4">Don't be that person 🙏</h3>
              <ul className="space-y-3 text-sm font-light opacity-80">
                <li className="flex items-start gap-3"><span className="text-[var(--highlight)] mt-0.5">1.</span>Arrive 15 minutes early. Check-in lines exist. Don't learn this the hard way.</li>
                <li className="flex items-start gap-3"><span className="text-[var(--highlight)] mt-0.5">2.</span>Bring your college ID and registration confirmation. A screenshot is fine. Memorising your reg number is better.</li>
                <li className="flex items-start gap-3"><span className="text-[var(--highlight)] mt-0.5">3.</span>Actually read the rules before it starts. Everyone who skips this regrets it, every single time.</li>
                <li className="flex items-start gap-3"><span className="text-[var(--highlight)] mt-0.5">4.</span>Drink water. Eat something. Your brain works better when you're not running on vibes alone.</li>
              </ul>
            </motion.div>

          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Details Card */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="sticky top-24 bg-[var(--card-solid)] rounded-3xl p-8 shadow-xl border border-[var(--divider-light)]">
              <h3 className="text-xl font-medium mb-6 border-b border-[var(--divider)] pb-4">Event Details</h3>
              <div className="space-y-6">
                {[
                  { icon: Calendar, label: 'Date', value: new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) },
                  { icon: Clock, label: 'Time', value: event.time },
                  { icon: MapPin, label: 'Venue', value: event.venue },
                ].map((detail, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-[var(--icon-bg)] flex items-center justify-center text-[var(--accent)] group-hover:scale-110 transition-transform"><detail.icon size={20} /></div>
                    <div>
                      <div className="text-sm opacity-60 font-medium">{detail.label}</div>
                      <div className="font-medium">{detail.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <a href={event.formUrl} target="_blank" rel="noopener noreferrer" className="mt-8 w-full block">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full bg-[var(--btn)] text-[var(--btn-text)] py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg hover:shadow-xl group">
                  Register Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </a>
              <p className="text-xs text-center opacity-40 mt-4 font-light">Free. 30 seconds. No card required. Just do it.</p>
            </motion.div>

            {/* Coordinator Card */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }} className="bg-[var(--card)] backdrop-blur-md rounded-3xl p-8 border border-[var(--card-border)] hover:bg-[var(--card-hover)] transition-colors">
              <h3 className="text-xl font-medium mb-6">Event Coordinator</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-[var(--icon-bg)] border-2 border-[var(--card-border)] flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-[var(--accent)]">
                    {event.coordinator.name.split(' ').map((n: string) => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-lg">{event.coordinator.name}</div>
                  <div className="text-sm opacity-60">Event Head</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium opacity-80 mb-4">
                <Phone size={16} /> {event.coordinator.contact}
              </div>
              <p className="text-sm opacity-50 font-light leading-relaxed">Questions about rules, venue, teamwork, or anything else? Just text or call directly. They don't bite.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
