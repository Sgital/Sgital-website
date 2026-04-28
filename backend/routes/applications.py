from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends
from typing import Optional, List
from datetime import datetime
from bson import ObjectId
import boto3
from botocore.exceptions import ClientError
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path
import sys

# Add parent directory to path for imports
sys.path.append(str(Path(__file__).parent.parent))
from utils.s3_utils import upload_resume_to_s3

# Load environment variables
ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / '.env')

router = APIRouter()

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/')
db_name = os.environ.get('DB_NAME', 'fullstack_app')
client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

async def get_db():
    return db

# AWS SES Configuration
AWS_REGION = os.getenv('AWS_REGION', 'ap-south-1')
AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
SES_SENDER_EMAIL = os.getenv('SES_SENDER_EMAIL', 'info@sgital.com')
SES_SENDER_NAME = os.getenv('SES_SENDER_NAME', 'Sgital Info')
SES_FROM_ADDRESS = f'"{SES_SENDER_NAME}" <{SES_SENDER_EMAIL}>'
SES_RECIPIENT_EMAIL = os.getenv('SES_HR_RECIPIENT_EMAIL', os.getenv('SES_RECIPIENT_EMAIL', 'hr@sgital.com'))

# Initialize SES client
ses_client = boto3.client(
    'ses',
    region_name=AWS_REGION,
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY
)


def send_applicant_confirmation(applicant_data: dict):
    """Send auto-confirmation email to the job applicant."""
    first_name = (applicant_data.get('name') or '').split()[0] or 'there'
    position = applicant_data.get('position', 'the role')

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f"Application received — {position} at Sgital"
    msg['From'] = SES_FROM_ADDRESS
    msg['To'] = applicant_data['email']
    msg['Reply-To'] = SES_RECIPIENT_EMAIL

    text_content = f"""Hi {first_name},

Thank you for applying to the {position} role at Sgital.

We've received your application, including your resume, and our HR team will review it carefully. If your profile matches what we're looking for, we'll reach out to schedule a conversation — typically within 7–10 business days.

Here are the details we received:

Position: {position}
Name: {applicant_data.get('name')}
Email: {applicant_data.get('email')}
Phone: {applicant_data.get('phone', 'Not provided')}
Experience: {applicant_data.get('experience_years', 'Not specified')}
LinkedIn: {applicant_data.get('linkedin', 'Not provided')}

In the meantime, feel free to explore more about life at Sgital:
https://sgital.com/life-at-sgital

If you have any questions, reply to this email or reach us at hr@sgital.com.

Warm regards,
Sgital HR Team
Premier ServiceNow Partner — AI Workflows
https://sgital.com
"""

    html_content = f"""
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#f6f6f6;margin:0;padding:24px;">
  <div style="max-width:580px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.05);">
    <div style="background:#0a0a0a;padding:28px 32px;text-align:center;">
      <div style="display:inline-block;padding:8px 16px;background:rgba(240,200,30,0.15);border:1px solid rgba(240,200,30,0.3);border-radius:999px;color:#F0C81E;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">Sgital Careers</div>
      <h1 style="color:#ffffff;margin:16px 0 4px;font-size:22px;font-weight:600;">Application Received</h1>
      <p style="color:#a3a3a3;margin:0;font-size:14px;">Thanks for your interest in joining Sgital!</p>
    </div>
    <div style="padding:32px;color:#262626;line-height:1.6;">
      <p style="margin:0 0 16px;">Hi <strong>{first_name}</strong>,</p>
      <p style="margin:0 0 16px;">Thank you for applying to the <strong>{position}</strong> role at Sgital. We've received your application and resume, and our HR team will review it carefully.</p>
      <p style="margin:0 0 24px;">If your profile matches what we're looking for, we'll reach out to schedule a conversation — typically within <strong>7–10 business days</strong>.</p>
      <div style="background:#fafafa;border-left:3px solid #F0C81E;border-radius:6px;padding:16px 18px;margin:0 0 24px;">
        <p style="margin:0 0 8px;font-size:12px;color:#737373;text-transform:uppercase;letter-spacing:0.05em;">Application Summary</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:4px 0;color:#737373;width:110px;">Position</td><td style="padding:4px 0;color:#1a1a1a;font-weight:600;">{position}</td></tr>
          <tr><td style="padding:4px 0;color:#737373;">Name</td><td style="padding:4px 0;color:#1a1a1a;">{applicant_data.get('name')}</td></tr>
          <tr><td style="padding:4px 0;color:#737373;">Email</td><td style="padding:4px 0;color:#1a1a1a;">{applicant_data.get('email')}</td></tr>
          <tr><td style="padding:4px 0;color:#737373;">Phone</td><td style="padding:4px 0;color:#1a1a1a;">{applicant_data.get('phone', 'Not provided')}</td></tr>
          <tr><td style="padding:4px 0;color:#737373;">Experience</td><td style="padding:4px 0;color:#1a1a1a;">{applicant_data.get('experience_years', 'Not specified')}</td></tr>
        </table>
      </div>
      <p style="margin:0 0 8px;">In the meantime, feel free to explore more about our culture:</p>
      <p style="margin:0 0 24px;">
        <a href="https://sgital.com/life-at-sgital" style="display:inline-block;padding:10px 18px;background:#F0C81E;color:#0a0a0a;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">Life at Sgital →</a>
      </p>
      <p style="margin:0 0 16px;">Questions? Reply to this email or reach us at <a href="mailto:hr@sgital.com" style="color:#B8860B;">hr@sgital.com</a>.</p>
      <p style="margin:24px 0 0;">Warm regards,<br/><strong>Sgital HR Team</strong><br/><span style="color:#737373;font-size:13px;">Premier ServiceNow Partner — AI Workflows</span></p>
    </div>
    <div style="background:#fafafa;padding:18px 32px;text-align:center;border-top:1px solid #eee;font-size:12px;color:#737373;">
      <a href="https://sgital.com" style="color:#B8860B;text-decoration:none;">sgital.com</a>
      &nbsp;&middot;&nbsp;
      <a href="https://www.linkedin.com/company/sgital" style="color:#B8860B;text-decoration:none;">LinkedIn</a>
      <p style="margin:10px 0 0;color:#a3a3a3;">This is an automated confirmation. Our HR team will follow up separately.</p>
    </div>
  </div>
</body>
</html>
"""

    msg.attach(MIMEText(text_content, 'plain'))
    msg.attach(MIMEText(html_content, 'html'))

    response = ses_client.send_raw_email(
        Source=SES_FROM_ADDRESS,
        Destinations=[applicant_data['email']],
        RawMessage={'Data': msg.as_string()}
    )
    return response['MessageId']


def send_application_email(applicant_data: dict, resume_bytes: bytes, resume_filename: str):
    """Send application email with resume attachment via AWS SES"""
    
    # Create MIME message
    msg = MIMEMultipart('mixed')
    msg['Subject'] = f"New Job Application: {applicant_data['position']}"
    msg['From'] = SES_FROM_ADDRESS
    msg['To'] = SES_RECIPIENT_EMAIL
    
    # Create message body
    msg_body = MIMEMultipart('alternative')
    msg.attach(msg_body)
    
    # Text version
    text_content = f"""
New Job Application Received

Name: {applicant_data['name']}
Email: {applicant_data['email']}
Contact Number: {applicant_data['contact_number']}
Position: {applicant_data['position']}
Total Experience: {applicant_data['total_experience']} years
ServiceNow Experience: {applicant_data['servicenow_experience']} years

Date of Birth: {applicant_data.get('dob', 'N/A')}
Hometown: {applicant_data.get('hometown', 'N/A')}
Current/Last Salary: {applicant_data.get('current_salary', 'N/A')}
Expected Salary: {applicant_data.get('expected_salary', 'N/A')}
Notice Period: {applicant_data.get('notice_period', 'N/A')}

Please review the attached resume for complete details.
    """
    
    # HTML version
    html_content = f"""
    <html>
      <head></head>
      <body style="font-family: Arial, sans-serif;">
        <h2 style="color: #f59e0b;">New Job Application Received</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <td style="padding: 8px; font-weight: bold; width: 200px;">Name:</td>
            <td style="padding: 8px;">{applicant_data['name']}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Email:</td>
            <td style="padding: 8px;">{applicant_data['email']}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Contact Number:</td>
            <td style="padding: 8px;">{applicant_data['contact_number']}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Position:</td>
            <td style="padding: 8px;">{applicant_data['position']}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Total Experience:</td>
            <td style="padding: 8px;">{applicant_data['total_experience']} years</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">ServiceNow Experience:</td>
            <td style="padding: 8px;">{applicant_data['servicenow_experience']} years</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Date of Birth:</td>
            <td style="padding: 8px;">{applicant_data.get('dob', 'N/A')}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Hometown:</td>
            <td style="padding: 8px;">{applicant_data.get('hometown', 'N/A')}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Current/Last Salary:</td>
            <td style="padding: 8px;">{applicant_data.get('current_salary', 'N/A')}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Expected Salary:</td>
            <td style="padding: 8px;">{applicant_data.get('expected_salary', 'N/A')}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Notice Period:</td>
            <td style="padding: 8px;">{applicant_data.get('notice_period', 'N/A')}</td>
          </tr>
        </table>
        <p style="margin-top: 20px;">Please review the attached resume for complete details.</p>
      </body>
    </html>
    """
    
    text_part = MIMEText(text_content, 'plain')
    html_part = MIMEText(html_content, 'html')
    msg_body.attach(text_part)
    msg_body.attach(html_part)
    
    # Add resume attachment
    attachment = MIMEApplication(resume_bytes)
    attachment.add_header('Content-Disposition', 'attachment', filename=resume_filename)
    msg.attach(attachment)
    
    try:
        response = ses_client.send_raw_email(
            Source=SES_FROM_ADDRESS,
            Destinations=[SES_RECIPIENT_EMAIL],
            RawMessage={'Data': msg.as_string()}
        )
        return response['MessageId']
    except ClientError as e:
        error_code = e.response['Error']['Code']
        error_message = e.response['Error']['Message']
        raise Exception(f"SES Error ({error_code}): {error_message}")


@router.post("/submit")
async def submit_application(
    name: str = Form(...),
    contact_address: str = Form(...),
    dob: str = Form(...),
    hometown: str = Form(...),
    contact_number: str = Form(...),
    alternate_contact: str = Form(None),
    email: str = Form(...),
    secondary_education: str = Form(...),
    senior_secondary: str = Form(...),
    graduation: str = Form(...),
    post_graduation: str = Form(None),
    total_experience: str = Form(...),
    servicenow_experience: str = Form(...),
    certifications: str = Form(None),
    job_changes: str = Form(...),
    current_salary: str = Form(...),
    expected_salary: str = Form(...),
    notice_period: str = Form(...),
    position: str = Form(...),
    resume: UploadFile = File(...)
):
    """Submit job application"""
    
    try:
        # Validate resume file
        if not resume.filename.lower().endswith(('.pdf', '.doc', '.docx')):
            raise HTTPException(status_code=400, detail="Resume must be PDF, DOC, or DOCX")
        
        # Read resume content
        resume_content = await resume.read()
        
        # Check file size (max 10MB for SES)
        if len(resume_content) > 10 * 1024 * 1024:
            raise HTTPException(status_code=400, detail="Resume file too large (max 10MB)")
        
        # Upload resume to S3
        s3_upload_result = upload_resume_to_s3(resume_content, resume.filename)
        
        if not s3_upload_result.get("success"):
            raise HTTPException(status_code=500, detail=f"Failed to upload resume: {s3_upload_result.get('error')}")
        
        # Prepare application data
        application_data = {
            "name": name,
            "contact_address": contact_address,
            "dob": dob,
            "hometown": hometown,
            "contact_number": contact_number,
            "alternate_contact": alternate_contact,
            "email": email,
            "secondary_education": secondary_education,
            "senior_secondary": senior_secondary,
            "graduation": graduation,
            "post_graduation": post_graduation,
            "total_experience": total_experience,
            "servicenow_experience": servicenow_experience,
            "certifications": certifications,
            "job_changes": job_changes,
            "current_salary": current_salary,
            "expected_salary": expected_salary,
            "notice_period": notice_period,
            "position": position,
            "resume_filename": resume.filename,
            "resume_s3_key": s3_upload_result["file_key"],
            "resume_s3_url": s3_upload_result["file_url"],
            "applied_at": datetime.utcnow(),
            "status": "new"
        }
        
        # Store in MongoDB
        db = await get_db()
        result = await db.applications.insert_one(application_data)
        
        # Send email via AWS SES
        try:
            message_id = send_application_email(application_data, resume_content, resume.filename)
            await db.applications.update_one(
                {"_id": result.inserted_id},
                {"$set": {"email_sent": True, "email_message_id": message_id}}
            )
        except Exception as email_error:
            # Log email error but don't fail the application
            await db.applications.update_one(
                {"_id": result.inserted_id},
                {"$set": {"email_sent": False, "email_error": str(email_error)}}
            )

        # Send confirmation email to the applicant (non-fatal if it fails)
        try:
            conf_id = send_applicant_confirmation(application_data)
            await db.applications.update_one(
                {"_id": result.inserted_id},
                {"$set": {"confirmation_sent": True, "confirmation_message_id": conf_id}}
            )
        except Exception as conf_err:
            await db.applications.update_one(
                {"_id": result.inserted_id},
                {"$set": {"confirmation_sent": False, "confirmation_error": str(conf_err)}}
            )
        
        return {
            "success": True,
            "message": "Application submitted successfully",
            "application_id": str(result.inserted_id)
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/list")
async def list_applications(
    status: Optional[str] = None,
    position: Optional[str] = None,
    limit: int = 50
):
    """List all applications (admin only)"""
    
    try:
        db = await get_db()
        query = {}
        
        if status:
            query["status"] = status
        if position:
            query["position"] = position
        
        applications = await db.applications.find(query).sort("applied_at", -1).limit(limit).to_list(limit)
        
        # Convert ObjectId to string for JSON serialization
        for app in applications:
            if "_id" in app:
                app["_id"] = str(app["_id"])
        
        return {"success": True, "applications": applications}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.patch("/update-status/{application_id}")
async def update_application_status(
    application_id: str,
    status: str = Form(...)
):
    """Update application status (admin only)"""
    
    try:
        db = await get_db()
        result = await db.applications.update_one(
            {"_id": ObjectId(application_id)},
            {"$set": {"status": status, "updated_at": datetime.utcnow()}}
        )
        
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Application not found")
        
        return {"success": True, "message": "Status updated successfully"}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
