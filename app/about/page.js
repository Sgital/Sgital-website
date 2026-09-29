import AboutPage from '@/components/pages/AboutPage';
import { pageMetadata, breadcrumbSchema, JsonLd, SITE_URL } from '@/lib/seo';
import { founder } from '@/lib/data/mock';

export const metadata = pageMetadata({
  path: '/about',
  title: 'About Sgital | ServiceNow Premier Partner in Singapore, Bengaluru & Jodhpur',
  description:
    'Sgital is 100% focused on ServiceNow — Premier Partner for Consulting & Implementation, Reseller, Build and Authorized Training partner, Partner Advisory Council member. 60+ certified consultants, 40+ enterprise customers, 2,000+ AI workflows delivered.',
});

const crumbs = breadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
]);

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: founder.name,
  jobTitle: 'Founder & CEO',
  worksFor: { '@type': 'Organization', name: 'Sgital Pte. Ltd.' },
  url: `${SITE_URL}/about`,
  sameAs: [founder.linkedin],
  image: founder.photoUrl || undefined,
  description:
    'Founder and CEO of Sgital, a ServiceNow Premier Partner headquartered in Singapore.',
};

export default function Page() {
  return (
    <>
      <JsonLd data={crumbs} />
      <JsonLd data={personSchema} />
      <AboutPage />
    </>
  );
}
