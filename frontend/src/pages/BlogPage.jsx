import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData';

const BlogPage = () => {
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <>
      <Helmet>
        <title>Sgital Blog | ServiceNow & AI Workflow Insights</title>
        <meta name="description" content="The latest ServiceNow announcements, NowAssist guidance, and AI workflow best practices from Sgital's team in Singapore, Australia and India." />
        <meta name="keywords" content="ServiceNow blog Singapore, NowAssist insights, AI workflows guide, ServiceNow Knowledge updates, Xanadu release notes, ServiceNow Partner blog" />
        {/* Canonical points to /our-blog to avoid duplicate content */}
        <link rel="canonical" href="https://www.sgital.com/our-blog" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.sgital.com/our-blog" />
        <meta property="og:title" content="Sgital Blog — ServiceNow & AI Workflow Insights" />
        <meta property="og:description" content="ServiceNow announcements, NowAssist guidance, and AI workflow best practices from Sgital." />
        <meta property="og:image" content="https://www.sgital.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

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
                <Link to="/contact">Get a Proposal</Link>
              </Button>
              <Button asChild variant="outline" className="border-neutral-700 text-white hover:bg-neutral-800 px-6 py-5">
                <Link to="/goai">Learn About GoAI 2.0</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {featuredPost && (
        <section className="bg-neutral-950 py-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Link to={`/our-blog/${featuredPost.slug}`} className="block group">
              <div className="relative bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden hover:border-amber-400/30 transition-all">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative h-64 lg:h-auto overflow-hidden">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-neutral-950/50 lg:block hidden" />
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
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-amber-400 transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-neutral-400 leading-relaxed mb-6">{featuredPost.description}</p>
                    <div className="inline-flex items-center gap-2 text-amber-400 font-medium group-hover:gap-3 transition-all">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </div>
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
                  data-testid={`blog-card-${post.slug}`}
                  className="bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden hover:border-amber-400/30 transition-all group"
                >
                  <Link to={`/our-blog/${post.slug}`} className="block relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-transparent" />
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
                      className="inline-flex items-center gap-2 text-amber-400 text-sm font-medium hover:text-amber-300 transition-colors group/btn"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-neutral-900 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-amber-400/10 to-amber-600/5 border border-amber-400/20 rounded-3xl p-12 md:p-16 overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-[100px]" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Stay Updated with Our Latest Insights
              </h2>
              <p className="text-lg text-neutral-400 mb-8 max-w-2xl mx-auto">
                Want to learn more about how AI and automation can transform your enterprise workflows?
                Get in touch with our experts.
              </p>
              <Button
                asChild
                className="bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold px-8 py-6 group"
              >
                <Link to="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
