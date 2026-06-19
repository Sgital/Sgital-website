import HomePage from '@/components/pages/HomePage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: '/',
  title: 'Sgital | ServiceNow Premier Partner for Enterprise AI Workflows',
  description:
    'Sgital is a ServiceNow Premier Partner delivering AI-powered enterprise workflows across Singapore, Australia, India and the UK. GoAI 2.0 framework available on the ServiceNow Store.',
});

export default function Page() {
  return <HomePage />;
}
