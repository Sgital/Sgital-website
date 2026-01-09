import React from 'react';
import { processSteps } from '../data/mock';

const ProcessSection = () => {
  return (
    <section id="process" className="py-24 lg:py-32 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/20 rounded-full mb-6">
            <span className="text-amber-400 text-sm font-medium">Our Methodology</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            How We Deliver
            <span className="text-amber-400"> Success</span>
          </h2>
          <p className="text-lg text-neutral-400">
            Our proven sprint-based agile methodology ensures fast-track Go-Live 
            with measurable ROI at every stage.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connector Line - Desktop */}
          <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-0.5 bg-neutral-800">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/50 to-amber-400/0" />
          </div>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-4">
            {processSteps.map((step, index) => (
              <div key={step.step} className="relative">
                {/* Step Number */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-[120px] h-[120px] rounded-full bg-neutral-950 border-2 border-neutral-800 flex items-center justify-center group hover:border-amber-400/50 transition-colors">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-amber-400">{String(step.step).padStart(2, '0')}</div>
                        <div className="text-white font-semibold text-sm mt-1">{step.title}</div>
                      </div>
                    </div>
                    {/* Active Indicator */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-amber-400 rounded-full" />
                  </div>
                </div>

                {/* Step Items */}
                <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5">
                  <ul className="space-y-3">
                    {step.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                        <span className="text-neutral-400">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
