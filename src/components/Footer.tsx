import { Link } from 'react-router-dom';
import { Mail, Phone, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[var(--footer-bg)] text-[var(--footer-text)] py-16 px-8 lg:px-16 mt-20 rounded-t-[3rem] mx-4 lg:mx-8 mb-4 transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & About */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 text-2xl font-medium tracking-tight mb-6">
              <div className="flex gap-[3px]">
                <div className="w-[3px] h-6 bg-[var(--highlight)] rounded-full"></div>
                <div className="w-[3px] h-6 bg-[var(--highlight)] rounded-full opacity-70"></div>
                <div className="w-[3px] h-6 bg-[var(--highlight)] rounded-full opacity-40"></div>
              </div>
              DeptDay '26
            </div>
            <p className="font-light opacity-60 leading-relaxed text-sm mb-6">
              Department Day 2026, proudly organised by the students of the Information Technology Department. Technical events are live now. Sports, cultural and more coming soon. Built by us, for us.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com/udbhav_2k26" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-xs font-medium hover:bg-[var(--highlight)] hover:text-[#0a2e1f] transition-colors">
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium mb-6 text-sm uppercase tracking-wider opacity-50">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'Browse Events', path: '/events' },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="font-light opacity-70 hover:opacity-100 hover:text-[var(--highlight)] transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Event Categories */}
          <div>
            <h4 className="font-medium mb-6 text-sm uppercase tracking-wider opacity-50">Categories</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/events" className="font-light opacity-70 hover:opacity-100 hover:text-[var(--highlight)] transition-colors text-sm">
                  Technical Events
                </Link>
              </li>
              <li>
                <span className="font-light opacity-40 text-sm">Sports &amp; Cultural <span className="text-[var(--highlight)] opacity-80">(soon)</span></span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-medium mb-6 text-sm uppercase tracking-wider opacity-50">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Instagram size={16} className="mt-0.5 opacity-50 flex-shrink-0" />
                <a href="https://instagram.com/udbhav_2k26" target="_blank" rel="noopener noreferrer" className="text-sm font-light opacity-70 hover:opacity-100 hover:text-[var(--highlight)] transition-colors">@udbhav_2k26</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 opacity-50 flex-shrink-0" />
                <a href="mailto:udbhav2k26@gmail.com" className="text-sm font-light opacity-70 hover:opacity-100 hover:text-[var(--highlight)] transition-colors">udbhav2k26@gmail.com</a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-0.5 opacity-50 flex-shrink-0" />
                <div>
                  <div className="text-sm font-light opacity-70">Balgani Naveen</div>
                  <a href="tel:+919951518580" className="text-xs font-light opacity-60 mt-0.5 hover:opacity-100 hover:text-[var(--highlight)] transition-colors">+91 9951518580</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-0.5 opacity-50 flex-shrink-0" />
                <div>
                  <div className="text-sm font-light opacity-70">Sriharsha Meduri</div>
                  <a href="tel:+916302761059" className="text-xs font-light opacity-60 mt-0.5 hover:opacity-100 hover:text-[var(--highlight)] transition-colors">+91 6302761059</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 opacity-50 font-light text-sm">
          <p>&copy; 2026 Department Day. All rights reserved.</p>
          <p className="opacity-50">Made with ☕, questionable sleep schedules, and a lot of <span className="text-[var(--highlight)] opacity-100">love</span>. By IT students, for IT students.</p>
        </div>
      </div>
    </footer>
  );
}
