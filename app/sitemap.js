import { blogPosts } from '@/lib/data/blogData';

const SITE = 'https://www.sgital.com';

export default function sitemap() {
  const now = new Date();

  const staticRoutes = [
    { url: '/', changeFrequency: 'weekly', priority: 1.0 },
    { url: '/goai', changeFrequency: 'monthly', priority: 0.9 },
    { url: '/solutions', changeFrequency: 'monthly', priority: 0.9 },
    { url: '/solutions?category=ai', changeFrequency: 'monthly', priority: 0.9 },
    { url: '/solutions?category=technology', changeFrequency: 'monthly', priority: 0.9 },
    { url: '/solutions?category=employee', changeFrequency: 'monthly', priority: 0.9 },
    { url: '/solutions?category=customer', changeFrequency: 'monthly', priority: 0.9 },
    { url: '/solutions?category=security', changeFrequency: 'monthly', priority: 0.9 },
    { url: '/solutions?category=creator', changeFrequency: 'monthly', priority: 0.9 },
    { url: '/case-studies', changeFrequency: 'monthly', priority: 0.8 },
    { url: '/industries', changeFrequency: 'yearly', priority: 0.8 },
    { url: '/about', changeFrequency: 'yearly', priority: 0.8 },
    { url: '/contact', changeFrequency: 'yearly', priority: 0.7 },
    { url: '/our-blog', changeFrequency: 'weekly', priority: 0.7 },
    { url: '/life-at-sgital', changeFrequency: 'yearly', priority: 0.5 },
    { url: '/careers', changeFrequency: 'yearly', priority: 0.5 },
    { url: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
    { url: '/terms', changeFrequency: 'yearly', priority: 0.3 },
  ].map((r) => ({
    url: `${SITE}${r.url}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const blogRoutes = (blogPosts || []).map((post) => {
    let last = now;
    try { if (post.date) last = new Date(post.date); } catch (e) { /* ignore */ }
    return {
      url: `${SITE}/our-blog/${post.slug}`,
      lastModified: last,
      changeFrequency: 'monthly',
      priority: 0.6,
    };
  });

  return [...staticRoutes, ...blogRoutes];
}
