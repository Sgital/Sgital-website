'use client';

import React from 'react';
import { Sparkles, Zap, TrendingUp, RefreshCw, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { goAIFeatures } from '@/lib/data/mock';

const GoAISection = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const phaseIcons = {
    1: Sparkles,
    2: Zap,
    3: TrendingUp,
    4: RefreshCw
  };

  return (
    <section id="goai" className="py-24 lg:py-32 bg-neutral-950 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-400/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/20 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-sm font-medium">AI-Powered Innovation</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              GoAI 2.0
              <span className="block text-amber-400 mt-2">AI Agents That Work For You</span>
            </h2>
            
            <p className="text-lg text-neutral-400 mb-8 leading-relaxed">
              ServiceNow AI Agents act autonomously on your behalf so you can focus on the work that matters. 
              GoAI brings together employee requests with machine data and uses AI to find answers that 
              significantly transform work.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              {[
                'Built on proven GoAI foundation with rapid time-to-value',
                'Combines autonomous agent workflows with ServiceNow\'s AI assistant',
                'Automates both routine & complex tasks',
                'Delivers measurable impact on resolution time & SLA compliance'
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-amber-400" />
                  </div>
                  <span className="text-neutral-300">{benefit}</span>
                </div>
              ))}
            </div>

            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold px-8 py-6 text-base group"
            >
              Explore GoAI for Your Business
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Roll-out Journey */}
          <div className="relative">
            <div className="space-y-4">
              {goAIFeatures.map((feature, index) => {
                const PhaseIcon = phaseIcons[index + 1];
                return (
                  <div
                    key={index}
                    className="relative bg-neutral-900/80 border border-neutral-800 rounded-xl p-6 hover:border-amber-400/30 transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-amber-400/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-amber-400/20 transition-colors">
                        <PhaseIcon className="w-6 h-6 text-amber-400" />
                      </div>
                      <div>
                        <div className="text-amber-400 text-sm font-medium mb-1">{feature.phase}</div>
                        <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                        <p className="text-neutral-400 text-sm">{feature.description}</p>
                      </div>
                    </div>
                    
                    {/* Connector Line */}
                    {index < goAIFeatures.length - 1 && (
                      <div className="absolute left-[47px] bottom-0 w-0.5 h-4 bg-neutral-800 translate-y-full" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoAISection;
