// AWS helpers for SES (email) and S3 (file storage)
import { SESClient, SendRawEmailCommand } from '@aws-sdk/client-ses';
import { S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand } from '@aws-sdk/client-s3';
import nodemailer from 'nodemailer';
import { randomUUID } from 'crypto';

const REGION = process.env.AWS_REGION || 'ap-south-1';
const BUCKET = process.env.S3_BUCKET_NAME || 'sgital-website-assets';

const awsCredentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

export const sesClient = new SESClient({ region: REGION, credentials: awsCredentials });
export const s3Client = new S3Client({ region: REGION, credentials: awsCredentials });
export const S3_BUCKET_NAME = BUCKET;
export const AWS_REGION = REGION;

const SES_SENDER_EMAIL = process.env.SES_SENDER_EMAIL || 'info@sgital.com';
const SES_SENDER_NAME = process.env.SES_SENDER_NAME || 'Sgital Info';
const FROM_ADDRESS = `"${SES_SENDER_NAME}" <${SES_SENDER_EMAIL}>`;

/** Send a raw multipart email via SES. */
export async function sendRawEmailViaSES({ to, subject, htmlBody, textBody, attachments = [], replyTo }) {
  // Build the raw message using nodemailer's MailComposer
  const composer = nodemailer.createTransport({ streamTransport: true, buffer: true, newline: 'unix' });
  const message = await composer.sendMail({
    from: FROM_ADDRESS,
    to,
    subject,
    html: htmlBody,
    text: textBody,
    replyTo,
    attachments,
  });
  const raw = message.message;

  const cmd = new SendRawEmailCommand({
    Source: FROM_ADDRESS,
    Destinations: Array.isArray(to) ? to : [to],
    RawMessage: { Data: raw },
  });
  const resp = await sesClient.send(cmd);
  return resp.MessageId;
}

/** Generate a unique file key for S3. */
function generateUniqueKey(filename, folder = 'uploads') {
  const ts = new Date().toISOString().replace(/[-:T.Z]/g, '').slice(0, 14);
  const uid = randomUUID().slice(0, 8);
  const ext = (filename || '').split('.').pop() || 'bin';
  return `${folder}/${ts}_${uid}.${ext}`;
}

export function fileUrl(key) {
  return `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`;
}

export async function uploadFileToS3(buffer, filename, folder = 'uploads', contentType = 'application/octet-stream') {
  const key = generateUniqueKey(filename, folder);
  await s3Client.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  }));
  return { success: true, file_key: key, file_url: fileUrl(key), bucket: BUCKET };
}

export async function uploadResumeToS3(buffer, filename) {
  const lower = (filename || '').toLowerCase();
  let ct = 'application/pdf';
  if (lower.endsWith('.doc')) ct = 'application/msword';
  else if (lower.endsWith('.docx')) ct = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  return uploadFileToS3(buffer, filename, 'resumes', ct);
}

export async function listS3Folder(prefix) {
  const resp = await s3Client.send(new ListObjectsV2Command({ Bucket: BUCKET, Prefix: prefix }));
  return resp.Contents || [];
}

export async function uploadGalleryPhoto(buffer, filename, contentType) {
  const slug = (filename || 'photo').toLowerCase().replace(/\.[^.]+$/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'photo';
  const ext = (filename || '').split('.').pop()?.toLowerCase() || 'jpg';
  const ts = new Date().toISOString().replace(/[-:T.Z]/g, '').slice(0, 14);
  const uid = randomUUID().slice(0, 6);
  const key = `images/life-at-sgital/${slug}-${ts}-${uid}.${ext}`;
  await s3Client.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: buffer,
    ContentType: contentType,
    CacheControl: 'public, max-age=31536000',
  }));
  return { key, url: fileUrl(key), filename, size: buffer.length };
}

export async function deleteS3Object(key) {
  await s3Client.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
  return { success: true };
}
