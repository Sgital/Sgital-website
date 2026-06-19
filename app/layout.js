import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import ScrollToTop from '@/components/sections/ScrollToTop';

export const metadata = {
  title: 'Sgital | ServiceNow Premier Partner for Enterprise AI Workflows',
  description: 'Sgital is a ServiceNow Premier Partner delivering enterprise AI workflows globally. Operationalize AI with GoAI 2.0 — measurable outcomes in weeks, backed by 60+ certified consultants across Singapore, Australia, India and ASEAN.',
  keywords: 'ServiceNow Premier Partner, enterprise AI workflows, ServiceNow Partner Singapore, ServiceNow Partner Australia, ServiceNow Partner India, NowAssist, GoAI 2.0, enterprise automation, digital transformation, ASEAN ServiceNow consulting',
  icons: { icon: '/favicon.png' },
  openGraph: {
    type: 'website',
    url: 'https://www.sgital.com/',
    title: 'Sgital | ServiceNow Premier Partner for Enterprise AI Workflows',
    description: 'ServiceNow Premier Partner delivering enterprise AI workflows globally. Operationalize AI with GoAI 2.0.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sgital | ServiceNow Premier Partner for Enterprise AI Workflows',
    description: 'ServiceNow Premier Partner delivering enterprise AI workflows globally — powered by GoAI 2.0.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
