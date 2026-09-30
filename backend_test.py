#!/usr/bin/env python3
"""
Backend API test for Event Invitation Request endpoints
Tests POST /api/events/kl-risk-ai-governance/request, GET /api/admin/event-requests, PATCH /api/admin/event-requests/update-status/{id}
"""

import requests
import json
import base64
from datetime import datetime

# Configuration
BASE_URL = "https://nextjs-dev-7.preview.emergentagent.com/api"
ADMIN_USERNAME = "webadmin"
ADMIN_PASSWORD = "Sgital2026"

def get_basic_auth_header():
    """Generate Basic Auth header"""
    credentials = f"{ADMIN_USERNAME}:{ADMIN_PASSWORD}"
    encoded = base64.b64encode(credentials.encode()).decode()
    return {"Authorization": f"Basic {encoded}"}

def test_event_request_happy_path():
    """Test 1: POST /api/events/kl-risk-ai-governance/request - Happy path"""
    print("\n" + "="*80)
    print("TEST 1: POST /api/events/kl-risk-ai-governance/request - Happy Path")
    print("="*80)
    
    try:
        url = f"{BASE_URL}/events/kl-risk-ai-governance/request"
        payload = {
            "first_name": "Sarah",
            "last_name": "Johnson",
            "email": "sarah.johnson@techcorp.com",
            "company": "TechCorp Malaysia",
            "job_title": "Chief Information Officer",
            "country": "Malaysia",
            "maturity": "Managed",
            "servicenow_status": "Live on ServiceNow IRM",
            "consent": True
        }
        headers = {"Content-Type": "application/json"}
        
        print(f"POST {url}")
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and data.get("request_id") and data.get("first_name") == "Sarah" and data.get("email") == "sarah.johnson@techcorp.com":
                print("✅ PASS - Request created successfully with correct response structure")
                return data.get("request_id")
            else:
                print("❌ FAIL - Response structure incorrect")
                return None
        else:
            print(f"❌ FAIL - Expected 200, got {response.status_code}")
            return None
            
    except Exception as e:
        print(f"❌ FAIL - Exception: {str(e)}")
        return None

def test_event_request_missing_field():
    """Test 2: POST /api/events/kl-risk-ai-governance/request - Missing required field"""
    print("\n" + "="*80)
    print("TEST 2: POST /api/events/kl-risk-ai-governance/request - Missing Required Field (company)")
    print("="*80)
    
    try:
        url = f"{BASE_URL}/events/kl-risk-ai-governance/request"
        payload = {
            "first_name": "John",
            "last_name": "Doe",
            "email": "john.doe@example.com",
            # "company": missing
            "job_title": "CTO",
            "country": "Singapore",
            "consent": True
        }
        headers = {"Content-Type": "application/json"}
        
        print(f"POST {url}")
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 400:
            data = response.json()
            if not data.get("success"):
                print("✅ PASS - Correctly rejected missing required field with 400")
            else:
                print("❌ FAIL - Response should have success:false")
        else:
            print(f"❌ FAIL - Expected 400, got {response.status_code}")
            
    except Exception as e:
        print(f"❌ FAIL - Exception: {str(e)}")

def test_event_request_invalid_email():
    """Test 3: POST /api/events/kl-risk-ai-governance/request - Invalid email"""
    print("\n" + "="*80)
    print("TEST 3: POST /api/events/kl-risk-ai-governance/request - Invalid Email")
    print("="*80)
    
    try:
        url = f"{BASE_URL}/events/kl-risk-ai-governance/request"
        payload = {
            "first_name": "Jane",
            "last_name": "Smith",
            "email": "notanemail",
            "company": "Example Corp",
            "job_title": "Manager",
            "country": "Malaysia",
            "consent": True
        }
        headers = {"Content-Type": "application/json"}
        
        print(f"POST {url}")
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 400:
            data = response.json()
            if not data.get("success"):
                print("✅ PASS - Correctly rejected invalid email with 400")
            else:
                print("❌ FAIL - Response should have success:false")
        else:
            print(f"❌ FAIL - Expected 400, got {response.status_code}")
            
    except Exception as e:
        print(f"❌ FAIL - Exception: {str(e)}")

def test_event_request_consent_false():
    """Test 4: POST /api/events/kl-risk-ai-governance/request - Consent false"""
    print("\n" + "="*80)
    print("TEST 4: POST /api/events/kl-risk-ai-governance/request - Consent False")
    print("="*80)
    
    try:
        url = f"{BASE_URL}/events/kl-risk-ai-governance/request"
        payload = {
            "first_name": "Bob",
            "last_name": "Wilson",
            "email": "bob.wilson@example.com",
            "company": "Wilson Inc",
            "job_title": "Director",
            "country": "Malaysia",
            "consent": False
        }
        headers = {"Content-Type": "application/json"}
        
        print(f"POST {url}")
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 400:
            data = response.json()
            if not data.get("success"):
                print("✅ PASS - Correctly rejected consent:false with 400")
            else:
                print("❌ FAIL - Response should have success:false")
        else:
            print(f"❌ FAIL - Expected 400, got {response.status_code}")
            
    except Exception as e:
        print(f"❌ FAIL - Exception: {str(e)}")

def test_admin_event_requests_no_auth():
    """Test 5: GET /api/admin/event-requests - Without Authorization"""
    print("\n" + "="*80)
    print("TEST 5: GET /api/admin/event-requests - Without Authorization")
    print("="*80)
    
    try:
        url = f"{BASE_URL}/admin/event-requests"
        
        print(f"GET {url}")
        print("No Authorization header")
        
        response = requests.get(url, timeout=30)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 401:
            print("✅ PASS - Correctly returned 401 without auth")
        else:
            print(f"❌ FAIL - Expected 401, got {response.status_code}")
            
    except Exception as e:
        print(f"❌ FAIL - Exception: {str(e)}")

def test_admin_event_requests_with_auth():
    """Test 6: GET /api/admin/event-requests - With Authorization"""
    print("\n" + "="*80)
    print("TEST 6: GET /api/admin/event-requests - With Authorization")
    print("="*80)
    
    try:
        url = f"{BASE_URL}/admin/event-requests"
        headers = get_basic_auth_header()
        
        print(f"GET {url}")
        print(f"Authorization: Basic {ADMIN_USERNAME}:{ADMIN_PASSWORD}")
        
        response = requests.get(url, headers=headers, timeout=30)
        
        print(f"Status Code: {response.status_code}")
        data = response.json()
        print(f"Response: {json.dumps(data, indent=2)}")
        
        if response.status_code == 200:
            if data.get("success") and "requests" in data:
                print(f"✅ PASS - Returned {len(data['requests'])} event requests")
                # Check that no MongoDB _id ObjectId is leaking
                if data['requests']:
                    first_req = data['requests'][0]
                    if 'id' in first_req and isinstance(first_req.get('_id'), str):
                        print("✅ PASS - No ObjectId leaking, id exposed as string")
                    else:
                        print("⚠️  WARNING - Check _id field format")
                return True
            else:
                print("❌ FAIL - Response structure incorrect")
                return False
        else:
            print(f"❌ FAIL - Expected 200, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ FAIL - Exception: {str(e)}")
        return False

def test_admin_event_requests_status_filter():
    """Test 7: GET /api/admin/event-requests?status=Pending - Status filter"""
    print("\n" + "="*80)
    print("TEST 7: GET /api/admin/event-requests?status=Pending - Status Filter")
    print("="*80)
    
    try:
        url = f"{BASE_URL}/admin/event-requests?status=Pending"
        headers = get_basic_auth_header()
        
        print(f"GET {url}")
        print(f"Authorization: Basic {ADMIN_USERNAME}:{ADMIN_PASSWORD}")
        
        response = requests.get(url, headers=headers, timeout=30)
        
        print(f"Status Code: {response.status_code}")
        data = response.json()
        print(f"Response: {json.dumps(data, indent=2)}")
        
        if response.status_code == 200:
            if data.get("success") and "requests" in data:
                # Verify all returned requests have status "Pending"
                all_pending = all(req.get("status") == "Pending" for req in data["requests"])
                if all_pending:
                    print(f"✅ PASS - Status filter working, returned {len(data['requests'])} Pending requests")
                else:
                    print("❌ FAIL - Some requests don't have status 'Pending'")
            else:
                print("❌ FAIL - Response structure incorrect")
        else:
            print(f"❌ FAIL - Expected 200, got {response.status_code}")
            
    except Exception as e:
        print(f"❌ FAIL - Exception: {str(e)}")

def test_update_status_no_auth(request_id):
    """Test 8: PATCH /api/admin/event-requests/update-status/{id} - Without Authorization"""
    print("\n" + "="*80)
    print("TEST 8: PATCH /api/admin/event-requests/update-status/{id} - Without Authorization")
    print("="*80)
    
    try:
        url = f"{BASE_URL}/admin/event-requests/update-status/{request_id}"
        payload = {"status": "Confirmed"}
        headers = {"Content-Type": "application/json"}
        
        print(f"PATCH {url}")
        print(f"Payload: {json.dumps(payload, indent=2)}")
        print("No Authorization header")
        
        response = requests.patch(url, json=payload, headers=headers, timeout=30)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 401:
            print("✅ PASS - Correctly returned 401 without auth")
        else:
            print(f"❌ FAIL - Expected 401, got {response.status_code}")
            
    except Exception as e:
        print(f"❌ FAIL - Exception: {str(e)}")

def test_update_status_confirmed(request_id):
    """Test 9: PATCH /api/admin/event-requests/update-status/{id} - Status Confirmed"""
    print("\n" + "="*80)
    print("TEST 9: PATCH /api/admin/event-requests/update-status/{id} - Status Confirmed")
    print("="*80)
    
    try:
        url = f"{BASE_URL}/admin/event-requests/update-status/{request_id}"
        payload = {"status": "Confirmed"}
        headers = {**get_basic_auth_header(), "Content-Type": "application/json"}
        
        print(f"PATCH {url}")
        print(f"Payload: {json.dumps(payload, indent=2)}")
        print(f"Authorization: Basic {ADMIN_USERNAME}:{ADMIN_PASSWORD}")
        
        response = requests.patch(url, json=payload, headers=headers, timeout=30)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success"):
                print("✅ PASS - Status updated to Confirmed")
                
                # Verify the status was actually updated
                verify_url = f"{BASE_URL}/admin/event-requests"
                verify_response = requests.get(verify_url, headers=get_basic_auth_header(), timeout=30)
                if verify_response.status_code == 200:
                    verify_data = verify_response.json()
                    matching_req = next((r for r in verify_data.get("requests", []) if r.get("id") == request_id), None)
                    if matching_req and matching_req.get("status") == "Confirmed":
                        print("✅ PASS - Verified status is now 'Confirmed' in database")
                    else:
                        print("❌ FAIL - Status not updated in database")
            else:
                print("❌ FAIL - Response should have success:true")
        else:
            print(f"❌ FAIL - Expected 200, got {response.status_code}")
            
    except Exception as e:
        print(f"❌ FAIL - Exception: {str(e)}")

def test_update_status_declined(request_id):
    """Test 10: PATCH /api/admin/event-requests/update-status/{id} - Status Declined"""
    print("\n" + "="*80)
    print("TEST 10: PATCH /api/admin/event-requests/update-status/{id} - Status Declined")
    print("="*80)
    
    try:
        url = f"{BASE_URL}/admin/event-requests/update-status/{request_id}"
        payload = {"status": "Declined"}
        headers = {**get_basic_auth_header(), "Content-Type": "application/json"}
        
        print(f"PATCH {url}")
        print(f"Payload: {json.dumps(payload, indent=2)}")
        print(f"Authorization: Basic {ADMIN_USERNAME}:{ADMIN_PASSWORD}")
        
        response = requests.patch(url, json=payload, headers=headers, timeout=30)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success"):
                print("✅ PASS - Status updated to Declined")
            else:
                print("❌ FAIL - Response should have success:true")
        else:
            print(f"❌ FAIL - Expected 200, got {response.status_code}")
            
    except Exception as e:
        print(f"❌ FAIL - Exception: {str(e)}")

def test_update_status_invalid(request_id):
    """Test 11: PATCH /api/admin/event-requests/update-status/{id} - Invalid status"""
    print("\n" + "="*80)
    print("TEST 11: PATCH /api/admin/event-requests/update-status/{id} - Invalid Status")
    print("="*80)
    
    try:
        url = f"{BASE_URL}/admin/event-requests/update-status/{request_id}"
        payload = {"status": "Bogus"}
        headers = {**get_basic_auth_header(), "Content-Type": "application/json"}
        
        print(f"PATCH {url}")
        print(f"Payload: {json.dumps(payload, indent=2)}")
        print(f"Authorization: Basic {ADMIN_USERNAME}:{ADMIN_PASSWORD}")
        
        response = requests.patch(url, json=payload, headers=headers, timeout=30)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 400:
            data = response.json()
            if not data.get("success"):
                print("✅ PASS - Correctly rejected invalid status with 400")
            else:
                print("❌ FAIL - Response should have success:false")
        else:
            print(f"❌ FAIL - Expected 400, got {response.status_code}")
            
    except Exception as e:
        print(f"❌ FAIL - Exception: {str(e)}")

def test_update_status_unknown_id():
    """Test 12: PATCH /api/admin/event-requests/update-status/{id} - Unknown ID"""
    print("\n" + "="*80)
    print("TEST 12: PATCH /api/admin/event-requests/update-status/{id} - Unknown ID")
    print("="*80)
    
    try:
        fake_id = "00000000-0000-0000-0000-000000000000"
        url = f"{BASE_URL}/admin/event-requests/update-status/{fake_id}"
        payload = {"status": "Confirmed"}
        headers = {**get_basic_auth_header(), "Content-Type": "application/json"}
        
        print(f"PATCH {url}")
        print(f"Payload: {json.dumps(payload, indent=2)}")
        print(f"Authorization: Basic {ADMIN_USERNAME}:{ADMIN_PASSWORD}")
        
        response = requests.patch(url, json=payload, headers=headers, timeout=30)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 404:
            data = response.json()
            if not data.get("success"):
                print("✅ PASS - Correctly returned 404 for unknown ID")
            else:
                print("❌ FAIL - Response should have success:false")
        else:
            print(f"❌ FAIL - Expected 404, got {response.status_code}")
            
    except Exception as e:
        print(f"❌ FAIL - Exception: {str(e)}")

def verify_mongodb_persistence(request_id):
    """Test 13: Verify MongoDB persistence"""
    print("\n" + "="*80)
    print("TEST 13: Verify MongoDB Persistence")
    print("="*80)
    
    try:
        from pymongo import MongoClient
        
        client = MongoClient("mongodb://localhost:27017")
        db = client["sgital_website"]
        collection = db["event_requests"]
        
        # Find the request we created
        doc = collection.find_one({"id": request_id})
        
        if doc:
            print(f"✅ PASS - Document found in MongoDB")
            print(f"Document fields:")
            print(f"  - id: {doc.get('id')}")
            print(f"  - event_slug: {doc.get('event_slug')}")
            print(f"  - status: {doc.get('status')}")
            print(f"  - first_name: {doc.get('first_name')}")
            print(f"  - email: {doc.get('email')}")
            print(f"  - submitted_at: {doc.get('submitted_at')}")
            print(f"  - email_sent: {doc.get('email_sent')}")
            
            # Verify required fields
            if (doc.get('event_slug') == 'kl-risk-ai-governance' and
                doc.get('submitted_at') and
                'email_sent' in doc):
                print("✅ PASS - All required fields present with correct values")
            else:
                print("❌ FAIL - Some required fields missing or incorrect")
        else:
            print(f"❌ FAIL - Document not found in MongoDB")
            
        client.close()
        
    except Exception as e:
        print(f"❌ FAIL - Exception: {str(e)}")

def main():
    """Run all tests"""
    print("\n" + "="*80)
    print("EVENT INVITATION REQUEST ENDPOINTS - BACKEND API TESTING")
    print("="*80)
    print(f"Base URL: {BASE_URL}")
    print(f"Admin Credentials: {ADMIN_USERNAME} / {ADMIN_PASSWORD}")
    print(f"Test Time: {datetime.now().isoformat()}")
    
    # Test 1: Happy path - create a request
    request_id = test_event_request_happy_path()
    
    # Test 2-4: Validation tests
    test_event_request_missing_field()
    test_event_request_invalid_email()
    test_event_request_consent_false()
    
    # Test 5-7: Admin list endpoint
    test_admin_event_requests_no_auth()
    test_admin_event_requests_with_auth()
    test_admin_event_requests_status_filter()
    
    if request_id:
        # Test 8-12: Update status endpoint
        test_update_status_no_auth(request_id)
        test_update_status_confirmed(request_id)
        test_update_status_declined(request_id)
        test_update_status_invalid(request_id)
        test_update_status_unknown_id()
        
        # Test 13: MongoDB verification
        verify_mongodb_persistence(request_id)
    else:
        print("\n⚠️  Skipping update status tests - no valid request_id from happy path test")
    
    print("\n" + "="*80)
    print("TESTING COMPLETE")
    print("="*80)

if __name__ == "__main__":
    main()
