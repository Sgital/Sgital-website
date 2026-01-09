import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { caseStudies } from '../data/mock';
import { Button } from './ui/button';

const CaseStudiesSection = () => {
  const [activeStudy, setActiveStudy] = useState(0);

  return (
    <section id="case-studies" className="py-24 lg:py-32 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
          <div className="max-w-2xl mb-8 lg:mb-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/20 rounded-full mb-6">
              <span className="text-amber-400 text-sm font-medium">Success Stories</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Proven Results Across
              <span className="text-amber-400"> Global Enterprises</span>
            </h2>
            <p className="text-lg text-neutral-400">
              Discover how we've helped leading organizations transform their operations 
              with ServiceNow solutions.
            </p>
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {caseStudies.map((study, index) => (
            <div
              key={study.id}
              className="group relative bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-amber-400/50 transition-all duration-300"
              onMouseEnter={() => setActiveStudy(index)}
            >
              {/* Top Accent */}
              <div className="h-1 bg-amber-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              
              <div className="p-6">
                {/* Industry Tag */}
                <div className="text-amber-400 text-sm font-medium mb-3">
                  {study.industry}
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-amber-400 transition-colors">
                  {study.title}
                </h3>
                
                {/* Client */}
                <div className="text-neutral-500 text-sm mb-4">
                  {study.client}
                </div>
                
                {/* Description */}
                <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                  {study.description}
                </p>
                
                {/* Metrics */}
                <div className="bg-neutral-800/50 rounded-lg p-4 mb-6">
                  <div className="text-xs text-neutral-500 uppercase tracking-wider mb-2">Key Metrics</div>
                  <div className="text-amber-400 font-semibold">{study.metrics}</div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {study.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-neutral-800 text-neutral-400 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="mt-16 bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-400 mb-2">70+</div>
              <div className="text-neutral-400">Successful Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-400 mb-2">500+</div>
              <div className="text-neutral-400">Digital Workflows</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-400 mb-2">5.0</div>
              <div className="text-neutral-400">CSAT Score</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-400 mb-2">400+</div>
              <div className="text-neutral-400">Years Combined Expertise</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
