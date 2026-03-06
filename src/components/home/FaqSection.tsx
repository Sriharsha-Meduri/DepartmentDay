import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    question: 'Wait, is this actually free? No hidden catch?',
    answer: 'Completely free. Zero rupees. No "premium tier", no form with 47 fields. We\'re students organising this for students. We don\'t do paywalls. Just show up.'
  },
  {
    question: 'I\'m a first-year. Is this a "seniors only" thing?',
    answer: 'Absolutely not. 1st year to final year, everyone\'s in. Honestly, first-years tend to surprise everyone. Don\'t let your batch number intimidate you. Come and prove a point.'
  },
  {
    question: 'Can I enter multiple events?',
    answer: 'Yes, stack them up. The more the merrier. Just make sure the event timings don\'t clash (we haven\'t figured out human cloning yet). Check each event\'s date and time on the events page.'
  },
  {
    question: 'My team bailed on me. Can I still enter?',
    answer: 'Depends on the event. Some are solo by default, some need a team. Check the event page for team size. Also, text your classmates. You know at least three people who are sitting around doing nothing right now.'
  },
  {
    question: 'If I win, do I get an actual prize or just a certificate that\'ll gather dust?',
    answer: 'Both, and that\'s the whole point. Cash prizes, trophies, and certificates. The certificate might gather dust. The win never will. Show up to find out.'
  },
  {
    question: 'What do I actually need to bring on event day?',
    answer: 'Your college ID, registration confirmation (screenshot is totally fine), and competitive energy. For coding: your laptop. For quizzes: your brain. For everything: water. Don\'t be the person who forgets water.'
  },
  {
    question: 'The events page only has technical events. Is that it?',
    answer: 'Nope. Sports, cultural, and other events are being announced soon. Technical events went live first. Keep checking back. This page is going to get a lot busier in the coming weeks.'
  },
  {
    question: 'Who do I bother if I have a question or something breaks?',
    answer: 'Every event page has a coordinator\'s phone number, call or WhatsApp directly. For general chaos, DM us on Instagram @udbhav_2k26 or email udbhav2k26@gmail.com. We reply. Usually pretty fast.'
  }
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16 px-5 sm:px-8 lg:px-16 max-w-[1600px] mx-auto relative z-20 scroll-mt-24">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-4"
          >
            Real questions,{' '}<span className="text-[var(--accent)]">real answers.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-lg opacity-70 font-light"
          >
            No corporate FAQ fluff. Just the stuff you actually want to know.
          </motion.p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05 }}
              className="bg-[var(--card)] backdrop-blur-md rounded-2xl border border-[var(--card-border)] overflow-hidden hover:bg-[var(--card-hover)] transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left font-medium"
              >
                <span>{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  <ChevronDown size={20} className="opacity-50" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 opacity-60 font-light leading-relaxed text-sm">
                      {faq.answer}
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
