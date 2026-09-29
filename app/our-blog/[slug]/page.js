import { notFound } from 'next/navigation';
import BlogDetailPage from '@/components/pages/BlogDetailPage';
import { blogPosts, getBlogBySlug, usesBrandedCover } from '@/lib/data/blogData';
import { pageMetadata, articleSchema, breadcrumbSchema, JsonLd, SITE_URL, DEFAULT_OG_IMAGE } from '@/lib/seo';

export async function generateStaticParams() {
  return (blogPosts || []).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = getBlogBySlug(params.slug);
  if (!post) {
    return {
      title: 'Article Not Found',
      robots: { index: false, follow: false },
      alternates: { canonical: `${SITE_URL}/our-blog` },
    };
  }
  const isoDate = post.date ? new Date(post.date).toISOString() : undefined;
  // NOTE: do not append "| Sgital" here — the layout title template adds it.
  return pageMetadata({
    path: `/our-blog/${post.slug}`,
    title: post.title,
    description: post.description || post.excerpt || post.title,
    ogImage: usesBrandedCover(post) ? DEFAULT_OG_IMAGE : (post.image || DEFAULT_OG_IMAGE),
    ogType: 'article',
    extraOg: {
      type: 'article',
      publishedTime: isoDate,
      authors: [post.author || 'Sgital'],
    },
  });
}

export default function Page({ params }) {
  const post = getBlogBySlug(params.slug);
  if (!post) notFound();
  const crumbs = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/our-blog' },
    { name: post.title, path: `/our-blog/${post.slug}` },
  ]);
  return (
    <>
      <JsonLd data={articleSchema(post)} />
      <JsonLd data={crumbs} />
      <BlogDetailPage />
    </>
  );
}
