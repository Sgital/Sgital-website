import CareersPage from '@/components/pages/CareersPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: '/careers',
  title: 'Careers at Sgital | ServiceNow Jobs in Singapore & India',
  description:
    'Join a 100% ServiceNow-focused team. Roles for developers, architects, consultants and trainers across Singapore, Bengaluru and Jodhpur.',
});

export default function Page() {
  return <CareersPage />;
}
