import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Building2, Heart, Zap, Factory, Cpu, Newspaper, Truck, Plane, Briefcase, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { industries } from '../data/mock';

const iconMap = {
  Building2, Heart, Zap, Factory, Cpu, Newspaper, Truck, Plane, Briefcase, ShoppingBag
};

const industryDetails = {
  'Financial Services': {
    description: 'Digital transformation for banks, insurance, and fintech companies with compliance-ready workflows.',
    useCases: ['Regulatory compliance automation', 'Customer onboarding', 'Risk management', 'Fraud detection']
  },
  'Healthcare': {
    description: 'Patient-centric workflows that improve care delivery while maintaining HIPAA compliance.',
    useCases: ['Patient service management', 'Clinical workflow automation', 'Asset tracking', 'Compliance management']
  },
  'Energy & Utilities': {
    description: 'Operational excellence for energy providers with field service and asset management solutions.',
    useCases: ['Field service optimization', 'Asset lifecycle management', 'Outage management', 'Customer service']
  },
  'Manufacturing': {
    description: 'Connected manufacturing operations with IoT integration and predictive maintenance.',
    useCases: ['Production workflow automation', 'Quality management', 'Supply chain visibility', 'Maintenance optimization']
  },
  'Technology': {
    description: 'Agile IT operations for tech companies with DevOps integration and rapid scaling capabilities.',
    useCases: ['DevOps automation', 'Incident management', 'Change management', 'Service catalog']
  },
  'Media & Publishing': {
    description: 'Content operations and digital asset management for modern media organizations.',
    useCases: ['Content workflow automation', 'Digital asset management', 'Rights management', 'Production tracking']
  },
  'Logistics': {
    description: 'End-to-end supply chain visibility with intelligent routing and tracking solutions.',
    useCases: ['Fleet management', 'Shipment tracking', 'Warehouse operations', 'Customer notifications']
  },
  'Aviation': {
    description: 'Safety-first operations management for airlines and aviation service providers.',
    useCases: ['Maintenance tracking', 'Crew management', 'Safety compliance', 'Ground operations']
  },
  'Consulting': {
    description: 'Professional services automation for consulting firms and advisory businesses.',
    useCases: ['Project management', 'Resource allocation', 'Time tracking', 'Client portal']
  },
  'Retail': {
    description: 'Omnichannel customer experiences with unified commerce and inventory management.',
    useCases: ['Order management', 'Inventory visibility', 'Customer service', 'Store operations']
  }
};

const IndustriesPage = () => {
  return (
    <>
      <Helmet>
        <title>Industries We Serve | ServiceNow Solutions Across 10+ Sectors - Sgital</title>
        <meta name="description" content="ServiceNow solutions tailored for Financial Services, Healthcare, Energy & Utilities, Manufacturing, Aviation, Semiconductor and more — delivered across Singapore, Australia, India and ASEAN." />
        <meta name="keywords" content="ServiceNow financial services, ServiceNow healthcare, ServiceNow manufacturing, ServiceNow energy utilities, ServiceNow aviation, ServiceNow semiconductor partner Singapore Australia India" />
        <link rel="canonical" href="https://sgital.com/industries" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sgital.com/industries" />
        <meta property="og:title" content="Industries We Serve — ServiceNow Solutions by Sgital" />
        <meta property="og:description" content="ServiceNow solutions across 10+ industries delivered globally from Singapore, Australia and India." />
        <meta property="og:image" content="https://sgital.com/sgital-long-logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-neutral-950 pt-40 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/20 rounded-full mb-6">
              <span className="text-amber-400 text-sm font-medium">Industry Expertise</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Industries <span className="text-amber-400">We Serve</span>
            </h1>
            <p className="text-lg text-neutral-400 leading-relaxed">
              Deep industry knowledge combined with ServiceNow expertise. We understand your 
              unique challenges and deliver solutions that drive real business outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="bg-neutral-950 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {industries.map((industry, index) => {
              const IconComponent = iconMap[industry.icon] || Building2;
              const details = industryDetails[industry.name] || { description: '', useCases: [] };

              return (
                <div
                  key={index}
                  className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 hover:border-amber-400/30 transition-all group"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-amber-400/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-amber-400/20 transition-colors">
                      <IconComponent className="w-8 h-8 text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-3">{industry.name}</h3>
                      <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                        {details.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {details.useCases.slice(0, 3).map((useCase, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-neutral-800 text-neutral-300 text-xs rounded-full"
                          >
                            {useCase}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-neutral-900 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Don't See Your Industry?
          </h2>
          <p className="text-lg text-neutral-400 mb-8 max-w-2xl mx-auto">
            Our ServiceNow expertise extends across all sectors. Let's discuss how we can 
            tailor solutions for your specific industry needs.
          </p>
          <Button
            asChild
            className="bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold px-8 py-6 group"
          >
            <Link to="/contact">
              Discuss Your Requirements
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default IndustriesPage;
