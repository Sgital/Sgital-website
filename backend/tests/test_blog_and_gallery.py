"""
End-to-end backend tests for Blog CMS + Admin Gallery Manager.
Tests run against external REACT_APP_BACKEND_URL via HTTP.
"""
import io
import os
import time
import pytest
import requests
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(Path(__file__).parent.parent / '.env')
# Load frontend env for REACT_APP_BACKEND_URL
_FE_ENV = Path(__file__).parent.parent.parent / 'frontend' / '.env'
if _FE_ENV.exists():
    load_dotenv(_FE_ENV)

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
assert BASE_URL, "REACT_APP_BACKEND_URL must be set"

ADMIN = ('webadmin', 'Sgital2026')
BAD_ADMIN = ('webadmin', 'wrong-pass')


@pytest.fixture(scope='module')
def s():
    return requests.Session()


# ---------- Public Blog ----------
class TestPublicBlog:
    def test_list_posts_returns_9(self, s):
        r = s.get(f"{BASE_URL}/api/blog/posts", timeout=30)
        assert r.status_code == 200
        data = r.json()
        assert data['success'] is True
        assert data['count'] >= 9, f"expected >=9 posts, got {data['count']}"
        assert isinstance(data['posts'], list)
        # Sanity on fields
        p0 = data['posts'][0]
        for k in ('id', 'slug', 'title', 'description', 'content', 'category'):
            assert k in p0

    def test_get_post_by_slug(self, s):
        r = s.get(f"{BASE_URL}/api/blog/posts/sgital-marks-8-years", timeout=30)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data['success'] is True
        assert data['post']['slug'] == 'sgital-marks-8-years'
        assert data['post']['title']
        assert data['post']['content']

    def test_get_post_nonexistent_returns_404(self, s):
        r = s.get(f"{BASE_URL}/api/blog/posts/this-slug-does-not-exist-xyz", timeout=30)
        assert r.status_code == 404

    def test_list_categories(self, s):
        r = s.get(f"{BASE_URL}/api/blog/categories", timeout=30)
        assert r.status_code == 200
        data = r.json()
        assert data['success'] is True
        assert isinstance(data['categories'], list)
        assert len(data['categories']) >= 1


# ---------- Admin Blog ----------
class TestAdminBlog:
    def test_admin_list_requires_auth(self, s):
        r = s.get(f"{BASE_URL}/api/blog/admin/posts", timeout=30)
        assert r.status_code == 401

    def test_admin_list_with_wrong_creds(self, s):
        r = s.get(f"{BASE_URL}/api/blog/admin/posts", auth=BAD_ADMIN, timeout=30)
        assert r.status_code == 401

    def test_admin_list_with_auth(self, s):
        r = s.get(f"{BASE_URL}/api/blog/admin/posts", auth=ADMIN, timeout=30)
        assert r.status_code == 200
        data = r.json()
        assert data['success'] is True
        assert data['count'] >= 9

    def test_create_update_delete_flow(self, s):
        # baseline count
        r0 = s.get(f"{BASE_URL}/api/blog/admin/posts", auth=ADMIN, timeout=30)
        baseline = r0.json()['count']

        # CREATE
        payload = {
            "title": "TEST_Post_Regression_E2E",
            "description": "TEST description",
            "content": "<p>Hello <strong>world</strong></p>",
            "category": "General",
            "published": True,
        }
        r1 = s.post(f"{BASE_URL}/api/blog/admin/posts", json=payload, auth=ADMIN, timeout=30)
        assert r1.status_code == 200, r1.text
        created = r1.json()['post']
        assert created['id']
        assert created['slug'] == 'test-post-regression-e2e'
        post_id = created['id']

        # Verify persisted via GET by slug (public)
        r2 = s.get(f"{BASE_URL}/api/blog/posts/{created['slug']}", timeout=30)
        assert r2.status_code == 200
        assert r2.json()['post']['title'] == payload['title']

        # UPDATE (PATCH)
        r3 = s.patch(
            f"{BASE_URL}/api/blog/admin/posts/{post_id}",
            json={"title": "TEST_Post_Updated", "description": "updated desc"},
            auth=ADMIN, timeout=30,
        )
        assert r3.status_code == 200
        assert r3.json()['post']['title'] == 'TEST_Post_Updated'
        assert r3.json()['post']['description'] == 'updated desc'

        # DELETE
        r4 = s.delete(f"{BASE_URL}/api/blog/admin/posts/{post_id}", auth=ADMIN, timeout=30)
        assert r4.status_code == 200
        assert r4.json()['deleted'] == post_id

        # Count restored
        r5 = s.get(f"{BASE_URL}/api/blog/admin/posts", auth=ADMIN, timeout=30)
        assert r5.json()['count'] == baseline

    def test_duplicate_slug_appends_suffix(self, s):
        # First post
        p1 = {"title": "TEST_DupSlug_Post", "description": "d", "content": "<p>x</p>"}
        r1 = s.post(f"{BASE_URL}/api/blog/admin/posts", json=p1, auth=ADMIN, timeout=30)
        assert r1.status_code == 200
        slug1 = r1.json()['post']['slug']
        id1 = r1.json()['post']['id']

        # Second post, same title -> should get -2 suffix
        r2 = s.post(f"{BASE_URL}/api/blog/admin/posts", json=p1, auth=ADMIN, timeout=30)
        assert r2.status_code == 200
        slug2 = r2.json()['post']['slug']
        id2 = r2.json()['post']['id']

        try:
            assert slug1 == 'test-dupslug-post'
            assert slug2 == 'test-dupslug-post-2', f"expected -2 suffix, got {slug2}"
        finally:
            s.delete(f"{BASE_URL}/api/blog/admin/posts/{id1}", auth=ADMIN, timeout=30)
            s.delete(f"{BASE_URL}/api/blog/admin/posts/{id2}", auth=ADMIN, timeout=30)


# ---------- Blog image upload ----------
def _jpeg_bytes(size_bytes=1024):
    # Minimal JPEG header + padding
    header = bytes.fromhex('ffd8ffe000104a46494600010100000100010000ffdb004300080606070605080707070909080a0c140d0c0b0b0c1912130f141d1a1f1e1d1a1c1c20242e2720222c231c1c28372c2e2f3534353b3b2c3d4e3d3a4e2d3b3534ffc0000b0800010001010122000011ffc4001f0000010501010101010100000000000000000102030405060708090a0bffda0008010100003f00fbd0ffd9')
    pad = b'\x00' * max(0, size_bytes - len(header))
    return header + pad


class TestBlogImageUpload:
    def test_upload_requires_auth(self, s):
        files = {'file': ('x.jpg', _jpeg_bytes(), 'image/jpeg')}
        r = s.post(f"{BASE_URL}/api/blog/admin/upload-image", files=files, timeout=30)
        assert r.status_code == 401

    def test_upload_small_jpg(self, s):
        files = {'file': ('test_blog.jpg', _jpeg_bytes(2048), 'image/jpeg')}
        r = s.post(f"{BASE_URL}/api/blog/admin/upload-image", files=files, auth=ADMIN, timeout=60)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data['success'] is True
        assert data['url'].startswith('https://')
        assert 'images/blog' in data['key']

    def test_upload_rejects_txt(self, s):
        files = {'file': ('bad.txt', b'hello', 'text/plain')}
        r = s.post(f"{BASE_URL}/api/blog/admin/upload-image", files=files, auth=ADMIN, timeout=30)
        assert r.status_code == 400

    def test_upload_rejects_over_10mb(self, s):
        big = _jpeg_bytes(11 * 1024 * 1024)
        files = {'file': ('big.jpg', big, 'image/jpeg')}
        r = s.post(f"{BASE_URL}/api/blog/admin/upload-image", files=files, auth=ADMIN, timeout=120)
        assert r.status_code == 400


# ---------- Admin Gallery ----------
class TestAdminGallery:
    def test_list_requires_auth(self, s):
        r = s.get(f"{BASE_URL}/api/admin/gallery/life-at-sgital", timeout=30)
        assert r.status_code == 401

    def test_list_with_auth(self, s):
        r = s.get(f"{BASE_URL}/api/admin/gallery/life-at-sgital", auth=ADMIN, timeout=60)
        assert r.status_code == 200
        data = r.json()
        assert data['success'] is True
        assert data['count'] >= 1
        assert isinstance(data['photos'], list)

    def test_upload_delete_flow_and_cache_invalidation(self, s):
        # get baseline counts (admin + public)
        r_admin0 = s.get(f"{BASE_URL}/api/admin/gallery/life-at-sgital", auth=ADMIN, timeout=60)
        baseline_admin = r_admin0.json()['count']

        r_pub0 = s.get(f"{BASE_URL}/api/gallery/life-at-sgital", timeout=60)
        assert r_pub0.status_code == 200
        baseline_pub = r_pub0.json()['count']

        # upload one file
        img_path = Path('/tmp/life-gallery/Holi Festival Celebration.jpg')
        if not img_path.exists():
            # fallback
            candidates = list(Path('/tmp/life-gallery').glob('*.jpg'))
            assert candidates, "no test image available"
            img_path = candidates[0]
        with open(img_path, 'rb') as f:
            payload = f.read()
        files = [('files', ('TEST_regression.jpg', payload, 'image/jpeg'))]
        r_up = s.post(
            f"{BASE_URL}/api/admin/gallery/life-at-sgital/upload",
            files=files, auth=ADMIN, timeout=120,
        )
        assert r_up.status_code == 200, r_up.text
        up_data = r_up.json()
        assert up_data['uploaded_count'] == 1
        uploaded_key = up_data['uploaded'][0]['key']
        assert uploaded_key.startswith('images/life-at-sgital/')

        # admin count should increase
        r_admin1 = s.get(f"{BASE_URL}/api/admin/gallery/life-at-sgital", auth=ADMIN, timeout=60)
        assert r_admin1.json()['count'] == baseline_admin + 1

        # public count should reflect (cache invalidated)
        r_pub1 = s.get(f"{BASE_URL}/api/gallery/life-at-sgital", timeout=60)
        assert r_pub1.json()['count'] == baseline_pub + 1, \
            f"cache not invalidated: pub={r_pub1.json()['count']} vs baseline={baseline_pub}"

        # delete it
        r_del = s.delete(
            f"{BASE_URL}/api/admin/gallery/life-at-sgital",
            params={'key': uploaded_key}, auth=ADMIN, timeout=60,
        )
        assert r_del.status_code == 200
        assert r_del.json()['deleted'] == uploaded_key

        # count back to baseline
        r_admin2 = s.get(f"{BASE_URL}/api/admin/gallery/life-at-sgital", auth=ADMIN, timeout=60)
        assert r_admin2.json()['count'] == baseline_admin

    def test_delete_rejects_key_outside_prefix(self, s):
        r = s.delete(
            f"{BASE_URL}/api/admin/gallery/life-at-sgital",
            params={'key': 'images/other/x.jpg'}, auth=ADMIN, timeout=30,
        )
        assert r.status_code == 400


# ---------- Public Gallery ----------
class TestPublicGallery:
    def test_life_at_sgital_public(self, s):
        r = s.get(f"{BASE_URL}/api/gallery/life-at-sgital", timeout=60)
        assert r.status_code == 200
        data = r.json()
        assert data['success'] is True
        assert data['count'] >= 17, f"expected >=17 photos, got {data['count']}"
