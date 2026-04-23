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

# Load environment variables
ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / '.env')

router = APIRouter()

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://mongodb:27017/')
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
SES_RECIPIENT_EMAIL = os.getenv('SES_RECIPIENT_EMAIL', 'hr@sgital.com')

# Initialize SES client
ses_client = boto3.client(
    'ses',
    region_name=AWS_REGION,
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY
)

def send_application_email(applicant_data: dict, resume_bytes: bytes, resume_filename: str):
    """Send application email with resume attachment via AWS SES"""
    
    # Create MIME message
    msg = MIMEMultipart('mixed')
    msg['Subject'] = f"New Job Application: {applicant_data['position']}"
    msg['From'] = SES_SENDER_EMAIL
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
            Source=SES_SENDER_EMAIL,
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
        
        applications = await db.applications.find(
            query,
            {"_id": 0, "resume_content": 0}
        ).sort("applied_at", -1).limit(limit).to_list(limit)
        
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
