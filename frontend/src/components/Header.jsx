import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { 
      name: 'Solutions', 
      href: '/solutions',
      hasDropdown: true,
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
    { name: 'About', href: '/about' },
  ];

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex flex-col">
            <div className="flex items-center">
              <span className="text-amber-400 font-bold text-2xl tracking-wide" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>S</span>
              <span className="text-neutral-300 font-semibold text-2xl tracking-wide" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>GITAL</span>
            </div>
            <span className="text-neutral-500 text-[10px] font-medium tracking-[0.2em] uppercase" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>AI WORKFLOWS</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.hasDropdown ? (
                  <button
                    onMouseEnter={() => setIsSolutionsOpen(true)}
                    onMouseLeave={() => setIsSolutionsOpen(false)}
                    className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors ${
                      isActive(link.href)
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
                    onMouseEnter={() => setIsSolutionsOpen(true)}
                    onMouseLeave={() => setIsSolutionsOpen(false)}
                    className={`absolute top-full left-0 mt-1 w-56 bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl py-2 transition-all duration-200 ${
                      isSolutionsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
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
            className="lg:hidden p-2 text-neutral-300 hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-neutral-950/98 backdrop-blur-md border-b border-neutral-800 transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-6">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <div key={link.name}>
                <Link
                  to={link.href}
                  className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    isActive(link.href)
                      ? 'text-amber-400 bg-amber-400/10'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  {link.name}
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-neutral-800">
            <Button
              asChild
              className="w-full bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold py-6"
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
