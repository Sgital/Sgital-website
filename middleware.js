// Edge middleware: canonical host enforcement (apex sgital.com -> www.sgital.com)
// and CDN cache-control policy for HTML page routes.
//
// ============================================================================
// CACHE-CONTROL STRATEGY
// ============================================================================
// Next.js 14.2.x hard-codes `Cache-Control: s-maxage=31536000, stale-while-revalidate`
// on every response served from its internal route cache (x-nextjs-cache: HIT).
// This value cannot be overridden reliably from middleware or next.config.js
// `headers()` because the cached response replays its own baked-in headers.
//
// The fix is to bypass this via **CDN-Cache-Control** — a Cloudflare-specific
// header that Cloudflare edge honors OVER the standard Cache-Control. So:
//
//   - Cache-Control       -> browser policy (always revalidate)
//   - CDN-Cache-Control   -> Cloudflare edge policy (60s cache + SWR)
//
// Cloudflare docs: https://developers.cloudflare.com/cache/concepts/cache-control/
// Behavior: If CDN-Cache-Control is present, Cloudflare uses it for edge
// caching and does NOT use s-maxage/max-age from Cache-Control at the edge.
// Downstream (browser) still sees only the standard Cache-Control.
//
// Net effect: redeploys are visible at Cloudflare edge within ~60s regardless
// of what Next.js emits in Cache-Control. Immutable /_next/static/* and /logos/*
// are excluded from middleware so they keep their long cache automatically.
// ============================================================================

import { NextResponse } from 'next/server';

const APEX_HOSTS = new Set(['sgital.com']);
const WWW_HOST = 'www.sgital.com';

// HTML page cache policy at the CDN edge.
const HTML_CDN_CACHE = 'public, max-age=60, stale-while-revalidate=300';
// Browser policy — always revalidate (cheap 304 check).
const HTML_BROWSER_CACHE = 'public, max-age=0, must-revalidate';

function extractOriginalHost(request) {
  const fwd = request.headers.get('x-forwarded-host');
  const orig = request.headers.get('x-original-host');
  const host = request.headers.get('host');
  const raw = fwd || orig || host || '';
  return raw.toLowerCase().split(',')[0].trim().split(':')[0];
}

export function middleware(request) {
  const originalHost = extractOriginalHost(request);

  // -----------------------------------------------------------------
  // Apex -> www 301
  // -----------------------------------------------------------------
  if (APEX_HOSTS.has(originalHost)) {
    const dest = `https://${WWW_HOST}${request.nextUrl.pathname}${request.nextUrl.search}`;
    const res = NextResponse.redirect(dest, 301);
    // Cache the redirect at edge for 1h only, so future direction flips propagate fast.
    res.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    res.headers.set('CDN-Cache-Control', 'public, max-age=3600');
    res.headers.set('X-Canonical-Redirect', 'apex-to-www');
    res.headers.set('X-Sgital-Middleware-Host', originalHost);
    return res;
  }

  // -----------------------------------------------------------------
  // Regular HTML page — short CDN cache, always-revalidate browser cache.
  // The matcher (see config below) already EXCLUDES immutable static paths.
  // -----------------------------------------------------------------
  const res = NextResponse.next();
  res.headers.set('X-Sgital-Middleware-Host', originalHost || 'unknown');
  res.headers.set('Cache-Control', HTML_BROWSER_CACHE);
  res.headers.set('CDN-Cache-Control', HTML_CDN_CACHE);
  res.headers.set('Cloudflare-CDN-Cache-Control', HTML_CDN_CACHE);
  return res;
}

// Exclude static assets, Next.js internals, the API surface, and sitemap/robots
// from middleware. Those keep their existing (long) cache behavior.
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|_next/data|favicon.ico|logos|api|sitemap.xml|robots.txt).*)',
  ],
};
