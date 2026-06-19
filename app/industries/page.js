import IndustriesPage from '@/components/pages/IndustriesPage';
import { pageMetadata, breadcrumbSchema, JsonLd } from '@/lib/seo';

export const metadata = pageMetadata({
  path: '/industries',
  title: 'Industries We Serve | ServiceNow Solutions Across 10+ Sectors',
  description:
    'ServiceNow expertise across Financial Services, Manufacturing, Aviation, Media, Energy, Logistics, Technology and more.',
});

const crumbs = breadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Industries', path: '/industries' },
]);

export default function Page() {
  return (
    <>
      <JsonLd data={crumbs} />
      <IndustriesPage />
    </>
  );
}
