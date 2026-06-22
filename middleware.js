// Edge middleware: canonical host enforcement (apex -> www).
//
// Runs BEFORE next.config.js redirects on every request that reaches the origin.
// Sets a SHORT cache lifetime on the 301 so a stale redirect can never get
// poisoned into the edge cache for a year again.

import { NextResponse } from 'next/server';

const APEX_HOST = 'sgital.com';
const WWW_HOST = 'www.sgital.com';

export function middleware(request) {
  // request.headers.get('host') returns "sgital.com" or "www.sgital.com" (case-insensitive lowercased by HTTP/2).
  const host = (request.headers.get('host') || '').toLowerCase().split(':')[0];

  if (host === APEX_HOST) {
    const url = new URL(request.url);
    url.host = WWW_HOST;
    url.protocol = 'https:';
    url.port = '';
    const res = NextResponse.redirect(url.toString(), 301);
    // Keep redirects cacheable for only 1 hour so future direction flips propagate fast.
    res.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    res.headers.set('X-Canonical-Redirect', 'apex-to-www');
    return res;
  }

  return NextResponse.next();
}

// Exclude static assets, Next.js internals, the API surface, and sitemap/robots
// from middleware to keep cold-start latency low. The apex->www rule still fires
// at the framework's redirects() layer as a backup for those paths.
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|_next/data|favicon.ico|logos|api|sitemap.xml|robots.txt).*)',
  ],
};
