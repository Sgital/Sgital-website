import ServiceNowManagedServicesPage from '@/components/pages/ServiceNowManagedServicesPage';
import { SITE_URL, JsonLd } from '@/lib/seo';

const DESC = "Go-live is just the beginning. Sgital's ServiceNow managed services give you a subscription team for post go-live support, upgrades, enhancements and platform administration.";

export const metadata = {
  title: { absolute: 'ServiceNow Managed Services | Digital Workflows as a Service (DWaaS) | Sgital' },
  description: DESC,
  keywords: 'ServiceNow managed services, ServiceNow support services, ServiceNow application management, AMS, post go-live support, ServiceNow hypercare, ServiceNow platform administration, ServiceNow upgrade services, DWaaS, ServiceNow managed service provider Singapore',
  alternates: { canonical: `${SITE_URL}/servicenow-managed-services` },
  openGraph: {
    title: 'ServiceNow Managed Services — Go-live is just the beginning',
    description: DESC,
    url: `${SITE_URL}/servicenow-managed-services`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ServiceNow Managed Services — Go-live is just the beginning',
    description: DESC,
  },
};

const faqs = [
  ['How is DWaaS different from a dedicated resource?', 'You get access to a whole team of skills instead of one person, and you only commit to the credits you need.'],
  ['Do all experts use credits at the same rate?', 'No. A consultant hour uses 1 credit, a senior consultant hour 2 and a solution architect hour 3. We match each task to the lowest level that can do it well, so your credits go further.'],
  ['Can I change plans?', 'Yes. Move up or down as your demand changes.'],
  ['How long is the commitment?', 'Plans run for 6 or 12 months. We review your plan every quarter in the first year so it keeps matching demand.'],
  ['What happens to unused credits?', 'They roll forward and stay available for three months, or can go towards an agreed project.'],
  ['Do you work with our existing admin team?', 'Yes. DWaaS is designed to extend your in-house team, not replace it.'],
  ['Which ServiceNow modules do you support?', 'ITSM, ITOM, ITAM, HRSD, CSM, SPM, GRC, SecOps, Finance and custom App Engine applications.'],
  ['Can you help us adopt Now Assist and AI agents?', 'Yes. AI readiness is part of every plan, and GoAI 2.0 covers full adoption programmes.'],
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'ServiceNow Managed Services (Digital Workflows as a Service)',
  serviceType: 'ServiceNow Managed Services',
  provider: {
    '@type': 'Organization',
    name: 'Sgital',
    url: SITE_URL,
  },
  areaServed: ['Singapore', 'Malaysia', 'India', 'Australia', 'New Zealand', 'United Kingdom'],
  url: `${SITE_URL}/servicenow-managed-services`,
  description: DESC,
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(([q, a]) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

export default function Page() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <ServiceNowManagedServicesPage />
    </>
  );
}
