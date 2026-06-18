# Sgital Website - PRD

## Original Problem Statement
Convert a single-page website into a fully SEO-optimized multi-page React website with branding (logos, client carousels), new content sections (AI Workflows, Life at Sgital), internal blog system, Careers + application form, AWS SES email workflows, AWS S3 (masonry gallery + resumes), ServiceNow Store links, Technical SEO, and a global announcement banner. Blog is managed statically via `blogData.js` (user explicitly declined a backend CMS).

## Stack
- Frontend: React + Tailwind + React Router DOM, shadcn/ui, lucide-react, React Helmet (SEO)
- Backend: FastAPI + Motor (MongoDB)
- Integrations: AWS SES (email — info & hr recipients), AWS S3 (file/gallery storage), YouTube embeds

## Credentials
- Admin: `webadmin` / `Sgital2026` (HTTP Basic on `/api/admin/*`)
- AWS region: `ap-south-1`, S3 bucket: `sgital-website-assets`
- SES verified domain: `sgital.com` (out of sandbox), senders: info@, hr@ as "Sgital Info"

## Implemented Features
- Multi-page site: Home, Solutions, GoAI 2.0, Industries, Case Studies, About, Contact, Our Blog, Blog Detail, Life at Sgital, Careers, Privacy, Terms
- Careers + job application form (resume → S3) + auto-confirmation email to applicant + HR notification
- Contact form + SES notification to info@ + auto-confirmation to submitter
- Admin dashboard (`/admin/applications`): Job Applications, Contact Messages, Gallery manager
- Life at Sgital masonry gallery from S3 with lightbox + keyboard nav
- GoAI auto-playing hero video on HomePage
- ServiceNow Store CTAs across Home and GoAI pages
- AnnouncementBanner (ServiceNow Knowledge26) — dismissible, height-adaptive, exposes `--banner-h` CSS var for dynamic Header/Hero offset; verified responsive at 280/320/360/375/414/640+ viewports
- Blog: static source of truth in `/app/frontend/src/data/blogData.js` (CMS was built then removed per user request)
- 3 new case studies: Gaming, Conglomerate, Semiconductor
- Technical SEO: sitemap.xml, robots.txt, canonical links, unique meta tags, JSON-LD schema, Google Search Console verification, OG image (1200x630)
- Custom "Made with Emergent" badge suppressor in `index.html`
- Updated Sgital logo (yellow, wider) across header/footer; client logos use transparent versions with invert CSS

## Key API Endpoints
Public:
- `POST /api/applications` — job app (S3 upload + SES notify hr@ + confirmation to applicant)
- `POST /api/contact` — contact form (SES notify info@ + confirmation to submitter)
- `GET /api/gallery/life-at-sgital` — gallery photos (cached 5 min)

Admin (HTTP Basic):
- `GET /api/applications/list`, `GET /api/contact/list`
- `PATCH /api/applications/update-status/{id}`, `PATCH /api/contact/update-status/{id}`
- `GET/POST/DELETE /api/admin/gallery/life-at-sgital` — gallery CRUD (prefix-guarded)
- `POST /api/admin/login` — basic auth verify

## DB Collections
- `applications`: name, email, phone, experience, linkedin, portfolio, position, cover_letter, resume_s3_url, status, email_sent, confirmation_sent, created_at
- `contacts`: name, email, company, phone, subject, message, status, email_sent, confirmation_sent, created_at

## Env Variables (backend/.env)
- `MONGO_URL`, `DB_NAME`
- AWS: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `S3_BUCKET_NAME`
- SES: `SES_SENDER_EMAIL`, `SES_CONTACT_RECIPIENT_EMAIL`, `SES_HR_RECIPIENT_EMAIL`
- Admin: `ADMIN_USERNAME`, `ADMIN_PASSWORD`

## Changelog
- **Feb 2026 (WordPress legacy URL migration + canonical domain switch)**: Created `LegacyRedirects.jsx` handling 50+ exact-match and 7 prefix-match legacy WP URL redirects (e.g. `/case_studies/*` → `/case-studies`, `/servicenow-solutions/itsm/` → `/solutions?category=technology`); switched all canonical URLs from `sgital.com` → `https://www.sgital.com` (per GSC property); SolutionsPage canonical now dynamically includes `?category=X` and strips tracking params (utm_*, fbclid, gclid); robots.txt hardened with WP/feed/author/category/tag/php disallow rules; sitemap.xml updated to www domain. **Note**: Client-side redirects are HTML 200 + JS `<Navigate replace>` (soft 301); true HTTP 301 + HTTP 404 require infra-level ingress config — see `/app/memory/EMERGENT_SUPPORT_TICKET.md`.
- **Feb 2026 (SEO fixes for "Duplicate without user-selected canonical")**: NotFoundPage with `noindex` + canonical→`/`; `/blog` → `/our-blog` redirect; BlogDetailPage 404 branch noindexed; removed static `<meta name="robots">` from `index.html`; cleaned robots.txt.
- **Feb 2026**: AnnouncementBanner removed (Knowledge26 ended).
- **Feb 2026**: AnnouncementBanner mobile overflow verified fixed across 280–414px viewports.
- **Feb 2026**: Auto-confirmation emails for Contact + Job Applications; "Sgital Info" sender name.
- **Feb 2026**: SES routing split into distinct contact/HR recipients
- **Feb 2026**: 3 new case studies added (Gaming, Conglomerate, Semiconductor)
- **Feb 2026**: Technical SEO complete (sitemap, robots, canonical, JSON-LD, GSC verification)
- **Feb 2026**: Blog CMS removed; migrated Knowledge26 post to static `blogData.js` per user request
- **Feb 2026**: Privacy + Terms pages; Made-with-Emergent badge suppressor
- **Feb 2026**: Life at Sgital masonry gallery migrated to S3
- **Feb 2026**: AnnouncementBanner + dynamic Header/Hero padding

## Backlog
- **P1**: Geo-targeted landing pages — `/servicenow-partner-singapore`, `/australia`, `/india` for local SEO
- **P2**: Admin UI for case studies / blog taxonomy (only if user reconsiders CMS)
- **P3**: CloudFront CDN in front of S3 for asset delivery
- **P3**: Split `AdminApplicationsPage.jsx` (~728 lines) into smaller components
- **P3**: Server-side image compression on gallery uploads

## Tests
- `/app/backend/tests/test_blog_and_gallery.py` — backend pytest (blog CRUD tests are stale since CMS removed; gallery tests still valid)

## Notes / Critical
- **Blog is STATIC** — edit `/app/frontend/src/data/blogData.js` only. Do NOT reintroduce a backend CMS.
- **`--banner-h` CSS var** drives Header + Hero top padding dynamically; set in `AnnouncementBanner.jsx` via ResizeObserver.
- **Emergent badge hidden** via script at bottom of `public/index.html`. Don't touch unless user complains.
