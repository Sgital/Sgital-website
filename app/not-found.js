import NotFoundPage from '@/components/pages/NotFoundPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: '/404',
  title: 'Page Not Found | Sgital',
  description: 'The page you are looking for does not exist.',
  noindex: true,
});

export default function NotFound() {
  return <NotFoundPage />;
}
