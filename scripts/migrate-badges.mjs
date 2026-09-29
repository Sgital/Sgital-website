import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { readFileSync } from 'fs';

// Load /app/.env manually (standalone script)
const envRaw = readFileSync('/app/.env', 'utf8');
const env = {};
for (const line of envRaw.split('\n')) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}

const REGION = env.AWS_REGION || 'ap-south-1';
const BUCKET = env.S3_BUCKET_NAME || 'sgital-website-assets';
const s3 = new S3Client({
  region: REGION,
  credentials: { accessKeyId: env.AWS_ACCESS_KEY_ID, secretAccessKey: env.AWS_SECRET_ACCESS_KEY },
});

const badges = [
  { src: 'https://customer-assets.emergentagent.com/job_site-evolution-63/artifacts/p8zaou2x_PAC%202025.png', key: 'images/partner-badges/pac-2025.png' },
  { src: 'https://customer-assets.emergentagent.com/job_site-evolution-63/artifacts/7qnxe4yu_Consulting%20%26%20Implementation.png', key: 'images/partner-badges/premier-consulting-implementation.png' },
  { src: 'https://customer-assets.emergentagent.com/job_site-evolution-63/artifacts/yqnhupo3_Reseller%20Select%20Badge.png', key: 'images/partner-badges/select-reseller.png' },
  { src: 'https://customer-assets.emergentagent.com/job_site-evolution-63/artifacts/1auxrir7_Authorized%20Training%20Blue%20Badge.png', key: 'images/partner-badges/authorized-training.png' },
  { src: 'https://customer-assets.emergentagent.com/job_site-evolution-63/artifacts/koz27fbo_Built%20With%20ServiceNow%20Offering.png', key: 'images/partner-badges/built-with-servicenow.png' },
];

const fileUrl = (key) => `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`;

for (const b of badges) {
  const resp = await fetch(b.src);
  if (!resp.ok) { console.log('FETCH_FAIL', b.src, resp.status); process.exit(1); }
  const buf = Buffer.from(await resp.arrayBuffer());
  await s3.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: b.key,
    Body: buf,
    ContentType: 'image/png',
    CacheControl: 'public, max-age=31536000',
  }));
  console.log('UPLOADED', b.key, '->', fileUrl(b.key), `(${buf.length} bytes)`);
}
console.log('DONE');
