import PrivacyPolicyPage from '@/components/pages/PrivacyPolicyPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: '/privacy',
  title: 'Privacy Policy',
  description: 'How Sgital collects, uses and protects your information.',
});

export default function Page() {
  return <PrivacyPolicyPage />;
}
