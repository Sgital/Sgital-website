'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { X, ArrowRight, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'sgital_k26_banner_dismissed_v1';

/**
 * Dismissible site-wide announcement banner for ServiceNow Knowledge26.
 * Height adapts to content (mobile wraps to 2 lines, desktop stays 1 line).
 * Exposes actual measured height as --banner-h so the fixed Header can offset itself.
 */
const AnnouncementBanner = () => {
  const [visible, setVisible] = useState(false);
  const bannerRef = useRef(null);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) !== '1') {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  // Measure actual banner height (handles wrapping on mobile) and expose as CSS var.
  useEffect(() => {
    if (!visible) {
      document.documentElement.style.setProperty('--banner-h', '0px');
      return undefined;
    }
    const el = bannerRef.current;
    if (!el) return undefined;

    const updateHeight = () => {
      document.documentElement.style.setProperty('--banner-h', `${el.offsetHeight}px`);
    };
    updateHeight();

    const ro = new ResizeObserver(updateHeight);
    ro.observe(el);
    window.addEventListener('resize', updateHeight);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateHeight);
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
      ref={bannerRef}
      data-testid="announcement-banner"
      className="fixed top-0 left-0 right-0 z-[70] bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-neutral-950 shadow-lg"
    >
      <Link
        href="/our-blog/are-you-attending-knowledge26"
        className="flex items-center justify-center gap-2 sm:gap-3 pl-3 pr-10 sm:pl-12 sm:pr-12 py-2 sm:py-2.5 text-xs sm:text-sm font-medium hover:bg-amber-400/90 transition-colors"
        data-testid="announcement-banner-link"
      >
        <Sparkles className="w-4 h-4 flex-shrink-0 hidden sm:inline" />
        <span className="text-center leading-snug">
          <span className="font-bold">Meet us at ServiceNow Knowledge26</span>
          <span className="hidden md:inline"> · Las Vegas · May 5–7, 2026</span>
          <span className="hidden sm:inline mx-2 opacity-50">·</span>
          <span className="block sm:inline underline underline-offset-2 decoration-neutral-900/30 hover:decoration-neutral-900">
            Book a meeting with our CEO
          </span>
        </span>
        <ArrowRight className="w-4 h-4 flex-shrink-0 hidden sm:inline" />
      </Link>
      <button
        type="button"
        onClick={dismiss}
        data-testid="announcement-banner-close"
        aria-label="Dismiss announcement"
        className="absolute right-1.5 top-1.5 sm:top-1/2 sm:right-2 sm:-translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full hover:bg-neutral-900/10 flex items-center justify-center transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default AnnouncementBanner;
