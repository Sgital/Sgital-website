"""
Gallery route - serves photo lists from S3 folders.
Uses a short in-memory cache to avoid repeated S3 list_objects calls.
"""
from fastapi import APIRouter, HTTPException
from pathlib import Path
import sys
import time
import re

sys.path.append(str(Path(__file__).parent.parent))
from utils.s3_utils import s3_client, S3_BUCKET_NAME, AWS_REGION

router = APIRouter()

_cache = {"life-at-sgital": {"ts": 0, "data": []}}
_TTL_SECONDS = 300  # 5 minutes


def _titleize(filename_stem: str) -> str:
    # team-outing-bengaluru -> Team Outing Bengaluru
    words = re.split(r'[-_]+', filename_stem)
    title = ' '.join(w.capitalize() for w in words if w)
    # Brand-specific fixes
    title = title.replace('Servicenow', 'ServiceNow')
    title = title.replace('Goai', 'GoAI')
    return title


def _list_folder(prefix: str):
    resp = s3_client.list_objects_v2(Bucket=S3_BUCKET_NAME, Prefix=prefix)
    photos = []
    for obj in resp.get('Contents', []):
        key = obj['Key']
        # skip folder placeholder objects
        if key.endswith('/'):
            continue
        lower = key.lower()
        if not lower.endswith(('.jpg', '.jpeg', '.png', '.webp', '.gif')):
            continue
        filename = key.rsplit('/', 1)[-1]
        stem = filename.rsplit('.', 1)[0]
        photos.append({
            "key": key,
            "url": f"https://{S3_BUCKET_NAME}.s3.{AWS_REGION}.amazonaws.com/{key}",
            "title": _titleize(stem),
            "size": obj.get('Size', 0),
        })
    # sort by title for stable order
    photos.sort(key=lambda p: p['title'])
    return photos


@router.get("/life-at-sgital")
async def life_at_sgital_gallery():
    try:
        now = time.time()
        cached = _cache["life-at-sgital"]
        if cached["data"] and (now - cached["ts"] < _TTL_SECONDS):
            return {"success": True, "count": len(cached["data"]), "photos": cached["data"]}

        photos = _list_folder("images/life-at-sgital/")
        _cache["life-at-sgital"] = {"ts": now, "data": photos}
        return {"success": True, "count": len(photos), "photos": photos}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to list gallery: {str(e)}")
