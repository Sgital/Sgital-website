import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Play, Users, Heart, Sparkles, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

// Video data from Sgital YouTube channel
const videos = [
  {
    id: 'C5kAG34kyo8',
    title: 'SGITAL Completes 8 Years of ServiceNow Workflows Excellence',
    description: 'Celebrating 8 years of transforming enterprise workflows with ServiceNow across Asia-Pacific.',
    duration: '2:15',
    views: '23 views',
    date: '6 months ago',
    category: 'Company'
  },
  {
    id: 'xoHKwu2jrCQ',
    title: 'Why You Should Join Sgital?',
    description: 'Discover what makes Sgital a great place to work and grow your career in ServiceNow.',
    duration: '1:57',
    views: '229 views',
    date: '1 year ago',
    category: 'Culture'
  },
  {
    id: 'AJa9fW50mNs',
    title: 'GoAI with Sgital Built with ServiceNow',
    description: 'GoAI with Sgital is our package offering that is certified by ServiceNow and available on the ServiceNow store. The objective is to help improve service experience and use AI capabilities of the ServiceNow® platform to transform work.',
    duration: '1:27',
    views: '111 views',
    date: '2 years ago',
    category: 'Product'
  },
  {
    id: 'Jy2jZwRSCKc',
    title: 'GoAI with Sgital Use Cases and Packages',
    description: 'Explore the various use cases and packages available with GoAI, our certified ServiceNow solution.',
    duration: '2:15',
    views: '39 views',
    date: '2 years ago',
    category: 'Product'
  },
  {
    id: 'lHhLfJrB9xU',
    title: 'ServiceNow IRM POC Session',
    description: 'A comprehensive proof-of-concept session showcasing ServiceNow Integrated Risk Management capabilities.',
    duration: '2:11:17',
    views: '2K views',
    date: '2 years ago',
    category: 'Technical'
  },
  {
    id: 'z96skdry7H0',
    title: 'Christmas Celebrations at Sgital',
    description: 'Join us for the festive celebrations at Sgital! See how our team celebrates together.',
    duration: '0:50',
    views: '35 views',
    date: '2 years ago',
    category: 'Culture'
  },
  {
    id: 'Z41H90ZwXFk',
    title: 'Happy Holidays',
    description: 'Season\'s greetings from the Sgital team! Wishing everyone a wonderful holiday season.',
    duration: '0:32',
    views: '24 views',
    date: '2 years ago',
    category: 'Culture'
  }
];

const categories = ['All', 'Culture', 'Company', 'Product', 'Technical'];

const LifeAtSgitalPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [playingVideo, setPlayingVideo] = useState(null);

  const filteredVideos = selectedCategory === 'All' 
    ? videos 
    : videos.filter(v => v.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>Life at Sgital | Culture & Videos - Sgital</title>
        <meta name="description" content="Discover life at Sgital - our culture, team celebrations, and behind-the-scenes moments. Watch videos showcasing our ServiceNow expertise and vibrant workplace." />
        <meta name="keywords" content="Sgital culture, ServiceNow careers, life at Sgital, ServiceNow partner Singapore, work culture Asia" />
        <link rel="canonical" href="https://sgital.com/life-at-sgital" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-neutral-950 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/20 rounded-full mb-6">
                <Heart className="w-4 h-4 text-amber-400" />
                <span className="text-amber-400 text-sm font-medium">Life at Sgital</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Where <span className="text-amber-400">Innovation</span> Meets Culture
              </h1>
              <p className="text-lg text-neutral-400 leading-relaxed mb-8">
                At Sgital, we believe great work happens when talented people come together in an 
                environment that fosters growth, creativity, and collaboration. Discover what makes 
                us unique through our videos and team moments.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  className="bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold px-6 py-5 group"
                >
                  <a href="https://www.youtube.com/@Sgital" target="_blank" rel="noopener noreferrer">
                    <Play className="mr-2 w-5 h-5" />
                    Visit Our YouTube
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-neutral-700 text-white hover:bg-neutral-800 px-6 py-5"
                >
                  <Link to="/contact">
                    Join Our Team
                  </Link>
                </Button>
              </div>
            </div>

            {/* Culture Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 text-center hover:border-amber-400/30 transition-colors">
                <Users className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">60+</div>
                <div className="text-neutral-400 text-sm">Team Members</div>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 text-center hover:border-amber-400/30 transition-colors">
                <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">8+</div>
                <div className="text-neutral-400 text-sm">Years of Excellence</div>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 text-center hover:border-amber-400/30 transition-colors">
                <Heart className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">3</div>
                <div className="text-neutral-400 text-sm">Global Regions</div>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 text-center hover:border-amber-400/30 transition-colors">
                <Play className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{videos.length}</div>
                <div className="text-neutral-400 text-sm">Videos</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="bg-neutral-900 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Watch Our <span className="text-amber-400">Videos</span>
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Get a glimpse into our world - from product demos to team celebrations
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-amber-400 text-neutral-950'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Video Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden hover:border-amber-400/30 transition-all group"
              >
                {/* Video Thumbnail/Player */}
                <div className="relative aspect-video bg-neutral-800">
                  {playingVideo === video.id ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                      title={video.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      <img
                        src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setPlayingVideo(video.id)}
                          className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors transform hover:scale-110"
                        >
                          <Play className="w-8 h-8 text-neutral-950 ml-1" fill="currentColor" />
                        </button>
                      </div>
                      <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 text-white text-xs font-medium rounded">
                        {video.duration}
                      </div>
                      <div className="absolute top-3 left-3 px-2 py-1 bg-amber-400/90 text-neutral-950 text-xs font-medium rounded">
                        {video.category}
                      </div>
                    </>
                  )}
                </div>

                {/* Video Info */}
                <div className="p-5">
                  <h3 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-amber-400 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-neutral-400 text-sm line-clamp-2 mb-3">
                    {video.description}
                  </p>
                  <div className="flex items-center justify-between text-neutral-500 text-xs">
                    <span>{video.views}</span>
                    <span>{video.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* YouTube CTA */}
          <div className="text-center mt-12">
            <Button
              asChild
              variant="outline"
              className="border-neutral-700 text-white hover:bg-neutral-800 px-8 py-5 group"
            >
              <a href="https://www.youtube.com/@Sgital" target="_blank" rel="noopener noreferrer">
                View All Videos on YouTube
                <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Photo Gallery Placeholder Section */}
      <section className="bg-neutral-950 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Photo <span className="text-amber-400">Gallery</span>
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Moments captured from our team events, celebrations, and everyday life at Sgital
            </p>
          </div>

          {/* Placeholder Grid for Photos */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="aspect-square bg-neutral-900/50 border border-neutral-800 rounded-xl flex items-center justify-center hover:border-amber-400/30 transition-colors group"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-amber-400/20 transition-colors">
                    <Sparkles className="w-6 h-6 text-neutral-600 group-hover:text-amber-400 transition-colors" />
                  </div>
                  <p className="text-neutral-600 text-sm">Coming Soon</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-neutral-500 mt-8">
            More photos will be added soon. Stay tuned!
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-neutral-900 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What We <span className="text-amber-400">Stand For</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-8 text-center hover:border-amber-400/30 transition-colors">
              <div className="w-16 h-16 bg-amber-400/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Innovation First</h3>
              <p className="text-neutral-400">We embrace new technologies and creative solutions to deliver exceptional results for our clients.</p>
            </div>
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-8 text-center hover:border-amber-400/30 transition-colors">
              <div className="w-16 h-16 bg-amber-400/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Collaboration</h3>
              <p className="text-neutral-400">We believe in the power of teamwork, both within our organization and with our clients and partners.</p>
            </div>
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-8 text-center hover:border-amber-400/30 transition-colors">
              <div className="w-16 h-16 bg-amber-400/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">💡</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Continuous Learning</h3>
              <p className="text-neutral-400">We invest in our team's growth with ongoing training and certification opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="bg-neutral-950 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-amber-400/10 to-amber-600/5 border border-amber-400/20 rounded-3xl p-12 md:p-16 overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-[100px]" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Want to Be Part of Our Story?
              </h2>
              <p className="text-lg text-neutral-400 mb-8 max-w-2xl mx-auto">
                We're always looking for talented individuals who share our passion for innovation 
                and excellence. Join the Sgital family today!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  asChild
                  className="bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold px-8 py-6 group"
                >
                  <Link to="/contact">
                    Get in Touch
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-neutral-600 text-white hover:bg-neutral-800 px-8 py-6"
                >
                  <Link to="/about">
                    Learn About Us
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LifeAtSgitalPage;
