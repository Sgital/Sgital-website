import PrivacyPolicyPage from '@/components/pages/PrivacyPolicyPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: '/privacy',
  title: 'Privacy Policy',
  keywords: 'Sgital privacy policy, data protection, privacy, GDPR',
  description: 'How Sgital collects, uses and protects your information.',
});

export default function Page() {
  return <PrivacyPolicyPage />;
}
