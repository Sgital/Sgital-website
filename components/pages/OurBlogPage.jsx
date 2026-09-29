'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { blogPosts, usesBrandedCover } from '@/lib/data/blogData';
import BrandedCover from '@/components/sections/BrandedCover';

// Shared blog card (uses a branded cover for 2019–2025 stock-image posts).
const BlogCard = ({ post }) => {
  const branded = usesBrandedCover(post);
  return (
    <article
      data-testid={`our-blog-card-${post.slug}`}
      className="bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden hover:border-amber-400/30 transition-all group flex flex-col"
    >
      <Link href={`/our-blog/${post.slug}`} className="block relative h-48 overflow-hidden">
        {branded ? (
          <BrandedCover title={post.title} category={post.category} titleClassName="text-base" />
        ) : (
          <>
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <span className="absolute top-4 left-4 px-3 py-1 bg-neutral-950/80 text-amber-400 text-xs font-medium rounded-full backdrop-blur-sm">
              {post.category}
            </span>
          </>
        )}
      </Link>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 text-neutral-500 text-sm mb-3">
          <Calendar className="w-4 h-4" />
          <span>{post.date}</span>
        </div>
        <Link href={`/our-blog/${post.slug}`}>
          <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-amber-400 transition-colors">
            {post.title}
          </h3>
        </Link>
        <p className="text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-3">{post.description}</p>
        <Link
          href={`/our-blog/${post.slug}`}
          className="mt-auto inline-flex items-center gap-2 text-amber-400 text-sm font-medium hover:text-amber-300 transition-colors"
        >
          Read More
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
};

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

  // Newest first.
  const sorted = useMemo(
    () => [...filteredPosts].sort((a, b) => new Date(b.date) - new Date(a.date)),
    [filteredPosts]
  );

  const isDefaultView = selectedCategory === 'all' && !searchTerm.trim();
  const latest = isDefaultView ? sorted.slice(0, 3) : [];
  const archive = isDefaultView ? sorted.slice(3) : sorted;

  return (
    <>
      {/* Hero */}
      <section className="bg-neutral-950 pt-40 pb-16">
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
                <Link href="/contact">Get a Proposal</Link>
              </Button>
              <Button asChild variant="outline" className="border-neutral-700 text-white hover:bg-neutral-800 px-6 py-5">
                <Link href="/goai">Learn About GoAI 2.0</Link>
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

      {/* Latest (default view only) */}
      {isDefaultView && latest.length > 0 && (
        <section className="bg-neutral-950 pt-12 pb-4">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-2xl font-bold text-white">Latest</h2>
              <span className="h-px flex-1 bg-neutral-800" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latest.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Archive / Results */}
      {archive.length > 0 && (
        <section className="bg-neutral-950 py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-2xl font-bold text-white">
                {isDefaultView ? 'Archive' : `${archive.length} ${archive.length === 1 ? 'Result' : 'Results'}`}
              </h2>
              <span className="h-px flex-1 bg-neutral-800" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {archive.map((post) => (
                <BlogCard key={post.id} post={post} />
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
