import React from 'react';
import { Server, Users, Headphones, Settings, Shield, BarChart3, Layers, GraduationCap, ArrowRight } from 'lucide-react';
import { services } from '../data/mock';

const iconMap = {
  Server,
  Users,
  HeadphonesIcon: Headphones,
  Settings,
  Shield,
  BarChart3,
  Layers,
  GraduationCap
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 lg:py-32 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/20 rounded-full mb-6">
            <span className="text-amber-400 text-sm font-medium">ServiceNow Solutions</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Comprehensive Services for Your 
            <span className="text-amber-400"> ServiceNow Platform</span>
          </h2>
          <p className="text-lg text-neutral-400">
            At Sgital, we are dedicated to ensuring your organization thrives with effective use of your ServiceNow platform. 
            Our solutions are crafted to develop a robust, future-ready business model.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            return (
              <div
                key={service.id}
                className="group relative bg-neutral-950 border border-neutral-800 rounded-xl p-6 hover:border-amber-400/50 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-amber-400/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-amber-400/20 transition-colors">
                  {IconComponent && <IconComponent className="w-6 h-6 text-amber-400" />}
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-amber-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Link */}
                <div className="flex items-center text-amber-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* Specializations */}
        <div className="mt-16 pt-16 border-t border-neutral-800">
          <h3 className="text-xl font-semibold text-white mb-6">ServiceNow Certified Specializations</h3>
          <div className="flex flex-wrap gap-3">
            {[
              'IT Service Management',
              'HR Service Delivery',
              'Customer Service Management',
              'IT Operations Management',
              'Now Platform App Engine',
              'Governance Risk & Compliance',
              'Strategic Portfolio Management',
              'NowAssist AI Agents'
            ].map((spec) => (
              <span
                key={spec}
                className="px-4 py-2 bg-neutral-800/50 border border-neutral-700 text-neutral-300 rounded-lg text-sm hover:border-amber-400/50 hover:text-amber-400 transition-colors cursor-default"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
