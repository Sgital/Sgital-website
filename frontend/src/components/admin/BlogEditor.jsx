import React, { useMemo, useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Upload, X, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const slugify = (s = '') =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export const BlogEditor = ({ initial, onClose, onSaved }) => {
  const editing = !!initial?.id;
  const [form, setForm] = useState({
    title: initial?.title || '',
    slug: initial?.slug || '',
    description: initial?.description || '',
    content: initial?.content || '',
    category: initial?.category || 'Company News',
    author: initial?.author || 'SGITAL Team',
    image: initial?.image || '',
    read_time: initial?.read_time || '4 min read',
    date: initial?.date || '',
    published: initial?.published ?? true,
  });
  const [slugTouched, setSlugTouched] = useState(editing);
  const [saving, setSaving] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!slugTouched) {
      setForm((f) => ({ ...f, slug: slugify(f.title) }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.title]);

  const quillModules = useMemo(
    () => ({
      toolbar: [
        [{ header: [2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['blockquote', 'code-block'],
        ['link', 'image'],
        [{ align: [] }],
        ['clean'],
      ],
    }),
    []
  );

  const authHeader = () => `Basic ${localStorage.getItem('adminAuth')}`;

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setError('Image too large (max 10 MB)');
      return;
    }
    setUploadingImg(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch(`${API}/blog/admin/upload-image`, {
        method: 'POST',
        headers: { Authorization: authHeader() },
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Upload failed');
      setForm((f) => ({ ...f, image: data.url }));
    } catch (err) {
      setError(err.message);
    } finally {
      setUploadingImg(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const url = editing
        ? `${API}/blog/admin/posts/${initial.id}`
        : `${API}/blog/admin/posts`;
      const method = editing ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: authHeader(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Save failed');
      onSaved?.(data.post);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      data-testid="blog-editor-modal"
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm overflow-y-auto"
    >
      <div className="min-h-screen flex items-start justify-center p-4 md:p-8">
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-5xl my-6 shadow-2xl">
          <div className="flex items-center justify-between p-5 border-b border-neutral-800 sticky top-0 bg-neutral-900 rounded-t-2xl z-10">
            <h3 className="text-xl font-semibold text-white">
              {editing ? 'Edit Blog Post' : 'New Blog Post'}
            </h3>
            <button
              type="button"
              data-testid="blog-editor-close"
              onClick={onClose}
              className="w-9 h-9 rounded-full hover:bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={save} className="p-6 space-y-5">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-white text-sm font-medium mb-1">Title</label>
              <input
                data-testid="blog-editor-title"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white text-sm font-medium mb-1">
                  Slug <span className="text-neutral-500 font-normal">(URL)</span>
                </label>
                <input
                  data-testid="blog-editor-slug"
                  value={form.slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    setForm({ ...form, slug: slugify(e.target.value) });
                  }}
                  className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-amber-400 font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-1">Category</label>
                <input
                  data-testid="blog-editor-category"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-1">Short Description</label>
              <textarea
                data-testid="blog-editor-description"
                required
                rows={2}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-amber-400 resize-y"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-white text-sm font-medium mb-1">Author</label>
                <input
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-1">Read Time</label>
                <input
                  value={form.read_time}
                  onChange={(e) => setForm({ ...form, read_time: e.target.value })}
                  placeholder="5 min read"
                  className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-1">Display Date</label>
                <input
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  placeholder="e.g. October 11, 2025"
                  className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Featured Image */}
            <div>
              <label className="block text-white text-sm font-medium mb-1">Featured Image</label>
              <div className="flex items-start gap-4">
                {form.image ? (
                  <div className="relative w-48 h-28 rounded-lg overflow-hidden border border-neutral-700 bg-neutral-950 flex-shrink-0">
                    <img src={form.image} alt="Featured" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, image: '' })}
                      className="absolute top-1 right-1 w-7 h-7 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center"
                      title="Remove image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="w-48 h-28 rounded-lg border-2 border-dashed border-neutral-700 bg-neutral-950 flex items-center justify-center text-neutral-500 text-xs flex-shrink-0">
                    No image
                  </div>
                )}
                <div className="flex-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={handleImageUpload}
                    className="hidden"
                    data-testid="blog-editor-image-file"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    disabled={uploadingImg}
                    onClick={() => fileInputRef.current?.click()}
                    data-testid="blog-editor-image-btn"
                    className="border-neutral-700 text-white hover:bg-neutral-800"
                  >
                    {uploadingImg ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        {form.image ? 'Replace image' : 'Upload to S3'}
                      </>
                    )}
                  </Button>
                  <input
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    placeholder="Or paste image URL..."
                    className="w-full mt-2 px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* Content Editor */}
            <div>
              <label className="block text-white text-sm font-medium mb-1">Content</label>
              <div
                data-testid="blog-editor-content"
                className="blog-quill-wrapper bg-neutral-950 border border-neutral-700 rounded-lg overflow-hidden"
              >
                <ReactQuill
                  theme="snow"
                  value={form.content}
                  onChange={(html) => setForm({ ...form, content: html })}
                  modules={quillModules}
                  placeholder="Write your blog post..."
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="published"
                data-testid="blog-editor-published"
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="w-4 h-4 accent-amber-400"
              />
              <label htmlFor="published" className="text-white text-sm">
                Published (visible on public blog)
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800 sticky bottom-0 bg-neutral-900 -mx-6 px-6 py-4 rounded-b-2xl">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-neutral-700 text-white hover:bg-neutral-800"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={saving}
                data-testid="blog-editor-save"
                className="bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : editing ? 'Update Post' : 'Create Post'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
