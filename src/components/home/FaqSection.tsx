import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    question: 'Who can participate in Department Day events?',
    answer: 'All currently enrolled students of the department are eligible to participate. Whether you are a first-year or final-year student, there are events designed for every skill level and interest.'
  },
  {
    question: 'How do I register for an event?',
    answer: 'Simply browse the events page, select the event you want to join, and click "Register Now." Fill out the two-step registration form with your details and you are all set. Registration is completely free.'
  },
  {
    question: 'Can I participate in multiple events?',
    answer: 'Absolutely! You can register for as many events as you like, as long as the timings do not overlap. We encourage you to explore different categories and challenge yourself in new areas.'
  },
  {
    question: 'What should I bring on event day?',
    answer: 'Bring your college ID card, your registration confirmation (digital or printed), and any event-specific materials mentioned in the rules. For outdoor events, wear appropriate sports attire and carry water.'
  },
  {
    question: 'Are there prizes for winners?',
    answer: 'Yes! Top performers in each event receive trophies, medals, certificates, and cash prizes. Every participant also receives a Certificate of Participation. Special mentions may be awarded for outstanding effort.'
  },
  {
    question: 'What if I need to cancel my registration?',
    answer: 'You can cancel your registration up to 24 hours before the event starts by contacting the event coordinator directly. After that, cancellations may not be possible due to logistics planning.'
  },
  {
    question: 'How are the leaderboards updated?',
    answer: 'Leaderboards are updated periodically during the event by the coordinators. Final standings are announced at the closing ceremony. You can check live scores on the event detail page.'
  },
  {
    question: 'Who do I contact for help or queries?',
    answer: 'Each event has a dedicated coordinator whose contact details are listed on the event detail page. For general queries, reach out to the Department Day organizing committee at udbhav2k26@gmail.com.'
  }
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32 px-8 lg:px-16 max-w-[1600px] mx-auto relative z-20 scroll-mt-24">
      <div className="max-w-3xl mx-auto">
        <div className="mb-16 text-center">
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
            Got questions? We have answers. If you do not find what you are looking for, feel free to contact us.
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
