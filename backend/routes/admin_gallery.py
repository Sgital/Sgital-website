"""Admin gallery management - upload/delete photos for Life at Sgital."""
from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from typing import List
from pathlib import Path
import re
import sys
from datetime import datetime, timezone

sys.path.append(str(Path(__file__).parent.parent))
from utils.s3_utils import s3_client, S3_BUCKET_NAME, AWS_REGION
from routes.admin_auth import verify_admin
from routes import gallery as gallery_module

router = APIRouter()

ALLOWED_CONTENT_TYPES = {"image/jpeg", "image/png", "image/webp", "image/gif"}
MAX_BYTES = 10 * 1024 * 1024  # 10 MB
GALLERY_PREFIX = "images/life-at-sgital/"


def _slugify(name: str) -> str:
    name = name.rsplit('.', 1)[0]
    name = name.lower().strip()
    name = re.sub(r'[^a-z0-9]+', '-', name)
    return name.strip('-') or "photo"


def _invalidate_cache():
    """Reset the in-memory cache used by the public gallery endpoint."""
    if "life-at-sgital" in gallery_module._cache:
        gallery_module._cache["life-at-sgital"] = {"ts": 0, "data": []}


@router.get("/life-at-sgital")
async def list_photos(_: str = Depends(verify_admin)):
    """List all gallery photos (admin view)."""
    try:
        resp = s3_client.list_objects_v2(Bucket=S3_BUCKET_NAME, Prefix=GALLERY_PREFIX)
        photos = []
        for obj in resp.get('Contents', []):
            key = obj['Key']
            if key.endswith('/'):
                continue
            if not key.lower().endswith(('.jpg', '.jpeg', '.png', '.webp', '.gif')):
                continue
            photos.append({
                "key": key,
                "url": f"https://{S3_BUCKET_NAME}.s3.{AWS_REGION}.amazonaws.com/{key}",
                "filename": key.rsplit('/', 1)[-1],
                "size": obj.get('Size', 0),
                "last_modified": obj.get('LastModified').isoformat() if obj.get('LastModified') else None,
            })
        photos.sort(key=lambda p: p['filename'])
        return {"success": True, "count": len(photos), "photos": photos}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/life-at-sgital/upload")
async def upload_photos(files: List[UploadFile] = File(...), _: str = Depends(verify_admin)):
    """Upload one or more photos to the Life at Sgital gallery."""
    if not files:
        raise HTTPException(status_code=400, detail="No files provided")

    results = []
    errors = []
    now_tag = datetime.now(timezone.utc).strftime("%Y%m%d%H%M%S")

    for idx, file in enumerate(files):
        if file.content_type not in ALLOWED_CONTENT_TYPES:
            errors.append({"filename": file.filename, "error": f"Unsupported type: {file.content_type}"})
            continue
        content = await file.read()
        if len(content) > MAX_BYTES:
            errors.append({"filename": file.filename, "error": "File too large (max 10 MB)"})
            continue

        ext = (file.filename or "").rsplit('.', 1)[-1].lower() if '.' in (file.filename or '') else 'jpg'
        if ext not in ('jpg', 'jpeg', 'png', 'webp', 'gif'):
            ext = 'jpg'
        slug = _slugify(file.filename or f"photo-{idx}")
        # ensure uniqueness with a timestamp tag
        key = f"{GALLERY_PREFIX}{slug}-{now_tag}-{idx}.{ext}"

        try:
            s3_client.put_object(
                Bucket=S3_BUCKET_NAME,
                Key=key,
                Body=content,
                ContentType=file.content_type,
                CacheControl='public, max-age=31536000',
            )
            results.append({
                "key": key,
                "url": f"https://{S3_BUCKET_NAME}.s3.{AWS_REGION}.amazonaws.com/{key}",
                "filename": file.filename,
                "size": len(content),
            })
        except Exception as e:
            errors.append({"filename": file.filename, "error": str(e)})

    _invalidate_cache()
    return {"success": True, "uploaded": results, "errors": errors, "uploaded_count": len(results)}


@router.delete("/life-at-sgital")
async def delete_photo(key: str, _: str = Depends(verify_admin)):
    """Delete a photo. `key` must start with the gallery prefix (security guard)."""
    if not key.startswith(GALLERY_PREFIX):
        raise HTTPException(status_code=400, detail="Invalid key")
    try:
        s3_client.delete_object(Bucket=S3_BUCKET_NAME, Key=key)
        _invalidate_cache()
        return {"success": True, "deleted": key}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
