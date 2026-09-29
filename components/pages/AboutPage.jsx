'use client';

import React, { useState } from 'react';
import { Heart, MessageCircle, Lightbulb, Globe, Award, Users, ArrowRight, Quote, BookOpen, Calendar, ExternalLink, Star, CheckCircle, Shield, MapPin, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  values, testimonials, stats, companyInfo, partnershipBadges, partnershipDetails,
  contactInfo, globalCoverage, officeLocations,
  mainlineCertifications, suiteCertifications, certificationTotals, founder,
} from '@/lib/data/mock';
import { blogPosts } from '@/lib/data/blogData';

const iconMap = { Heart, MessageCircle, Lightbulb, Globe };

// Coverage card — collapses the large EMEA list to a summary with an expandable "view all".
const CoverageCard = ({ region }) => {
  const [expanded, setExpanded] = useState(false);
  const isEmea = /europe/i.test(region.name);

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-amber-400/30 transition-all">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="w-5 h-5 text-amber-400" />
        <h4 className="text-white font-semibold">{region.name}</h4>
      </div>
      <div className="text-amber-400 text-sm font-medium mb-3">
        {region.countries.length} {region.countries.length === 1 ? 'Country' : 'Countries'}
      </div>

      {isEmea && !expanded ? (
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="px-3 py-1 bg-neutral-950 border border-neutral-700 text-neutral-300 text-xs rounded-full">
              United Kingdom
            </span>
            <span className="px-3 py-1 text-neutral-400 text-xs self-center">
              and {region.countries.length - 1} other European countries
            </span>
          </div>
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="text-amber-400 text-xs font-medium hover:text-amber-300 transition-colors"
          >
            View all
          </button>
        </div>
      ) : (
        <div>
          <div className="flex flex-wrap gap-2">
            {region.countries.map((country, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-neutral-950 border border-neutral-700 text-neutral-300 text-xs rounded-full"
              >
                {country}
              </span>
            ))}
          </div>
          {isEmea && (
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="mt-3 text-amber-400 text-xs font-medium hover:text-amber-300 transition-colors"
            >
              Show less
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const AboutPage = () => {
  return (
    <>
      

      {/* Hero Section */}
      <section className="bg-neutral-950 pt-40 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/20 rounded-full mb-6">
                <span className="text-amber-400 text-sm font-medium">About Sgital</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Enterprise AI, delivered on
                <span className="text-amber-400"> ServiceNow and Claude</span>
              </h1>
              <p className="text-lg text-neutral-400 leading-relaxed mb-8">
                {companyInfo.description}. Founded in {companyInfo.founded} and headquartered in 
                {companyInfo.headquarters}, we've grown to serve enterprises across {companyInfo.globalPresence.length} countries.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  className="bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold px-6 py-5 group"
                >
                  <Link href="/contact">
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

      {/* Meet Our Founder */}
      <section className="bg-neutral-950 py-24 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/20 rounded-full mb-6">
              <Users className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-sm font-medium">Leadership</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Meet Our <span className="text-amber-400">Founder</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-[300px_1fr] gap-10 lg:gap-16 items-start max-w-6xl mx-auto">
            {/* Photo column */}
            <div className="flex justify-center lg:justify-start">
              {founder.photoUrl ? (
                <img
                  src={founder.photoUrl}
                  alt={founder.name}
                  className="w-64 h-64 lg:w-72 lg:h-72 rounded-full object-cover border-4 border-amber-400/30 shadow-2xl shadow-amber-400/10"
                />
              ) : (
                <div
                  className="w-64 h-64 lg:w-72 lg:h-72 rounded-full flex items-center justify-center border-4 border-amber-400/30 bg-gradient-to-br from-neutral-800 to-neutral-900 shadow-2xl shadow-amber-400/10"
                  title="Founder photo placeholder — replace with S3-hosted headshot (min 400×400)"
                >
                  <div className="text-center">
                    <div className="text-6xl font-bold text-amber-400 mb-2">
                      {founder.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                    </div>
                    <div className="text-neutral-500 text-xs uppercase tracking-wider">Photo coming soon</div>
                  </div>
                </div>
              )}
            </div>

            {/* Bio column */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{founder.name}</h3>
              <div className="text-amber-400 font-medium mb-1">{founder.title}</div>
              <div className="text-neutral-500 text-sm mb-6 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {founder.location}
              </div>

              {/* Pull-quote */}
              {founder.quote && (
                <div className="relative bg-neutral-900/60 border-l-4 border-amber-400 rounded-r-xl px-6 py-5 mb-6">
                  <Quote className="w-6 h-6 text-amber-400/40 mb-2" />
                  <p className="text-neutral-200 italic leading-relaxed">"{founder.quote}"</p>
                </div>
              )}

              {/* Bio paragraphs */}
              <div className="space-y-4 text-neutral-400 leading-relaxed mb-8">
                {founder.bio.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold rounded-lg transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  Connect on LinkedIn
                </a>
                <Button
                  asChild
                  variant="outline"
                  className="border-neutral-700 text-white hover:bg-neutral-800 px-6"
                >
                  <Link href="/contact">
                    Book a Meeting
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
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

      {/* Partnerships Details */}
      <section className="bg-neutral-950 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our <span className="text-amber-400">Partnerships</span>
            </h2>
            <p className="text-neutral-400 max-w-3xl mx-auto mb-4">
              {partnershipDetails.description}
            </p>
            <p className="text-neutral-300 text-sm md:text-base mb-6">
              {partnershipDetails.combinedExperience}.
            </p>
            <div className="flex items-center justify-center gap-2 text-amber-400">
              <Star className="w-5 h-5 fill-amber-400" />
              <a
                href={contactInfo.partnerFinder}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold hover:text-amber-300 transition-colors inline-flex items-center gap-1.5"
              >
                CSAT 4.8 out of 5 (ServiceNow Partner Finder)
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Anthropic subsection */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 md:p-8 text-center hover:border-amber-400/30 transition-all">
              <span className="inline-block px-3 py-1 bg-amber-400/10 text-amber-400 text-xs font-semibold rounded-full mb-4 tracking-wide">
                ANTHROPIC
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Claude Partner Network Member</h3>
              <p className="text-neutral-400 leading-relaxed mb-5">
                We design, build and run Claude solutions — standalone and inside ServiceNow, where Claude
                is the default model for Build Agent.
              </p>
              <Link
                href="/claude"
                className="inline-flex items-center gap-2 text-amber-400 font-medium hover:gap-3 transition-all"
              >
                Explore our Claude practice
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Partnership Badges */}
          <div className="mb-16">
            <h3 className="text-xl font-bold text-white text-center mb-8">Official Partner Badges</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {partnershipBadges.map((badge, index) => (
                <div
                  key={index}
                  className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 hover:border-amber-400/30 transition-all group"
                >
                  <img
                    src={badge.image}
                    alt={badge.alt}
                    className="w-full h-auto mb-3"
                  />
                  <p className="text-neutral-400 text-xs text-center leading-tight">{badge.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Partner Types Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {partnershipDetails.partnerTypes.map((partner, index) => (
              <div
                key={index}
                className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-amber-400/30 transition-all"
              >
                <div className="text-amber-400 font-bold text-lg mb-2">{partner.type}</div>
                <div className="text-white font-semibold mb-3">{partner.category}</div>
                <p className="text-neutral-400 text-sm leading-relaxed">{partner.description}</p>
              </div>
            ))}
          </div>

          {/* Expertise Areas */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 mb-16">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-amber-400" />
              ServiceNow Expertise
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {partnershipDetails.expertise.map((area, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-neutral-300 text-sm">{area}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Certified at Every Level */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 flex items-center justify-center gap-2">
                <Award className="w-7 h-7 text-amber-400" />
                Certified at Every Level
              </h3>
              <p className="text-neutral-400 max-w-3xl mx-auto text-sm md:text-base">
                117 mainline · 51 suite · 263 micro · 148 accreditations …and counting
              </p>
            </div>

            {/* Mini stat row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-4xl mx-auto">
              {certificationTotals.map((c) => (
                <div key={c.label} className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 text-center hover:border-amber-400/30 transition-colors">
                  <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-1">{c.value}</div>
                  <div className="text-neutral-400 text-xs uppercase tracking-wider">{c.label}</div>
                </div>
              ))}
            </div>

            {/* Two tables side-by-side on desktop, stacked on mobile */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Mainline */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
                <div className="bg-neutral-800/60 px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
                  <h4 className="text-white font-semibold">Mainline Certifications</h4>
                  <span className="text-amber-400 font-bold">Total: 117</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-neutral-500 text-xs uppercase tracking-wider">
                        <th className="px-6 py-3 font-medium">Certification</th>
                        <th className="px-6 py-3 font-medium text-right">Certified</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                      {mainlineCertifications.map((cert, i) => (
                        <tr key={i} className="hover:bg-neutral-800/30 transition-colors">
                          <td className="px-6 py-3 text-neutral-300">{cert.name}</td>
                          <td className="px-6 py-3 text-amber-400 font-semibold text-right tabular-nums">{cert.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Suite */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
                <div className="bg-neutral-800/60 px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
                  <h4 className="text-white font-semibold">Suite Certifications</h4>
                  <span className="text-amber-400 font-bold">Total: 51</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-neutral-500 text-xs uppercase tracking-wider">
                        <th className="px-6 py-3 font-medium">Certification</th>
                        <th className="px-6 py-3 font-medium text-right">Certified</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                      {suiteCertifications.map((cert, i) => (
                        <tr key={i} className="hover:bg-neutral-800/30 transition-colors">
                          <td className="px-6 py-3 text-neutral-300">{cert.name}</td>
                          <td className="px-6 py-3 text-amber-400 font-semibold text-right tabular-nums">{cert.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* View Partner Profile CTA */}
          <div className="text-center">
            <a
              href={contactInfo.partnerFinder}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold rounded-lg transition-colors group"
            >
              View Our ServiceNow Partner Profile
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
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
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Global <span className="text-amber-400">Presence</span>
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Delivering enterprise AI across six countries, with coverage validated by ServiceNow
            </p>
          </div>

          {/* Office Locations */}
          <div className="mb-16">
            <h3 className="text-xl font-bold text-white text-center mb-8 flex items-center justify-center gap-2">
              <MapPin className="w-6 h-6 text-amber-400" />
              Our Office Locations
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {officeLocations.map((office, index) => (
                <div
                  key={index}
                  className={`relative bg-neutral-900 border rounded-xl p-6 hover:border-amber-400/30 transition-all ${
                    office.isHQ ? 'border-amber-400/30' : 'border-neutral-800'
                  }`}
                >
                  {office.isHQ && (
                    <div className="absolute -top-3 left-6 px-3 py-1 bg-amber-400 text-neutral-950 text-xs font-bold rounded-full">
                      HQ
                    </div>
                  )}
                  <div className="text-white font-bold text-lg mb-2">{office.isHQ ? `${office.city} (HQ)` : `${office.city}, ${office.country}`}</div>
                  <p className="text-neutral-400 text-sm mb-4">{office.address}</p>
                  <a
                    href={office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 text-sm hover:text-amber-300 transition-colors inline-flex items-center gap-1"
                  >
                    View on Maps
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Consulting & Implementation Coverage */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-white text-center mb-8">
              Consulting & Implementation Coverage
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {globalCoverage.consulting.regions.map((region, index) => (
                <CoverageCard key={index} region={region} />
              ))}
            </div>
            <p className="text-center text-neutral-500 text-sm mt-6">
              <a
                href={contactInfo.partnerFinder}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1"
              >
                Coverage validated on ServiceNow Partner Finder
                <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>

          {/* Reseller Coverage */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-4">Reseller Coverage</h3>
            <p className="text-neutral-400 mb-4">
              Authorized ServiceNow Reseller in Asia Pacific & Japan
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/20 rounded-full">
              <span className="text-amber-400 font-medium">Singapore</span>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="bg-neutral-950 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/20 rounded-full mb-6">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-sm font-medium">Our Blog</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Insights & <span className="text-amber-400">Updates</span>
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Explore our latest insights and updates from SGITAL.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((blog) => (
              <article
                key={blog.id}
                data-testid={`about-blog-card-${blog.slug}`}
                className="bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden hover:border-amber-400/30 transition-all group"
              >
                {/* Blog Image */}
                <Link href={`/our-blog/${blog.slug}`} className="block relative h-48 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-neutral-950/80 text-amber-400 text-xs font-medium rounded-full backdrop-blur-sm">
                    {blog.category}
                  </span>
                </Link>

                {/* Blog Content */}
                <div className="p-6">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-neutral-500 text-sm mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{blog.date}</span>
                  </div>

                  {/* Title */}
                  <Link href={`/our-blog/${blog.slug}`}>
                    <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-amber-400 transition-colors">
                      {blog.title}
                    </h3>
                  </Link>

                  {/* Description */}
                  <p className="text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-3">
                    {blog.description}
                  </p>

                  {/* Read More Button */}
                  <Link
                    href={`/our-blog/${blog.slug}`}
                    className="inline-flex items-center gap-2 text-amber-400 text-sm font-medium hover:text-amber-300 transition-colors group/btn"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* View All Blogs Button */}
          <div className="text-center mt-12">
            <Button
              asChild
              variant="outline"
              className="border-neutral-700 text-white hover:bg-neutral-800 px-8 py-5 group"
            >
              <Link href="/our-blog">
                View All Posts
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
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
            Join enterprises across six countries who trust Sgital for their ServiceNow journey.
          </p>
          <Button
            asChild
            className="bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold px-8 py-6 group"
          >
            <Link href="/contact">
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
