import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Heart, MessageCircle, Lightbulb, Globe, Award, Users, ArrowRight, Quote } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { values, certifications, specializations, testimonials, stats, companyInfo } from '../data/mock';

const iconMap = { Heart, MessageCircle, Lightbulb, Globe };

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Premier ServiceNow Partner - Sgital</title>
        <meta name="description" content="Sgital is a premier ServiceNow partner with 7+ years of expertise, 96 certifications, and presence across 6 global regions. Learn about our values and team." />
        <meta name="keywords" content="Sgital about, ServiceNow partner Singapore, digital transformation company, workflow automation experts" />
        <link rel="canonical" href="https://sgital.com/about" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-neutral-950 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/20 rounded-full mb-6">
                <span className="text-amber-400 text-sm font-medium">About Sgital</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                100% Focused on
                <span className="text-amber-400"> ServiceNow</span>
              </h1>
              <p className="text-lg text-neutral-400 leading-relaxed mb-8">
                {companyInfo.description}. Founded in {companyInfo.founded} and headquartered in 
                {companyInfo.headquarters}, we've grown to serve enterprises across {companyInfo.globalPresence.length} regions.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  className="bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold px-6 py-5 group"
                >
                  <Link to="/contact">
                    Work With Us
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.slice(0, 4).map((stat, index) => (
                <div
                  key={index}
                  className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 text-center hover:border-amber-400/30 transition-colors"
                >
                  <div className="text-3xl font-bold text-amber-400 mb-2">{stat.value}</div>
                  <div className="text-neutral-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-neutral-900 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our <span className="text-amber-400">Values</span>
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              The principles that guide everything we do.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const IconComponent = iconMap[value.icon] || Heart;
              return (
                <div
                  key={index}
                  className="bg-neutral-950 border border-neutral-800 rounded-xl p-6 hover:border-amber-400/30 transition-all group"
                >
                  <div className="w-12 h-12 bg-amber-400/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-400/20 transition-colors">
                    <IconComponent className="w-6 h-6 text-amber-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications & Specializations */}
      <section className="bg-neutral-950 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Partner Status */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-6 h-6 text-amber-400" />
                <h2 className="text-2xl font-bold text-white">ServiceNow Partner Status</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-4 flex items-center gap-3"
                  >
                    <div className="w-10 h-10 bg-amber-400 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-neutral-950 font-bold text-lg">S</span>
                    </div>
                    <span className="text-neutral-300 text-sm font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specializations */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-amber-400" />
                <h2 className="text-2xl font-bold text-white">Specializations</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {specializations.map((spec, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-amber-400/10 border border-amber-400/20 text-amber-400 text-sm font-medium rounded-full"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-neutral-900 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Our <span className="text-amber-400">Clients Say</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-neutral-950 border border-neutral-800 rounded-xl p-8 hover:border-amber-400/30 transition-all"
              >
                <Quote className="w-8 h-8 text-amber-400/30 mb-4" />
                <p className="text-neutral-300 leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <div className="text-white font-semibold">{testimonial.author}</div>
                  <div className="text-amber-400 text-sm">{testimonial.company}</div>
                  <div className="text-neutral-500 text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="bg-neutral-950 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Global <span className="text-amber-400">Presence</span>
          </h2>
          <p className="text-neutral-400 mb-8">Serving enterprises across multiple regions</p>
          <div className="flex flex-wrap justify-center gap-4">
            {companyInfo.globalPresence.map((region, index) => (
              <span
                key={index}
                className="px-6 py-3 bg-neutral-900/50 border border-neutral-800 text-neutral-300 rounded-lg"
              >
                {region}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-neutral-900 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Partner with Us?
          </h2>
          <p className="text-lg text-neutral-400 mb-8 max-w-2xl mx-auto">
            Join 30+ enterprises who trust Sgital for their ServiceNow journey.
          </p>
          <Button
            asChild
            className="bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold px-8 py-6 group"
          >
            <Link to="/contact">
              Get in Touch
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
