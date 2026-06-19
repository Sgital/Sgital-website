import AdminApplicationsPage from '@/components/pages/AdminApplicationsPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: '/admin/applications',
  title: 'Admin — Applications | Sgital',
  description: 'Sgital admin dashboard.',
  noindex: true,
});

export default function Page() {
  return <AdminApplicationsPage />;
}
