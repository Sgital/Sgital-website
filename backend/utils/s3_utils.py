"""
AWS S3 Utilities for file storage
"""
import boto3
from botocore.exceptions import ClientError
import os
from datetime import datetime
import uuid
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / '.env')

# AWS S3 Configuration
AWS_REGION = os.getenv('AWS_REGION', 'ap-south-1')
AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
S3_BUCKET_NAME = os.getenv('S3_BUCKET_NAME', 'sgital-website-assets')

# Initialize S3 client
s3_client = boto3.client(
    's3',
    region_name=AWS_REGION,
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY
)

def generate_unique_filename(original_filename: str, prefix: str = "") -> str:
    """Generate a unique filename with timestamp and UUID"""
    timestamp = datetime.utcnow().strftime('%Y%m%d_%H%M%S')
    unique_id = str(uuid.uuid4())[:8]
    ext = original_filename.split('.')[-1] if '.' in original_filename else 'bin'
    
    if prefix:
        return f"{prefix}/{timestamp}_{unique_id}.{ext}"
    return f"{timestamp}_{unique_id}.{ext}"


def upload_file_to_s3(
    file_content: bytes,
    filename: str,
    folder: str = "uploads",
    content_type: str = "application/octet-stream"
) -> dict:
    """
    Upload a file to S3 bucket
    
    Args:
        file_content: File content as bytes
        filename: Original filename
        folder: Folder/prefix in S3 bucket (e.g., 'resumes', 'images', 'documents')
        content_type: MIME type of the file
    
    Returns:
        dict with 'success', 'file_key', 'file_url', 'bucket_name'
    """
    try:
        # Generate unique filename
        file_key = generate_unique_filename(filename, prefix=folder)
        
        # Upload to S3
        s3_client.put_object(
            Bucket=S3_BUCKET_NAME,
            Key=file_key,
            Body=file_content,
            ContentType=content_type
        )
        
        # Generate public URL
        file_url = f"https://{S3_BUCKET_NAME}.s3.{AWS_REGION}.amazonaws.com/{file_key}"
        
        return {
            "success": True,
            "file_key": file_key,
            "file_url": file_url,
            "bucket_name": S3_BUCKET_NAME
        }
    
    except ClientError as e:
        error_code = e.response['Error']['Code']
        error_message = e.response['Error']['Message']
        return {
            "success": False,
            "error": f"S3 Error ({error_code}): {error_message}"
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }


def upload_resume_to_s3(file_content: bytes, filename: str) -> dict:
    """Upload resume file to S3 in 'resumes' folder"""
    content_type = "application/pdf"
    if filename.lower().endswith('.doc'):
        content_type = "application/msword"
    elif filename.lower().endswith('.docx'):
        content_type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    
    return upload_file_to_s3(file_content, filename, folder="resumes", content_type=content_type)


def upload_image_to_s3(file_content: bytes, filename: str) -> dict:
    """Upload image file to S3 in 'images' folder"""
    content_type = "image/jpeg"
    if filename.lower().endswith('.png'):
        content_type = "image/png"
    elif filename.lower().endswith('.gif'):
        content_type = "image/gif"
    elif filename.lower().endswith('.webp'):
        content_type = "image/webp"
    
    return upload_file_to_s3(file_content, filename, folder="images", content_type=content_type)


def delete_file_from_s3(file_key: str) -> dict:
    """Delete a file from S3 bucket"""
    try:
        s3_client.delete_object(
            Bucket=S3_BUCKET_NAME,
            Key=file_key
        )
        return {"success": True, "message": "File deleted successfully"}
    except ClientError as e:
        return {"success": False, "error": str(e)}


def get_file_url(file_key: str) -> str:
    """Get public URL for a file in S3"""
    return f"https://{S3_BUCKET_NAME}.s3.{AWS_REGION}.amazonaws.com/{file_key}"


def list_files_in_folder(folder: str, limit: int = 100) -> dict:
    """List files in a specific S3 folder"""
    try:
        response = s3_client.list_objects_v2(
            Bucket=S3_BUCKET_NAME,
            Prefix=f"{folder}/",
            MaxKeys=limit
        )
        
        files = []
        if 'Contents' in response:
            for obj in response['Contents']:
                files.append({
                    "key": obj['Key'],
                    "size": obj['Size'],
                    "last_modified": obj['LastModified'].isoformat(),
                    "url": get_file_url(obj['Key'])
                })
        
        return {"success": True, "files": files}
    except ClientError as e:
        return {"success": False, "error": str(e)}
