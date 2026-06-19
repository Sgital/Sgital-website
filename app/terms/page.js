import TermsOfServicePage from '@/components/pages/TermsOfServicePage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: '/terms',
  title: 'Terms of Service',
  description: 'Terms governing the use of sgital.com.',
});

export default function Page() {
  return <TermsOfServicePage />;
}
