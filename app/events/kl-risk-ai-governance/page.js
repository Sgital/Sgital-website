import { notFound } from 'next/navigation';
// NOTE: The KL AI Governance event is cancelled for now. The page is hidden
// (returns 404) and removed from the menu. To bring it back, restore the
// render below (return <EventKLPage />) and re-add the nav link in Header.jsx.
// import EventKLPage from '@/components/pages/EventKLPage';

export const metadata = {
  robots: { index: false, follow: false },
};

export default function Page() {
  notFound();
}
