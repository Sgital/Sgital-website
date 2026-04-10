import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, CheckCircle2, Zap, Target, Rocket, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { goAIFeatures } from '../data/mock';

const phaseIcons = [Target, Rocket, Zap, TrendingUp];

const GoAIPage = () => {
  return (
    <>
      <Helmet>
        <title>GoAI 2.0 | AI-Powered Workflow Automation - Sgital</title>
        <meta name="description" content="GoAI 2.0 is Sgital's proven framework for implementing AI-powered automation. From readiness audit to enterprise roll-out, achieve measurable ROI in weeks." />
        <meta name="keywords" content="AI automation, workflow automation, ServiceNow AI, NowAssist, enterprise AI, GoAI framework" />
        <link rel="canonical" href="https://sgital.com/goai" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-neutral-950 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/20 rounded-full mb-6">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-sm font-medium">AI-Powered Framework</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              GoAI <span className="text-amber-400">2.0</span>
            </h1>
            <p className="text-xl text-neutral-400 leading-relaxed mb-8">
              Your Roadmap to AI-Powered Workflow Excellence
            </p>
            <p className="text-lg text-neutral-500 leading-relaxed">
              A proven 4-phase methodology that takes you from AI readiness to enterprise-wide 
              intelligent automation—with measurable outcomes at every step.
            </p>
          </div>
        </div>
      </section>

      {/* Phases Section */}
      <section className="bg-neutral-900 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              The 4 Phases of <span className="text-amber-400">AI Transformation</span>
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Each phase builds upon the previous, ensuring sustainable adoption and continuous value delivery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {goAIFeatures.map((phase, index) => {
              const IconComponent = phaseIcons[index];
              return (
                <div
                  key={index}
                  className="relative bg-neutral-950 border border-neutral-800 rounded-2xl p-8 hover:border-amber-400/30 transition-all group"
                >
                  {/* Phase Number */}
                  <div className="absolute -top-4 left-8 bg-amber-400 text-neutral-950 px-3 py-1 rounded-full text-sm font-bold">
                    {phase.phase}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-14 h-14 bg-amber-400/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-400/20 transition-colors">
                    <IconComponent className="w-7 h-7 text-amber-400" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3">{phase.title}</h3>
                  <p className="text-neutral-400 leading-relaxed">{phase.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-neutral-950 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Why <span className="text-amber-400">GoAI 2.0</span>?
              </h2>
              <p className="text-lg text-neutral-400 mb-8 leading-relaxed">
                Our framework is designed to de-risk AI adoption while accelerating time-to-value. 
                Here's what sets us apart:
              </p>
              
              <div className="space-y-4">
                {[
                  'Proven methodology with 70+ successful implementations',
                  'Measurable ROI at every phase',
                  'Built on ServiceNow NowAssist capabilities',
                  'Governance and compliance built-in',
                  'Scalable from pilot to enterprise-wide deployment'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Expected Outcomes</h3>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: '40%', label: 'Reduction in resolution time' },
                  { value: '60%', label: 'Faster ticket routing' },
                  { value: '50%', label: 'Improvement in first-call resolution' },
                  { value: '30%', label: 'Increase in agent productivity' }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-amber-400 mb-2">{stat.value}</div>
                    <div className="text-sm text-neutral-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-neutral-900 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Start Your AI Journey Today
            </h2>
            <p className="text-lg text-neutral-400 mb-8">
              Book a free consultation to assess your AI readiness and discover how GoAI 2.0 
              can transform your enterprise workflows.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                className="bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold px-8 py-6 group"
              >
                <Link to="/contact">
                  Book AI Readiness Assessment
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-neutral-600 text-white hover:bg-neutral-800 px-8 py-6"
              >
                <Link to="/case-studies">
                  See GoAI in Action
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GoAIPage;
