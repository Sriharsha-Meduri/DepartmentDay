import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0a2e1f] text-[#dcfce7] py-16 px-8 lg:px-16 mt-20 rounded-t-[3rem] mx-4 lg:mx-8 mb-4">
      <div className="max-w-[1600px] mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & About */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 text-2xl font-medium tracking-tight mb-6">
              <div className="flex gap-[3px]">
                <div className="w-[3px] h-6 bg-[#ccff00] rounded-full"></div>
                <div className="w-[3px] h-6 bg-[#ccff00] rounded-full opacity-70"></div>
                <div className="w-[3px] h-6 bg-[#ccff00] rounded-full opacity-40"></div>
              </div>
              DeptDay '26
            </div>
            <p className="font-light opacity-60 leading-relaxed text-sm mb-6">
              The annual Department Day celebration bringing together students from every branch for two days of competition, creativity, and camaraderie. Organized by students, for students.
            </p>
            <div className="flex gap-3">
              {['X', 'IG', 'LI', 'YT'].map((social) => (
                <a key={social} href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-xs font-medium hover:bg-[#ccff00] hover:text-[#0a2e1f] transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium mb-6 text-sm uppercase tracking-wider opacity-50">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'Browse Events', path: '/events' },
                { name: 'My Registrations', path: '/my-registrations' },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="font-light opacity-70 hover:opacity-100 hover:text-[#ccff00] transition-colors text-sm">
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
              {['Technical Events', 'Non-Technical Events', 'Indoor Events', 'Outdoor Events'].map((cat) => (
                <li key={cat}>
                  <Link to="/events" className="font-light opacity-70 hover:opacity-100 hover:text-[#ccff00] transition-colors text-sm">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-medium mb-6 text-sm uppercase tracking-wider opacity-50">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 opacity-50 flex-shrink-0" />
                <div>
                  <div className="text-sm font-light opacity-70">deptday2026@college.edu</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-0.5 opacity-50 flex-shrink-0" />
                <div>
                  <div className="text-sm font-light opacity-70">+91 98765 43210</div>
                  <div className="text-xs font-light opacity-40 mt-0.5">Mon to Fri, 9 AM to 5 PM</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 opacity-50 flex-shrink-0" />
                <div>
                  <div className="text-sm font-light opacity-70">Department of Computer Science</div>
                  <div className="text-xs font-light opacity-40 mt-0.5">Main Campus, Block A</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 opacity-50 font-light text-sm">
          <p>&copy; 2026 Department Day. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:opacity-100 hover:text-[#ccff00] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:opacity-100 hover:text-[#ccff00] transition-colors">Terms of Service</a>
            <a href="#" className="hover:opacity-100 hover:text-[#ccff00] transition-colors">Code of Conduct</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
