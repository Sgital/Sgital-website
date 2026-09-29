import CaseStudiesPage from '@/components/pages/CaseStudiesPage';
import { pageMetadata, breadcrumbSchema, JsonLd } from '@/lib/seo';

export const metadata = pageMetadata({
  path: '/case-studies',
  title: 'ServiceNow Implementation Case Studies | Sgital Success Stories',
  keywords:
    'ServiceNow case studies, ServiceNow success stories, ITSM, IRM, SPM, HSRM, NowAssist, AI GenAI case studies, enterprise ServiceNow projects',
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
