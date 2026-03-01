import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: 'Department Day was the highlight of my college life. Competing in the Hackathon pushed me to build something I never thought I could in just 24 hours. The energy in that room was unreal.',
    name: 'Priya Sharma',
    role: 'CSE, Class of 2024',
    avatar: 'PS'
  },
  {
    quote: 'I signed up for the Debate Competition on a whim and ended up winning second place. The coordinators were incredibly supportive, and the whole event was organized so smoothly.',
    name: 'Rahul Menon',
    role: 'IT, Class of 2025',
    avatar: 'RM'
  },
  {
    quote: 'The Futsal Tournament was intense from start to finish. Our team bonded like never before, and even though we lost in the semis, it was an experience I will carry with me forever.',
    name: 'Ananya Reddy',
    role: 'ECE, Class of 2024',
    avatar: 'AR'
  },
  {
    quote: 'As someone who is not into sports or coding, I was thrilled to find Creative Writing as an event. It gave me a platform to express myself, and the judges gave such thoughtful feedback.',
    name: 'Karthik Nair',
    role: 'MECH, Class of 2025',
    avatar: 'KN'
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-32 px-8 lg:px-16 max-w-[1600px] mx-auto relative z-20 bg-[#dcfce7]">
      <div className="mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl lg:text-5xl font-medium tracking-tight mb-4"
        >
          What Past Participants Say
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.1 }}
          className="text-lg opacity-70 max-w-2xl font-light"
        >
          Do not just take our word for it. Here is what students from previous years had to say about their Department Day experience.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {TESTIMONIALS.map((testimonial, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-white/50 backdrop-blur-md rounded-3xl p-8 border border-white/60 hover:bg-white/70 transition-colors shadow-sm group"
          >
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={16} className="fill-[#ccff00] text-[#ccff00]" />
              ))}
            </div>
            <p className="text-[#0a2e1f] font-light leading-relaxed mb-8 text-lg italic">
              "{testimonial.quote}"
            </p>
            <div className="flex items-center gap-4 pt-6 border-t border-[#0a2e1f]/10">
              <div className="w-12 h-12 rounded-full bg-[#0a2e1f] text-[#dcfce7] flex items-center justify-center font-medium text-sm">
                {testimonial.avatar}
              </div>
              <div>
                <div className="font-medium">{testimonial.name}</div>
                <div className="text-sm opacity-60 font-light">{testimonial.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
