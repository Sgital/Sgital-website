// Sgital full SEO redirect + header config.
// Apex -> www, 57 legacy WordPress URLs -> modern equivalents, catch-alls.

const SITE_HOST_WWW = 'www.sgital.com';
const SITE_URL_WWW = `https://${SITE_HOST_WWW}`;

const LEGACY_REDIRECTS = [
  // Core pages
  { source: '/home', destination: '/' },
  { source: '/about-us', destination: '/about' },
  { source: '/about-us/', destination: '/about' },
  { source: '/contact-us', destination: '/contact' },
  { source: '/contact-us/', destination: '/contact' },
  { source: '/terms-of-use', destination: '/terms' },
  { source: '/terms-of-use/', destination: '/terms' },
  { source: '/faqs', destination: '/contact' },
  { source: '/faqs/', destination: '/contact' },
  { source: '/madrid', destination: '/' },
  { source: '/madrid/', destination: '/' },
  { source: '/ebook', destination: '/' },
  { source: '/ebook/', destination: '/' },
  { source: '/videos', destination: '/about' },
  { source: '/videos/', destination: '/about' },
  { source: '/join_us', destination: '/life-at-sgital' },
  { source: '/join_us/', destination: '/life-at-sgital' },
  { source: '/join_us/servicenow-developer', destination: '/life-at-sgital' },
  { source: '/join_us/servicenow-developer/', destination: '/life-at-sgital' },

  // GoAI
  { source: '/goai-with-sgital', destination: '/goai' },
  { source: '/goai-with-sgital/', destination: '/goai' },

  // Old solutions (exact deep-links)
  { source: '/we_serve', destination: '/solutions' },
  { source: '/we_serve/', destination: '/solutions' },
  { source: '/servicenow-solutions/itsm', destination: '/solutions?category=technology' },
  { source: '/servicenow-solutions/itsm/', destination: '/solutions?category=technology' },
  { source: '/servicenow-solutions/now-platform-app-engine', destination: '/solutions?category=creator' },
  { source: '/servicenow-solutions/now-platform-app-engine/', destination: '/solutions?category=creator' },
  { source: '/servicenow-solutions/servicenow-trainings', destination: '/solutions?category=creator' },
  { source: '/servicenow-solutions/servicenow-trainings/', destination: '/solutions?category=creator' },
  { source: '/servicenow-solutions/security-operations-integrated-risk-managment', destination: '/solutions?category=security' },
  { source: '/servicenow-solutions/security-operations-integrated-risk-managment/', destination: '/solutions?category=security' },
  { source: '/servicenow-solutions/strategic-portfolio-management-spm', destination: '/solutions?category=technology' },
  { source: '/servicenow-solutions/strategic-portfolio-management-spm/', destination: '/solutions?category=technology' },
  { source: '/servicenow-solutions/hr-service-delivery', destination: '/solutions?category=employee' },
  { source: '/servicenow-solutions/hr-service-delivery/', destination: '/solutions?category=employee' },
  { source: '/servicenow-solutions/customer-service-management', destination: '/solutions?category=customer' },
  { source: '/servicenow-solutions/customer-service-management/', destination: '/solutions?category=customer' },
  { source: '/we_serve/streamline-employee-workflow-services', destination: '/solutions?category=employee' },
  { source: '/we_serve/streamline-employee-workflow-services/', destination: '/solutions?category=employee' },
  { source: '/we_serve/optimize-your-it-workflow-streamlined-solutions-for-enhanced-efficiency', destination: '/solutions?category=technology' },
  { source: '/we_serve/optimize-your-it-workflow-streamlined-solutions-for-enhanced-efficiency/', destination: '/solutions?category=technology' },
  { source: '/we_serve/fortify-your-operations-with-security-and-risk-workflow-management', destination: '/solutions?category=security' },
  { source: '/we_serve/fortify-your-operations-with-security-and-risk-workflow-management/', destination: '/solutions?category=security' },
  { source: '/we_serve/optimize-customer-experience-workflows', destination: '/solutions?category=customer' },
  { source: '/we_serve/optimize-customer-experience-workflows/', destination: '/solutions?category=customer' },

  // Old case studies (specific then catch-all later)
  { source: '/case_studies', destination: '/case-studies' },
  { source: '/case_studies/', destination: '/case-studies' },
  { source: '/case_studies/digital-transformation-and-adoption', destination: '/case-studies' },
  { source: '/case_studies/digital-transformation-and-adoption/', destination: '/case-studies' },
  { source: '/case_studies/air-liquide-digital-transformation-and-adoption', destination: '/case-studies' },
  { source: '/case_studies/air-liquide-digital-transformation-and-adoption/', destination: '/case-studies' },
  { source: '/case_studies/digital-bank-governance-risk-and-compliance', destination: '/case-studies' },
  { source: '/case_studies/digital-bank-governance-risk-and-compliance/', destination: '/case-studies' },
  { source: '/case_studies/digital-bank-it-service-management-for-scalable-operations', destination: '/case-studies' },
  { source: '/case_studies/digital-bank-it-service-management-for-scalable-operations/', destination: '/case-studies' },
  { source: '/case_studies/banking-and-financial-institution-it-service-management-workflows', destination: '/case-studies' },
  { source: '/case_studies/banking-and-financial-institution-it-service-management-workflows/', destination: '/case-studies' },
  { source: '/case_studies/new-zealand-owned-bank-hr-service-delivery-and-compliance', destination: '/case-studies' },
  { source: '/case_studies/new-zealand-owned-bank-hr-service-delivery-and-compliance/', destination: '/case-studies' },
  { source: '/case_studies/multinational-chemical-company-hr-process-automation', destination: '/case-studies' },
  { source: '/case_studies/multinational-chemical-company-hr-process-automation/', destination: '/case-studies' },
  { source: '/case_studies/global-financial-institution-it-cmdb-governance', destination: '/case-studies' },
  { source: '/case_studies/global-financial-institution-it-cmdb-governance/', destination: '/case-studies' },
  { source: '/case_studies/real-estate-strategic-portfolio-management-workflows', destination: '/case-studies' },
  { source: '/case_studies/real-estate-strategic-portfolio-management-workflows/', destination: '/case-studies' },
  { source: '/case_studies/media-group-it-employee-process-workflows', destination: '/case-studies' },
  { source: '/case_studies/media-group-it-employee-process-workflows/', destination: '/case-studies' },
  { source: '/case_studies/small-business-virtual-agent', destination: '/case-studies' },
  { source: '/case_studies/small-business-virtual-agent/', destination: '/case-studies' },
  { source: '/case_studies/big-4-consulting-company-it-process-automation', destination: '/case-studies' },
  { source: '/case_studies/big-4-consulting-company-it-process-automation/', destination: '/case-studies' },
  { source: '/case_studies/global-big-4-consulting-company-asset-management-workflows', destination: '/case-studies' },
  { source: '/case_studies/global-big-4-consulting-company-asset-management-workflows/', destination: '/case-studies' },
  { source: '/case_studies/healthcare-hr-admin-process-automation', destination: '/case-studies' },
  { source: '/case_studies/healthcare-hr-admin-process-automation/', destination: '/case-studies' },
  { source: '/case_studies/payment-services-field-service-automation', destination: '/case-studies' },
  { source: '/case_studies/payment-services-field-service-automation/', destination: '/case-studies' },
  { source: '/case_studies/it-company-vendor-and-contract-management', destination: '/case-studies' },
  { source: '/case_studies/it-company-vendor-and-contract-management/', destination: '/case-studies' },
  { source: '/case-study-making-finance-workflows-digital', destination: '/case-studies' },
  { source: '/case-study-making-finance-workflows-digital/', destination: '/case-studies' },

  // Old blog posts with modern equivalents
  { source: '/sgital-marks-8-years-of-powering-singapores-ai-workflows', destination: '/our-blog/sgital-marks-8-years' },
  { source: '/sgital-marks-8-years-of-powering-singapores-ai-workflows/', destination: '/our-blog/sgital-marks-8-years' },
  // emoji-tail URL: literal + percent-encoded variants
  { source: '/the-the-future-of-customer-service-how-servicenows-xanadu-release-is-transforming-business-operations-🚀', destination: '/our-blog/future-of-customer-service-xanadu' },
  { source: '/the-the-future-of-customer-service-how-servicenows-xanadu-release-is-transforming-business-operations-🚀/', destination: '/our-blog/future-of-customer-service-xanadu' },
  { source: '/the-the-future-of-customer-service-how-servicenows-xanadu-release-is-transforming-business-operations-%F0%9F%9A%80', destination: '/our-blog/future-of-customer-service-xanadu' },
  { source: '/the-the-future-of-customer-service-how-servicenows-xanadu-release-is-transforming-business-operations-%F0%9F%9A%80/', destination: '/our-blog/future-of-customer-service-xanadu' },
  { source: '/sgital-named-success-network-partner-by-servicenow', destination: '/our-blog' },
  { source: '/sgital-named-success-network-partner-by-servicenow/', destination: '/our-blog' },

  // Old blog posts without equivalents
  { source: '/the-world-is-turning-upside-down', destination: '/our-blog' },
  { source: '/the-world-is-turning-upside-down/', destination: '/our-blog' },
  { source: '/the-world-is-turning-upside-down/feed', destination: '/our-blog' },
  { source: '/the-world-is-turning-upside-down/feed/', destination: '/our-blog' },
  { source: '/the-future-of-work-digital-and-human', destination: '/our-blog' },
  { source: '/the-future-of-work-digital-and-human/', destination: '/our-blog' },
  { source: '/digital-literacy-driving-inclusive-growth-and-a-billion-life-transformations', destination: '/our-blog' },
  { source: '/digital-literacy-driving-inclusive-growth-and-a-billion-life-transformations/', destination: '/our-blog' },
  { source: '/3-categories-of-automation-projects-for-the-enterprise', destination: '/our-blog' },
  { source: '/3-categories-of-automation-projects-for-the-enterprise/', destination: '/our-blog' },
  { source: '/inspirations-2017-aspirations-2018', destination: '/our-blog' },
  { source: '/inspirations-2017-aspirations-2018/', destination: '/our-blog' },
  { source: '/sgital-partners-with-walkme-to-enable-faster-user-adoption', destination: '/our-blog' },
  { source: '/sgital-partners-with-walkme-to-enable-faster-user-adoption/', destination: '/our-blog' },
  { source: '/5-key-takeaways-from-servicenow-knowledge-19', destination: '/our-blog' },
  { source: '/5-key-takeaways-from-servicenow-knowledge-19/', destination: '/our-blog' },
  { source: '/7-best-esg-updates-in-servicenow-xanadu', destination: '/our-blog' },
  { source: '/7-best-esg-updates-in-servicenow-xanadu/', destination: '/our-blog' },

  // Pagination
  { source: '/case-studies/page/:page*', destination: '/case-studies' },
  { source: '/blog/page/:page*', destination: '/our-blog' },

  // Catch-alls (after exact rules)
  { source: '/servicenow-solutions/:slug*', destination: '/solutions' },
  { source: '/case_studies/:slug*', destination: '/case-studies' },
  { source: '/we_serve/:slug*', destination: '/solutions' },
  { source: '/join_us/:slug*', destination: '/life-at-sgital' },
  { source: '/blog', destination: '/our-blog' },
  { source: '/blog/', destination: '/our-blog' },
  { source: '/blog/:slug*', destination: '/our-blog/:slug*' },
  { source: '/feed', destination: '/our-blog' },
  { source: '/feed/', destination: '/our-blog' },
].map((r) => ({ ...r, statusCode: 301 }));

const nextConfig = {
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com', pathname: '/**' },
      { protocol: 'https', hostname: 'sgital-website-assets.s3.ap-south-1.amazonaws.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'customer-assets.emergentagent.com', pathname: '/**' },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['mongodb'],
  },
  webpack(config, { dev }) {
    if (dev) {
      config.watchOptions = {
        poll: 2000,
        aggregateTimeout: 300,
        ignored: ['**/node_modules'],
      };
    }
    return config;
  },
  onDemandEntries: {
    maxInactiveAge: 10000,
    pagesBufferLength: 2,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'ALLOWALL' },
          { key: 'Content-Security-Policy', value: 'frame-ancestors *;' },
          { key: 'Access-Control-Allow-Origin', value: process.env.CORS_ORIGINS || '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: '*' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Part 1: apex (sgital.com) -> www.sgital.com, preserving path + query.
      // Next.js matches has[].value as a regex; anchor it so we ONLY match the apex
      // (otherwise 'sgital.com' would substring-match 'www.sgital.com' too).
      {
        source: '/:path*',
        has: [{ type: 'host', value: '^sgital\\.com$' }],
        destination: `${SITE_URL_WWW}/:path*`,
        permanent: true,
        statusCode: 301,
      },
      // Part 2: 57 legacy WordPress URL redirects
      ...LEGACY_REDIRECTS,
    ];
  },
};

module.exports = nextConfig;
