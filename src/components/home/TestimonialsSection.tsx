import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    role: '3rd Year, CSE',
    quote: 'Department Day was the highlight of my college life. The hackathon pushed me to build something I never thought I could in 24 hours. The energy in the room was absolutely electric.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=priya'
  },
  {
    name: 'Rahul Menon',
    role: '2nd Year, ECE',
    quote: 'The futsal tournament was incredibly well organized. Fair referees, great sportsmanship, and the crowd support made every goal feel like a World Cup moment. Cannot wait for next year.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=rahul'
  },
  {
    name: 'Ananya Reddy',
    role: '4th Year, IT',
    quote: 'I participated in the debate competition and the creative writing event. Both were challenging and rewarding. The coordinators were super helpful and the judging was transparent.',
    rating: 4,
    avatar: 'https://i.pravatar.cc/150?u=ananya'
  },
  {
    name: 'Karthik Nair',
    role: '1st Year, MECH',
    quote: 'As a first-year student, I was nervous about participating. But the registration process was smooth, the volunteers were welcoming, and I ended up winning 3rd place in chess!',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=karthik'
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-32 px-8 lg:px-16 max-w-[1600px] mx-auto relative z-20">
      <div className="mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl lg:text-5xl font-medium tracking-tight mb-4"
        >
          What Students Say
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.1 }}
          className="text-lg opacity-70 max-w-2xl font-light"
        >
          Do not just take our word for it. Here is what past participants have to say about their Department Day experience.
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
            className="bg-[var(--card)] backdrop-blur-md rounded-3xl p-8 border border-[var(--card-border)] hover:bg-[var(--card-hover)] transition-colors"
          >
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star
                  key={j}
                  size={16}
                  className={j < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                />
              ))}
            </div>
            <p className="opacity-70 font-light leading-relaxed mb-6 text-sm italic">"{testimonial.quote}"</p>
            <div className="flex items-center gap-4">
              <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover border-2 border-[var(--card-border)]" />
              <div>
                <div className="font-medium">{testimonial.name}</div>
                <div className="text-sm opacity-50">{testimonial.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
