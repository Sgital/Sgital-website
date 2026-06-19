'use client';

import React from 'react';
import { 
  Building2, Heart, Zap, Factory, Cpu, Newspaper, 
  Truck, Plane, Briefcase, ShoppingBag 
} from 'lucide-react';
import { industries } from '@/lib/data/mock';

const iconMap = {
  Building2,
  Heart,
  Zap,
  Factory,
  Cpu,
  Newspaper,
  Truck,
  Plane,
  Briefcase,
  ShoppingBag
};

const IndustriesSection = () => {
  return (
    <section id="industries" className="py-24 lg:py-32 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/20 rounded-full mb-6">
            <span className="text-amber-400 text-sm font-medium">Industries We Serve</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Unlocking Potential Across
            <span className="text-amber-400"> Diverse Industries</span>
          </h2>
          <p className="text-lg text-neutral-400">
            From finance to healthcare, technology to logistics, we're on a mission to revolutionize 
            operations and drive excellence across all sectors.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {industries.map((industry, index) => {
            const IconComponent = iconMap[industry.icon];
            return (
              <div
                key={index}
                className="group relative bg-neutral-950 border border-neutral-800 rounded-xl p-6 text-center hover:border-amber-400/50 transition-all duration-300 cursor-default"
              >
                <div className="w-14 h-14 bg-amber-400/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-400/20 transition-colors">
                  {IconComponent && <IconComponent className="w-7 h-7 text-amber-400" />}
                </div>
                <h3 className="text-white font-medium text-sm group-hover:text-amber-400 transition-colors">
                  {industry.name}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
