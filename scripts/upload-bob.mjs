import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { readFileSync } from 'fs';

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

const src = 'https://customer-assets-jt897jd0.emergentagent.net/job_nextjs-dev-7/artifacts/rdyr16bi_Bob%20Hayward.png';
const key = 'images/leadership/bob-hayward.png';
const fileUrl = (k) => `https://${BUCKET}.s3.${REGION}.amazonaws.com/${k}`;

const resp = await fetch(src);
if (!resp.ok) { console.log('FETCH_FAIL', resp.status); process.exit(1); }
const buf = Buffer.from(await resp.arrayBuffer());
await s3.send(new PutObjectCommand({
  Bucket: BUCKET,
  Key: key,
  Body: buf,
  ContentType: 'image/png',
  CacheControl: 'public, max-age=31536000',
}));
console.log('UPLOADED', fileUrl(key), `(${buf.length} bytes)`);
