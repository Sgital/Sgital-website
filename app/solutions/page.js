import SolutionsPage from '@/components/pages/SolutionsPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: '/solutions',
  title: 'ServiceNow Solutions | ITSM, ITOM, HRSD, CSM, IRM, AI Control Tower',
  description:
    'Complete portfolio of ServiceNow solutions across AI Workflows, Technology, Employee, Customer, Security & Risk, and Creator Workflows.',
  keywords:
    'ServiceNow solutions, ITSM, ITOM, HRSD, CSM, IRM, AI Control Tower, NowAssist, AI workflows, employee workflows, customer workflows, security and risk, creator workflows, ServiceNow Singapore',
});

// Map ?category= URL param to the internal category id so the page is
// fully server-rendered (no useSearchParams / client bail-out).
const URLPARAM_TO_CATEGORY = {
  ai: 'AI Workflows',
  technology: 'Technology Workflows',
  employee: 'Employee Workflows',
  customer: 'Customer Workflows',
  security: 'Security & Risk',
  creator: 'Creator Workflows',
};

export default function Page({ searchParams }) {
  const param = searchParams?.category;
  const initialCategory = URLPARAM_TO_CATEGORY[param] || 'all';
  return <SolutionsPage initialCategory={initialCategory} />;
}
