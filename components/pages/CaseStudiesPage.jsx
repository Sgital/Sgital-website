'use client';

import React, { useState } from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { caseStudies } from '@/lib/data/mock';

// Filter categories (ServiceNow workflow families). Category lives on each
// case study record in lib/data/mock.js.
const FILTERS = ['All', 'AI & GenAI', 'Technology', 'Employee', 'Customer', 'Risk & Security'];

const CaseStudiesPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  // AI & GenAI studies first, then the rest in their existing order.
  const ordered = [
    ...caseStudies.filter((s) => s.category === 'AI & GenAI'),
    ...caseStudies.filter((s) => s.category !== 'AI & GenAI'),
  ];

  const visible =
    activeFilter === 'All'
      ? ordered
      : ordered.filter((s) => s.category === activeFilter);

  return (
    <>
      

      {/* Hero Section */}
      <section className="bg-neutral-950 pt-40 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/20 rounded-full mb-6">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-sm font-medium">Success Stories</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Proven Results Across
              <span className="text-amber-400"> Global Enterprises</span>
            </h1>
            <p className="text-lg text-neutral-400 leading-relaxed">
              Discover how we've helped leading organizations transform their operations 
              with ServiceNow solutions. Real implementations, measurable outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="bg-neutral-950 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Filter chips */}
          <div className="flex flex-wrap gap-3 mb-10" data-testid="case-study-filters">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                data-testid={`filter-${filter}`}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  activeFilter === filter
                    ? 'bg-amber-400 text-neutral-950 border-amber-400'
                    : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-amber-400/40 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visible.map((study) => {
              return (
                <div
                  key={study.id}
                  data-testid={`case-study-${study.id}`}
                  className="bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden hover:border-amber-400/30 transition-all group flex flex-col"
                >
                  {/* Header */}
                  <div className="p-6 pb-0">
                    <span className="inline-block px-3 py-1 bg-amber-400/10 text-amber-400 text-xs font-medium rounded-full mb-4">
                      {study.industry}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2">{study.title}</h3>
                    <p className="text-neutral-500 text-sm">{study.client}</p>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1">
                    <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                      {study.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {study.tags.map((tag, i) => (
                        <span
                          key={i}
                          className={`px-2 py-1 text-xs rounded ${
                            tag === 'AI & GenAI'
                              ? 'bg-amber-400/20 text-amber-400 font-medium'
                              : 'bg-neutral-800 text-neutral-400'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metrics + Results */}
                  <div className="p-6 pt-0 mt-auto">
                    <div className="bg-neutral-800/50 rounded-xl p-4">
                      <div className="text-xs text-neutral-500 uppercase tracking-wider mb-2">Key Metrics</div>
                      <div className="text-amber-400 font-semibold">{study.metrics}</div>
                      {study.results && (
                        <div className="mt-3 pt-3 border-t border-neutral-700/50">
                          <span className="text-xs text-neutral-500 uppercase tracking-wider">Results: </span>
                          <span className="text-sm text-neutral-200">{study.results}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-neutral-900 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '2,000+', label: 'AI Workflows Delivered' },
              { value: '60+', label: 'Certified Consultants' },
              { value: '40+', label: 'Enterprise Customers' },
              { value: '9+', label: 'Years' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">{stat.value}</div>
                <div className="text-neutral-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-neutral-950 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-lg text-neutral-400 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help transform your organization with ServiceNow.
          </p>
          <Button
            asChild
            className="bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold px-8 py-6 group"
          >
            <Link href="/contact">
              Start Your Transformation
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default CaseStudiesPage;
