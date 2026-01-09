import React from 'react';
import { Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-amber-400 w-10 h-12 flex items-center justify-center rounded-sm">
                <span className="text-neutral-950 font-black text-2xl">S</span>
              </div>
              <span className="text-white font-bold text-2xl tracking-tight">GITAL</span>
            </div>
            <p className="text-neutral-400 mb-6 max-w-sm leading-relaxed">
              Premier ServiceNow Partner delivering digital transformation through 
              AI-powered workflows. 100% focused on ServiceNow excellence.
            </p>
            <div className="text-amber-400 text-sm font-medium">
              AI Workflows
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-white font-semibold mb-4">Solutions</h4>
            <ul className="space-y-3">
              {['ITSM', 'HR Service Delivery', 'Customer Service', 'IT Operations', 'Risk & Compliance', 'App Engine'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="text-neutral-400 hover:text-amber-400 transition-colors text-sm"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-neutral-400 hover:text-amber-400 transition-colors text-sm"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('case-studies')}
                  className="text-neutral-400 hover:text-amber-400 transition-colors text-sm"
                >
                  Case Studies
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('goai')}
                  className="text-neutral-400 hover:text-amber-400 transition-colors text-sm"
                >
                  GoAI 2.0
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-neutral-400 hover:text-amber-400 transition-colors text-sm"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Regions */}
          <div>
            <h4 className="text-white font-semibold mb-4">Global Presence</h4>
            <ul className="space-y-3">
              {['Singapore', 'India', 'Malaysia', 'Australia', 'New Zealand', 'United Kingdom'].map((region) => (
                <li key={region} className="text-neutral-400 text-sm">
                  {region}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-neutral-500 text-sm">
            &copy; {new Date().getFullYear()} Sgital. All rights reserved.
          </div>
          
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com/company/sgital"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-center text-neutral-400 hover:text-amber-400 hover:border-amber-400/50 transition-all"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:contact@sgital.com"
              className="w-10 h-10 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-center text-neutral-400 hover:text-amber-400 hover:border-amber-400/50 transition-all"
            >
              <Mail className="w-5 h-5" />
            </a>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 bg-amber-400 rounded-lg flex items-center justify-center text-neutral-950 hover:bg-amber-500 transition-colors"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
