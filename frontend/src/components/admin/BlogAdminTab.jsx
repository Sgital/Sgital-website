import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, ExternalLink, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';
import BlogEditor from './BlogEditor';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const BlogAdminTab = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null = no modal, {} = new, {post} = edit
  const [error, setError] = useState('');

  const authHeader = () => `Basic ${localStorage.getItem('adminAuth')}`;

  const fetchPosts = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/blog/admin/posts`, {
        headers: { Authorization: authHeader() },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Failed to load');
      setPosts(data.posts || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (post) => {
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`${API}/blog/admin/posts/${post.id}`, {
        method: 'DELETE',
        headers: { Authorization: authHeader() },
      });
      if (!res.ok) throw new Error('Delete failed');
      fetchPosts();
    } catch (e) {
      alert(e.message);
    }
  };

  const togglePublished = async (post) => {
    try {
      const res = await fetch(`${API}/blog/admin/posts/${post.id}`, {
        method: 'PATCH',
        headers: { Authorization: authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !post.published }),
      });
      if (!res.ok) throw new Error('Update failed');
      fetchPosts();
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div data-testid="blog-admin-tab">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Blog Posts</h2>
          <p className="text-neutral-400 text-sm">{posts.length} total</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={fetchPosts}
            className="border-neutral-700 text-white hover:bg-neutral-800"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button
            data-testid="blog-admin-new-btn"
            onClick={() => setEditing({})}
            className="bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <Loader2 className="w-8 h-8 text-amber-400 mx-auto animate-spin" />
          <p className="text-neutral-400 mt-2 text-sm">Loading posts...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-10 text-center">
          <p className="text-neutral-400">No blog posts yet. Click "New Post" to create one.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              data-testid={`blog-admin-post-${post.slug}`}
              className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 hover:border-amber-400/30 transition-colors flex items-center gap-4"
            >
              {post.image ? (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-20 h-14 rounded object-cover flex-shrink-0 bg-neutral-800"
                />
              ) : (
                <div className="w-20 h-14 rounded bg-neutral-800 flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white font-medium truncate">{post.title}</h3>
                  {!post.published && (
                    <span className="px-2 py-0.5 bg-neutral-700 text-neutral-300 text-xs rounded">
                      Draft
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-neutral-500">
                  <span className="text-amber-400/80">{post.category}</span>
                  <span>•</span>
                  <span className="font-mono">/{post.slug}</span>
                  {post.date && (
                    <>
                      <span>•</span>
                      <span>{post.date}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => togglePublished(post)}
                  className="w-9 h-9 rounded-lg hover:bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white"
                  title={post.published ? 'Unpublish' : 'Publish'}
                >
                  {post.published ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </button>
                <a
                  href={`/our-blog/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg hover:bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white"
                  title="View on site"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  data-testid={`blog-admin-edit-${post.slug}`}
                  onClick={() => setEditing(post)}
                  className="w-9 h-9 rounded-lg hover:bg-amber-400/10 flex items-center justify-center text-amber-400"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  data-testid={`blog-admin-delete-${post.slug}`}
                  onClick={() => handleDelete(post)}
                  className="w-9 h-9 rounded-lg hover:bg-red-500/10 flex items-center justify-center text-red-400"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing !== null && (
        <BlogEditor
          initial={editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            fetchPosts();
          }}
        />
      )}
    </div>
  );
};

export default BlogAdminTab;
