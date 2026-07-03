'use client';

import React, { useEffect, useRef, useState } from 'react';
import { stats } from '@/lib/data/mock';

/**
 * Animated count-up proof bar. Renders the 4 canonical hero numbers
 * (1,500+ / 80+ / 60+ / 3) with a scroll-triggered count-up animation.
 *
 * SSR-safe: initial render emits the FINAL value (not 0). This is
 * critical for SEO / social-preview crawlers that don't run JS.
 * The count-up animation only fires client-side when the element
 * first enters the viewport AFTER hydration.
 */
const AnimatedNumber = ({ value, duration = 1400 }) => {
  const ref = useRef(null);
  // Initialize with the final value so SSR + first client render match.
  // Prevents both hydration mismatch AND `0+` appearing in SSR HTML.
  const [display, setDisplay] = useState(String(value));
  const [hasAnimated, setHasAnimated] = useState(false);

  // Parse leading numeric portion (e.g. "1,500+" -> {num: 1500, suffix: "+"})
  const match = String(value).match(/^([\d,]+)(.*)$/);
  const target = match ? parseInt(match[1].replace(/,/g, ''), 10) : 0;
  const suffix = match ? match[2] : '';

  useEffect(() => {
    // Only run on client, after mount. Use rAF to skip the very first
    // paint tick so hydration completes before we touch the DOM value.
    if (!ref.current || hasAnimated) return;
    let observer;
    const raf = requestAnimationFrame(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting && !hasAnimated) {
              setHasAnimated(true);
              const start = performance.now();
              const tick = (now) => {
                const t = Math.min(1, (now - start) / duration);
                const eased = 1 - Math.pow(1 - t, 3);
                const current = Math.round(target * eased);
                setDisplay(current.toLocaleString() + suffix);
                if (t < 1) requestAnimationFrame(tick);
                else setDisplay(String(value));
              };
              requestAnimationFrame(tick);
            }
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(ref.current);
    });
    return () => {
      cancelAnimationFrame(raf);
      if (observer) observer.disconnect();
    };
  }, [target, suffix, value, duration, hasAnimated]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
};

const ProofBar = ({ compact = false }) => {
  return (
    <section className={`bg-neutral-950 ${compact ? 'py-10' : 'py-16'} border-y border-neutral-900`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">
                <AnimatedNumber value={stat.value} />
              </div>
              <div className="text-neutral-400 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProofBar;
