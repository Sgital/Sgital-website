# Sgital Website - PRD

## Original Problem Statement
Convert a single-page website into a fully SEO-optimized multi-page React website with branding, blog, and content sections. Extensions: Careers + application form, AWS SES emails, Admin Dashboard (applications & contacts), AWS S3 for resume/file storage, photo gallery for "Life at Sgital", MongoDB-backed Blog CMS, and Admin gallery manager.

## Stack
- Frontend: React + Tailwind + React Router DOM, shadcn/ui, lucide-react, **react-quill-new** (WYSIWYG)
- Backend: FastAPI + Motor (MongoDB)
- Integrations: AWS SES (email), AWS S3 (file storage), YouTube embeds

## Credentials
- Admin: `webadmin` / `Sgital2026` (HTTP Basic on all `/api/admin/*` and `/api/blog/admin/*`)
- AWS region: `ap-south-1`, S3 bucket: `sgital-website-assets`
- SES verified: `info@sgital.com`, `hr@sgital.com` (SES sandbox)

## Implemented Features
- Multi-page site: Home, Solutions, GoAI 2.0, Industries, Case Studies, About, Contact, Blog, Our Blog, Blog Detail, Life at Sgital, Careers
- Careers page + job application form (resume → S3)
- Contact form + SES email
- Admin dashboard (`/admin/applications`) with 4 tabs:
  - **Job Applications** — list/view/status/export CSV
  - **Contact Messages** — list/view/status/export CSV
  - **Blog Posts** — list/create/edit/delete/publish-toggle/view-on-site (uses Quill WYSIWYG)
  - **Gallery** — drag-drop upload + grid with delete
- **[Feb 2026] Life at Sgital Photo Gallery** — 17 photos migrated from Google Drive → S3, served via `/api/gallery/life-at-sgital` with 5-min cache; masonry + lightbox with keyboard nav
- **[Feb 2026] Blog CMS migration** — 9 posts from `blogData.js` seeded into MongoDB via `seed_blog.py`; public pages (`/blog`, `/our-blog`, `/our-blog/:slug`) now fetch from API
- **[Feb 2026] Admin Blog Editor** — ReactQuill with dark-theme CSS overrides; featured image upload direct to S3 (`/images/blog/`); auto-slug, unique-slug dedup, draft/publish toggle
- **[Feb 2026] Admin Gallery Manager** — Multi-file drop-zone upload to S3 (`/images/life-at-sgital/`), 10 MB limit, JPG/PNG/WebP/GIF only, per-photo delete, in-memory cache auto-invalidated on mutation, prefix-guard on DELETE

## Key API Endpoints
Public:
- `GET  /api/blog/posts` — list published
- `GET  /api/blog/posts/{slug}` — single post
- `GET  /api/blog/categories` — distinct categories
- `GET  /api/gallery/life-at-sgital` — gallery photos (cached 5 min)
- `POST /api/applications` — job app (SES + S3)
- `POST /api/contact` — contact form (SES)

Admin (HTTP Basic required):
- `GET/POST/PATCH/DELETE /api/blog/admin/posts[/{id}]` — blog CRUD
- `POST /api/blog/admin/upload-image` — featured image upload to S3
- `GET /api/admin/gallery/life-at-sgital` — list gallery
- `POST /api/admin/gallery/life-at-sgital/upload` — multi-file upload
- `DELETE /api/admin/gallery/life-at-sgital?key=...` — delete (prefix-guarded)
- `GET /api/applications/list`, `GET /api/contact/list`
- `PATCH /api/applications/update-status/{id}`, `PATCH /api/contact/update-status/{id}`
- `POST /api/admin/login` (Basic auth verify)

## DB Collections
- `blog_posts`: id, slug, title, description, content (HTML), category, author, image, read_time, date, published, created_at, updated_at
- `applications`: name, email, phone, experience, linkedin, portfolio, position, cover_letter, resume_s3_url, status, created_at
- `contacts`: name, email, company, phone, subject, message, status, created_at

## Tests
- `/app/backend/tests/test_blog_and_gallery.py` — 18 backend pytest cases, all passing (blog CRUD, admin auth, gallery upload/delete, cache invalidation, prefix-guard)

## Backlog
- **P2**: SES production-mode (exit sandbox)
- **P2**: Admin UI for blog categories/tags taxonomy
- **P3**: CDN (CloudFront) in front of S3 for global asset delivery
- **P3**: Split `AdminApplicationsPage.jsx` (now 728 lines) into smaller `ApplicationsList` / `ContactsList` components
- **P3**: Add image compression on blog/gallery uploads (sharp-equivalent server-side)

## Notes
- MONGO_URL in backend/.env: `mongodb://localhost:27017/`
- Quill dark-theme CSS is in `/app/frontend/src/App.css` (scoped under `.blog-quill-wrapper`)
- Old `/app/frontend/src/data/blogData.js` still exists but is no longer imported anywhere (safe to delete later)
