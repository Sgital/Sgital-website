'use client';

import React from 'react';
import { Heart, MessageCircle, Lightbulb, Globe, Award, Users, CheckCircle2 } from 'lucide-react';
import { values, whyChooseUs, certifications } from '@/lib/data/mock';

const iconMap = {
  Heart,
  MessageCircle,
  Lightbulb,
  Globe
};

const AboutSection = () => {
  return (
    <section id="about" className="py-24 lg:py-32 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* About Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/20 rounded-full mb-6">
              <span className="text-amber-400 text-sm font-medium">About Sgital</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Premier ServiceNow Partner
              <span className="text-amber-400"> Since 2018</span>
            </h2>
            <p className="text-lg text-neutral-400 mb-6 leading-relaxed">
              Sgital is a pure-play ServiceNow partner, 100% focused on delivering digital 
              transformation through the Now Platform. Over 7+ years, we've delivered 500+ 
              digital workflows across 70+ projects for more than 30 customers with perfect 
              CSAT scores.
            </p>
            <p className="text-neutral-400 mb-8 leading-relaxed">
              Our team of 50+ certified professionals brings more than 400 years of combined 
              ServiceNow experience across 6 global regions including Singapore, India, Malaysia, 
              Australia, New Zealand, and UK.
            </p>

            {/* Why Choose Us */}
            <div className="grid sm:grid-cols-2 gap-4">
              {whyChooseUs.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-medium">{item.title}</div>
                    <div className="text-neutral-500 text-sm">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Card */}
          <div className="relative">
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-8 h-8 text-amber-400" />
                <h3 className="text-xl font-semibold text-white">ServiceNow Accreditations</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 text-center"
                  >
                    <div className="text-neutral-300 text-sm">{cert}</div>
                  </div>
                ))}
              </div>

              {/* Team Stats */}
              <div className="border-t border-neutral-800 pt-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-amber-400">96</div>
                    <div className="text-neutral-500 text-xs">Certifications</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-amber-400">50+</div>
                    <div className="text-neutral-500 text-xs">Team Members</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-amber-400">6</div>
                    <div className="text-neutral-500 text-xs">Regions</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 bg-amber-400 text-neutral-950 px-4 py-2 rounded-lg font-semibold text-sm shadow-lg">
              Premier Partner
            </div>
          </div>
        </div>

        {/* Values */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">Our Values</h3>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const IconComponent = iconMap[value.icon];
              return (
                <div
                  key={index}
                  className="bg-neutral-950 border border-neutral-800 rounded-xl p-6 hover:border-amber-400/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-amber-400/10 rounded-xl flex items-center justify-center mb-4">
                    {IconComponent && <IconComponent className="w-6 h-6 text-amber-400" />}
                  </div>
                  <h4 className="text-white font-semibold mb-2">{value.title}</h4>
                  <p className="text-neutral-400 text-sm leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
