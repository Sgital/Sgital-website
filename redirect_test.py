#!/usr/bin/env python3
"""
Comprehensive redirect and middleware test for Sgital Next.js application
Tests apex → www redirect logic with loop-safety verification
"""

import requests
import json
import base64
from datetime import datetime
import sys

# Configuration - MUST use localhost:3000 for internal testing
BASE_URL = "http://localhost:3000"
API_BASE_URL = "http://localhost:3000/api"
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

def test_redirect_case_1():
    """Case 1: Host: sgital.com → expect 301 to https://www.sgital.com/about"""
    try:
        headers = {"Host": "sgital.com"}
        response = requests.get(f"{BASE_URL}/about", headers=headers, allow_redirects=False, timeout=10)
        
        # Check status code
        if response.status_code != 301:
            log_test("Redirect Case 1 (apex → www)", False, f"Expected 301, got {response.status_code}")
            return False
        
        # Check Location header
        location = response.headers.get("Location", "")
        expected_location = "https://www.sgital.com/about"
        if location != expected_location:
            log_test("Redirect Case 1 (apex → www)", False, f"Expected Location: {expected_location}, got: {location}")
            return False
        
        # Check debug headers
        middleware_host = response.headers.get("X-Sgital-Middleware-Host", "")
        middleware_xfh = response.headers.get("X-Sgital-Middleware-XFH", "")
        
        details = f"Status: 301, Location: {location}, Middleware-Host: {middleware_host}, Middleware-XFH: {middleware_xfh}"
        log_test("Redirect Case 1 (apex → www)", True, details)
        return True
    except Exception as e:
        log_test("Redirect Case 1 (apex → www)", False, f"Exception: {str(e)}")
        return False

def test_redirect_case_2():
    """Case 2: Host: www.sgital.com → expect 200, NO redirect"""
    try:
        headers = {"Host": "www.sgital.com"}
        response = requests.get(f"{BASE_URL}/about", headers=headers, allow_redirects=False, timeout=10)
        
        # Check status code - should be 200, not 3xx
        if response.status_code >= 300 and response.status_code < 400:
            location = response.headers.get("Location", "")
            log_test("Redirect Case 2 (www - no redirect)", False, f"LOOP RISK: Got {response.status_code} redirect to {location}, expected 200")
            return False
        
        if response.status_code != 200:
            log_test("Redirect Case 2 (www - no redirect)", False, f"Expected 200, got {response.status_code}")
            return False
        
        # Verify NO Location header
        location = response.headers.get("Location", "")
        if location:
            log_test("Redirect Case 2 (www - no redirect)", False, f"LOOP RISK: Unexpected Location header: {location}")
            return False
        
        # Check debug headers
        middleware_host = response.headers.get("X-Sgital-Middleware-Host", "")
        middleware_xfh = response.headers.get("X-Sgital-Middleware-XFH", "")
        
        details = f"Status: 200, No redirect, Middleware-Host: {middleware_host}, Middleware-XFH: {middleware_xfh}"
        log_test("Redirect Case 2 (www - no redirect)", True, details)
        return True
    except Exception as e:
        log_test("Redirect Case 2 (www - no redirect)", False, f"Exception: {str(e)}")
        return False

def test_redirect_case_3():
    """Case 3: Host: www.sgital.com + XFH: sgital.com → expect 200 (LOOP-SAFE - CRITICAL)"""
    try:
        headers = {
            "Host": "www.sgital.com",
            "X-Forwarded-Host": "sgital.com"
        }
        response = requests.get(f"{BASE_URL}/about", headers=headers, allow_redirects=False, timeout=10)
        
        # Check status code - should be 200, not 3xx
        if response.status_code >= 300 and response.status_code < 400:
            location = response.headers.get("Location", "")
            log_test("Redirect Case 3 (LOOP-SAFE: www Host + apex XFH)", False, f"LOOP RISK: Got {response.status_code} redirect to {location}, expected 200")
            return False
        
        if response.status_code != 200:
            log_test("Redirect Case 3 (LOOP-SAFE: www Host + apex XFH)", False, f"Expected 200, got {response.status_code}")
            return False
        
        # Verify NO Location header
        location = response.headers.get("Location", "")
        if location:
            log_test("Redirect Case 3 (LOOP-SAFE: www Host + apex XFH)", False, f"LOOP RISK: Unexpected Location header: {location}")
            return False
        
        # Check debug headers
        middleware_host = response.headers.get("X-Sgital-Middleware-Host", "")
        middleware_xfh = response.headers.get("X-Sgital-Middleware-XFH", "")
        
        details = f"Status: 200, No redirect (LOOP-SAFE), Middleware-Host: {middleware_host}, Middleware-XFH: {middleware_xfh}"
        log_test("Redirect Case 3 (LOOP-SAFE: www Host + apex XFH)", True, details)
        return True
    except Exception as e:
        log_test("Redirect Case 3 (LOOP-SAFE: www Host + apex XFH)", False, f"Exception: {str(e)}")
        return False

def test_redirect_case_4():
    """Case 4: Host: sgital.com + XFH: www.sgital.com → expect 200 (LOOP-SAFE)"""
    try:
        headers = {
            "Host": "sgital.com",
            "X-Forwarded-Host": "www.sgital.com"
        }
        response = requests.get(f"{BASE_URL}/about", headers=headers, allow_redirects=False, timeout=10)
        
        # Check status code - should be 200, not 3xx
        if response.status_code >= 300 and response.status_code < 400:
            location = response.headers.get("Location", "")
            log_test("Redirect Case 4 (LOOP-SAFE: apex Host + www XFH)", False, f"LOOP RISK: Got {response.status_code} redirect to {location}, expected 200")
            return False
        
        if response.status_code != 200:
            log_test("Redirect Case 4 (LOOP-SAFE: apex Host + www XFH)", False, f"Expected 200, got {response.status_code}")
            return False
        
        # Verify NO Location header
        location = response.headers.get("Location", "")
        if location:
            log_test("Redirect Case 4 (LOOP-SAFE: apex Host + www XFH)", False, f"LOOP RISK: Unexpected Location header: {location}")
            return False
        
        # Check debug headers
        middleware_host = response.headers.get("X-Sgital-Middleware-Host", "")
        middleware_xfh = response.headers.get("X-Sgital-Middleware-XFH", "")
        
        details = f"Status: 200, No redirect (LOOP-SAFE), Middleware-Host: {middleware_host}, Middleware-XFH: {middleware_xfh}"
        log_test("Redirect Case 4 (LOOP-SAFE: apex Host + www XFH)", True, details)
        return True
    except Exception as e:
        log_test("Redirect Case 4 (LOOP-SAFE: apex Host + www XFH)", False, f"Exception: {str(e)}")
        return False

def test_redirect_case_5():
    """Case 5: Host: nextjs-dev-7.emergent.host → expect 200 (unrelated host)"""
    try:
        headers = {"Host": "nextjs-dev-7.emergent.host"}
        response = requests.get(f"{BASE_URL}/about", headers=headers, allow_redirects=False, timeout=10)
        
        # Check status code - should be 200, not 3xx
        if response.status_code >= 300 and response.status_code < 400:
            location = response.headers.get("Location", "")
            log_test("Redirect Case 5 (unrelated host)", False, f"Got {response.status_code} redirect to {location}, expected 200")
            return False
        
        if response.status_code != 200:
            log_test("Redirect Case 5 (unrelated host)", False, f"Expected 200, got {response.status_code}")
            return False
        
        # Verify NO Location header
        location = response.headers.get("Location", "")
        if location:
            log_test("Redirect Case 5 (unrelated host)", False, f"Unexpected Location header: {location}")
            return False
        
        # Check debug headers
        middleware_host = response.headers.get("X-Sgital-Middleware-Host", "")
        middleware_xfh = response.headers.get("X-Sgital-Middleware-XFH", "")
        
        details = f"Status: 200, No redirect, Middleware-Host: {middleware_host}, Middleware-XFH: {middleware_xfh}"
        log_test("Redirect Case 5 (unrelated host)", True, details)
        return True
    except Exception as e:
        log_test("Redirect Case 5 (unrelated host)", False, f"Exception: {str(e)}")
        return False

def test_redirect_case_6():
    """Case 6: Host: sgital.com + query string → expect 301 with query preserved"""
    try:
        headers = {"Host": "sgital.com"}
        response = requests.get(f"{BASE_URL}/solutions?category=ai", headers=headers, allow_redirects=False, timeout=10)
        
        # Check status code
        if response.status_code != 301:
            log_test("Redirect Case 6 (query preservation)", False, f"Expected 301, got {response.status_code}")
            return False
        
        # Check Location header - query string should be preserved
        location = response.headers.get("Location", "")
        expected_location = "https://www.sgital.com/solutions?category=ai"
        if location != expected_location:
            log_test("Redirect Case 6 (query preservation)", False, f"Expected Location: {expected_location}, got: {location}")
            return False
        
        # Check debug headers
        middleware_host = response.headers.get("X-Sgital-Middleware-Host", "")
        middleware_xfh = response.headers.get("X-Sgital-Middleware-XFH", "")
        
        details = f"Status: 301, Location: {location}, Query preserved, Middleware-Host: {middleware_host}, Middleware-XFH: {middleware_xfh}"
        log_test("Redirect Case 6 (query preservation)", True, details)
        return True
    except Exception as e:
        log_test("Redirect Case 6 (query preservation)", False, f"Exception: {str(e)}")
        return False

def test_redirect_case_7():
    """Case 7: Legacy WP redirect /servicenow-solutions/itsm/ → /solutions?category=technology"""
    try:
        # This should be handled by the app routing, not middleware
        response = requests.get(f"{BASE_URL}/servicenow-solutions/itsm/", allow_redirects=False, timeout=10)
        
        # Check status code
        if response.status_code != 301:
            log_test("Redirect Case 7 (legacy WP redirect)", False, f"Expected 301, got {response.status_code}")
            return False
        
        # Check Location header
        location = response.headers.get("Location", "")
        expected_location = "/solutions?category=technology"
        if location != expected_location:
            log_test("Redirect Case 7 (legacy WP redirect)", False, f"Expected Location: {expected_location}, got: {location}")
            return False
        
        details = f"Status: 301, Location: {location}, Legacy redirect working"
        log_test("Redirect Case 7 (legacy WP redirect)", True, details)
        return True
    except Exception as e:
        log_test("Redirect Case 7 (legacy WP redirect)", False, f"Exception: {str(e)}")
        return False

# Regression tests for previously passing endpoints

def test_regression_api_health():
    """Regression: GET /api/ → 200 with status ok"""
    try:
        response = requests.get(f"{API_BASE_URL}/", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get("message") == "Sgital API" and data.get("status") == "ok":
                log_test("Regression: API Health Check", True, f"Response: {data}")
                return True
            else:
                log_test("Regression: API Health Check", False, f"Unexpected response: {data}")
                return False
        else:
            log_test("Regression: API Health Check", False, f"Status: {response.status_code}")
            return False
    except Exception as e:
        log_test("Regression: API Health Check", False, f"Exception: {str(e)}")
        return False

def test_regression_admin_verify_no_auth():
    """Regression: GET /api/admin/verify (no auth) → 401, NO www-authenticate header"""
    try:
        response = requests.get(f"{API_BASE_URL}/admin/verify", timeout=10)
        if response.status_code != 401:
            log_test("Regression: Admin Verify No Auth", False, f"Expected 401, got {response.status_code}")
            return False
        
        # CRITICAL: Verify NO www-authenticate header (this was the bug fix)
        www_auth = response.headers.get("WWW-Authenticate", "")
        if www_auth:
            log_test("Regression: Admin Verify No Auth", False, f"FAIL: Found WWW-Authenticate header: {www_auth} (should be absent)")
            return False
        
        log_test("Regression: Admin Verify No Auth", True, "401 returned, NO WWW-Authenticate header (correct)")
        return True
    except Exception as e:
        log_test("Regression: Admin Verify No Auth", False, f"Exception: {str(e)}")
        return False

def test_regression_admin_verify_with_auth():
    """Regression: GET /api/admin/verify with auth → 200"""
    try:
        response = requests.get(f"{API_BASE_URL}/admin/verify", headers=HEADERS_AUTH, timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get("authenticated") == True and data.get("username") == "webadmin":
                log_test("Regression: Admin Verify With Auth", True, f"Authenticated as {data.get('username')}")
                return True
            else:
                log_test("Regression: Admin Verify With Auth", False, f"Response: {data}")
                return False
        else:
            log_test("Regression: Admin Verify With Auth", False, f"Status: {response.status_code}")
            return False
    except Exception as e:
        log_test("Regression: Admin Verify With Auth", False, f"Exception: {str(e)}")
        return False

def test_regression_gallery():
    """Regression: GET /api/gallery/life-at-sgital → 200 with photos"""
    try:
        response = requests.get(f"{API_BASE_URL}/gallery/life-at-sgital", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and "photos" in data and len(data["photos"]) > 0:
                log_test("Regression: Gallery", True, f"Retrieved {len(data['photos'])} photos")
                return True
            else:
                log_test("Regression: Gallery", False, f"No photos or unexpected response: {data}")
                return False
        else:
            log_test("Regression: Gallery", False, f"Status: {response.status_code}")
            return False
    except Exception as e:
        log_test("Regression: Gallery", False, f"Exception: {str(e)}")
        return False

def test_regression_contact_list():
    """Regression: GET /api/contact/list with auth → 200"""
    try:
        response = requests.get(f"{API_BASE_URL}/contact/list", headers=HEADERS_AUTH, timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and "contacts" in data:
                log_test("Regression: Contact List", True, f"Retrieved {len(data['contacts'])} contacts")
                return True
            else:
                log_test("Regression: Contact List", False, f"Unexpected response: {data}")
                return False
        else:
            log_test("Regression: Contact List", False, f"Status: {response.status_code}")
            return False
    except Exception as e:
        log_test("Regression: Contact List", False, f"Exception: {str(e)}")
        return False

def test_regression_contact_submit():
    """Regression: POST /api/contact/submit → 200 with email_message_id"""
    try:
        form_data = {
            "name": "Test User",
            "email": "info@sgital.com",
            "company": "Test Company",
            "phone": "+91-9876543210",
            "subject": "Test Subject",
            "message": "Test message for regression testing"
        }
        
        response = requests.post(f"{API_BASE_URL}/contact/submit", data=form_data, timeout=15)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and data.get("email_message_id"):
                log_test("Regression: Contact Submit", True, f"Email Message ID: {data['email_message_id']}")
                return True
            else:
                log_test("Regression: Contact Submit", False, f"Missing fields: {data}")
                return False
        else:
            log_test("Regression: Contact Submit", False, f"Status: {response.status_code}")
            return False
    except Exception as e:
        log_test("Regression: Contact Submit", False, f"Exception: {str(e)}")
        return False

def test_regression_applications_list():
    """Regression: GET /api/applications/list with auth → 200"""
    try:
        response = requests.get(f"{API_BASE_URL}/applications/list", headers=HEADERS_AUTH, timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and "applications" in data:
                log_test("Regression: Applications List", True, f"Retrieved {len(data['applications'])} applications")
                return True
            else:
                log_test("Regression: Applications List", False, f"Unexpected response: {data}")
                return False
        else:
            log_test("Regression: Applications List", False, f"Status: {response.status_code}")
            return False
    except Exception as e:
        log_test("Regression: Applications List", False, f"Exception: {str(e)}")
        return False

def main():
    """Run all redirect and regression tests"""
    print("=" * 80)
    print("SGITAL REDIRECT & MIDDLEWARE TEST SUITE")
    print("=" * 80)
    print(f"Base URL: {BASE_URL}")
    print(f"API Base URL: {API_BASE_URL}")
    print("=" * 80)
    print()
    
    # REDIRECT MATRIX TESTS (7 cases)
    print("=" * 80)
    print("REDIRECT MATRIX TESTS (LOOP-SAFETY VERIFICATION)")
    print("=" * 80)
    print()
    
    print("TEST 1: Apex → www redirect")
    test_redirect_case_1()
    print()
    
    print("TEST 2: www host (no redirect)")
    test_redirect_case_2()
    print()
    
    print("TEST 3: CRITICAL LOOP-SAFE - www Host + apex XFH")
    test_redirect_case_3()
    print()
    
    print("TEST 4: LOOP-SAFE - apex Host + www XFH")
    test_redirect_case_4()
    print()
    
    print("TEST 5: Unrelated host (no redirect)")
    test_redirect_case_5()
    print()
    
    print("TEST 6: Query string preservation")
    test_redirect_case_6()
    print()
    
    print("TEST 7: Legacy WP redirect")
    test_redirect_case_7()
    print()
    
    # REGRESSION TESTS
    print("=" * 80)
    print("REGRESSION TESTS (PREVIOUSLY PASSING ENDPOINTS)")
    print("=" * 80)
    print()
    
    print("TEST 8: API Health Check")
    test_regression_api_health()
    print()
    
    print("TEST 9: Admin Verify No Auth (NO WWW-Authenticate header)")
    test_regression_admin_verify_no_auth()
    print()
    
    print("TEST 10: Admin Verify With Auth")
    test_regression_admin_verify_with_auth()
    print()
    
    print("TEST 11: Gallery")
    test_regression_gallery()
    print()
    
    print("TEST 12: Contact List")
    test_regression_contact_list()
    print()
    
    print("TEST 13: Contact Submit")
    test_regression_contact_submit()
    print()
    
    print("TEST 14: Applications List")
    test_regression_applications_list()
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
    
    # Highlight critical loop-safety results
    print("=" * 80)
    print("CRITICAL LOOP-SAFETY VERIFICATION")
    print("=" * 80)
    loop_safe_tests = [r for r in test_results if "LOOP-SAFE" in r["test"]]
    if all(r["passed"] for r in loop_safe_tests):
        print("✅ ALL LOOP-SAFETY TESTS PASSED - No redirect loop risk detected")
    else:
        print("❌ LOOP-SAFETY TESTS FAILED - Redirect loop risk exists!")
        for r in loop_safe_tests:
            if not r["passed"]:
                print(f"  ❌ {r['test']}: {r['details']}")
    print()
    
    print("=" * 80)
    
    # Exit with appropriate code
    sys.exit(0 if failed == 0 else 1)

if __name__ == "__main__":
    main()
