import { Suspense } from 'react';
import SolutionsPage from '@/components/pages/SolutionsPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: '/solutions',
  title: 'ServiceNow Solutions | ITSM, ITOM, HRSD, CSM, IRM, AI Control Tower',
  description:
    'Complete portfolio of ServiceNow solutions across AI Workflows, Technology, Employee, Customer, Security & Risk, and Creator Workflows.',
});

export default function Page() {
  return (
    <Suspense fallback={null}>
      <SolutionsPage />
    </Suspense>
  );
}
