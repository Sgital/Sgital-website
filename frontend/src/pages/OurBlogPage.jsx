import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, Search } from 'lucide-react';
import { Button } from '../components/ui/button';
import { blogPosts } from '../data/blogData';

const OurBlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = useMemo(
    () => ['all', ...Array.from(new Set(blogPosts.map((p) => p.category))).filter(Boolean)],
    []
  );

  const filteredPosts = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return blogPosts.filter((post) => {
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        (post.description || '').toLowerCase().includes(q);
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const featuredPost = filteredPosts[0];
  const otherPosts = filteredPosts.slice(1);

  return (
    <>
      <Helmet>
        <title>Our Blog | Insights & Updates - Sgital</title>
        <meta name="description" content="Unveiling Digital Insights, Innovations, and Industry Best Practices. Explore SGITAL's blog for the latest in ServiceNow, AI workflows, and digital transformation." />
        <meta name="keywords" content="ServiceNow blog, digital transformation insights, AI workflows, enterprise automation, SGITAL updates" />
        <link rel="canonical" href="https://sgital.com/our-blog" />
      </Helmet>

      {/* Hero */}
      <section className="bg-neutral-950 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/20 rounded-full mb-6">
              <span className="text-amber-400 text-sm font-medium">SGITAL BLOG</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Unveiling Digital <span className="text-amber-400">Insights</span>
            </h1>
            <p className="text-lg text-neutral-400 leading-relaxed mb-8">
              Innovations and Industry Best Practices
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold px-6 py-5">
                <Link to="/contact">Get a Proposal</Link>
              </Button>
              <Button asChild variant="outline" className="border-neutral-700 text-white hover:bg-neutral-800 px-6 py-5">
                <Link to="/goai">Learn About GoAI 2.0</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-neutral-950 py-8 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-amber-400 text-neutral-950'
                      : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800'
                  }`}
                >
                  {cat === 'all' ? 'All' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {featuredPost && (
        <section className="bg-neutral-950 py-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Link to={`/our-blog/${featuredPost.slug}`} className="block group">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden hover:border-amber-400/30 transition-all grid lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-amber-400/10 text-amber-400 text-xs font-medium rounded-full">
                      Featured
                    </span>
                    <div className="flex items-center gap-2 text-neutral-500 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{featuredPost.date}</span>
                    </div>
                    {featuredPost.readTime && (
                      <div className="flex items-center gap-2 text-neutral-500 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    )}
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-amber-400 transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-neutral-400 leading-relaxed mb-6">{featuredPost.description}</p>
                  <div className="inline-flex items-center gap-2 text-amber-400 font-medium group-hover:gap-3 transition-all">
                    Read Article
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {otherPosts.length > 0 && (
        <section className="bg-neutral-950 py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherPosts.map((post) => (
                <article
                  key={post.id}
                  data-testid={`our-blog-card-${post.slug}`}
                  className="bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden hover:border-amber-400/30 transition-all group"
                >
                  <Link to={`/our-blog/${post.slug}`} className="block relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-neutral-950/80 text-amber-400 text-xs font-medium rounded-full backdrop-blur-sm">
                      {post.category}
                    </span>
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-neutral-500 text-sm mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <Link to={`/our-blog/${post.slug}`}>
                      <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-amber-400 transition-colors">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.description}
                    </p>
                    <Link
                      to={`/our-blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-amber-400 text-sm font-medium hover:text-amber-300 transition-colors"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {filteredPosts.length === 0 && (
        <section className="bg-neutral-950 py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <p className="text-neutral-400">No articles match your filters.</p>
          </div>
        </section>
      )}
    </>
  );
};

export default OurBlogPage;
