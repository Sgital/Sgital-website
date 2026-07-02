import CaseStudiesPage from '@/components/pages/CaseStudiesPage';
import { pageMetadata, breadcrumbSchema, JsonLd } from '@/lib/seo';

export const metadata = pageMetadata({
  path: '/case-studies',
  title: 'ServiceNow Implementation Case Studies | Sgital Success Stories',
  description:
    'How Sgital has helped global enterprises transform with ServiceNow — Air Liquide, Razer, SiliconBox, SPH Media, GXBank, Allianz, Resorts World and more.',
});

const crumbs = breadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Case Studies', path: '/case-studies' },
]);

export default function Page() {
  return (
    <>
      <JsonLd data={crumbs} />
      <CaseStudiesPage />
    </>
  );
}
