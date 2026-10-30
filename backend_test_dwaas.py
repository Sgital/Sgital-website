#!/usr/bin/env python3
"""
Backend API test for DWaaS Consultation endpoint
Tests POST /api/dwaas/consultation
"""

import requests
import json
from datetime import datetime
from pymongo import MongoClient
import os

# Configuration
BASE_URL = "https://nextjs-dev-7.preview.emergentagent.com/api"
MONGO_URL = "mongodb://localhost:27017"
DB_NAME = "sgital_website"

def get_mongo_db():
    """Get MongoDB database connection"""
    client = MongoClient(MONGO_URL)
    return client[DB_NAME]

def test_dwaas_happy_path():
    """Test 1: POST /api/dwaas/consultation - Happy path with all fields"""
    print("\n" + "="*80)
    print("TEST 1: POST /api/dwaas/consultation - Happy Path")
    print("="*80)
    
    try:
        url = f"{BASE_URL}/dwaas/consultation"
        payload = {
            "name": "Jane Doe",
            "email": "jane@acme.com",
            "company": "Acme Pte Ltd",
            "country": "Singapore",
            "modules": ["ITSM", "CSM"],
            "message": "We need post go-live support"
        }
        headers = {"Content-Type": "application/json"}
        
        print(f"POST {url}")
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200:
            data = response.json()
            if (data.get("success") == True and 
                data.get("request_id") and 
                data.get("name") == "Jane Doe"):
                print("✅ PASS - Request created successfully with correct response structure")
                
                # Verify MongoDB persistence
                request_id = data.get("request_id")
                db = get_mongo_db()
                doc = db.dwaas_requests.find_one({"id": request_id})
                
                if doc:
                    print(f"\n📊 MongoDB Verification:")
                    print(f"  - Document found: ✅")
                    print(f"  - status: {doc.get('status')} (expected: 'New')")
                    print(f"  - submitted_at: {doc.get('submitted_at')}")
                    print(f"  - modules: {doc.get('modules')} (expected: ['ITSM', 'CSM'])")
                    print(f"  - email_sent field present: {'email_sent' in doc}")
                    
                    if (doc.get('status') == 'New' and 
                        doc.get('submitted_at') and 
                        doc.get('modules') == ["ITSM", "CSM"] and
                        'email_sent' in doc):
                        print("✅ PASS - MongoDB document structure correct")
                        return request_id
                    else:
                        print("❌ FAIL - MongoDB document structure incorrect")
                        return None
                else:
                    print("❌ FAIL - Document not found in MongoDB")
                    return None
            else:
                print("❌ FAIL - Response structure incorrect")
                print(f"  Expected: success=true, request_id present, name='Jane Doe'")
                print(f"  Got: success={data.get('success')}, request_id={data.get('request_id')}, name={data.get('name')}")
                return None
        else:
            print(f"❌ FAIL - Expected 200, got {response.status_code}")
            return None
            
    except Exception as e:
        print(f"❌ FAIL - Exception: {str(e)}")
        import traceback
        traceback.print_exc()
        return None

def test_dwaas_missing_company():
    """Test 2: POST /api/dwaas/consultation - Missing company"""
    print("\n" + "="*80)
    print("TEST 2: POST /api/dwaas/consultation - Missing Company (Validation)")
    print("="*80)
    
    try:
        url = f"{BASE_URL}/dwaas/consultation"
        payload = {
            "name": "John Smith",
            "email": "john@example.com",
            # "company": missing
            "country": "Malaysia",
            "modules": ["ITSM"],
            "message": "Test message"
        }
        headers = {"Content-Type": "application/json"}
        
        print(f"POST {url}")
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 400:
            data = response.json()
            if data.get("success") == False:
                print("✅ PASS - Correctly rejected missing company with 400 and success:false")
                return True
            else:
                print("❌ FAIL - Response should have success:false")
                return False
        else:
            print(f"❌ FAIL - Expected 400, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ FAIL - Exception: {str(e)}")
        return False

def test_dwaas_missing_country():
    """Test 3: POST /api/dwaas/consultation - Missing country"""
    print("\n" + "="*80)
    print("TEST 3: POST /api/dwaas/consultation - Missing Country (Validation)")
    print("="*80)
    
    try:
        url = f"{BASE_URL}/dwaas/consultation"
        payload = {
            "name": "Alice Wong",
            "email": "alice@company.com",
            "company": "Tech Solutions Ltd",
            # "country": missing
            "modules": ["CSM"],
            "message": "Need consultation"
        }
        headers = {"Content-Type": "application/json"}
        
        print(f"POST {url}")
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 400:
            data = response.json()
            if data.get("success") == False:
                print("✅ PASS - Correctly rejected missing country with 400 and success:false")
                return True
            else:
                print("❌ FAIL - Response should have success:false")
                return False
        else:
            print(f"❌ FAIL - Expected 400, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ FAIL - Exception: {str(e)}")
        return False

def test_dwaas_invalid_email():
    """Test 4: POST /api/dwaas/consultation - Invalid email"""
    print("\n" + "="*80)
    print("TEST 4: POST /api/dwaas/consultation - Invalid Email (Validation)")
    print("="*80)
    
    try:
        url = f"{BASE_URL}/dwaas/consultation"
        payload = {
            "name": "Bob Lee",
            "email": "notanemail",  # Invalid email format
            "company": "Digital Corp",
            "country": "Singapore",
            "modules": ["ITSM", "CSM"],
            "message": "Test"
        }
        headers = {"Content-Type": "application/json"}
        
        print(f"POST {url}")
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 400:
            data = response.json()
            if data.get("success") == False:
                print("✅ PASS - Correctly rejected invalid email with 400 and success:false")
                return True
            else:
                print("❌ FAIL - Response should have success:false")
                return False
        else:
            print(f"❌ FAIL - Expected 400, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ FAIL - Exception: {str(e)}")
        return False

def test_dwaas_missing_name():
    """Test 5: POST /api/dwaas/consultation - Missing name"""
    print("\n" + "="*80)
    print("TEST 5: POST /api/dwaas/consultation - Missing Name (Validation)")
    print("="*80)
    
    try:
        url = f"{BASE_URL}/dwaas/consultation"
        payload = {
            # "name": missing
            "email": "test@example.com",
            "company": "Example Inc",
            "country": "Malaysia",
            "modules": ["ITSM"],
            "message": "Test message"
        }
        headers = {"Content-Type": "application/json"}
        
        print(f"POST {url}")
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 400:
            data = response.json()
            if data.get("success") == False:
                print("✅ PASS - Correctly rejected missing name with 400 and success:false")
                return True
            else:
                print("❌ FAIL - Response should have success:false")
                return False
        else:
            print(f"❌ FAIL - Expected 400, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ FAIL - Exception: {str(e)}")
        return False

def test_dwaas_optional_modules():
    """Test 6: POST /api/dwaas/consultation - Optional modules field"""
    print("\n" + "="*80)
    print("TEST 6: POST /api/dwaas/consultation - Optional Modules (Omitted)")
    print("="*80)
    
    try:
        url = f"{BASE_URL}/dwaas/consultation"
        payload = {
            "name": "Carol Chen",
            "email": "carol@business.com",
            "company": "Business Solutions Pte Ltd",
            "country": "Singapore",
            # "modules": omitted (optional field)
            "message": "Looking for consultation services"
        }
        headers = {"Content-Type": "application/json"}
        
        print(f"POST {url}")
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200:
            data = response.json()
            if (data.get("success") == True and 
                data.get("request_id") and 
                data.get("name") == "Carol Chen"):
                print("✅ PASS - Request accepted without modules field")
                
                # Verify MongoDB persistence - modules should be empty array
                request_id = data.get("request_id")
                db = get_mongo_db()
                doc = db.dwaas_requests.find_one({"id": request_id})
                
                if doc:
                    modules = doc.get('modules')
                    print(f"\n📊 MongoDB Verification:")
                    print(f"  - modules field: {modules}")
                    
                    if modules == []:
                        print("✅ PASS - Modules stored as empty array when omitted")
                        return True
                    else:
                        print(f"❌ FAIL - Expected modules=[], got modules={modules}")
                        return False
                else:
                    print("❌ FAIL - Document not found in MongoDB")
                    return False
            else:
                print("❌ FAIL - Response structure incorrect")
                return False
        else:
            print(f"❌ FAIL - Expected 200, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ FAIL - Exception: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

def main():
    """Run all DWaaS consultation endpoint tests"""
    print("\n" + "="*80)
    print("DWAAS CONSULTATION ENDPOINT TEST SUITE")
    print("="*80)
    print(f"Base URL: {BASE_URL}")
    print(f"MongoDB: {MONGO_URL}/{DB_NAME}")
    print(f"Test Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    results = []
    
    # Test 1: Happy path
    request_id = test_dwaas_happy_path()
    results.append(("Happy Path", request_id is not None))
    
    # Test 2: Missing company
    result = test_dwaas_missing_company()
    results.append(("Missing Company Validation", result))
    
    # Test 3: Missing country
    result = test_dwaas_missing_country()
    results.append(("Missing Country Validation", result))
    
    # Test 4: Invalid email
    result = test_dwaas_invalid_email()
    results.append(("Invalid Email Validation", result))
    
    # Test 5: Missing name
    result = test_dwaas_missing_name()
    results.append(("Missing Name Validation", result))
    
    # Test 6: Optional modules
    result = test_dwaas_optional_modules()
    results.append(("Optional Modules", result))
    
    # Summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {test_name}")
    
    print(f"\nTotal: {passed}/{total} tests passed ({passed*100//total}% success rate)")
    
    if passed == total:
        print("\n🎉 ALL TESTS PASSED!")
        return 0
    else:
        print(f"\n⚠️  {total - passed} test(s) failed")
        return 1

if __name__ == "__main__":
    exit(main())
