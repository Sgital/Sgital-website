from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials
import secrets
import os

router = APIRouter()
security = HTTPBasic()

ADMIN_USERNAME = os.getenv('ADMIN_USERNAME', 'webadmin')
ADMIN_PASSWORD = os.getenv('ADMIN_PASSWORD', 'Sgital2026')

def verify_admin(credentials: HTTPBasicCredentials = Depends(security)):
    """Verify admin credentials using HTTP Basic Auth"""
    
    correct_username = secrets.compare_digest(credentials.username, ADMIN_USERNAME)
    correct_password = secrets.compare_digest(credentials.password, ADMIN_PASSWORD)
    
    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    
    return credentials.username


@router.get("/verify")
async def verify_admin_endpoint(username: str = Depends(verify_admin)):
    """Verify admin authentication"""
    return {"authenticated": True, "username": username}
