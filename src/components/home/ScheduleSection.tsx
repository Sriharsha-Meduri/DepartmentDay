import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock } from 'lucide-react';

const SCHEDULE = [
  { time: '08:00 AM', title: 'Gates Open & Check-in', description: 'Arrive early, collect your event pass, and get settled in. Volunteers will guide you to your respective venues.', day: 'Day 1' },
  { time: '09:00 AM', title: 'Opening Ceremony', description: 'Kick off Department Day 2026 with an inspiring address from the Head of Department, followed by the official event inauguration.', day: 'Day 1' },
  { time: '10:00 AM', title: 'Technical Events Begin', description: 'Code Relay, Hackathon, and other technical challenges start simultaneously across multiple labs and halls.', day: 'Day 1' },
  { time: '11:00 AM', title: 'Indoor Events Begin', description: 'Chess, Table Tennis, and other indoor competitions kick off at the Indoor Sports Complex.', day: 'Day 1' },
  { time: '01:00 PM', title: 'Lunch Break & Open Mic', description: 'Refuel at the food court and enjoy surprise performances by fellow students during the open mic session.', day: 'Day 1' },
  { time: '02:00 PM', title: 'Outdoor Events Begin', description: 'Futsal, Relay Race, and athletics events take over the sports ground. Bring your energy and team spirit.', day: 'Day 1' },
  { time: '09:00 AM', title: 'Day 2 Kickoff', description: 'Non-technical events, semifinal rounds, and creative competitions begin across all venues.', day: 'Day 2' },
  { time: '11:00 AM', title: 'Semifinal Rounds', description: 'Top performers from Day 1 advance to intense semifinal rounds. The stakes are higher, the competition fiercer.', day: 'Day 2' },
  { time: '02:00 PM', title: 'Grand Finals', description: 'The best of the best face off in the grand finals across all categories. Every seat in the auditorium will be packed.', day: 'Day 2' },
  { time: '05:00 PM', title: 'Closing Ceremony & Awards', description: 'Celebrate the winners, relive the highlights, and close out Department Day 2026 with prizes, trophies, and memories.', day: 'Day 2' },
];

export function ScheduleSection() {
  const [activeDay, setActiveDay] = useState('Day 1');
  const filteredSchedule = SCHEDULE.filter(s => s.day === activeDay);

  return (
    <section className="py-32 px-8 lg:px-16 max-w-[1600px] mx-auto relative z-20">
      <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
        <div>
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
            Two packed days of back-to-back action. Here is a bird's eye view of what to expect so you can plan your Department Day experience down to the hour.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex bg-white/40 backdrop-blur-md p-1 rounded-full border border-white/50 w-fit relative"
        >
          {['Day 1', 'Day 2'].map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`relative px-6 py-2.5 rounded-full font-medium transition-all z-10 text-sm ${activeDay === day ? 'text-[#dcfce7]' : 'text-[#0a2e1f] hover:bg-white/50'}`}
            >
              {day} {day === 'Day 1' ? '(Apr 15)' : '(Apr 16)'}
            </button>
          ))}
          <motion.div
            className="absolute top-1 bottom-1 bg-[#0a2e1f] rounded-full shadow-md z-0"
            initial={false}
            animate={{
              x: activeDay === 'Day 1' ? 4 : '100%',
              width: 'calc(50% - 4px)'
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeDay}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {filteredSchedule.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex gap-6 items-start group"
            >
              <div className="w-28 flex-shrink-0 pt-1">
                <div className="flex items-center gap-2 text-sm font-medium opacity-60">
                  <Clock size={14} />
                  {item.time}
                </div>
              </div>
              <div className="flex-1 bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/50 group-hover:bg-white/70 transition-colors">
                <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                <p className="opacity-60 font-light text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
