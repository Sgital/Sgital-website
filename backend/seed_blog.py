"""
One-time migration of blog posts from the frontend JSON-like JS source into MongoDB.
Run:  python /app/backend/seed_blog.py

Idempotent: uses slug as unique key.
"""
import os
import re
import sys
import json
import uuid
from pathlib import Path
from datetime import datetime, timezone

import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/')
db_name = os.environ.get('DB_NAME', 'fullstack_app')
client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

BLOG_DATA_PATH = Path('/app/frontend/src/data/blogData.js')


def _extract_about_section(text: str) -> str:
    """Extract the aboutSgitalSection string assigned near the top of blogData.js."""
    m = re.search(r"const\s+aboutSgitalSection\s*=\s*`([\s\S]*?)`;", text)
    return m.group(1) if m else ""


def _parse_posts(text: str, about: str) -> list:
    """
    Parse the exported blogPosts array from blogData.js.
    We find each object literal by matching `{ id: N, ... }` blocks inside the array.
    For robustness we use a careful regex-based approach: extract each post object
    by locating `id:` and walking up to the matching closing brace.
    """
    posts = []
    # Find start of array
    start = text.find("export const blogPosts = [")
    if start == -1:
        return posts
    body = text[start:]

    # Find each object by locating `\n    id:` at indent
    indices = [m.start() for m in re.finditer(r"\n\s*\{\n\s*id:\s*\d+", body)]
    for idx, s in enumerate(indices):
        # find the matching closing brace of this object: need to track braces
        i = s
        depth = 0
        started = False
        end = -1
        while i < len(body):
            c = body[i]
            if c == '{':
                depth += 1
                started = True
            elif c == '}':
                depth -= 1
                if started and depth == 0:
                    end = i
                    break
            i += 1
        if end == -1:
            continue
        obj_text = body[s:end + 1]
        post = _parse_single_post(obj_text, about)
        if post:
            posts.append(post)
    return posts


FIELD_RE = {
    "id": r"id\s*:\s*(\d+)",
    "slug": r"slug\s*:\s*['\"]([^'\"]+)['\"]",
    "title": r"title\s*:\s*([\"'])((?:\\.|(?!\1).)*)\1",
    "description": r"description\s*:\s*([\"'])((?:\\.|(?!\1).)*)\1",
    "date": r"date\s*:\s*([\"'])((?:\\.|(?!\1).)*)\1",
    "image": r"image\s*:\s*([\"'])((?:\\.|(?!\1).)*)\1",
    "category": r"category\s*:\s*([\"'])((?:\\.|(?!\1).)*)\1",
    "author": r"author\s*:\s*([\"'])((?:\\.|(?!\1).)*)\1",
    "readTime": r"readTime\s*:\s*([\"'])((?:\\.|(?!\1).)*)\1",
}


def _parse_single_post(obj_text: str, about: str) -> dict | None:
    values = {}
    for field, pattern in FIELD_RE.items():
        m = re.search(pattern, obj_text)
        if not m:
            continue
        if field == "id":
            values[field] = int(m.group(1))
        elif field == "slug":
            values[field] = m.group(1)
        else:
            # group 2 is the string content
            values[field] = m.group(2).replace('\\"', '"').replace("\\'", "'")

    # Extract content (template literal)
    cm = re.search(r"content\s*:\s*`([\s\S]*?)`\s*,\s*date", obj_text)
    if cm:
        content = cm.group(1)
        # Replace ${aboutSgitalSection} interpolation
        content = content.replace("${aboutSgitalSection}", about)
        values["content"] = content.strip()
    else:
        values["content"] = ""

    if "slug" not in values or "title" not in values:
        return None
    return values


async def seed():
    if not BLOG_DATA_PATH.exists():
        print(f"blogData.js not found at {BLOG_DATA_PATH}")
        return

    text = BLOG_DATA_PATH.read_text(encoding="utf-8")
    about = _extract_about_section(text)
    posts = _parse_posts(text, about)
    print(f"Parsed {len(posts)} posts from blogData.js")

    inserted = 0
    skipped = 0
    now = datetime.now(timezone.utc).isoformat()
    for p in posts:
        slug = p["slug"]
        existing = await db.blog_posts.find_one({"slug": slug}, {"_id": 0, "id": 1})
        if existing:
            skipped += 1
            continue
        doc = {
            "id": str(uuid.uuid4()),
            "slug": slug,
            "title": p.get("title", ""),
            "description": p.get("description", ""),
            "content": p.get("content", ""),
            "category": p.get("category", "General"),
            "author": p.get("author", "SGITAL Team"),
            "image": p.get("image", ""),
            "read_time": p.get("readTime", "4 min read"),
            "date": p.get("date", ""),
            "published": True,
            "created_at": now,
            "updated_at": now,
        }
        await db.blog_posts.insert_one(doc)
        inserted += 1
        print(f"  + {slug}")
    print(f"Done. Inserted: {inserted}, Skipped (already exist): {skipped}")


if __name__ == "__main__":
    asyncio.run(seed())
