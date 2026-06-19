// Sgital SEO helpers — canonical URLs, page metadata builder, JSON-LD generators.

export const SITE_URL = 'https://www.sgital.com';
export const SITE_NAME = 'Sgital';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
export const DEFAULT_OG_IMAGE_SQUARE = `${SITE_URL}/og-image-square.png`;

/** Build a Next.js Metadata object for a static page. */
export function pageMetadata({
  path,
  title,
  description,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noindex = false,
  extraOg = {},
}) {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: 'en_US',
      type: ogType,
      ...extraOg,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

/** Organization schema injected at the root layout level. */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Sgital Pte. Ltd.',
  alternateName: 'Sgital',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  sameAs: [
    'https://www.linkedin.com/company/sgital',
    'https://www.youtube.com/@Sgital',
    'https://www.servicenow.com/partners/partner-finder/sgital-pte-ltd.html',
  ],
  description:
    'ServiceNow Premier Partner delivering AI-powered enterprise workflows. Reseller, Build and Authorized Training partner; Partner Advisory Council member.',
  foundingDate: '2017',
  numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 60 },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '68 Chestnut Ave, Treehouse',
    addressLocality: 'Singapore',
    postalCode: '679521',
    addressCountry: 'SG',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+65-9810-7986',
      email: 'info@sgital.com',
      contactType: 'sales',
      areaServed: ['SG', 'AU', 'IN', 'GB', 'MY', 'TH', 'NZ', 'JP', 'KR'],
      availableLanguage: ['en'],
    },
  ],
};

/** LocalBusiness graph for /contact page. */
export const localBusinessGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/contact#singapore`,
      name: 'Sgital — Singapore HQ',
      telephone: '+65-9810-7986',
      email: 'info@sgital.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '68 Chestnut Ave, Treehouse',
        addressLocality: 'Singapore',
        postalCode: '679521',
        addressCountry: 'SG',
      },
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/contact#bengaluru`,
      name: 'Sgital — Bengaluru',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '7th Floor, Summit A, Brigade Metropolis, Mahadevapura',
        addressLocality: 'Bengaluru',
        addressRegion: 'Karnataka',
        postalCode: '560048',
        addressCountry: 'IN',
      },
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/contact#jodhpur`,
      name: 'Sgital — Jodhpur',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'A-59, Sector-A, Shastri Nagar',
        addressLocality: 'Jodhpur',
        addressRegion: 'Rajasthan',
        postalCode: '342003',
        addressCountry: 'IN',
      },
    },
  ],
};

/** Article schema for /our-blog/{slug} pages. */
export function articleSchema(post) {
  const slug = post.slug;
  const date = post.date ? new Date(post.date).toISOString() : new Date().toISOString();
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description || post.excerpt || post.title,
    image: post.image || DEFAULT_OG_IMAGE,
    datePublished: date,
    dateModified: post.updatedDate ? new Date(post.updatedDate).toISOString() : date,
    author: { '@type': 'Organization', name: post.author || 'Sgital' },
    publisher: {
      '@type': 'Organization',
      name: 'Sgital Pte. Ltd.',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: `${SITE_URL}/our-blog/${slug}`,
  };
}

/** BreadcrumbList helper. items: [{name, path}] */
export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

/** Reusable JSON-LD <script> element. */
export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
