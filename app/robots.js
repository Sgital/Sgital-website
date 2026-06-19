export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: [
          '/admin/',
          '/api/',
          '/wp-admin/',
          '/wp-content/',
          '/wp-includes/',
          '/wp-json/',
          '/xmlrpc.php',
          '/*.php$',
          '/feed/',
          '/*/feed/',
          '/author/',
          '/category/',
          '/tag/',
        ],
      },
    ],
    sitemap: 'https://www.sgital.com/sitemap.xml',
    host: 'https://www.sgital.com',
  };
}
