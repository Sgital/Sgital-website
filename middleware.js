// Edge middleware: canonical host enforcement (apex sgital.com -> www.sgital.com)
// + CDN cache policy for HTML page routes.
//
// LOOP-PROOFING (ERR_TOO_MANY_REDIRECTS fix):
// Cloudflare and Emergent's ingress may set `x-forwarded-host` inconsistently
// with the actual `Host` header for the same request. If we trust
// x-forwarded-host and it says "sgital.com" while Host is "www.sgital.com",
// we'd redirect www -> www forever.
//
// Rule set here:
//   1. Never redirect if ANY host-ish header indicates www.sgital.com
//   2. Only redirect if the actual `Host` header is exactly `sgital.com`
//   3. Redirect target is always `https://www.sgital.com/<path>`
//
// This makes a redirect loop mathematically impossible: once the browser
// lands on www.sgital.com, the Host header on the next request is
// www.sgital.com and rule (2) fails.
//
// CACHE-CONTROL STRATEGY:
// See earlier commits — Next.js 14.2.x bakes s-maxage=31536000 on cached
// HTML that middleware/headers() cannot override. We set CDN-Cache-Control
// (Cloudflare-honored) as best-effort. HTML pages ultimately need a
// Cloudflare Page Rule to short-cache at the edge.

import { NextResponse } from 'next/server';

const WWW_HOST = 'www.sgital.com';

function normalizeHost(raw) {
  if (!raw) return '';
  return raw.toLowerCase().split(',')[0].trim().split(':')[0];
}

function collectHostHeaders(request) {
  return [
    request.headers.get('host'),
    request.headers.get('x-forwarded-host'),
    request.headers.get('x-original-host'),
    request.nextUrl && request.nextUrl.host,
  ].filter(Boolean).map(normalizeHost);
}

/** True if ANY host-ish signal indicates the request is for www.sgital.com. */
function isWwwRequest(hosts) {
  return hosts.includes('www.sgital.com');
}

/** True if the actual TCP Host header is exactly 'sgital.com'. */
function isApexRequest(request) {
  return normalizeHost(request.headers.get('host')) === 'sgital.com';
}

export function middleware(request) {
  const hosts = collectHostHeaders(request);
  const hostHeader = normalizeHost(request.headers.get('host'));

  // -----------------------------------------------------------------
  // Apex -> www 301 (loop-safe: only redirect true apex requests)
  // -----------------------------------------------------------------
  if (isApexRequest(request) && !isWwwRequest(hosts)) {
    const dest = `https://${WWW_HOST}${request.nextUrl.pathname}${request.nextUrl.search}`;
    const res = NextResponse.redirect(dest, 301);
    res.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    res.headers.set('CDN-Cache-Control', 'public, max-age=3600');
    res.headers.set('X-Canonical-Redirect', 'apex-to-www');
    res.headers.set('X-Sgital-Middleware-Host', hostHeader || 'unknown');
    res.headers.set('X-Sgital-Middleware-XFH', normalizeHost(request.headers.get('x-forwarded-host')) || 'none');
    return res;
  }

  // -----------------------------------------------------------------
  // Regular HTML page — short CDN cache, always-revalidate browser cache.
  // -----------------------------------------------------------------
  const res = NextResponse.next();
  res.headers.set('X-Sgital-Middleware-Host', hostHeader || 'unknown');
  res.headers.set('X-Sgital-Middleware-XFH', normalizeHost(request.headers.get('x-forwarded-host')) || 'none');
  res.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
  res.headers.set('CDN-Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
  res.headers.set('Cloudflare-CDN-Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
  return res;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|_next/data|favicon.ico|logos|api|sitemap.xml|robots.txt).*)',
  ],
};
