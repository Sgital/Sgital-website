import SolutionsPage from '@/components/pages/SolutionsPage';
import { Suspense } from 'react';

export const metadata = {
  title: 'Solutions | Sgital — ServiceNow AI Workflows',
  description: 'Explore Sgital ServiceNow solutions: AI, Technology, Employee, Customer, Security & Risk, and Creator workflows.',
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <SolutionsPage />
    </Suspense>
  );
}
