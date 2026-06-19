import LifeAtSgitalPage from '@/components/pages/LifeAtSgitalPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: '/life-at-sgital',
  title: 'Life at Sgital | Culture, Team & Photo Gallery — ServiceNow Partner',
  description:
    'Where innovation meets culture. 60+ team members across Singapore and India delivering ServiceNow excellence.',
});

export default function Page() {
  return <LifeAtSgitalPage />;
}
