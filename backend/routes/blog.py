"""Blog routes - public fetch + admin CRUD. Stores posts in MongoDB."""
from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime, timezone
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path
import os
import re
import sys
import uuid

sys.path.append(str(Path(__file__).parent.parent))
from utils.s3_utils import upload_image_to_s3
from routes.admin_auth import verify_admin

ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/')
db_name = os.environ.get('DB_NAME', 'fullstack_app')
client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

router = APIRouter()


# ------- Models -------
class BlogPostIn(BaseModel):
    title: str
    slug: Optional[str] = None
    description: str
    content: str  # HTML produced by WYSIWYG editor
    category: str = "General"
    author: str = "SGITAL Team"
    image: Optional[str] = ""
    read_time: Optional[str] = "4 min read"
    date: Optional[str] = None  # display date e.g. "October 11, 2025"
    published: bool = True


class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    author: Optional[str] = None
    image: Optional[str] = None
    read_time: Optional[str] = None
    date: Optional[str] = None
    published: Optional[bool] = None


# ------- Helpers -------
def slugify(value: str) -> str:
    value = value.lower().strip()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-")


def _doc_to_dict(doc: dict) -> dict:
    # Strip _id, ensure iso strings
    doc = {k: v for k, v in doc.items() if k != "_id"}
    for k in ("created_at", "updated_at"):
        if k in doc and isinstance(doc[k], datetime):
            doc[k] = doc[k].isoformat()
    return doc


async def _ensure_unique_slug(base_slug: str, exclude_id: Optional[str] = None) -> str:
    slug = base_slug or "post"
    suffix = 2
    while True:
        q = {"slug": slug}
        if exclude_id:
            q["id"] = {"$ne": exclude_id}
        existing = await db.blog_posts.find_one(q, {"_id": 0, "id": 1})
        if not existing:
            return slug
        slug = f"{base_slug}-{suffix}"
        suffix += 1


def _display_date_now() -> str:
    return datetime.now(timezone.utc).strftime("%B %-d, %Y") if hasattr(datetime, "strftime") else datetime.now(timezone.utc).isoformat()


# ------- Public endpoints -------
@router.get("/posts")
async def list_posts(category: Optional[str] = None, limit: int = 100):
    q = {"published": True}
    if category and category != "all":
        q["category"] = category
    cursor = db.blog_posts.find(q, {"_id": 0}).sort("created_at", -1).limit(limit)
    posts = [p async for p in cursor]
    return {"success": True, "count": len(posts), "posts": posts}


@router.get("/posts/{slug}")
async def get_post_by_slug(slug: str):
    post = await db.blog_posts.find_one({"slug": slug, "published": True}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"success": True, "post": post}


@router.get("/categories")
async def list_categories():
    cats = await db.blog_posts.distinct("category", {"published": True})
    return {"success": True, "categories": sorted([c for c in cats if c])}


# ------- Admin endpoints -------
@router.get("/admin/posts")
async def admin_list_posts(_: str = Depends(verify_admin)):
    cursor = db.blog_posts.find({}, {"_id": 0}).sort("created_at", -1)
    posts = [p async for p in cursor]
    return {"success": True, "count": len(posts), "posts": posts}


@router.get("/admin/posts/{post_id}")
async def admin_get_post(post_id: str, _: str = Depends(verify_admin)):
    post = await db.blog_posts.find_one({"id": post_id}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"success": True, "post": post}


@router.post("/admin/posts")
async def admin_create_post(payload: BlogPostIn, _: str = Depends(verify_admin)):
    base_slug = slugify(payload.slug) if payload.slug else slugify(payload.title)
    slug = await _ensure_unique_slug(base_slug)

    now = datetime.now(timezone.utc)
    display_date = payload.date or now.strftime("%B %d, %Y").replace(" 0", " ")

    doc = {
        "id": str(uuid.uuid4()),
        "slug": slug,
        "title": payload.title,
        "description": payload.description,
        "content": payload.content,
        "category": payload.category,
        "author": payload.author,
        "image": payload.image or "",
        "read_time": payload.read_time or "4 min read",
        "date": display_date,
        "published": payload.published,
        "created_at": now.isoformat(),
        "updated_at": now.isoformat(),
    }
    await db.blog_posts.insert_one(doc.copy())
    return {"success": True, "post": _doc_to_dict(doc)}


@router.patch("/admin/posts/{post_id}")
async def admin_update_post(post_id: str, payload: BlogPostUpdate, _: str = Depends(verify_admin)):
    existing = await db.blog_posts.find_one({"id": post_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Post not found")

    updates = {k: v for k, v in payload.model_dump(exclude_unset=True).items() if v is not None}

    # Handle slug regeneration
    if "slug" in updates:
        updates["slug"] = await _ensure_unique_slug(slugify(updates["slug"]), exclude_id=post_id)
    elif "title" in updates and not existing.get("slug"):
        updates["slug"] = await _ensure_unique_slug(slugify(updates["title"]), exclude_id=post_id)

    updates["updated_at"] = datetime.now(timezone.utc).isoformat()

    await db.blog_posts.update_one({"id": post_id}, {"$set": updates})
    updated = await db.blog_posts.find_one({"id": post_id}, {"_id": 0})
    return {"success": True, "post": updated}


@router.delete("/admin/posts/{post_id}")
async def admin_delete_post(post_id: str, _: str = Depends(verify_admin)):
    result = await db.blog_posts.delete_one({"id": post_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"success": True, "deleted": post_id}


@router.post("/admin/upload-image")
async def admin_upload_blog_image(file: UploadFile = File(...), _: str = Depends(verify_admin)):
    # Size & type guard
    allowed = {"image/jpeg", "image/png", "image/webp", "image/gif"}
    if file.content_type not in allowed:
        raise HTTPException(status_code=400, detail=f"Unsupported file type: {file.content_type}")
    content = await file.read()
    if len(content) > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File too large (max 10 MB)")

    # Upload to S3 under blog folder
    from utils.s3_utils import upload_file_to_s3
    result = upload_file_to_s3(content, file.filename or "blog-image", folder="images/blog", content_type=file.content_type)
    if not result.get("success"):
        raise HTTPException(status_code=500, detail=result.get("error", "Upload failed"))
    return {"success": True, "url": result["file_url"], "key": result["file_key"]}
