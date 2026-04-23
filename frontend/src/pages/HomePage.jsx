import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Play, AlertTriangle, CheckCircle2, Workflow, Shield, BarChart3, Layers, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Sgital | The AI Control Tower for Enterprise Workflows</title>
        <meta name="description" content="Sgital helps enterprises operationalize AI across workflows—with governance, control, and measurable outcomes delivered in weeks, not years." />
        <meta name="keywords" content="ServiceNow, AI workflows, enterprise automation, digital transformation, workflow governance" />
        <link rel="canonical" href="https://sgital.com" />
      </Helmet>

      {/* Hero Section */}
      <HeroSection />

      {/* Trust Bar */}
      <TrustBar />

      {/* Problem Section */}
      <ProblemSection />

      {/* Solution Positioning */}
      <SolutionSection />

      {/* CTA Section */}
      <CTASection />
    </>
  );
};

// Hero Section Component
const HeroSection = () => {
  const VIDEO_MP4 = 'https://sgital-website-assets.s3.ap-south-1.amazonaws.com/video/goai-hero.mp4';
  const VIDEO_WEBM = 'https://sgital-website-assets.s3.ap-south-1.amazonaws.com/video/goai-hero.webm';
  const VIDEO_POSTER = 'https://sgital-website-assets.s3.ap-south-1.amazonaws.com/video/goai-hero-poster.jpg';

  return (
    <section className="relative min-h-screen flex items-center bg-neutral-950 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-amber-400/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -left-40 w-[400px] h-[400px] bg-amber-400/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text column */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/20 rounded-full mb-8">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <span className="text-amber-400 text-sm font-medium">Enterprise AI Solutions</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              The AI Control Tower
              <span className="block text-amber-400">for Enterprise Workflows</span>
            </h1>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-neutral-400 leading-relaxed mb-10 lg:max-w-xl">
              Sgital helps enterprises operationalize AI across workflows—with governance,
              control, and measurable outcomes delivered in weeks, not years.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Button
                asChild
                className="bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold px-8 py-6 text-base group"
              >
                <Link to="/goai">
                  See AI in Action
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-neutral-700 text-white hover:bg-neutral-800 px-8 py-6 text-base"
              >
                <Link to="/contact">
                  <Play className="mr-2 w-5 h-5" />
                  Get a Workflow Assessment
                </Link>
              </Button>
            </div>
          </div>

          {/* Video column */}
          <div className="relative group" data-testid="home-hero-video-wrapper">
            {/* Ambient glow */}
            <div className="absolute -inset-4 bg-gradient-to-br from-amber-400/20 via-amber-400/5 to-transparent rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity" />
            {/* Frame */}
            <div className="relative rounded-2xl overflow-hidden border border-amber-400/20 bg-neutral-900 shadow-2xl aspect-video">
              <video
                data-testid="home-hero-video"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster={VIDEO_POSTER}
                className="w-full h-full object-cover"
              >
                <source src={VIDEO_WEBM} type="video/webm" />
                <source src={VIDEO_MP4} type="video/mp4" />
                Your browser does not support embedded video.
              </video>
              {/* Subtle gradient for text contrast overlays */}
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5 rounded-2xl" />
            </div>
            {/* Caption */}
            <div className="absolute -bottom-4 left-6 right-6 flex justify-center lg:justify-start">
              <a
                href="https://store.servicenow.com/store/frame/app?pp=ac256acb1bbfe1905858c845624bcbf4"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="home-hero-store-badge"
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-900 border border-amber-400/30 rounded-full shadow-lg hover:border-amber-400/60 hover:bg-neutral-800 transition-colors group"
                title="Available on the ServiceNow Store"
              >
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
                <span className="text-amber-400 text-xs font-medium tracking-wide">GoAI 2.0 · Available on ServiceNow Store</span>
                <ExternalLink className="w-3 h-3 text-amber-400 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Trust Bar Component with Infinite Carousel
const TrustBar = () => {
  const clientLogosData = [
    { name: 'TotalEnergies', src: '/logos/total-energies.svg', alt: 'TotalEnergies' },
    { name: 'Air Liquide', src: '/logos/air-liquide.svg', alt: 'Air Liquide' },
    { name: 'Panasonic', src: '/logos/panasonic.png', alt: 'Panasonic' },
    { name: 'SPH Media', src: '/logos/sph.png', alt: 'SPH Media' },
    { name: 'Idemitsu', src: '/logos/idemitsu.png', alt: 'Idemitsu' },
    { name: 'Razer', src: '/logos/razer.png', alt: 'Razer' },
    { name: 'Keppel', src: '/logos/keppel.png', alt: 'Keppel Corporation' }
  ];

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...clientLogosData, ...clientLogosData, ...clientLogosData];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.05)_0%,transparent_70%)]" />
      
      {/* Top and bottom borders with gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <p className="text-center text-neutral-400 text-sm uppercase tracking-[0.2em] mb-12 font-medium">
          Trusted by enterprise teams to digitize, automate, and scale operations
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative group">
        {/* Left Fade Gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent z-10 pointer-events-none" />
        
        {/* Right Fade Gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-neutral-950 via-neutral-950/80 to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track */}
        <div className="flex overflow-hidden">
          <div 
            className="flex gap-8 md:gap-12 animate-scroll group-hover:[animation-play-state:paused]"
            style={{
              animation: 'scroll 30s linear infinite',
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center px-6 py-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg shadow-black/20 hover:bg-white/10 hover:border-amber-400/30 hover:shadow-amber-400/10 transition-all duration-300 cursor-pointer group/card"
              >
                <img 
                  src={logo.src} 
                  alt={logo.alt}
                  className="h-10 md:h-12 w-auto min-w-[100px] max-w-[140px] object-contain transition-all duration-300 group-hover/card:scale-105 group-hover/card:drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .group:hover .animate-scroll {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

// Problem Section Component
const ProblemSection = () => {
  const problems = [
    { icon: AlertTriangle, text: "AI pilots remain isolated" },
    { icon: Shield, text: "Lack of governance creates risk" },
    { icon: Workflow, text: "Workflows remain fragmented" },
    { icon: BarChart3, text: "ROI is unclear or delayed" }
  ];

  return (
    <section className="bg-neutral-950 py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500/10 border border-rose-500/20 rounded-full mb-6">
            <span className="text-rose-400 text-sm font-medium">The Challenge</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Why Enterprise AI Initiatives
            <span className="text-rose-400"> Fail to Scale</span>
          </h2>
          <p className="text-lg text-neutral-400 leading-relaxed">
            Most organizations are experimenting with AI—but struggling to translate 
            it into real operational impact.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 hover:border-rose-500/30 transition-colors group"
            >
              <div className="w-12 h-12 bg-rose-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-rose-500/20 transition-colors">
                <problem.icon className="w-6 h-6 text-rose-400" />
              </div>
              <p className="text-white font-medium">{problem.text}</p>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto text-center">
          <p className="text-neutral-500 text-lg italic">
            Without the right foundation, AI adds complexity instead of value.
          </p>
        </div>
      </div>
    </section>
  );
};

// Solution Section Component
const SolutionSection = () => {
  const benefits = [
    { icon: Workflow, title: "Automation", description: "Streamline repetitive tasks across your enterprise" },
    { icon: Layers, title: "Integration", description: "Connect disparate systems into unified workflows" },
    { icon: Shield, title: "Governance", description: "Maintain control and compliance at scale" }
  ];

  return (
    <section className="bg-neutral-900 py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
              <span className="text-emerald-400 text-sm font-medium">The Solution</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              From AI Experiments to
              <span className="text-emerald-400"> Operational Impact</span>
            </h2>
            <p className="text-lg text-neutral-400 leading-relaxed mb-8">
              Sgital embeds AI directly into enterprise workflows—bringing together 
              automation, integration, and governance into a single, scalable model.
            </p>
            <p className="text-neutral-300 leading-relaxed mb-8">
              We help organizations move from disconnected processes to intelligent, 
              AI-driven operations.
            </p>
            <Button
              asChild
              className="bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold px-6 py-5 group"
            >
              <Link to="/solutions">
                Explore Our Solutions
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Benefits Grid */}
          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-neutral-950 border border-neutral-800 rounded-xl p-6 flex items-start gap-4 hover:border-emerald-500/30 transition-colors group"
              >
                <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                  <benefit.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-neutral-400">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// CTA Section Component
const CTASection = () => {
  return (
    <section className="bg-neutral-950 py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-amber-400/10 to-amber-600/5 border border-amber-400/20 rounded-3xl p-12 md:p-16 overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-[100px]" />
          
          <div className="relative max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Enterprise Workflows?
            </h2>
            <p className="text-lg text-neutral-400 mb-8">
              Let's discuss how Sgital can help you operationalize AI and deliver 
              measurable outcomes for your organization.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                className="bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold px-8 py-6 text-base group"
              >
                <Link to="/contact">
                  Get Started Today
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-neutral-600 text-white hover:bg-neutral-800 px-8 py-6 text-base"
              >
                <Link to="/case-studies">
                  View Case Studies
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                data-testid="home-cta-servicenow-store"
                className="border-amber-400/40 text-amber-400 hover:bg-amber-400/10 px-8 py-6 text-base group"
              >
                <a
                  href="https://store.servicenow.com/store/frame/app?pp=ac256acb1bbfe1905858c845624bcbf4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get GoAI on ServiceNow Store
                  <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
