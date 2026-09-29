import ContactPage from '@/components/pages/ContactPage';
import { pageMetadata, localBusinessGraph, JsonLd } from '@/lib/seo';

export const metadata = pageMetadata({
  path: '/contact',
  title: 'Contact Sgital | ServiceNow Consulting in Singapore, Bengaluru & Jodhpur',
  keywords:
    'contact Sgital, ServiceNow consulting Singapore, ServiceNow partner Bengaluru, ServiceNow partner Jodhpur, book ServiceNow consultation, Claude consulting',
  description:
    'Get in touch — Sgital responds within 24 hours. Offices in Singapore, Bengaluru and Jodhpur. Book a free consultation or GoAI 2.0 readiness assessment.',
});

export default function Page() {
  return (
    <>
      <JsonLd data={localBusinessGraph} />
      <ContactPage />
    </>
  );
}
