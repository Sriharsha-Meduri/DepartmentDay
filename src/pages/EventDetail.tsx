import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, MapPin, Users, Trophy, Phone, ArrowRight, Gift, Sparkles, Target, Star } from 'lucide-react';
import { MOCK_EVENTS } from '../data/mock';
import { useRef } from 'react';

const LEADERBOARD_DATA: Record<string, { rank: number; name: string; score: number }[]> = {
  e1: [
    { rank: 1, name: 'Team Alpha', score: 95 },
    { rank: 2, name: 'Code Breakers', score: 88 },
    { rank: 3, name: 'Byte Me', score: 82 },
    { rank: 4, name: 'Syntax Error', score: 76 },
    { rank: 5, name: 'Runtime Terror', score: 71 },
  ],
  e2: [
    { rank: 1, name: 'InnoVate', score: 97 },
    { rank: 2, name: 'HackQueens', score: 91 },
    { rank: 3, name: 'Debug Divas', score: 85 },
    { rank: 4, name: 'Code Crafters', score: 79 },
    { rank: 5, name: 'Pixel Perfect', score: 73 },
  ],
  e3: [
    { rank: 1, name: 'FC Thunder', score: 12 },
    { rank: 2, name: 'Goal Getters', score: 9 },
    { rank: 3, name: 'Strikers United', score: 7 },
    { rank: 4, name: 'Net Blazers', score: 5 },
    { rank: 5, name: 'Field Force', score: 3 },
  ],
  e4: [
    { rank: 1, name: 'Sprint Queens', score: 48 },
    { rank: 2, name: 'Relay Rockets', score: 51 },
    { rank: 3, name: 'Track Stars', score: 53 },
  ],
  e5: [
    { rank: 1, name: 'Grandmaster Raj', score: 5 },
    { rank: 2, name: 'Knight Rider', score: 4 },
    { rank: 3, name: 'Bishop Blitz', score: 3.5 },
    { rank: 4, name: 'Pawn Storm', score: 3 },
    { rank: 5, name: 'Rook Rampage', score: 2.5 },
  ],
  e6: [
    { rank: 1, name: 'Smash Queen', score: 3 },
    { rank: 2, name: 'Spin Master', score: 2 },
    { rank: 3, name: 'Net Ninja', score: 2 },
  ],
  e7: [
    { rank: 1, name: 'Eloquent Duo', score: 92 },
    { rank: 2, name: 'Word Warriors', score: 87 },
    { rank: 3, name: 'Rhetoric Kings', score: 83 },
    { rank: 4, name: 'Argument Aces', score: 78 },
  ],
  e8: [
    { rank: 1, name: 'Ink & Soul', score: 96 },
    { rank: 2, name: 'Verse Virtuoso', score: 90 },
    { rank: 3, name: 'Prose Pioneer', score: 86 },
    { rank: 4, name: 'Story Weaver', score: 81 },
    { rank: 5, name: 'Dream Scribe', score: 77 },
  ],
};

const PRIZES = [
  { place: '1st Place', reward: 'Trophy + Certificate + Cash Prize', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
  { place: '2nd Place', reward: 'Silver Medal + Certificate', color: 'bg-gray-100 text-gray-700 border-gray-300' },
  { place: '3rd Place', reward: 'Bronze Medal + Certificate', color: 'bg-amber-100 text-amber-800 border-amber-300' },
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
        <h1 className="text-4xl font-medium mb-4">Event Not Found</h1>
        <p className="opacity-70 mb-8">The event you are looking for does not exist or has been removed.</p>
        <Link to="/events" className="bg-[#0a2e1f] text-[#dcfce7] px-8 py-3 rounded-full font-medium hover:bg-[#0a2e1f]/90 transition-colors">Back to Events</Link>
      </div>
    );
  }

  const leaderboard = LEADERBOARD_DATA[event.id] || [
    { rank: 1, name: 'Team Alpha', score: 95 },
    { rank: 2, name: 'Code Breakers', score: 88 },
    { rank: 3, name: 'Byte Me', score: 82 },
  ];

  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } };

  return (
    <div className="min-h-screen pb-24" ref={containerRef}>
      {/* Hero Banner with Parallax */}
      <div className="h-[50vh] min-h-[400px] relative overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#dcfce7] via-[#dcfce7]/40 to-transparent" />
        </motion.div>
        <div className="absolute inset-0 px-8 lg:px-16 max-w-[1600px] mx-auto flex flex-col justify-end pb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link to="/events" className="inline-flex items-center gap-2 text-sm font-medium hover:text-[#00aa22] transition-colors mb-8 bg-white/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/50 w-fit">
              <ArrowLeft size={16} /> Back to Events
            </Link>
          </motion.div>
          <div className="flex flex-wrap gap-3 mb-4">
            <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium text-[#0a2e1f] shadow-sm">{event.category}</motion.span>
            <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="bg-[#ccff00]/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium text-[#0a2e1f] shadow-sm">{event.section}</motion.span>
          </div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="text-5xl lg:text-7xl font-medium tracking-tight">{event.title}</motion.h1>
        </div>
      </div>

      {/* Content Grid */}
      <div className="px-8 lg:px-16 max-w-[1600px] mx-auto mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* About */}
            <motion.section variants={containerVariants} initial="hidden" animate="show">
              <motion.h2 variants={itemVariants} className="text-3xl font-medium mb-6">About the Event</motion.h2>
              <motion.p variants={itemVariants} className="text-xl lg:text-2xl opacity-80 font-light leading-relaxed text-[#0a2e1f]">{event.description}</motion.p>
            </motion.section>

            {/* What to Expect */}
            <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="bg-white/40 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-medium mb-6 flex items-center gap-3">
                <Sparkles className="text-[#00aa22]" /> What to Expect
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0"><Target size={18} /></div>
                  <div>
                    <h4 className="font-medium mb-1">Competitive Environment</h4>
                    <p className="opacity-60 font-light text-sm leading-relaxed">Go head to head with the best in your department. Every round is designed to test your skills and push you to perform at your peak.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0"><Users size={18} /></div>
                  <div>
                    <h4 className="font-medium mb-1">Expert Judging Panel</h4>
                    <p className="opacity-60 font-light text-sm leading-relaxed">Our events are judged by experienced faculty members and industry professionals who bring fair and insightful evaluation to every performance.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0"><Star size={18} /></div>
                  <div>
                    <h4 className="font-medium mb-1">Networking Opportunities</h4>
                    <p className="opacity-60 font-light text-sm leading-relaxed">Meet like-minded peers, form new friendships, and connect with seniors and coordinators who share your passion and interests.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center flex-shrink-0"><Gift size={18} /></div>
                  <div>
                    <h4 className="font-medium mb-1">Exciting Prizes</h4>
                    <p className="opacity-60 font-light text-sm leading-relaxed">Top performers walk away with trophies, certificates, and special prizes. Every participant receives a certificate of participation as well.</p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Rules */}
            <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="bg-white/40 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-medium mb-6 flex items-center gap-3"><Trophy className="text-[#00aa22]" /> Rules & Guidelines</h2>
              <ul className="space-y-4">
                {event.rules.map((rule, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-start gap-4 group">
                    <div className="w-6 h-6 rounded-full bg-[#ccff00] text-[#0a2e1f] flex items-center justify-center flex-shrink-0 text-sm font-medium mt-0.5 group-hover:scale-110 transition-transform">{i + 1}</div>
                    <span className="opacity-80 font-light leading-relaxed">{rule}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-[#0a2e1f]/10">
                <p className="text-sm opacity-50 font-light">Note: Any violation of the above rules may result in immediate disqualification. The coordinator's decision is final and binding in all matters related to this event.</p>
              </div>
            </motion.section>

            {/* Prizes */}
            <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="bg-white rounded-3xl p-8 shadow-sm border border-[#0a2e1f]/5">
              <h2 className="text-2xl font-medium mb-6 flex items-center gap-3"><Gift className="text-[#00aa22]" /> Prizes & Recognition</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {PRIZES.map((prize, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`rounded-2xl p-6 border text-center ${prize.color}`}>
                    <div className="text-lg font-medium mb-2">{prize.place}</div>
                    <div className="text-sm opacity-80 font-light">{prize.reward}</div>
                  </motion.div>
                ))}
              </div>
              <p className="text-sm opacity-50 font-light text-center">All participants will receive a Certificate of Participation. Special mentions may be awarded at the coordinator's discretion for outstanding effort or sportsmanship.</p>
            </motion.section>

            {/* Leaderboard */}
            <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="bg-white rounded-3xl p-8 shadow-sm border border-[#0a2e1f]/5">
              <h2 className="text-2xl font-medium mb-6">Current Leaderboard</h2>
              <div className="space-y-3">
                {leaderboard.map((team, i) => (
                  <motion.div key={team.rank} whileHover={{ scale: 1.02, x: 10 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center justify-between p-4 rounded-2xl bg-[#dcfce7]/30 border border-[#0a2e1f]/5 hover:bg-[#dcfce7]/60 transition-colors cursor-default">
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${team.rank === 1 ? 'bg-yellow-400 text-yellow-900 shadow-sm' : team.rank === 2 ? 'bg-gray-300 text-gray-800' : team.rank === 3 ? 'bg-amber-600 text-amber-100' : 'bg-[#0a2e1f]/10 text-[#0a2e1f]'}`}>{team.rank}</div>
                      <span className="font-medium">{team.name}</span>
                    </div>
                    <span className="font-bold opacity-70">{team.score} pts</span>
                  </motion.div>
                ))}
                <p className="text-sm opacity-50 text-center mt-6 font-light italic">* Leaderboard is updated periodically during the event. Final standings will be announced at the closing ceremony.</p>
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Details Card */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="sticky top-32 bg-white rounded-3xl p-8 shadow-xl border border-[#0a2e1f]/5">
              <h3 className="text-xl font-medium mb-6 border-b border-[#0a2e1f]/10 pb-4">Event Details</h3>
              <div className="space-y-6">
                {[
                  { icon: Calendar, label: 'Date', value: new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) },
                  { icon: Clock, label: 'Time', value: event.time },
                  { icon: MapPin, label: 'Venue', value: event.venue },
                  { icon: Users, label: 'Registered', value: `${event.registeredCount} Participants` },
                ].map((detail, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-[#dcfce7] flex items-center justify-center text-[#00aa22] group-hover:scale-110 transition-transform"><detail.icon size={20} /></div>
                    <div>
                      <div className="text-sm opacity-60 font-medium">{detail.label}</div>
                      <div className="font-medium">{detail.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link to={`/register/${event.id}`} className="mt-8 w-full block">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full bg-[#0a2e1f] text-[#dcfce7] py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-[#0a2e1f]/90 transition-colors shadow-lg hover:shadow-xl group">
                  Register Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <p className="text-xs text-center opacity-40 mt-4 font-light">Registration is free and takes less than 2 minutes</p>
            </motion.div>

            {/* Coordinator Card */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }} className="bg-white/40 backdrop-blur-md rounded-3xl p-8 border border-white/50 hover:bg-white/60 transition-colors">
              <h3 className="text-xl font-medium mb-6">Event Coordinator</h3>
              <div className="flex items-center gap-4 mb-6">
                <img src={event.coordinator.photo} alt={event.coordinator.name} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm" />
                <div>
                  <div className="font-medium text-lg">{event.coordinator.name}</div>
                  <div className="text-sm opacity-60">Event Head</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium opacity-80 mb-4">
                <Phone size={16} /> {event.coordinator.contact}
              </div>
              <p className="text-sm opacity-50 font-light leading-relaxed">For any queries regarding this event, feel free to reach out to the coordinator directly. They are happy to help with questions about rules, team formation, or venue details.</p>
            </motion.div>

            {/* Quick Tips Card */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }} className="bg-[#0a2e1f] text-[#dcfce7] rounded-3xl p-8">
              <h3 className="text-xl font-medium mb-4">Quick Tips</h3>
              <ul className="space-y-3 text-sm font-light opacity-80">
                <li className="flex items-start gap-3">
                  <span className="text-[#ccff00] mt-0.5">1.</span>
                  Arrive at least 15 minutes before the scheduled start time to complete check-in.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ccff00] mt-0.5">2.</span>
                  Carry your college ID card and registration confirmation for verification.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ccff00] mt-0.5">3.</span>
                  Read through all the rules carefully before the event begins.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ccff00] mt-0.5">4.</span>
                  Stay hydrated and take breaks if needed. Your well-being comes first.
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
