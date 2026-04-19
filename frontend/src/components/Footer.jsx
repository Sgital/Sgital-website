import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Mail, Phone, MapPin, Youtube, ExternalLink } from 'lucide-react';
import { contactInfo, companyInfo, officeLocations, partnershipBadges } from '../data/mock';

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
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img 
                src="/sgital-logo.png" 
                alt="Sgital AI Workflows" 
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed mb-4">
              {companyInfo.description}
            </p>
            <div className="flex items-center gap-3 mb-3">
              <a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-neutral-800 rounded-lg flex items-center justify-center text-neutral-400 hover:text-amber-400 hover:bg-neutral-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={contactInfo.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-neutral-800 rounded-lg flex items-center justify-center text-neutral-400 hover:text-amber-400 hover:bg-neutral-700 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="w-9 h-9 bg-neutral-800 rounded-lg flex items-center justify-center text-neutral-400 hover:text-amber-400 hover:bg-neutral-700 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <a
              href={contactInfo.partnerFinder}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-amber-400 text-xs transition-colors group"
            >
              <ExternalLink className="w-3 h-3" />
              <span>ServiceNow Partner Profile</span>
            </a>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Solutions</h3>
            <ul className="space-y-2">
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
            <h3 className="text-white font-semibold mb-4 text-sm">Company</h3>
            <ul className="space-y-2">
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
            <h3 className="text-white font-semibold mb-4 text-sm">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-2 text-neutral-400 text-sm hover:text-amber-400 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <span className="flex items-center gap-2 text-neutral-400 text-sm">
                  <Phone className="w-3.5 h-3.5" />
                  {contactInfo.phone}
                </span>
              </li>
              <li>
                <div className="space-y-2">
                  {officeLocations.map((office, index) => (
                    <div key={index} className="flex items-start gap-2 text-neutral-400 text-sm">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-white font-medium text-xs">{office.city}, {office.country}</div>
                        <div className="text-neutral-500 text-xs">{office.address}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* ServiceNow Partnership Badges - Integrated */}
        <div className="py-6">
          <p className="text-neutral-500 text-xs uppercase tracking-wider text-center mb-3">ServiceNow Partner</p>
          <div className="flex flex-wrap items-center justify-center gap-4 opacity-60 hover:opacity-100 transition-opacity">
            {partnershipBadges.map((badge, index) => (
              <div
                key={index}
                className="w-14 md:w-16 grayscale hover:grayscale-0 transition-all duration-300"
                title={badge.name}
              >
                <img
                  src={badge.image}
                  alt={badge.alt}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-4 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-neutral-500 text-xs">
            &copy; {currentYear} {companyInfo.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-neutral-500 text-xs hover:text-neutral-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-neutral-500 text-xs hover:text-neutral-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
