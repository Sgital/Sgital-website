#!/usr/bin/env python3
"""
Comprehensive backend API test for Sgital Next.js application
Tests all API endpoints with real-looking data
"""

import requests
import json
import base64
from io import BytesIO
from datetime import datetime
import sys

# Configuration
BASE_URL = "https://nextjs-dev-7.preview.emergentagent.com/api"
ADMIN_USERNAME = "webadmin"
ADMIN_PASSWORD = "Sgital2026"

# Create Basic Auth header
auth_header = base64.b64encode(f"{ADMIN_USERNAME}:{ADMIN_PASSWORD}".encode()).decode()
HEADERS_AUTH = {"Authorization": f"Basic {auth_header}"}

# Test results tracking
test_results = []

def log_test(test_name, passed, details=""):
    """Log test result"""
    status = "✅ PASS" if passed else "❌ FAIL"
    result = f"{status} - {test_name}"
    if details:
        result += f"\n    Details: {details}"
    print(result)
    test_results.append({"test": test_name, "passed": passed, "details": details})

def create_sample_pdf():
    """Create a minimal valid PDF for testing"""
    pdf_content = b"""%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj
2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj
3 0 obj
<<
/Type /Page
/Parent 2 0 R
/Resources <<
/Font <<
/F1 <<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
>>
>>
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj
4 0 obj
<<
/Length 55
>>
stream
BT
/F1 12 Tf
100 700 Td
(Resume - Priya Sharma) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000317 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
422
%%EOF
"""
    return pdf_content

def create_sample_image():
    """Create a minimal valid PNG for testing"""
    # 1x1 red pixel PNG
    png_content = base64.b64decode(
        b'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg=='
    )
    return png_content

def test_health_check():
    """Test 1: GET /api/ - Health check"""
    try:
        response = requests.get(f"{BASE_URL}/", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get("message") == "Sgital API" and data.get("status") == "ok":
                log_test("Health Check (GET /api/)", True, f"Response: {data}")
                return True
            else:
                log_test("Health Check (GET /api/)", False, f"Unexpected response: {data}")
                return False
        else:
            log_test("Health Check (GET /api/)", False, f"Status: {response.status_code}, Body: {response.text}")
            return False
    except Exception as e:
        log_test("Health Check (GET /api/)", False, f"Exception: {str(e)}")
        return False

def test_contact_form_submission():
    """Test 2: POST /api/contact/submit - Contact form submission"""
    try:
        # Use real-looking data
        form_data = {
            "name": "Rajesh Kumar",
            "email": "info@sgital.com",  # Using company email to avoid spam
            "company": "Tech Solutions Pvt Ltd",
            "phone": "+91-9876543210",
            "subject": "ServiceNow Implementation Inquiry",
            "message": "We are interested in implementing ServiceNow for our organization. Could you please provide more details about your services and pricing?"
        }
        
        response = requests.post(f"{BASE_URL}/contact/submit", data=form_data, timeout=15)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and data.get("contact_id") and data.get("email_message_id"):
                log_test("Contact Form Submission", True, f"Contact ID: {data['contact_id']}, Email Message ID: {data['email_message_id']}")
                return data["contact_id"]
            else:
                log_test("Contact Form Submission", False, f"Missing fields in response: {data}")
                return None
        else:
            log_test("Contact Form Submission", False, f"Status: {response.status_code}, Body: {response.text}")
            return None
    except Exception as e:
        log_test("Contact Form Submission", False, f"Exception: {str(e)}")
        return None

def test_contact_list_no_auth():
    """Test 3: GET /api/contact/list without auth - Should return 401"""
    try:
        response = requests.get(f"{BASE_URL}/contact/list", timeout=10)
        if response.status_code == 401:
            log_test("Contact List Without Auth (401 expected)", True, "Correctly returned 401")
            return True
        else:
            log_test("Contact List Without Auth (401 expected)", False, f"Status: {response.status_code}, expected 401")
            return False
    except Exception as e:
        log_test("Contact List Without Auth (401 expected)", False, f"Exception: {str(e)}")
        return False

def test_contact_list_with_auth():
    """Test 4: GET /api/contact/list with auth - Should return contacts"""
    try:
        response = requests.get(f"{BASE_URL}/contact/list", headers=HEADERS_AUTH, timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and "contacts" in data:
                log_test("Contact List With Auth", True, f"Retrieved {len(data['contacts'])} contacts")
                return data["contacts"]
            else:
                log_test("Contact List With Auth", False, f"Unexpected response: {data}")
                return None
        else:
            log_test("Contact List With Auth", False, f"Status: {response.status_code}, Body: {response.text}")
            return None
    except Exception as e:
        log_test("Contact List With Auth", False, f"Exception: {str(e)}")
        return None

def test_contact_update_status(contact_id):
    """Test 5: PATCH /api/contact/update-status/{id} - Update contact status"""
    if not contact_id:
        log_test("Contact Update Status", False, "No contact_id provided")
        return False
    
    try:
        form_data = {"status": "reviewed"}
        response = requests.patch(
            f"{BASE_URL}/contact/update-status/{contact_id}",
            data=form_data,
            headers=HEADERS_AUTH,
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success"):
                log_test("Contact Update Status", True, f"Updated contact {contact_id} to 'reviewed'")
                return True
            else:
                log_test("Contact Update Status", False, f"Response: {data}")
                return False
        else:
            log_test("Contact Update Status", False, f"Status: {response.status_code}, Body: {response.text}")
            return False
    except Exception as e:
        log_test("Contact Update Status", False, f"Exception: {str(e)}")
        return False

def test_application_submission():
    """Test 6: POST /api/applications/submit - Job application with resume"""
    try:
        # Create sample PDF resume
        pdf_content = create_sample_pdf()
        
        # Real-looking application data
        form_data = {
            "name": "Priya Sharma",
            "contact_address": "123 MG Road, Bangalore, Karnataka 560001",
            "dob": "1995-06-15",
            "hometown": "Bangalore",
            "contact_number": "+91-9876543210",
            "alternate_contact": "+91-9876543211",
            "email": "info@sgital.com",  # Using company email
            "secondary_education": "CBSE - 85%",
            "senior_secondary": "CBSE - 88%",
            "graduation": "B.Tech Computer Science - VTU - 8.5 CGPA",
            "post_graduation": "M.Tech Software Engineering - IISc - 8.8 CGPA",
            "total_experience": "5 years",
            "servicenow_experience": "3 years",
            "certifications": "ServiceNow Certified System Administrator (CSA), ITIL Foundation",
            "job_changes": "2",
            "current_salary": "12 LPA",
            "expected_salary": "18 LPA",
            "notice_period": "60 days",
            "position": "ServiceNow Developer"
        }
        
        files = {
            "resume": ("Priya_Sharma_Resume.pdf", pdf_content, "application/pdf")
        }
        
        response = requests.post(
            f"{BASE_URL}/applications/submit",
            data=form_data,
            files=files,
            timeout=20
        )
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and data.get("application_id"):
                log_test("Application Submission", True, f"Application ID: {data['application_id']}")
                return data["application_id"]
            else:
                log_test("Application Submission", False, f"Missing fields in response: {data}")
                return None
        else:
            log_test("Application Submission", False, f"Status: {response.status_code}, Body: {response.text}")
            return None
    except Exception as e:
        log_test("Application Submission", False, f"Exception: {str(e)}")
        return None

def test_applications_list():
    """Test 7: GET /api/applications/list with auth"""
    try:
        response = requests.get(f"{BASE_URL}/applications/list", headers=HEADERS_AUTH, timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and "applications" in data:
                log_test("Applications List", True, f"Retrieved {len(data['applications'])} applications")
                return data["applications"]
            else:
                log_test("Applications List", False, f"Unexpected response: {data}")
                return None
        else:
            log_test("Applications List", False, f"Status: {response.status_code}, Body: {response.text}")
            return None
    except Exception as e:
        log_test("Applications List", False, f"Exception: {str(e)}")
        return None

def test_application_update_status(application_id):
    """Test 8: PATCH /api/applications/update-status/{id}"""
    if not application_id:
        log_test("Application Update Status", False, "No application_id provided")
        return False
    
    try:
        form_data = {"status": "reviewing"}
        response = requests.patch(
            f"{BASE_URL}/applications/update-status/{application_id}",
            data=form_data,
            headers=HEADERS_AUTH,
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success"):
                log_test("Application Update Status", True, f"Updated application {application_id} to 'reviewing'")
                return True
            else:
                log_test("Application Update Status", False, f"Response: {data}")
                return False
        else:
            log_test("Application Update Status", False, f"Status: {response.status_code}, Body: {response.text}")
            return False
    except Exception as e:
        log_test("Application Update Status", False, f"Exception: {str(e)}")
        return False

def test_gallery_public():
    """Test 9: GET /api/gallery/life-at-sgital - Public gallery"""
    try:
        response = requests.get(f"{BASE_URL}/gallery/life-at-sgital", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and "photos" in data and len(data["photos"]) > 0:
                photo = data["photos"][0]
                if "key" in photo and "url" in photo and "title" in photo and "size" in photo:
                    log_test("Gallery Public", True, f"Retrieved {len(data['photos'])} photos, first photo: {photo['title']}")
                    return True
                else:
                    log_test("Gallery Public", False, f"Photo missing required fields: {photo}")
                    return False
            else:
                log_test("Gallery Public", False, f"No photos or unexpected response: {data}")
                return False
        else:
            log_test("Gallery Public", False, f"Status: {response.status_code}, Body: {response.text}")
            return False
    except Exception as e:
        log_test("Gallery Public", False, f"Exception: {str(e)}")
        return False

def test_admin_verify_no_auth():
    """Test 10: GET /api/admin/verify without auth - Should return 401"""
    try:
        response = requests.get(f"{BASE_URL}/admin/verify", timeout=10)
        if response.status_code == 401:
            log_test("Admin Verify Without Auth (401 expected)", True, "Correctly returned 401")
            return True
        else:
            log_test("Admin Verify Without Auth (401 expected)", False, f"Status: {response.status_code}, expected 401")
            return False
    except Exception as e:
        log_test("Admin Verify Without Auth (401 expected)", False, f"Exception: {str(e)}")
        return False

def test_admin_verify_with_auth():
    """Test 11: GET /api/admin/verify with auth"""
    try:
        response = requests.get(f"{BASE_URL}/admin/verify", headers=HEADERS_AUTH, timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get("authenticated") == True:
                log_test("Admin Verify With Auth", True, f"Authenticated as {data.get('username')}")
                return True
            else:
                log_test("Admin Verify With Auth", False, f"Response: {data}")
                return False
        else:
            log_test("Admin Verify With Auth", False, f"Status: {response.status_code}, Body: {response.text}")
            return False
    except Exception as e:
        log_test("Admin Verify With Auth", False, f"Exception: {str(e)}")
        return False

def test_admin_verify_wrong_creds():
    """Test 12: GET /api/admin/verify with wrong credentials - Should return 401"""
    try:
        wrong_auth = base64.b64encode(b"wrong:credentials").decode()
        headers = {"Authorization": f"Basic {wrong_auth}"}
        response = requests.get(f"{BASE_URL}/admin/verify", headers=headers, timeout=10)
        if response.status_code == 401:
            log_test("Admin Verify Wrong Credentials (401 expected)", True, "Correctly returned 401")
            return True
        else:
            log_test("Admin Verify Wrong Credentials (401 expected)", False, f"Status: {response.status_code}, expected 401")
            return False
    except Exception as e:
        log_test("Admin Verify Wrong Credentials (401 expected)", False, f"Exception: {str(e)}")
        return False

def test_admin_login():
    """Test 13: POST /api/admin/login with auth"""
    try:
        response = requests.post(f"{BASE_URL}/admin/login", headers=HEADERS_AUTH, timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get("authenticated") == True:
                log_test("Admin Login", True, f"Authenticated as {data.get('username')}")
                return True
            else:
                log_test("Admin Login", False, f"Response: {data}")
                return False
        else:
            log_test("Admin Login", False, f"Status: {response.status_code}, Body: {response.text}")
            return False
    except Exception as e:
        log_test("Admin Login", False, f"Exception: {str(e)}")
        return False

def test_admin_gallery_list():
    """Test 14: GET /api/admin/gallery/life-at-sgital with auth"""
    try:
        response = requests.get(f"{BASE_URL}/admin/gallery/life-at-sgital", headers=HEADERS_AUTH, timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and "photos" in data:
                log_test("Admin Gallery List", True, f"Retrieved {len(data['photos'])} photos")
                return data["photos"]
            else:
                log_test("Admin Gallery List", False, f"Unexpected response: {data}")
                return None
        else:
            log_test("Admin Gallery List", False, f"Status: {response.status_code}, Body: {response.text}")
            return None
    except Exception as e:
        log_test("Admin Gallery List", False, f"Exception: {str(e)}")
        return None

def test_admin_gallery_upload():
    """Test 15: POST /api/admin/gallery/life-at-sgital/upload"""
    try:
        # Create a small test image
        img_content = create_sample_image()
        
        files = {
            "files": (f"test_upload_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png", img_content, "image/png")
        }
        
        response = requests.post(
            f"{BASE_URL}/admin/gallery/life-at-sgital/upload",
            files=files,
            headers=HEADERS_AUTH,
            timeout=15
        )
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and data.get("uploaded_count") >= 1 and len(data.get("uploaded", [])) > 0:
                uploaded_key = data["uploaded"][0]["key"]
                if uploaded_key.startswith("images/life-at-sgital/"):
                    log_test("Admin Gallery Upload", True, f"Uploaded photo with key: {uploaded_key}")
                    return uploaded_key
                else:
                    log_test("Admin Gallery Upload", False, f"Key doesn't start with correct prefix: {uploaded_key}")
                    return None
            else:
                log_test("Admin Gallery Upload", False, f"Response: {data}")
                return None
        else:
            log_test("Admin Gallery Upload", False, f"Status: {response.status_code}, Body: {response.text}")
            return None
    except Exception as e:
        log_test("Admin Gallery Upload", False, f"Exception: {str(e)}")
        return None

def test_admin_gallery_delete(photo_key):
    """Test 16: DELETE /api/admin/gallery/life-at-sgital?key={key}"""
    if not photo_key:
        log_test("Admin Gallery Delete", False, "No photo_key provided")
        return False
    
    try:
        # Only delete photos we just uploaded (with today's date)
        today = datetime.now().strftime('%Y%m%d')
        if today not in photo_key:
            log_test("Admin Gallery Delete", False, f"Safety check: Not deleting photo without today's date: {photo_key}")
            return False
        
        response = requests.delete(
            f"{BASE_URL}/admin/gallery/life-at-sgital?key={photo_key}",
            headers=HEADERS_AUTH,
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and data.get("deleted") == photo_key:
                log_test("Admin Gallery Delete", True, f"Deleted photo: {photo_key}")
                return True
            else:
                log_test("Admin Gallery Delete", False, f"Response: {data}")
                return False
        else:
            log_test("Admin Gallery Delete", False, f"Status: {response.status_code}, Body: {response.text}")
            return False
    except Exception as e:
        log_test("Admin Gallery Delete", False, f"Exception: {str(e)}")
        return False

def test_admin_gallery_delete_invalid_key():
    """Test 17: DELETE /api/admin/gallery/life-at-sgital?key=invalid - Should return 400"""
    try:
        response = requests.delete(
            f"{BASE_URL}/admin/gallery/life-at-sgital?key=invalid_key",
            headers=HEADERS_AUTH,
            timeout=10
        )
        
        if response.status_code == 400:
            data = response.json()
            if "Invalid key" in data.get("error", ""):
                log_test("Admin Gallery Delete Invalid Key (400 expected)", True, "Correctly returned 400 with 'Invalid key' error")
                return True
            else:
                log_test("Admin Gallery Delete Invalid Key (400 expected)", False, f"Got 400 but wrong error: {data}")
                return False
        else:
            log_test("Admin Gallery Delete Invalid Key (400 expected)", False, f"Status: {response.status_code}, expected 400")
            return False
    except Exception as e:
        log_test("Admin Gallery Delete Invalid Key (400 expected)", False, f"Exception: {str(e)}")
        return False

def main():
    """Run all backend tests"""
    print("=" * 80)
    print("SGITAL BACKEND API TEST SUITE")
    print("=" * 80)
    print(f"Base URL: {BASE_URL}")
    print(f"Admin User: {ADMIN_USERNAME}")
    print("=" * 80)
    print()
    
    # Test 1: Health check
    print("TEST 1: Health Check")
    test_health_check()
    print()
    
    # Test 2-5: Contact form
    print("TEST 2-5: Contact Form")
    contact_id = test_contact_form_submission()
    test_contact_list_no_auth()
    contacts = test_contact_list_with_auth()
    test_contact_update_status(contact_id)
    print()
    
    # Test 6-8: Applications
    print("TEST 6-8: Job Applications")
    application_id = test_application_submission()
    applications = test_applications_list()
    test_application_update_status(application_id)
    print()
    
    # Test 9: Gallery public
    print("TEST 9: Public Gallery")
    test_gallery_public()
    print()
    
    # Test 10-13: Admin auth
    print("TEST 10-13: Admin Authentication")
    test_admin_verify_no_auth()
    test_admin_verify_with_auth()
    test_admin_verify_wrong_creds()
    test_admin_login()
    print()
    
    # Test 14-17: Admin gallery
    print("TEST 14-17: Admin Gallery Management")
    admin_photos = test_admin_gallery_list()
    uploaded_key = test_admin_gallery_upload()
    test_admin_gallery_delete(uploaded_key)
    test_admin_gallery_delete_invalid_key()
    print()
    
    # Summary
    print("=" * 80)
    print("TEST SUMMARY")
    print("=" * 80)
    passed = sum(1 for r in test_results if r["passed"])
    failed = sum(1 for r in test_results if not r["passed"])
    total = len(test_results)
    
    print(f"Total Tests: {total}")
    print(f"Passed: {passed}")
    print(f"Failed: {failed}")
    print(f"Success Rate: {(passed/total*100):.1f}%")
    print()
    
    if failed > 0:
        print("FAILED TESTS:")
        for r in test_results:
            if not r["passed"]:
                print(f"  ❌ {r['test']}")
                if r["details"]:
                    print(f"     {r['details']}")
        print()
    
    print("=" * 80)
    
    # Exit with appropriate code
    sys.exit(0 if failed == 0 else 1)

if __name__ == "__main__":
    main()
