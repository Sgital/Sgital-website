'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { redirect } from 'next/navigation';
import NotFoundPage from '@/components/pages/NotFoundPage';

/**
 * LegacyRedirects
 *
 * Intercepts the catch-all `*` route and redirects legacy WordPress URLs
 * to their modern equivalents. Case-insensitive, trailing-slash agnostic.
 *
 * NOTE: Because this is a client-side React Router redirect, it issues an
 * HTML 200 + JS-rendered `<Navigate replace>` rather than a true HTTP 301.
 * Google's JS-rendering crawler still follows these and consolidates signals
 * via the canonical tag on the destination. For true HTTP 301 status, see
 * the Emergent Support ticket re: ingress-level redirects.
 *
 * If no legacy rule matches, falls through to NotFoundPage (noindex + 404 UI).
 */

// Exact-path matches. Keys MUST be lowercase, no trailing slash.
const EXACT_REDIRECTS = {
  // Core legacy pages
  '/home': '/',
  '/about-us': '/about',
  '/contact-us': '/contact',
  '/terms-of-use': '/terms',
  '/faqs': '/contact',
  '/madrid': '/',
  '/ebook': '/',
  '/videos': '/about',
  '/join_us': '/life-at-sgital',
  '/join_us/servicenow-developer': '/life-at-sgital',

  // GoAI
  '/goai-with-sgital': '/goai',

  // Old solutions (specific deep-links)
  '/we_serve': '/solutions',
  '/servicenow-solutions/itsm': '/solutions?category=technology',
  '/servicenow-solutions/now-platform-app-engine': '/solutions?category=creator',
  '/servicenow-solutions/servicenow-trainings': '/solutions?category=creator',
  '/servicenow-solutions/security-operations-integrated-risk-managment': '/solutions?category=security',
  '/servicenow-solutions/strategic-portfolio-management-spm': '/solutions?category=technology',
  '/servicenow-solutions/hr-service-delivery': '/solutions?category=employee',
  '/servicenow-solutions/customer-service-management': '/solutions?category=customer',
  '/we_serve/streamline-employee-workflow-services': '/solutions?category=employee',
  '/we_serve/optimize-your-it-workflow-streamlined-solutions-for-enhanced-efficiency': '/solutions?category=technology',
  '/we_serve/fortify-your-operations-with-security-and-risk-workflow-management': '/solutions?category=security',
  '/we_serve/optimize-customer-experience-workflows': '/solutions?category=customer',

  // Old case studies (index + deep links → /case-studies)
  '/case_studies': '/case-studies',
  '/case_studies/digital-transformation-and-adoption': '/case-studies',
  '/case_studies/air-liquide-digital-transformation-and-adoption': '/case-studies',
  '/case_studies/digital-bank-governance-risk-and-compliance': '/case-studies',
  '/case_studies/digital-bank-it-service-management-for-scalable-operations': '/case-studies',
  '/case_studies/banking-and-financial-institution-it-service-management-workflows': '/case-studies',
  '/case_studies/new-zealand-owned-bank-hr-service-delivery-and-compliance': '/case-studies',
  '/case_studies/multinational-chemical-company-hr-process-automation': '/case-studies',
  '/case_studies/global-financial-institution-it-cmdb-governance': '/case-studies',
  '/case_studies/real-estate-strategic-portfolio-management-workflows': '/case-studies',
  '/case_studies/media-group-it-employee-process-workflows': '/case-studies',
  '/case_studies/small-business-virtual-agent': '/case-studies',
  '/case_studies/big-4-consulting-company-it-process-automation': '/case-studies',
  '/case_studies/global-big-4-consulting-company-asset-management-workflows': '/case-studies',
  '/case_studies/healthcare-hr-admin-process-automation': '/case-studies',
  '/case_studies/payment-services-field-service-automation': '/case-studies',
  '/case_studies/it-company-vendor-and-contract-management': '/case-studies',
  '/case-study-making-finance-workflows-digital': '/case-studies',

  // Old blog posts with modern equivalents
  '/sgital-marks-8-years-of-powering-singapores-ai-workflows': '/our-blog/sgital-marks-8-years',
  '/the-the-future-of-customer-service-how-servicenows-xanadu-release-is-transforming-business-operations-🚀': '/our-blog/future-of-customer-service-xanadu',
  '/sgital-named-success-network-partner-by-servicenow': '/our-blog/sgital-success-network-partner',

  // Old blog posts without modern equivalents → blog index
  '/the-world-is-turning-upside-down': '/our-blog',
  '/the-future-of-work-digital-and-human': '/our-blog',
  '/digital-literacy-driving-inclusive-growth-and-a-billion-life-transformations': '/our-blog',
  '/3-categories-of-automation-projects-for-the-enterprise': '/our-blog',
  '/inspirations-2017-aspirations-2018': '/our-blog',
  '/sgital-partners-with-walkme-to-enable-faster-user-adoption': '/our-blog',
  '/5-key-takeaways-from-servicenow-knowledge-19': '/our-blog',
  '/7-best-esg-updates-in-servicenow-xanadu': '/our-blog',

  // Standalone feeds
  '/feed': '/our-blog',
  '/the-world-is-turning-upside-down/feed': '/our-blog',
};

// Prefix matches (evaluated after exact matches fail). Order matters — first match wins.
// Each `prefix` MUST be lowercase. Match is `pathname === prefix || pathname.startsWith(prefix + '/')`.
const PREFIX_REDIRECTS = [
  { prefix: '/case-studies/page', target: '/case-studies' },     // /case-studies/page/2/ etc.
  { prefix: '/blog/page', target: '/our-blog' },                  // /blog/page/2/ etc.
  { prefix: '/servicenow-solutions', target: '/solutions' },
  { prefix: '/case_studies', target: '/case-studies' },
  { prefix: '/we_serve', target: '/solutions' },
  { prefix: '/join_us', target: '/life-at-sgital' },
  { prefix: '/blog', target: '/our-blog' },
];

const normalizePath = (pathname) => {
  if (!pathname) return '/';
  let p = pathname.toLowerCase();
  // Strip trailing slashes (except root)
  p = p.replace(/\/+$/, '');
  return p === '' ? '/' : p;
};

const LegacyRedirects = () => {
  const pathname = usePathname();
  const path = normalizePath(pathname);

  // 1. Exact match — preserve nothing from search (legacy URLs never had meaningful query strings)
  if (EXACT_REDIRECTS[path]) {
    redirect(EXACT_REDIRECTS[path]);
  }

  // 2. Prefix match
  for (const { prefix, target } of PREFIX_REDIRECTS) {
    if (path === prefix || path.startsWith(`${prefix}/`)) {
      redirect(target);
    }
  }

  // 3. No legacy rule — render 404 (noindex + soft 404 UI)
  return <NotFoundPage />;
};

export default LegacyRedirects;
