import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { contactInfo, companyInfo } from '../data/mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    solutions: [
      { name: 'Technology Workflows', href: '/solutions' },
      { name: 'Employee Workflows', href: '/solutions' },
      { name: 'Customer Workflows', href: '/solutions' },
      { name: 'Security & Risk', href: '/solutions' },
      { name: 'Creator Workflows', href: '/solutions' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Case Studies', href: '/case-studies' },
      { name: 'Industries', href: '/industries' },
      { name: 'GoAI 2.0', href: '/goai' },
      { name: 'Contact', href: '/contact' },
    ],
  };

  return (
    <footer className="bg-neutral-900 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex flex-col mb-6">
              <div className="flex items-center">
                <span className="text-amber-400 font-bold text-2xl tracking-wide" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>S</span>
                <span className="text-neutral-300 font-semibold text-2xl tracking-wide" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>GITAL</span>
              </div>
              <span className="text-neutral-500 text-[10px] font-medium tracking-[0.2em] uppercase" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>AI WORKFLOWS</span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              {companyInfo.description}
            </p>
            <div className="flex items-center gap-4">
              <a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center text-neutral-400 hover:text-amber-400 hover:bg-neutral-700 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center text-neutral-400 hover:text-amber-400 hover:bg-neutral-700 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-white font-semibold mb-6">Solutions</h3>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-neutral-400 text-sm hover:text-amber-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-neutral-400 text-sm hover:text-amber-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-3 text-neutral-400 text-sm hover:text-amber-400 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <span className="flex items-center gap-3 text-neutral-400 text-sm">
                  <Phone className="w-4 h-4" />
                  {contactInfo.phone}
                </span>
              </li>
              <li>
                <span className="flex items-center gap-3 text-neutral-400 text-sm">
                  <MapPin className="w-4 h-4" />
                  {contactInfo.address}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-500 text-sm">
            &copy; {currentYear} {companyInfo.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-neutral-500 text-sm hover:text-neutral-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-neutral-500 text-sm hover:text-neutral-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
