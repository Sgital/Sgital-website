import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu';
import { services } from '../data/mock';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-neutral-950/95 backdrop-blur-md shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="flex items-center">
              <div className="bg-amber-400 w-10 h-12 flex items-center justify-center rounded-sm">
                <span className="text-neutral-950 font-black text-2xl">S</span>
              </div>
              <span className="text-white font-bold text-2xl tracking-tight ml-1">GITAL</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-neutral-300 hover:text-white hover:bg-neutral-800/50 data-[state=open]:bg-neutral-800/50">
                    Solutions
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[500px] p-4 bg-neutral-900 border border-neutral-800">
                      <div className="grid grid-cols-2 gap-3">
                        {services.slice(0, 6).map((service) => (
                          <NavigationMenuLink
                            key={service.id}
                            className="block p-3 rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
                            onClick={() => scrollToSection('services')}
                          >
                            <div className="font-medium text-white text-sm">{service.title}</div>
                            <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{service.description}</p>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <button
                    onClick={() => scrollToSection('goai')}
                    className="px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white hover:bg-neutral-800/50 rounded-md transition-colors"
                  >
                    GoAI 2.0
                  </button>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <button
                    onClick={() => scrollToSection('industries')}
                    className="px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white hover:bg-neutral-800/50 rounded-md transition-colors"
                  >
                    Industries
                  </button>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <button
                    onClick={() => scrollToSection('case-studies')}
                    className="px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white hover:bg-neutral-800/50 rounded-md transition-colors"
                  >
                    Case Studies
                  </button>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <button
                    onClick={() => scrollToSection('about')}
                    className="px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white hover:bg-neutral-800/50 rounded-md transition-colors"
                  >
                    About
                  </button>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold px-6 transition-all duration-200"
            >
              Book a Meeting
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-neutral-950/98 backdrop-blur-md border-t border-neutral-800 py-6">
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => scrollToSection('services')}
                className="px-4 py-3 text-left text-neutral-300 hover:text-white hover:bg-neutral-800/50 rounded-lg transition-colors"
              >
                Solutions
              </button>
              <button
                onClick={() => scrollToSection('goai')}
                className="px-4 py-3 text-left text-neutral-300 hover:text-white hover:bg-neutral-800/50 rounded-lg transition-colors"
              >
                GoAI 2.0
              </button>
              <button
                onClick={() => scrollToSection('industries')}
                className="px-4 py-3 text-left text-neutral-300 hover:text-white hover:bg-neutral-800/50 rounded-lg transition-colors"
              >
                Industries
              </button>
              <button
                onClick={() => scrollToSection('case-studies')}
                className="px-4 py-3 text-left text-neutral-300 hover:text-white hover:bg-neutral-800/50 rounded-lg transition-colors"
              >
                Case Studies
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="px-4 py-3 text-left text-neutral-300 hover:text-white hover:bg-neutral-800/50 rounded-lg transition-colors"
              >
                About
              </button>
              <div className="mt-4 px-4">
                <Button
                  onClick={() => scrollToSection('contact')}
                  className="w-full bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold"
                >
                  Book a Meeting
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
