'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Upload, Trash2, Loader2, RefreshCw, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const API = '/api';

export const GalleryAdminTab = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState({ total: 0, done: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const authHeader = () => `Basic ${localStorage.getItem('adminAuth')}`;

  const fetchPhotos = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/admin/gallery/life-at-sgital`, {
        headers: { Authorization: authHeader() },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Load failed');
      setPhotos(data.photos || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const uploadFiles = async (files) => {
    const list = Array.from(files).filter((f) =>
      ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(f.type)
    );
    const rejected = files.length - list.length;
    if (!list.length) {
      setError('No supported images selected (JPG/PNG/WebP/GIF).');
      return;
    }
    setError('');
    setUploading(true);
    setProgress({ total: list.length, done: 0 });

    try {
      // Upload in a single request (backend accepts List[UploadFile])
      const fd = new FormData();
      list.forEach((f) => fd.append('files', f));
      const res = await fetch(`${API}/admin/gallery/life-at-sgital/upload`, {
        method: 'POST',
        headers: { Authorization: authHeader() },
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Upload failed');
      setProgress({ total: list.length, done: data.uploaded_count });
      if (data.errors?.length) {
        setError(`Some failed: ${data.errors.map((e) => `${e.filename}: ${e.error}`).join('; ')}`);
      }
      if (rejected > 0) {
        setError((prev) => (prev ? prev + ' · ' : '') + `${rejected} file(s) skipped (unsupported type).`);
      }
      await fetchPhotos();
    } catch (e) {
      setError(e.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (photo) => {
    if (!window.confirm(`Delete "${photo.filename}"? This cannot be undone.`)) return;
    try {
      const url = `${API}/admin/gallery/life-at-sgital?key=${encodeURIComponent(photo.key)}`;
      const res = await fetch(url, {
        method: 'DELETE',
        headers: { Authorization: authHeader() },
      });
      if (!res.ok) throw new Error('Delete failed');
      fetchPhotos();
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div data-testid="gallery-admin-tab">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Life at Sgital Gallery</h2>
          <p className="text-neutral-400 text-sm">{photos.length} photos on S3</p>
        </div>
        <Button
          variant="outline"
          onClick={fetchPhotos}
          className="border-neutral-700 text-white hover:bg-neutral-800"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Dropzone */}
      <div
        data-testid="gallery-admin-dropzone"
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (e.dataTransfer.files?.length) uploadFiles(e.dataTransfer.files);
        }}
        onClick={() => !uploading && fileInputRef.current?.click()}
        className={`cursor-pointer border-2 border-dashed rounded-xl p-10 text-center transition-colors ${
          isDragging
            ? 'border-amber-400 bg-amber-400/5'
            : 'border-neutral-700 bg-neutral-900/50 hover:border-neutral-600'
        } ${uploading ? 'pointer-events-none opacity-60' : ''}`}
      >
        <input
          ref={fileInputRef}
          data-testid="gallery-admin-file-input"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          onChange={(e) => uploadFiles(e.target.files)}
          className="hidden"
        />
        {uploading ? (
          <div>
            <Loader2 className="w-8 h-8 text-amber-400 mx-auto mb-3 animate-spin" />
            <p className="text-white font-medium">
              Uploading {progress.done}/{progress.total}…
            </p>
          </div>
        ) : (
          <div>
            <Upload className="w-10 h-10 text-neutral-500 mx-auto mb-3" />
            <p className="text-white font-medium">
              Drop photos here or <span className="text-amber-400">click to browse</span>
            </p>
            <p className="text-neutral-500 text-sm mt-2">
              JPG, PNG, WebP, GIF · up to 10 MB each
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Grid */}
      <div className="mt-8">
        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="w-8 h-8 text-amber-400 mx-auto animate-spin" />
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-12 bg-neutral-900 border border-neutral-800 rounded-xl">
            <ImageIcon className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
            <p className="text-neutral-400">No photos yet. Upload some above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {photos.map((p) => (
              <div
                key={p.key}
                data-testid={`gallery-admin-photo-${p.filename}`}
                className="relative group aspect-square rounded-lg overflow-hidden border border-neutral-800 bg-neutral-900"
              >
                <img
                  src={p.url}
                  alt={p.filename}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2 text-center">
                  <p className="text-white text-xs break-all line-clamp-3">{p.filename}</p>
                  <button
                    onClick={() => handleDelete(p)}
                    data-testid={`gallery-admin-delete-${p.filename}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-medium"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryAdminTab;
