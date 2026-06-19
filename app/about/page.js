import AboutPage from '@/components/pages/AboutPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: '/about',
  title: 'About Sgital | ServiceNow Premier Partner in Singapore, Bengaluru & Jodhpur',
  description:
    'Sgital is 100% focused on ServiceNow — Premier Partner for Consulting & Implementation, Reseller, Build and Authorized Training partner, Partner Advisory Council member. 60+ certified consultants, 80+ projects, 1,500+ workflows delivered.',
});

export default function Page() {
  return <AboutPage />;
}
