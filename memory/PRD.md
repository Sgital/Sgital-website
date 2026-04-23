# Sgital Website - PRD

## Original Problem Statement
Convert a single-page website into a fully SEO-optimized multi-page React website with branding (logos, client carousels), new content sections (AI Workflows, Life at Sgital), and internal blog. Later additions: Careers page + application form, AWS SES email notifications, Admin Dashboard for applications & contact messages, AWS S3 for resume/file storage, and a photo gallery for "Life at Sgital" sourced from a Google Drive folder.

## Stack
- Frontend: React + Tailwind + React Router DOM, shadcn/ui, lucide-react
- Backend: FastAPI + Motor (MongoDB)
- Integrations: AWS SES (email), AWS S3 (file storage), YouTube embeds

## Credentials
- Admin: `webadmin` / `Sgital2026`
- AWS region: `ap-south-1`, S3 bucket: `sgital-website-assets`
- SES verified senders/recipients: `info@sgital.com`, `hr@sgital.com` (SES sandbox mode)

## Implemented Features
- Multi-page site: Home, Solutions, GoAI 2.0, Industries, Case Studies, About, Contact, Blog, Careers, Life at Sgital
- Careers page + job application form with resume upload to S3
- Admin dashboard (`/admin/applications`) with JWT auth, tabs for Job Applications and Contact Messages
- AWS SES integration for Contact form and Job Applications emails
- AWS S3 integration for resume storage
- **[Feb 2026] Life at Sgital Photo Gallery**
  - Downloaded 17 photos from provided public Google Drive folder
  - Uploaded to S3 at `images/life-at-sgital/` with clean slug filenames (public-read, 1-year cache)
  - Backend endpoint `GET /api/gallery/life-at-sgital` (5 min in-memory cache) → returns photos from S3 listing
  - Frontend: CSS-columns masonry gallery, lightbox with ←/→/Esc keyboard nav, prev/next/close buttons, title + counter, lazy-loaded images
  - Data-testids: `life-at-sgital-gallery`, `gallery-photo-{idx}`, `gallery-lightbox`, `gallery-lightbox-prev/next/close`

## Key API Endpoints
- `POST /api/applications` — submit job app (uploads resume to S3 + SES email)
- `GET /api/admin/applications` — list job apps
- `POST /api/contact` — submit contact form (SES email)
- `GET /api/admin/contacts` — list contact messages
- `POST /api/admin/login` — admin JWT auth
- `GET /api/gallery/life-at-sgital` — list gallery photos

## DB Schemas
- `applications`: name, email, phone, experience, linkedin, portfolio, position, cover_letter, resume_s3_url, status, created_at
- `contacts`: name, email, company, phone, subject, message, status, created_at

## Backlog (Prioritized)
- **P1**: Migrate `blogData.js` (hardcoded) to MongoDB-backed blog CMS + admin editor
- **P2**: Add admin UI to upload/manage Life at Sgital gallery photos directly (currently via S3 console or redeploy)
- **P2**: SES production-mode (exit sandbox) to allow sending to unverified recipients
- **P2**: Add gallery photo captions/tags/albums
- **P3**: Add CDN (CloudFront) in front of S3 for faster global asset delivery

## Notes
- MONGO_URL in backend/.env is `mongodb://localhost:27017/` (local mongo used by this container).
- `/app/memory/test_credentials.md` holds admin creds for testing.
