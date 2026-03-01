import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    question: 'Who can participate in Department Day events?',
    answer: 'All currently enrolled students of the department are eligible to participate. You must have a valid registration number and student ID. There are no restrictions based on year or section, though events are divided into Boys and Girls sections.'
  },
  {
    question: 'Can I register for multiple events?',
    answer: 'Absolutely! You can register for as many events as you like, as long as the event timings do not overlap. We encourage you to explore different categories and try something new this year.'
  },
  {
    question: 'Is there a registration fee?',
    answer: 'No, participation in Department Day events is completely free for all students. This is a department-sponsored event, and we want everyone to have the opportunity to participate without any financial barriers.'
  },
  {
    question: 'What should I bring on event day?',
    answer: 'Bring your college ID card and your registration confirmation (available in the My Registrations section). For outdoor events, wear appropriate sports attire and carry water. For technical events, you may bring your own laptop if specified in the event rules.'
  },
  {
    question: 'How are winners decided and what are the prizes?',
    answer: 'Each event has its own scoring criteria defined by the event coordinators. Winners are determined based on performance scores, and in case of ties, time-based or custom tiebreaker rules apply. Prizes include trophies, certificates, and exciting goodies for the top 3 in each event.'
  },
  {
    question: 'Can I cancel my registration after signing up?',
    answer: 'Yes, you can cancel your registration up to 24 hours before the event starts. Simply visit the My Registrations page and contact the event coordinator. We do request that you cancel early so that waitlisted students can take your spot.'
  },
  {
    question: 'Where can I find the event venues?',
    answer: 'Each event listing includes the venue details. On event day, there will be signage and volunteer guides across the campus to help you navigate to the right location. A campus map will also be shared via email before the event.'
  },
  {
    question: 'What happens if it rains during outdoor events?',
    answer: 'Outdoor events have backup indoor venues arranged in advance. In case of heavy rain, the event coordinators will notify all registered participants about the venue change via email and announcements on this portal.'
  }
];

export function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="py-32 px-8 lg:px-16 max-w-[1600px] mx-auto relative z-20">
      <div className="max-w-3xl mx-auto">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-16 h-16 rounded-full bg-[#ccff00] text-[#0a2e1f] flex items-center justify-center mx-auto mb-6"
          >
            <HelpCircle size={28} />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl lg:text-5xl font-medium tracking-tight mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-lg opacity-70 font-light"
          >
            Got questions? We have got answers. Here are the most common things students ask about Department Day.
          </motion.p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/50 backdrop-blur-md rounded-2xl border border-white/60 overflow-hidden hover:bg-white/70 transition-colors"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-medium pr-4">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openFaq === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown size={20} className="opacity-50" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0">
                      <p className="opacity-60 font-light leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
