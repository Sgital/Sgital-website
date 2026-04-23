import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Heart, MessageCircle, Lightbulb, Globe, Award, Users, ArrowRight, Quote, BookOpen, Calendar, ExternalLink, Star, CheckCircle, Shield, MapPin } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { values, testimonials, stats, companyInfo, partnershipBadges, partnershipDetails, contactInfo, productCertifications, accreditations, globalCoverage, officeLocations } from '../data/mock';
import { blogPosts } from '../data/blogData';

const iconMap = { Heart, MessageCircle, Lightbulb, Globe };

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Premier ServiceNow Partner - Sgital</title>
        <meta name="description" content="Sgital is a premier ServiceNow partner with 7+ years of expertise, 60+ certified consultants, and presence across 3 global regions. Learn about our values and team." />
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

      {/* ServiceNow Partnership Details */}
      <section className="bg-neutral-950 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our <span className="text-amber-400">ServiceNow Partnership</span>
            </h2>
            <p className="text-neutral-400 max-w-3xl mx-auto mb-6">
              {partnershipDetails.description}
            </p>
            <div className="flex items-center justify-center gap-2 text-amber-400">
              <Star className="w-5 h-5 fill-amber-400" />
              <span className="text-lg font-semibold">Customer Satisfaction: {partnershipDetails.csatScore}</span>
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

          {/* Product Certifications */}
          <div className="mb-16">
            <h3 className="text-xl font-bold text-white text-center mb-8 flex items-center justify-center gap-2">
              <Award className="w-6 h-6 text-amber-400" />
              Product Certifications
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {productCertifications.map((cert, index) => (
                <div
                  key={index}
                  className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-amber-400/30 transition-all"
                >
                  <div className="text-amber-400 font-semibold mb-4">{cert.category}</div>
                  <ul className="space-y-2">
                    {cert.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-400 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Accreditations */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-white text-center mb-8 flex items-center justify-center gap-2">
              <Shield className="w-6 h-6 text-amber-400" />
              Team Accreditations
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {accreditations.map((accred, index) => (
                <div
                  key={index}
                  className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 text-center hover:border-amber-400/30 transition-all"
                >
                  <div className="text-4xl font-bold text-amber-400 mb-2">{accred.count}+</div>
                  <div className="text-white font-semibold mb-3">{accred.type}</div>
                  <p className="text-neutral-400 text-sm leading-relaxed">{accred.description}</p>
                </div>
              ))}
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
              Delivering ServiceNow excellence across three continents with offices in Asia Pacific
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
                  <div className="text-white font-bold text-lg mb-2">{office.city}, {office.country}</div>
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
                <div
                  key={index}
                  className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-amber-400/30 transition-all"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Globe className="w-5 h-5 text-amber-400" />
                    <h4 className="text-white font-semibold">{region.name}</h4>
                  </div>
                  <div className="text-amber-400 text-sm font-medium mb-3">
                    {region.countries.length} {region.countries.length === 1 ? 'Country' : 'Countries'}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {region.countries.slice(0, 8).map((country, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-neutral-950 border border-neutral-700 text-neutral-300 text-xs rounded-full"
                      >
                        {country}
                      </span>
                    ))}
                    {region.countries.length > 8 && (
                      <span className="px-3 py-1 text-neutral-500 text-xs">
                        +{region.countries.length - 8} more
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
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
                <Link to={`/our-blog/${blog.slug}`} className="block relative h-48 overflow-hidden">
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
                  <Link to={`/our-blog/${blog.slug}`}>
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
                    to={`/our-blog/${blog.slug}`}
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
              <Link to="/our-blog">
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
            Join enterprises across 3 global regions who trust Sgital for their ServiceNow journey.
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
