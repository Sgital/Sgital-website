// Pre-built HTML email templates for Sgital
const RECIPIENT_CONTACT = process.env.SES_CONTACT_RECIPIENT_EMAIL || 'info@sgital.com';
const RECIPIENT_HR = process.env.SES_HR_RECIPIENT_EMAIL || 'hr@sgital.com';

export function contactConfirmationTemplate(d) {
  const firstName = (d.name || '').split(' ')[0] || 'there';
  const subject = "We've received your message — Sgital";
  const text = `Hi ${firstName},\n\nThank you for reaching out to Sgital. We've received your message and a member of our team will get back to you within 24 business hours.\n\nFor reference, here's a copy of what you sent us:\n\nSubject: ${d.subject}\nMessage:\n${d.message}\n\nIf you need immediate assistance, feel free to reply to this email or reach us at info@sgital.com.\n\nBest regards,\nThe Sgital Team\nPremier ServiceNow Partner — AI Workflows\nhttps://sgital.com\n`;
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#f6f6f6;margin:0;padding:24px;">
  <div style="max-width:580px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.05);">
    <div style="background:#0a0a0a;padding:28px 32px;text-align:center;">
      <div style="display:inline-block;padding:8px 16px;background:rgba(240,200,30,0.15);border:1px solid rgba(240,200,30,0.3);border-radius:999px;color:#F0C81E;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">Sgital</div>
      <h1 style="color:#ffffff;margin:16px 0 4px;font-size:22px;font-weight:600;">Thanks for reaching out!</h1>
      <p style="color:#a3a3a3;margin:0;font-size:14px;">We'll respond within 24 business hours.</p>
    </div>
    <div style="padding:32px;color:#262626;line-height:1.6;">
      <p style="margin:0 0 16px;">Hi <strong>${firstName}</strong>,</p>
      <p style="margin:0 0 16px;">Thank you for contacting <strong>Sgital</strong>. We've received your message and a member of our team will get back to you within <strong>24 business hours</strong>.</p>
      <p style="margin:0 0 12px;font-size:13px;color:#737373;">For your reference, here's a copy of what you sent us:</p>
      <div style="background:#fafafa;border-left:3px solid #F0C81E;border-radius:6px;padding:16px 18px;margin:12px 0 24px;">
        <p style="margin:0 0 8px;font-size:12px;color:#737373;text-transform:uppercase;letter-spacing:0.05em;">Subject</p>
        <p style="margin:0 0 16px;font-weight:600;color:#1a1a1a;">${d.subject}</p>
        <p style="margin:0 0 8px;font-size:12px;color:#737373;text-transform:uppercase;letter-spacing:0.05em;">Your message</p>
        <p style="margin:0;white-space:pre-wrap;color:#404040;">${d.message}</p>
      </div>
      <p style="margin:0 0 16px;">If you need immediate assistance, feel free to reply to this email or reach us at <a href="mailto:info@sgital.com" style="color:#B8860B;">info@sgital.com</a>.</p>
      <p style="margin:24px 0 0;">Best regards,<br/><strong>The Sgital Team</strong><br/><span style="color:#737373;font-size:13px;">Premier ServiceNow Partner — AI Workflows</span></p>
    </div>
    <div style="background:#fafafa;padding:18px 32px;text-align:center;border-top:1px solid #eee;font-size:12px;color:#737373;">
      <a href="https://sgital.com" style="color:#B8860B;text-decoration:none;">sgital.com</a>
    </div>
  </div></body></html>`;
  return { subject, text, html, replyTo: RECIPIENT_CONTACT };
}

export function contactNotifyTemplate(d) {
  const subject = `New Contact Form Submission: ${d.subject}`;
  const text = `New Contact Form Submission\n\nName: ${d.name}\nEmail: ${d.email}\nCompany: ${d.company || 'Not provided'}\nPhone: ${d.phone || 'Not provided'}\nSubject: ${d.subject}\n\nMessage:\n${d.message}\n`;
  const html = `<html><body style="font-family:Arial,sans-serif;line-height:1.6;color:#333;">
  <div style="max-width:600px;margin:0 auto;padding:20px;background:#f9f9f9;border:1px solid #e0e0e0;border-radius:8px;">
    <div style="background:#f59e0b;padding:20px;border-radius:8px 8px 0 0;text-align:center;"><h2 style="color:#000;margin:0;">New Contact Form Submission</h2></div>
    <div style="background:white;padding:30px;border-radius:0 0 8px 8px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:12px;font-weight:bold;width:150px;border-bottom:1px solid #e0e0e0;">Name:</td><td style="padding:12px;border-bottom:1px solid #e0e0e0;">${d.name}</td></tr>
        <tr><td style="padding:12px;font-weight:bold;border-bottom:1px solid #e0e0e0;">Email:</td><td style="padding:12px;border-bottom:1px solid #e0e0e0;"><a href="mailto:${d.email}" style="color:#f59e0b;">${d.email}</a></td></tr>
        <tr><td style="padding:12px;font-weight:bold;border-bottom:1px solid #e0e0e0;">Company:</td><td style="padding:12px;border-bottom:1px solid #e0e0e0;">${d.company || 'Not provided'}</td></tr>
        <tr><td style="padding:12px;font-weight:bold;border-bottom:1px solid #e0e0e0;">Phone:</td><td style="padding:12px;border-bottom:1px solid #e0e0e0;">${d.phone || 'Not provided'}</td></tr>
        <tr><td style="padding:12px;font-weight:bold;border-bottom:1px solid #e0e0e0;">Subject:</td><td style="padding:12px;border-bottom:1px solid #e0e0e0;">${d.subject}</td></tr>
      </table>
      <div style="margin-top:30px;"><h3 style="color:#333;border-bottom:2px solid #f59e0b;padding-bottom:10px;">Message:</h3>
        <div style="background:#f9f9f9;padding:20px;border-left:4px solid #f59e0b;border-radius:4px;margin-top:15px;"><p style="margin:0;white-space:pre-wrap;">${d.message}</p></div>
      </div>
    </div>
  </div></body></html>`;
  return { subject, text, html, to: RECIPIENT_CONTACT };
}

export function applicantConfirmationTemplate(d) {
  const firstName = (d.name || '').split(' ')[0] || 'there';
  const position = d.position || 'the role';
  const subject = `Application received — ${position} at Sgital`;
  const text = `Hi ${firstName},\n\nThank you for applying to the ${position} role at Sgital.\n\nWe've received your application and resume, and our HR team will review it carefully. If your profile matches what we're looking for, we'll reach out to schedule a conversation — typically within 7–10 business days.\n\nWarm regards,\nSgital HR Team\nhttps://sgital.com\n`;
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#f6f6f6;margin:0;padding:24px;">
  <div style="max-width:580px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.05);">
    <div style="background:#0a0a0a;padding:28px 32px;text-align:center;">
      <div style="display:inline-block;padding:8px 16px;background:rgba(240,200,30,0.15);border:1px solid rgba(240,200,30,0.3);border-radius:999px;color:#F0C81E;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">Sgital Careers</div>
      <h1 style="color:#ffffff;margin:16px 0 4px;font-size:22px;font-weight:600;">Application Received</h1>
      <p style="color:#a3a3a3;margin:0;font-size:14px;">Thanks for your interest in joining Sgital!</p>
    </div>
    <div style="padding:32px;color:#262626;line-height:1.6;">
      <p style="margin:0 0 16px;">Hi <strong>${firstName}</strong>,</p>
      <p style="margin:0 0 16px;">Thank you for applying to the <strong>${position}</strong> role at Sgital. We've received your application and resume, and our HR team will review it carefully.</p>
      <p style="margin:0 0 24px;">If your profile matches what we're looking for, we'll reach out to schedule a conversation — typically within <strong>7–10 business days</strong>.</p>
      <p style="margin:24px 0 0;">Warm regards,<br/><strong>Sgital HR Team</strong></p>
    </div>
  </div></body></html>`;
  return { subject, text, html, replyTo: RECIPIENT_HR };
}

export function applicationNotifyTemplate(d) {
  const subject = `New Job Application: ${d.position}`;
  const text = `New Job Application\n\nName: ${d.name}\nEmail: ${d.email}\nContact: ${d.contact_number}\nPosition: ${d.position}\nTotal Experience: ${d.total_experience} years\nServiceNow Experience: ${d.servicenow_experience} years\nNotice Period: ${d.notice_period}\nCurrent Salary: ${d.current_salary}\nExpected Salary: ${d.expected_salary}\nResume URL: ${d.resume_s3_url}\n`;
  const html = `<html><body style="font-family:Arial,sans-serif;">
    <h2 style="color:#f59e0b;">New Job Application Received</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px;">
      <tr><td style="padding:8px;font-weight:bold;width:200px;">Name:</td><td style="padding:8px;">${d.name}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Email:</td><td style="padding:8px;">${d.email}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Contact:</td><td style="padding:8px;">${d.contact_number}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Position:</td><td style="padding:8px;">${d.position}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Total Experience:</td><td style="padding:8px;">${d.total_experience} years</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">ServiceNow Experience:</td><td style="padding:8px;">${d.servicenow_experience} years</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Notice Period:</td><td style="padding:8px;">${d.notice_period}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Current Salary:</td><td style="padding:8px;">${d.current_salary}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Expected Salary:</td><td style="padding:8px;">${d.expected_salary}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Resume:</td><td style="padding:8px;"><a href="${d.resume_s3_url}">Download Resume</a></td></tr>
    </table></body></html>`;
  return { subject, text, html, to: RECIPIENT_HR };
}
