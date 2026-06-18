# Emergent Support Ticket — Infra-Level SEO Requests for sgital.com

**App / Job ID**: 5d46ebec-8424-402e-978b-d8d5e356a36c
**Production domain**: https://www.sgital.com
**Stack**: React CRA (SPA) + FastAPI + MongoDB on Emergent's K8s base image (`fastapi_react_mongo_shadcn_base_image_cloud_arm`)

---

## Context

Sgital recently migrated a WordPress site to a React SPA hosted on Emergent. Google Search Console reports:
- **79 pages crawled, only 4 indexed** — most are legacy WordPress URLs being served by the SPA as HTTP 200 + a 404 component (soft 404).
- The team has shipped code-level fixes (client-side `<Navigate>` redirects, `noindex` on 404, canonical tags). However, three issues require platform-level configuration that's outside the application code:

---

## Request 1 — Apex-to-www 301 (CDN / DNS level)

Currently both `https://sgital.com` and `https://www.sgital.com` resolve. The team has standardized on **`www.sgital.com`** (the GSC property). 

**Ask**: Add a 301 redirect at the CDN / DNS layer such that:
```
https://sgital.com/*      → https://www.sgital.com/*    (301)
http://sgital.com/*       → https://www.sgital.com/*    (301)
http://www.sgital.com/*   → https://www.sgital.com/*    (301)
```
The redirect MUST preserve the path, query string, and fragment. Without this, Google splits ranking signals between the apex and www variants.

**Verification**: `curl -I https://sgital.com/about` should return `HTTP/2 301` with `location: https://www.sgital.com/about`.

---

## Request 2 — Ingress-level 301 redirects for legacy WordPress URLs

Currently legacy URLs hit the SPA, get rendered, and `<Navigate>` issues a client-side redirect (HTML 200 + JS-driven). Google handles this but treats it as a soft 301. **True HTTP 301 status** would significantly accelerate de-indexing of the old WordPress URLs.

Most K8s ingress controllers (nginx-ingress, Traefik, Istio) support 301 redirect annotations or rewrite rules. Please configure server-side 301 redirects for the URL map listed in `/app/frontend/src/components/LegacyRedirects.jsx` (50+ exact paths + 7 prefix rules). Specifically:

**Exact paths** (sample — full list in code):
- `/home` → `/`
- `/about-us/` → `/about`
- `/contact-us/` → `/contact`
- `/servicenow-solutions/itsm/` → `/solutions?category=technology`
- `/case_studies/*` → `/case-studies`
- `/sgital-marks-8-years-of-powering-singapores-ai-workflows/` → `/our-blog/sgital-marks-8-years`
- *(full list: see `EXACT_REDIRECTS` and `PREFIX_REDIRECTS` constants in `LegacyRedirects.jsx`)*

**Prefix paths**:
- `/servicenow-solutions/*` → `/solutions`
- `/case_studies/*` → `/case-studies`
- `/case-studies/page/*` → `/case-studies`
- `/we_serve/*` → `/solutions`
- `/join_us/*` → `/life-at-sgital`
- `/blog`, `/blog/*` → `/our-blog`
- `/feed`, `/*/feed/` → `/our-blog`

**Requirements**:
- HTTP 301 (permanent), not 302
- Case-insensitive matching
- Preserve query strings (e.g. `?utm_source=...`)
- Take precedence over the SPA `index.html` catch-all

**Verification**: `curl -I https://www.sgital.com/case_studies/air-liquide-digital-transformation-and-adoption/` should return `HTTP/2 301` with `location: /case-studies`.

---

## Request 3 — True HTTP 404 status for unknown routes

Currently `https://www.sgital.com/anything-random` returns HTTP 200 (SPA serves `index.html`, React Router renders the NotFoundPage component). The component DOES set `<meta name="robots" content="noindex, follow">`, but Google still classifies these as **soft 404s** until they're dropped.

**Ask**: Configure the ingress / static-serve layer to return **HTTP 404** for any path that:
1. Does NOT match a known SPA route (the list of valid routes is in `App.js`), AND
2. Does NOT match a legacy redirect rule from Request 2

…while still serving `index.html` so the friendly 404 UI renders.

This is the standard "404 with body" pattern (response code 404 + HTML body). Most ingress controllers support this via a `default-backend` or custom error pages.

**Verification**: `curl -I https://www.sgital.com/random-nonsense-url` should return `HTTP/2 404`.

---

## Request 4 — Prerendering for crawler-friendly HTML (alternative to Next.js migration)

The SPA currently relies on Googlebot's JS rendering. For non-Google crawlers (Bing, LinkedIn previews, Twitter cards, AI scrapers) and to harden against future Googlebot changes, **build-time or edge prerendering** would deliver real HTML to crawlers without requiring a full Next.js migration.

**Ask**: Does Emergent's platform support any of the following, and if so, how do we enable it for this app?

- **Build-time SSG via react-snap** — bolts onto CRA, generates static HTML for each route at build time. Lightweight.
- **Edge prerendering via prerender.io / Cloudflare Prerender** — intercepts requests with crawler User-Agents and serves pre-rendered HTML.
- **Native Next.js migration path** — if Emergent supports a Next.js base image with the same DB/SES/S3 wiring.

We'd prefer prerendering (cheaper, no rewrite) but want to know all options.

---

## What we've already done in app code

For full transparency on the team's side:
- ✅ Self-referencing canonical tags on every page → `https://www.sgital.com/{path}`
- ✅ Dynamic canonical with `?category=X` support on `/solutions`, strips tracking params (utm_*, fbclid, gclid, mc_cid, mc_eid)
- ✅ `noindex, follow` meta on 404 page and bad blog slugs
- ✅ Client-side React Router redirects for all 50+ legacy URLs (`LegacyRedirects.jsx`)
- ✅ robots.txt hardened with WP/feed/author/category/tag/php disallow rules
- ✅ sitemap.xml uses `www.sgital.com`, contains zero legacy URLs

---

## Priority

These are needed to clear ~75 indexed-but-soft-404 / not-indexed pages currently flagged in Google Search Console. The longer we wait, the more our domain authority leaks through stale URLs. Ideally resolved within 1-2 weeks.

Thanks!
