import EventKLPage from '@/components/pages/EventKLPage';
import { SITE_URL } from '@/lib/seo';

export const metadata = {
  title: { absolute: 'Autonomous Governance Executive Lunch | Kuala Lumpur | Sgital' },
  description:
    'An invitation-only executive lunch in Kuala Lumpur for CIOs, CROs and CISOs on autonomous risk and AI governance with ServiceNow, hosted by Sgital.',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/events/kl-risk-ai-governance` },
};

export default function Page() {
  return <EventKLPage />;
}
