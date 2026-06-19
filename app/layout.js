import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import ScrollToTop from '@/components/sections/ScrollToTop';
import { organizationSchema, JsonLd, SITE_URL, DEFAULT_OG_IMAGE } from '@/lib/seo';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Sgital | ServiceNow Premier Partner for Enterprise AI Workflows',
    template: '%s | Sgital',
  },
  description:
    'Sgital is a ServiceNow Premier Partner delivering AI-powered enterprise workflows across Singapore, Australia, India and the UK. GoAI 2.0 framework available on the ServiceNow Store.',
  keywords:
    'ServiceNow Premier Partner, enterprise AI workflows, ServiceNow Partner Singapore, ServiceNow Partner Australia, ServiceNow Partner India, NowAssist, GoAI 2.0, enterprise automation, digital transformation, ASEAN ServiceNow consulting',
  icons: { icon: '/favicon.png' },
  alternates: { canonical: SITE_URL + '/' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Sgital',
    title: 'Sgital | ServiceNow Premier Partner for Enterprise AI Workflows',
    description:
      'ServiceNow Premier Partner delivering AI-powered enterprise workflows globally. Operationalize AI with GoAI 2.0.',
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'Sgital' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sgital | ServiceNow Premier Partner for Enterprise AI Workflows',
    description: 'ServiceNow Premier Partner delivering AI-powered enterprise workflows globally — powered by GoAI 2.0.',
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <JsonLd data={organizationSchema} />
      </head>
      <body className="bg-neutral-950 min-h-screen">
        <ScrollToTop />
        <Toaster position="top-right" richColors />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
