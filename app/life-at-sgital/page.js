import LifeAtSgitalPage from '@/components/pages/LifeAtSgitalPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: '/life-at-sgital',
  title: 'Life at Sgital | Culture, Team & Photo Gallery — ServiceNow Partner',
  keywords:
    'life at Sgital, Sgital culture, Sgital team, ServiceNow careers culture, Sgital gallery, ServiceNow partner team',
  description:
    'Where innovation meets culture. 60+ team members across Singapore and India delivering ServiceNow excellence.',
});

export default function Page() {
  return <LifeAtSgitalPage />;
}
