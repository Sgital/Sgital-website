import React from 'react';
import { Quote } from 'lucide-react';
import { testimonials } from '../data/mock';

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-neutral-950 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-400/5 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/20 rounded-full mb-6">
            <span className="text-amber-400 text-sm font-medium">Client Testimonials</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Trusted by
            <span className="text-amber-400"> Industry Leaders</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-neutral-900 border border-neutral-800 rounded-xl p-8 hover:border-amber-400/30 transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center">
                  <Quote className="w-4 h-4 text-neutral-950" />
                </div>
              </div>

              {/* Quote */}
              <p className="text-neutral-300 leading-relaxed mb-6 mt-4">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="border-t border-neutral-800 pt-6">
                <div className="text-white font-semibold">{testimonial.author}</div>
                <div className="text-neutral-500 text-sm">{testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Client Logos */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h3 className="text-neutral-500 uppercase tracking-wider text-sm">Trusted by Leading Organizations</h3>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-12">
            {['Air Liquide', 'TotalEnergies', 'Keppel', 'International SOS', 'SPH Media', 'Core Group'].map((logo, index) => (
              <div
                key={index}
                className="text-neutral-600 hover:text-neutral-400 transition-colors font-semibold text-lg"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
