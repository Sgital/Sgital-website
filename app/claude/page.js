import ClaudePage from '@/components/pages/ClaudePage';
import { pageMetadata, breadcrumbSchema, JsonLd } from '@/lib/seo';

const baseMeta = pageMetadata({
  path: '/claude',
  title: 'Claude Services | Anthropic Claude Partner | Sgital',
  description:
    'Sgital helps enterprises design, build and run Claude in production — from a 2–3 week Claude Readiness Sprint to enterprise rollout, custom agents, Claude on ServiceNow and managed AI operations. Member of the Claude Partner Network.',
});

// Render the exact requested title (bypass the layout "%s | Sgital" template,
// since this title already ends with "| Sgital").
export const metadata = {
  ...baseMeta,
  title: { absolute: 'Claude Services | Anthropic Claude Partner | Sgital' },
};

const crumbs = breadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Claude', path: '/claude' },
]);

export default function Page() {
  return (
    <>
      <JsonLd data={crumbs} />
      <ClaudePage />
    </>
  );
}
