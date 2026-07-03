// Edge middleware: canonical host enforcement (apex sgital.com -> www.sgital.com).
//
// Runs BEFORE next.config.js redirects on every request that reaches the origin.
// Because CDN/ingress layers (Cloudflare + Emergent) may rewrite the Host header
// before it reaches the Next.js server, this middleware inspects multiple
// possible sources for the "original request host":
//   1) x-forwarded-host  (typical CDN/proxy header — most reliable)
//   2) x-original-host   (some proxies use this)
//   3) host              (fallback)
//
// A debug header `X-Sgital-Middleware-Host` is added to EVERY non-redirected
// response so we can inspect on production what host the middleware actually saw:
//   curl -sI https://sgital.com/ | grep -i x-sgital

import { NextResponse } from 'next/server';

const APEX_HOSTS = new Set(['sgital.com']);
const WWW_HOST = 'www.sgital.com';

function extractOriginalHost(request) {
  const fwd = request.headers.get('x-forwarded-host');
  const orig = request.headers.get('x-original-host');
  const host = request.headers.get('host');
  // First non-empty wins, then lowercased, port-stripped.
  const raw = fwd || orig || host || '';
  return raw.toLowerCase().split(',')[0].trim().split(':')[0];
}

export function middleware(request) {
  const originalHost = extractOriginalHost(request);

  if (APEX_HOSTS.has(originalHost)) {
    // Build absolute redirect URL — force www + https + preserve path & query.
    // We use pathname + search from request.nextUrl because request.url may
    // reflect an internal proxied URL rather than the user-facing one.
    const dest = `https://${WWW_HOST}${request.nextUrl.pathname}${request.nextUrl.search}`;
    const res = NextResponse.redirect(dest, 301);
    // Only cache the 301 for 1 hour — prevents stale redirect lock-in.
    res.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    res.headers.set('X-Canonical-Redirect', 'apex-to-www');
    res.headers.set('X-Sgital-Middleware-Host', originalHost);
    return res;
  }

  // Non-apex request: continue to app. Attach a debug header so production
  // requests can be inspected to confirm what host the middleware actually saw.
  const res = NextResponse.next();
  res.headers.set('X-Sgital-Middleware-Host', originalHost || 'unknown');
  return res;
}

// Exclude static assets, Next.js internals, the API surface, and sitemap/robots
// from middleware to keep cold-start latency low. The apex->www rule still fires
// at the framework's redirects() layer as a backup for those paths.
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|_next/data|favicon.ico|logos|api|sitemap.xml|robots.txt).*)',
  ],
};
