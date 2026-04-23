import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'sgital_k26_banner_dismissed_v1';

/**
 * Dismissible site-wide announcement banner for ServiceNow Knowledge26.
 * Links to the Knowledge26 blog post. Remembers dismissal in localStorage.
 */
const AnnouncementBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) !== '1') {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  // Expose banner height as a CSS variable so the fixed Header can offset itself.
  useEffect(() => {
    if (visible) {
      document.documentElement.style.setProperty('--banner-h', '40px');
    } else {
      document.documentElement.style.setProperty('--banner-h', '0px');
    }
    return () => {
      document.documentElement.style.setProperty('--banner-h', '0px');
    };
  }, [visible]);

  const dismiss = (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* storage unavailable — still hide for this session */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      data-testid="announcement-banner"
      className="fixed top-0 left-0 right-0 z-[70] bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-neutral-950 shadow-lg"
      style={{ height: '40px' }}
    >
      <Link
        to="/our-blog/are-you-attending-knowledge26"
        className="flex items-center justify-center gap-2 sm:gap-4 px-10 sm:px-12 h-full text-sm font-medium hover:bg-amber-400/90 transition-colors"
        data-testid="announcement-banner-link"
      >
        <Sparkles className="w-4 h-4 flex-shrink-0 hidden sm:inline" />
        <span className="text-center">
          <span className="font-bold">Meet us at ServiceNow Knowledge26</span>
          <span className="hidden md:inline"> · Las Vegas · May 5–7, 2026</span>
          <span className="mx-1.5 sm:mx-2 opacity-50">·</span>
          <span className="underline underline-offset-2 decoration-neutral-900/30 hover:decoration-neutral-900">Book a meeting with our CEO</span>
        </span>
        <ArrowRight className="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
      </Link>
      <button
        type="button"
        onClick={dismiss}
        data-testid="announcement-banner-close"
        aria-label="Dismiss announcement"
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full hover:bg-neutral-900/10 flex items-center justify-center transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default AnnouncementBanner;
