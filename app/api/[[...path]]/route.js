import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { getDb } from '@/lib/server/db';
import {
  sendRawEmailViaSES,
  uploadResumeToS3,
  listS3Folder,
  uploadGalleryPhoto,
  deleteS3Object,
  fileUrl,
  S3_BUCKET_NAME,
  AWS_REGION,
} from '@/lib/server/aws';
import {
  contactConfirmationTemplate,
  contactNotifyTemplate,
  applicantConfirmationTemplate,
  applicationNotifyTemplate,
} from '@/lib/server/emails';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'webadmin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Sgital2026';

function handleCORS(response) {
  response.headers.set('Access-Control-Allow-Origin', process.env.CORS_ORIGINS || '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  return response;
}

export async function OPTIONS() {
  return handleCORS(new NextResponse(null, { status: 200 }));
}

function verifyBasicAuth(request) {
  const auth = request.headers.get('authorization') || '';
  if (!auth.startsWith('Basic ')) return null;
  try {
    const decoded = Buffer.from(auth.slice(6), 'base64').toString('utf8');
    const [u, p] = decoded.split(':');
    if (u === ADMIN_USERNAME && p === ADMIN_PASSWORD) return u;
    return null;
  } catch (e) {
    return null;
  }
}

function unauthorized() {
  // NOTE: intentionally NO `WWW-Authenticate: Basic` header.
  // If we send that header, every browser will pop up the NATIVE Basic Auth
  // dialog on top of our custom /admin/applications login form the moment
  // any 401 response comes back — even for XHR/fetch requests where the
  // JavaScript would otherwise handle the error itself. That native popup
  // is what caused users to be stuck in the "double login" loop.
  //
  // We keep the 401 status so the custom login form's `response.ok` check
  // still shows "Invalid username or password" to the user.
  return handleCORS(
    NextResponse.json({ error: 'Incorrect username or password' }, { status: 401 })
  );
}

function titleize(stem) {
  const words = stem.split(/[-_]+/).filter(Boolean);
  let title = words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
  title = title.replace('Servicenow', 'ServiceNow').replace('Goai', 'GoAI');
  return title;
}

// Simple in-memory cache for gallery
const galleryCache = { ts: 0, data: [], ttl: 300_000 };

async function handleRoute(request, { params }) {
  const { path = [] } = params;
  const route = `/${path.join('/')}`;
  const method = request.method;

  try {
    const db = await getDb();

    // Root
    if ((route === '/' || route === '/root') && method === 'GET') {
      return handleCORS(NextResponse.json({ message: 'Sgital API', status: 'ok' }));
    }

    /* ===================== CONTACT FORM ===================== */
    if (route === '/contact/submit' && method === 'POST') {
      const form = await request.formData();
      const data = {
        id: uuidv4(),
        name: form.get('name'),
        email: form.get('email'),
        company: form.get('company') || null,
        phone: form.get('phone') || null,
        subject: form.get('subject'),
        message: form.get('message'),
        submitted_at: new Date(),
        status: 'new',
      };
      if (!data.name || !data.email || !data.subject || !data.message) {
        return handleCORS(NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 }));
      }

      const result = await db.collection('contacts').insertOne({ ...data });

      // Send notification email to info@
      let email_sent = false, email_message_id = null, email_error = null;
      try {
        const t = contactNotifyTemplate(data);
        email_message_id = await sendRawEmailViaSES({ to: t.to, subject: t.subject, htmlBody: t.html, textBody: t.text });
        email_sent = true;
      } catch (e) {
        email_error = String(e.message || e);
        console.error('SES notify error:', e);
      }

      // Send confirmation to the submitter
      let confirmation_sent = false, confirmation_error = null;
      try {
        const c = contactConfirmationTemplate(data);
        await sendRawEmailViaSES({ to: data.email, subject: c.subject, htmlBody: c.html, textBody: c.text, replyTo: c.replyTo });
        confirmation_sent = true;
      } catch (e) {
        confirmation_error = String(e.message || e);
        console.error('SES confirmation error:', e);
      }

      await db.collection('contacts').updateOne(
        { _id: result.insertedId },
        { $set: { email_sent, email_message_id, email_error, confirmation_sent, confirmation_error } }
      );

      return handleCORS(NextResponse.json({
        success: true,
        message: "Your message has been sent successfully. We'll get back to you within 24 hours.",
        contact_id: data.id,
        email_message_id,
      }));
    }

    if (route === '/contact/list' && method === 'GET') {
      const u = verifyBasicAuth(request);
      if (!u) return unauthorized();
      const url = new URL(request.url);
      const status = url.searchParams.get('status');
      const limit = parseInt(url.searchParams.get('limit') || '50', 10);
      const q = status ? { status } : {};
      const contacts = await db.collection('contacts').find(q).sort({ submitted_at: -1 }).limit(limit).toArray();
      return handleCORS(NextResponse.json({ success: true, contacts: contacts.map(({ _id, ...rest }) => ({ ...rest, _id: rest.id || String(_id) })) }));
    }

    const updateContactMatch = route.match(/^\/contact\/update-status\/(.+)$/);
    if (updateContactMatch && method === 'PATCH') {
      const u = verifyBasicAuth(request);
      if (!u) return unauthorized();
      const id = updateContactMatch[1];
      const form = await request.formData();
      const status = form.get('status');
      const r = await db.collection('contacts').updateOne({ id }, { $set: { status, updated_at: new Date() } });
      if (r.modifiedCount === 0) return handleCORS(NextResponse.json({ success: false, error: 'Not found' }, { status: 404 }));
      return handleCORS(NextResponse.json({ success: true }));
    }

    /* ===================== APPLICATIONS ===================== */
    if (route === '/applications/submit' && method === 'POST') {
      const form = await request.formData();
      const resume = form.get('resume');
      if (!resume || !resume.name) {
        return handleCORS(NextResponse.json({ success: false, error: 'Resume is required' }, { status: 400 }));
      }
      const lower = resume.name.toLowerCase();
      if (!lower.endsWith('.pdf') && !lower.endsWith('.doc') && !lower.endsWith('.docx')) {
        return handleCORS(NextResponse.json({ success: false, error: 'Resume must be PDF, DOC, or DOCX' }, { status: 400 }));
      }
      const buf = Buffer.from(await resume.arrayBuffer());
      if (buf.length > 10 * 1024 * 1024) {
        return handleCORS(NextResponse.json({ success: false, error: 'Resume too large (max 10MB)' }, { status: 400 }));
      }

      let s3up;
      try {
        s3up = await uploadResumeToS3(buf, resume.name);
      } catch (e) {
        console.error('S3 upload error:', e);
        return handleCORS(NextResponse.json({ success: false, error: 'Failed to upload resume: ' + String(e.message || e) }, { status: 500 }));
      }

      const data = {
        id: uuidv4(),
        name: form.get('name'),
        contact_address: form.get('contact_address'),
        dob: form.get('dob'),
        hometown: form.get('hometown'),
        contact_number: form.get('contact_number'),
        alternate_contact: form.get('alternate_contact') || null,
        email: form.get('email'),
        secondary_education: form.get('secondary_education'),
        senior_secondary: form.get('senior_secondary'),
        graduation: form.get('graduation'),
        post_graduation: form.get('post_graduation') || null,
        total_experience: form.get('total_experience'),
        servicenow_experience: form.get('servicenow_experience'),
        certifications: form.get('certifications') || null,
        job_changes: form.get('job_changes'),
        current_salary: form.get('current_salary'),
        expected_salary: form.get('expected_salary'),
        notice_period: form.get('notice_period'),
        position: form.get('position'),
        resume_filename: resume.name,
        resume_s3_key: s3up.file_key,
        resume_s3_url: s3up.file_url,
        applied_at: new Date(),
        status: 'new',
      };
      const result = await db.collection('applications').insertOne({ ...data });

      let email_sent = false, email_message_id = null, email_error = null;
      try {
        const t = applicationNotifyTemplate(data);
        email_message_id = await sendRawEmailViaSES({
          to: t.to,
          subject: t.subject,
          htmlBody: t.html,
          textBody: t.text,
          attachments: [{ filename: resume.name, content: buf }],
        });
        email_sent = true;
      } catch (e) {
        email_error = String(e.message || e);
        console.error('SES app notify error:', e);
      }

      let confirmation_sent = false, confirmation_error = null;
      try {
        const c = applicantConfirmationTemplate(data);
        await sendRawEmailViaSES({ to: data.email, subject: c.subject, htmlBody: c.html, textBody: c.text, replyTo: c.replyTo });
        confirmation_sent = true;
      } catch (e) {
        confirmation_error = String(e.message || e);
        console.error('SES app confirmation error:', e);
      }

      await db.collection('applications').updateOne(
        { _id: result.insertedId },
        { $set: { email_sent, email_message_id, email_error, confirmation_sent, confirmation_error } }
      );

      return handleCORS(NextResponse.json({
        success: true,
        message: 'Application submitted successfully',
        application_id: data.id,
      }));
    }

    if (route === '/applications/list' && method === 'GET') {
      const u = verifyBasicAuth(request);
      if (!u) return unauthorized();
      const url = new URL(request.url);
      const status = url.searchParams.get('status');
      const position = url.searchParams.get('position');
      const limit = parseInt(url.searchParams.get('limit') || '50', 10);
      const q = {};
      if (status) q.status = status;
      if (position) q.position = position;
      const apps = await db.collection('applications').find(q).sort({ applied_at: -1 }).limit(limit).toArray();
      return handleCORS(NextResponse.json({
        success: true,
        applications: apps.map(({ _id, ...rest }) => ({ ...rest, _id: rest.id || String(_id) })),
      }));
    }

    const updateAppMatch = route.match(/^\/applications\/update-status\/(.+)$/);
    if (updateAppMatch && method === 'PATCH') {
      const u = verifyBasicAuth(request);
      if (!u) return unauthorized();
      const id = updateAppMatch[1];
      const form = await request.formData();
      const status = form.get('status');
      const r = await db.collection('applications').updateOne({ id }, { $set: { status, updated_at: new Date() } });
      if (r.modifiedCount === 0) return handleCORS(NextResponse.json({ success: false, error: 'Not found' }, { status: 404 }));
      return handleCORS(NextResponse.json({ success: true }));
    }

    /* ===================== GALLERY ===================== */
    if (route === '/gallery/life-at-sgital' && method === 'GET') {
      const now = Date.now();
      if (galleryCache.data.length && (now - galleryCache.ts < galleryCache.ttl)) {
        return handleCORS(NextResponse.json({ success: true, count: galleryCache.data.length, photos: galleryCache.data }));
      }
      try {
        const contents = await listS3Folder('images/life-at-sgital/');
        const photos = contents
          .filter((o) => !o.Key.endsWith('/'))
          .filter((o) => /\.(jpg|jpeg|png|webp|gif)$/i.test(o.Key))
          .map((o) => {
            const filename = o.Key.split('/').pop();
            const stem = filename.replace(/\.[^.]+$/, '');
            return {
              key: o.Key,
              url: `https://${S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${o.Key}`,
              title: titleize(stem),
              size: o.Size || 0,
            };
          })
          .sort((a, b) => a.title.localeCompare(b.title));
        galleryCache.data = photos;
        galleryCache.ts = now;
        return handleCORS(NextResponse.json({ success: true, count: photos.length, photos }));
      } catch (e) {
        console.error('Gallery list error:', e);
        return handleCORS(NextResponse.json({ success: false, count: 0, photos: [], error: String(e.message || e) }));
      }
    }

    /* ===================== ADMIN AUTH ===================== */
    if (route === '/admin/verify' && method === 'GET') {
      const u = verifyBasicAuth(request);
      if (!u) return unauthorized();
      return handleCORS(NextResponse.json({ authenticated: true, username: u }));
    }
    if (route === '/admin/login' && method === 'POST') {
      const u = verifyBasicAuth(request);
      if (!u) return unauthorized();
      return handleCORS(NextResponse.json({ authenticated: true, username: u }));
    }

    /* ===================== ADMIN GALLERY ===================== */
    if (route === '/admin/gallery/life-at-sgital' && method === 'GET') {
      const u = verifyBasicAuth(request);
      if (!u) return unauthorized();
      const contents = await listS3Folder('images/life-at-sgital/');
      const photos = contents
        .filter((o) => !o.Key.endsWith('/') && /\.(jpg|jpeg|png|webp|gif)$/i.test(o.Key))
        .map((o) => ({
          key: o.Key,
          url: `https://${S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${o.Key}`,
          filename: o.Key.split('/').pop(),
          size: o.Size || 0,
          last_modified: o.LastModified ? new Date(o.LastModified).toISOString() : null,
        }))
        .sort((a, b) => a.filename.localeCompare(b.filename));
      return handleCORS(NextResponse.json({ success: true, count: photos.length, photos }));
    }

    if (route === '/admin/gallery/life-at-sgital/upload' && method === 'POST') {
      const u = verifyBasicAuth(request);
      if (!u) return unauthorized();
      const form = await request.formData();
      const files = form.getAll('files');
      if (!files || files.length === 0) {
        return handleCORS(NextResponse.json({ success: false, error: 'No files provided' }, { status: 400 }));
      }
      const ALLOWED = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
      const results = [];
      const errors = [];
      for (const file of files) {
        if (!file || typeof file === 'string') continue;
        if (!ALLOWED.has(file.type)) {
          errors.push({ filename: file.name, error: `Unsupported type: ${file.type}` });
          continue;
        }
        const buf = Buffer.from(await file.arrayBuffer());
        if (buf.length > 10 * 1024 * 1024) {
          errors.push({ filename: file.name, error: 'Too large (max 10MB)' });
          continue;
        }
        try {
          const r = await uploadGalleryPhoto(buf, file.name, file.type);
          results.push(r);
        } catch (e) {
          errors.push({ filename: file.name, error: String(e.message || e) });
        }
      }
      galleryCache.data = []; galleryCache.ts = 0;
      return handleCORS(NextResponse.json({ success: true, uploaded: results, errors, uploaded_count: results.length }));
    }

    if (route === '/admin/gallery/life-at-sgital' && method === 'DELETE') {
      const u = verifyBasicAuth(request);
      if (!u) return unauthorized();
      const url = new URL(request.url);
      const key = url.searchParams.get('key');
      if (!key || !key.startsWith('images/life-at-sgital/')) {
        return handleCORS(NextResponse.json({ success: false, error: 'Invalid key' }, { status: 400 }));
      }
      try {
        await deleteS3Object(key);
        galleryCache.data = []; galleryCache.ts = 0;
        return handleCORS(NextResponse.json({ success: true, deleted: key }));
      } catch (e) {
        return handleCORS(NextResponse.json({ success: false, error: String(e.message || e) }, { status: 500 }));
      }
    }

    return handleCORS(NextResponse.json({ error: `Route ${route} not found` }, { status: 404 }));
  } catch (error) {
    console.error('API Error:', error);
    return handleCORS(NextResponse.json({ error: 'Internal server error', detail: String(error.message || error) }, { status: 500 }));
  }
}

export const GET = handleRoute;
export const POST = handleRoute;
export const PUT = handleRoute;
export const DELETE = handleRoute;
export const PATCH = handleRoute;

export const dynamic = 'force-dynamic';
