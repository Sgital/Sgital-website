import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const navLinks = [
    { 
      name: 'Solutions', 
      href: '/solutions',
      hasDropdown: true,
      dropdownKey: 'solutions',
      dropdownItems: [
        { name: 'All Solutions', href: '/solutions' },
        { name: 'AI Workflows', href: '/solutions?category=ai' },
        { name: 'Technology Workflows', href: '/solutions?category=technology' },
        { name: 'Employee Workflows', href: '/solutions?category=employee' },
        { name: 'Customer Workflows', href: '/solutions?category=customer' },
        { name: 'Security & Risk', href: '/solutions?category=security' },
      ]
    },
    { name: 'GoAI 2.0', href: '/goai' },
    { name: 'Industries', href: '/industries' },
    { name: 'Case Studies', href: '/case-studies' },
    { 
      name: 'About', 
      href: '/about',
      hasDropdown: true,
      dropdownKey: 'about',
      dropdownItems: [
        { name: 'About Us', href: '/about' },
        { name: 'Life at Sgital', href: '/life-at-sgital' },
        { name: 'Our Blog', href: '/our-blog' },
      ]
    },
  ];

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const handleDropdownEnter = (key) => {
    setActiveDropdown(key);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800'
          : 'bg-transparent'
      }`}
      style={{ top: 'var(--banner-h, 0px)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" aria-label="Sgital home">
            <img
              src="/sgital-logo-only.png"
              alt="Sgital"
              className="h-16 md:h-[72px] w-auto object-contain transition-transform group-hover:scale-[1.02]"
            />
            <div className="hidden sm:flex items-center pl-3 border-l border-amber-400/30">
              <span
                className="text-xl md:text-2xl tracking-[0.18em] uppercase leading-none"
                style={{
                  fontFamily: "'Arial Narrow', 'Helvetica Neue', 'Roboto Condensed', sans-serif",
                  fontWeight: 400,
                  fontStretch: 'condensed',
                  color: '#F0C81E',
                }}
              >
                AI Workflows
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.hasDropdown ? (
                  <button
                    onMouseEnter={() => handleDropdownEnter(link.dropdownKey)}
                    onMouseLeave={handleDropdownLeave}
                    className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors ${
                      isActive(link.href) || (link.dropdownKey === 'about' && location.pathname === '/blog')
                        ? 'text-amber-400'
                        : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    {link.name}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                ) : (
                  <Link
                    to={link.href}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? 'text-amber-400'
                        : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {link.hasDropdown && (
                  <div
                    onMouseEnter={() => handleDropdownEnter(link.dropdownKey)}
                    onMouseLeave={handleDropdownLeave}
                    className={`absolute top-full left-0 mt-1 w-56 bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl py-2 transition-all duration-200 ${
                      activeDropdown === link.dropdownKey ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                    }`}
                  >
                    {link.dropdownItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="block px-4 py-2 text-sm text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button
              asChild
              className="bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold"
            >
              <Link to="/contact">Book a Meeting</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-300 hover:text-white z-50"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Full Screen Overlay */}
      <div
        className={`lg:hidden fixed inset-0 top-24 bg-neutral-950 transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        style={{ height: 'calc(100vh - 80px)' }}
      >
        <nav 
          className="h-full overflow-y-auto overscroll-contain px-6 py-6 pb-24"
          onTouchMove={(e) => e.stopPropagation()}
        >
          <div className="space-y-1">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.hasDropdown ? (
                  <>
                    <div className="px-4 py-3 text-neutral-500 text-xs font-medium uppercase tracking-wider border-b border-neutral-800 mb-2">
                      {link.name}
                    </div>
                    {link.dropdownItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block px-4 py-4 text-base font-medium rounded-lg transition-colors ml-2 ${
                          location.pathname === item.href
                            ? 'text-amber-400 bg-amber-400/10'
                            : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <div className="h-4" />
                  </>
                ) : (
                  <Link
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-4 text-base font-medium rounded-lg transition-colors ${
                      isActive(link.href)
                        ? 'text-amber-400 bg-amber-400/10'
                        : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-neutral-800">
            <Button
              asChild
              className="w-full bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold py-6"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Link to="/contact">Book a Meeting</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
