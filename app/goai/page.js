import GoAIPage from '@/components/pages/GoAIPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: '/goai',
  title: 'GoAI 2.0 | ServiceNow AI Implementation Framework | Sgital',
  description:
    "Sgital's proven 4-phase methodology — Readiness, MVP, Roll-out, Optimization — for AI-powered ServiceNow workflows. Available on the ServiceNow Store.",
});

export default function Page() {
  return <GoAIPage />;
}
