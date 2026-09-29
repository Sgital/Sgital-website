import OurBlogPage from '@/components/pages/OurBlogPage';
import { pageMetadata, breadcrumbSchema, JsonLd } from '@/lib/seo';

export const metadata = pageMetadata({
  path: '/our-blog',
  title: 'Sgital Blog | ServiceNow, NowAssist & AI Workflow Insights',
  keywords:
    'ServiceNow blog, NowAssist insights, AI workflow blog, ServiceNow news, Claude, Anthropic partner, enterprise AI articles, GoAI 2.0',
  description:
    'Insights on ServiceNow releases, GoAI 2.0, AI Control Tower, Now Assist and enterprise AI workflows.',
});

const crumbs = breadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/our-blog' },
]);

export default function Page() {
  return (
    <>
      <JsonLd data={crumbs} />
      <OurBlogPage />
    </>
  );
}
