import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Heart, MessageCircle, Lightbulb, Globe, Award, Users, ArrowRight, Quote, BookOpen, Calendar } from 'lucide-react';
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
            {[
              {
                title: 'SGITAL Marks 8 Years of Powering Singapore\'s AI Workflows',
                description: 'Founder Sachin Khatri\'s Bold Bet on Digital Transformation Now Drives Enterprise Productivity Across ASEAN.',
                date: 'October 11, 2025',
                image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=450&fit=crop',
                link: 'https://www.sgital.com/sgital-marks-8-years-of-powering-singapores-ai-workflows/'
              },
              {
                title: 'The Future of Customer Service: How ServiceNow\'s Xanadu Release is Transforming Business',
                description: 'In today\'s rapidly evolving digital landscape, the gap between customer expectations and service delivery capabilities continues to grow.',
                date: 'November 22, 2024',
                image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=450&fit=crop',
                link: 'https://www.sgital.com/the-the-future-of-customer-service-how-servicenows-xanadu-release-is-transforming-business-operations-%f0%9f%9a%80/'
              },
              {
                title: '7 Best ESG Updates in ServiceNow Xanadu',
                description: 'Discover the Top ServiceNow Xanadu Release Updates that are transforming enterprise sustainability reporting and ESG compliance.',
                date: 'October 7, 2024',
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
                link: 'https://www.sgital.com/7-best-esg-updates-in-servicenow-xanadu/'
              }
            ].map((blog, index) => (
              <article
                key={index}
                className="bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden hover:border-amber-400/30 transition-all group"
              >
                {/* Blog Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-transparent" />
                </div>

                {/* Blog Content */}
                <div className="p-6">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-neutral-500 text-sm mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{blog.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-amber-400 transition-colors">
                    {blog.title}
                  </h3>

                  {/* Description */}
                  <p className="text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-3">
                    {blog.description}
                  </p>

                  {/* Read More Button */}
                  <a
                    href={blog.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-amber-400 text-sm font-medium hover:text-amber-300 transition-colors group/btn"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
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
              <a href="https://www.sgital.com/blog/" target="_blank" rel="noopener noreferrer">
                View All Posts
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
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
