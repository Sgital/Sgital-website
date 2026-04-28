from fastapi import APIRouter, Form, HTTPException
from typing import Optional
from datetime import datetime
import boto3
from botocore.exceptions import ClientError
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import os
from dotenv import load_dotenv
from pathlib import Path
from motor.motor_asyncio import AsyncIOMotorClient

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
SES_RECIPIENT_EMAIL = os.getenv('SES_CONTACT_RECIPIENT_EMAIL', 'info@sgital.com')

# Initialize SES client
ses_client = boto3.client(
    'ses',
    region_name=AWS_REGION,
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY
)

def send_contact_email(contact_data: dict):
    """Send contact form email via AWS SES"""
    
    # Create MIME message
    msg = MIMEMultipart('mixed')
    msg['Subject'] = f"New Contact Form Submission: {contact_data['subject']}"
    msg['From'] = SES_SENDER_EMAIL
    msg['To'] = SES_RECIPIENT_EMAIL
    
    # Create message body
    msg_body = MIMEMultipart('alternative')
    msg.attach(msg_body)
    
    # Text version
    text_content = f"""
New Contact Form Submission

Name: {contact_data['name']}
Email: {contact_data['email']}
Company: {contact_data.get('company', 'Not provided')}
Phone: {contact_data.get('phone', 'Not provided')}
Subject: {contact_data['subject']}

Message:
{contact_data['message']}

---
This message was sent from the Sgital website contact form.
    """
    
    # HTML version
    html_content = f"""
    <html>
      <head></head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #e0e0e0; border-radius: 8px;">
          <div style="background-color: #f59e0b; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h2 style="color: #000; margin: 0;">New Contact Form Submission</h2>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px; font-weight: bold; width: 150px; border-bottom: 1px solid #e0e0e0;">Name:</td>
                <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;">{contact_data['name']}</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; border-bottom: 1px solid #e0e0e0;">Email:</td>
                <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;">
                  <a href="mailto:{contact_data['email']}" style="color: #f59e0b; text-decoration: none;">{contact_data['email']}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; border-bottom: 1px solid #e0e0e0;">Company:</td>
                <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;">{contact_data.get('company', 'Not provided')}</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; border-bottom: 1px solid #e0e0e0;">Phone:</td>
                <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;">
                  {f'<a href="tel:{contact_data["phone"]}" style="color: #f59e0b; text-decoration: none;">{contact_data["phone"]}</a>' if contact_data.get('phone') else 'Not provided'}
                </td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; border-bottom: 1px solid #e0e0e0;">Subject:</td>
                <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;">{contact_data['subject']}</td>
              </tr>
            </table>
            
            <div style="margin-top: 30px;">
              <h3 style="color: #333; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">Message:</h3>
              <div style="background-color: #f9f9f9; padding: 20px; border-left: 4px solid #f59e0b; border-radius: 4px; margin-top: 15px;">
                <p style="margin: 0; white-space: pre-wrap;">{contact_data['message']}</p>
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center;">
              <p style="color: #999; font-size: 12px; margin: 0;">
                This message was sent from the Sgital website contact form.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
    """
    
    text_part = MIMEText(text_content, 'plain')
    html_part = MIMEText(html_content, 'html')
    msg_body.attach(text_part)
    msg_body.attach(html_part)
    
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
async def submit_contact_form(
    name: str = Form(...),
    email: str = Form(...),
    company: str = Form(None),
    phone: str = Form(None),
    subject: str = Form(...),
    message: str = Form(...)
):
    """Submit contact form and send email"""
    
    try:
        # Prepare contact data
        contact_data = {
            "name": name,
            "email": email,
            "company": company,
            "phone": phone,
            "subject": subject,
            "message": message,
            "submitted_at": datetime.utcnow(),
            "status": "new"
        }
        
        # Store in MongoDB
        db = await get_db()
        result = await db.contacts.insert_one(contact_data)
        
        # Send email via AWS SES
        try:
            message_id = send_contact_email(contact_data)
            await db.contacts.update_one(
                {"_id": result.inserted_id},
                {"$set": {"email_sent": True, "email_message_id": message_id}}
            )
            return {
                "success": True,
                "message": "Your message has been sent successfully. We'll get back to you within 24 hours.",
                "email_message_id": message_id,
                "contact_id": str(result.inserted_id)
            }
        except Exception as email_error:
            # Log error but return success to user
            await db.contacts.update_one(
                {"_id": result.inserted_id},
                {"$set": {"email_sent": False, "email_error": str(email_error)}}
            )
            return {
                "success": True,
                "message": "Your message has been received. We'll get back to you within 24 hours.",
                "email_sent": False,
                "contact_id": str(result.inserted_id)
            }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/list")
async def list_contacts(
    status: Optional[str] = None,
    limit: int = 50
):
    """List all contact form submissions (admin only)"""
    
    try:
        db = await get_db()
        query = {}
        
        if status:
            query["status"] = status
        
        contacts = await db.contacts.find(query).sort("submitted_at", -1).limit(limit).to_list(limit)
        
        # Convert ObjectId to string for JSON serialization
        for contact in contacts:
            if "_id" in contact:
                contact["_id"] = str(contact["_id"])
        
        return {"success": True, "contacts": contacts}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.patch("/update-status/{contact_id}")
async def update_contact_status(
    contact_id: str,
    status: str = Form(...)
):
    """Update contact submission status (admin only)"""
    
    try:
        from bson import ObjectId
        db = await get_db()
        result = await db.contacts.update_one(
            {"_id": ObjectId(contact_id)},
            {"$set": {"status": status, "updated_at": datetime.utcnow()}}
        )
        
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Contact not found")
        
        return {"success": True, "message": "Status updated successfully"}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
