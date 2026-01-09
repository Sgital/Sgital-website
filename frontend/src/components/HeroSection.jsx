import React from 'react';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

const HeroSection = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center bg-neutral-950 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Accent Glow */}
        <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-amber-400/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -left-40 w-[400px] h-[400px] bg-amber-400/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/20 rounded-full">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <span className="text-amber-400 text-sm font-medium">Premier ServiceNow Partner</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Transform Your
              <span className="block text-amber-400">Enterprise Workflows</span>
              with AI
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-neutral-400 max-w-xl leading-relaxed">
              Pure-play ServiceNow partner delivering digital transformation through AI-powered 
              automation. 70+ successful projects. 500+ digital workflows. Perfect CSAT scores.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                onClick={() => scrollToSection('contact')}
                className="bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold px-8 py-6 text-base group"
              >
                Book Free Consultation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={() => scrollToSection('goai')}
                variant="outline"
                className="border-neutral-700 text-white hover:bg-neutral-800 px-8 py-6 text-base"
              >
                <Play className="mr-2 w-5 h-5" />
                Explore GoAI 2.0
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-neutral-800">
              <div>
                <div className="text-3xl font-bold text-white">7+</div>
                <div className="text-sm text-neutral-500">Years Expertise</div>
              </div>
              <div className="h-10 w-px bg-neutral-800" />
              <div>
                <div className="text-3xl font-bold text-white">96</div>
                <div className="text-sm text-neutral-500">Certifications</div>
              </div>
              <div className="h-10 w-px bg-neutral-800" />
              <div>
                <div className="text-3xl font-bold text-white">6</div>
                <div className="text-sm text-neutral-500">Global Regions</div>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="hidden lg:block relative">
            <div className="relative">
              {/* Main Card */}
              <div className="relative bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 rounded-2xl p-8 shadow-2xl">
                {/* ServiceNow Badge */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center">
                    <span className="text-neutral-950 font-black text-xl">S</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">ServiceNow Partner</div>
                    <div className="text-neutral-500 text-sm">Premier Services Partner</div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-neutral-800/50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-amber-400">500+</div>
                    <div className="text-neutral-400 text-sm">Digital Workflows</div>
                  </div>
                  <div className="bg-neutral-800/50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-amber-400">5.0</div>
                    <div className="text-neutral-400 text-sm">CSAT Score</div>
                  </div>
                  <div className="bg-neutral-800/50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-amber-400">30+</div>
                    <div className="text-neutral-400 text-sm">Customers</div>
                  </div>
                  <div className="bg-neutral-800/50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-amber-400">50+</div>
                    <div className="text-neutral-400 text-sm">Team Members</div>
                  </div>
                </div>

                {/* Certifications */}
                <div className="mt-6 pt-6 border-t border-neutral-800">
                  <div className="text-neutral-500 text-xs uppercase tracking-wider mb-3">Certifications</div>
                  <div className="flex flex-wrap gap-2">
                    {['ITSM', 'HRSD', 'CSM', 'IRM', 'SPM', 'SecOps'].map((cert) => (
                      <span key={cert} className="px-3 py-1 bg-neutral-800 text-neutral-300 text-xs rounded-full">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-amber-400 text-neutral-950 px-4 py-2 rounded-lg font-semibold text-sm shadow-lg">
                GoAI 2.0 Ready
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <button
            onClick={() => scrollToSection('services')}
            className="flex flex-col items-center gap-2 text-neutral-500 hover:text-amber-400 transition-colors"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
