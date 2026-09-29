'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getBlogBySlug, getRelatedPosts, blogPosts, usesBrandedCover } from '@/lib/data/blogData';
import BrandedCover from '@/components/sections/BrandedCover';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const router = useRouter();
  const navigate = (path) => router.push(path);
  const post = getBlogBySlug(slug);

  if (!post) {
    return (
      <>
        
        <div className="bg-neutral-950 min-h-screen pt-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center py-24">
            <h1 className="text-4xl font-bold text-white mb-4">Article Not Found</h1>
            <p className="text-neutral-400 mb-8">The article you're looking for doesn't exist.</p>
            <Button asChild className="bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold">
              <Link href="/our-blog">Back to Blog</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }

  const relatedPosts = getRelatedPosts(slug, post.category, 3);
  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  return (
    <>
      

      {/* Hero Image */}
      <section className="bg-neutral-950 pt-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <button
            onClick={() => navigate('/our-blog')}
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </button>

          <div className="relative h-64 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden mb-8">
            {usesBrandedCover(post) ? (
              <BrandedCover title={post.title} category={post.category} titleClassName="text-2xl md:text-4xl max-w-3xl" />
            ) : (
              <>
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-amber-400 text-neutral-950 text-sm font-semibold rounded-full">
                    {post.category}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Article */}
      <section className="bg-neutral-950 pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4 text-neutral-500 text-sm mb-6">
            {post.date && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
            )}
            {post.readTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            )}
            {post.author && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              <span>{post.category}</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-neutral-400 mb-12 leading-relaxed">{post.description}</p>

          <article
            className="prose prose-invert prose-lg max-w-none
              prose-headings:text-white prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-neutral-300 prose-p:leading-relaxed prose-p:mb-6
              prose-ul:text-neutral-300 prose-ul:my-6
              prose-li:mb-2
              prose-strong:text-white
              prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-16 pt-8 border-t border-neutral-800">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="text-neutral-500 text-sm">Share this article</span>
                <div className="flex gap-3 mt-2">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://www.sgital.com/our-blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-lg text-sm hover:bg-neutral-700 transition-colors"
                  >
                    Twitter
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://www.sgital.com/our-blog/${post.slug}`)}&title=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-lg text-sm hover:bg-neutral-700 transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
              <Button asChild className="bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Prev / Next */}
      {(prevPost || nextPost) && (
        <section className="bg-neutral-900 py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6">
              {prevPost ? (
                <Link
                  href={`/our-blog/${prevPost.slug}`}
                  className="bg-neutral-950 border border-neutral-800 rounded-xl p-6 hover:border-amber-400/30 transition-all group"
                >
                  <div className="flex items-center gap-2 text-neutral-500 text-sm mb-2">
                    <ArrowLeft className="w-4 h-4" />
                    Previous Article
                  </div>
                  <h3 className="text-white font-semibold group-hover:text-amber-400 transition-colors line-clamp-2">
                    {prevPost.title}
                  </h3>
                </Link>
              ) : (
                <div />
              )}
              {nextPost && (
                <Link
                  href={`/our-blog/${nextPost.slug}`}
                  className="bg-neutral-950 border border-neutral-800 rounded-xl p-6 hover:border-amber-400/30 transition-all group text-right"
                >
                  <div className="flex items-center justify-end gap-2 text-neutral-500 text-sm mb-2">
                    Next Article
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <h3 className="text-white font-semibold group-hover:text-amber-400 transition-colors line-clamp-2">
                    {nextPost.title}
                  </h3>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      {relatedPosts.length > 0 && (
        <section className="bg-neutral-950 py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              Related <span className="text-amber-400">Articles</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((r) => (
                <article
                  key={r.id}
                  className="bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden hover:border-amber-400/30 transition-all group"
                >
                  <Link href={`/our-blog/${r.slug}`} className="block relative h-48 overflow-hidden">
                    {usesBrandedCover(r) ? (
                      <BrandedCover title={r.title} category={r.category} titleClassName="text-base" />
                    ) : (
                      <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    )}
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-neutral-500 text-sm mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{r.date}</span>
                    </div>
                    <Link href={`/our-blog/${r.slug}`}>
                      <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-amber-400 transition-colors">
                        {r.title}
                      </h3>
                    </Link>
                    <Link href={`/our-blog/${r.slug}`} className="inline-flex items-center gap-2 text-amber-400 text-sm font-medium">
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

      {/* CTA */}
      <section className="bg-neutral-900 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Transform Your Workflows?</h2>
          <p className="text-neutral-400 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help your organization achieve operational excellence with AI-powered automation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold px-8 py-6 group">
              <Link href="/contact">
                Contact Us
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-neutral-700 text-white hover:bg-neutral-800 px-8 py-6">
              <Link href="/our-blog">View All Articles</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetailPage;
