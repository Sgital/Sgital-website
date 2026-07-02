'use client';

import React, { useEffect, useRef, useState } from 'react';
import { stats } from '@/lib/data/mock';

/**
 * Animated count-up proof bar. Renders the 4 canonical hero numbers
 * (1,500+ / 80+ / 60+ / 3) with a scroll-triggered count-up animation.
 *
 * Shared between /about and the homepage — do not duplicate.
 */
const AnimatedNumber = ({ value, duration = 1400 }) => {
  const ref = useRef(null);
  const [display, setDisplay] = useState('');
  const [hasAnimated, setHasAnimated] = useState(false);

  // Parse leading numeric portion (e.g. "1,500+" -> {num: 1500, suffix: "+"})
  const match = String(value).match(/^([\d,]+)(.*)$/);
  const target = match ? parseInt(match[1].replace(/,/g, ''), 10) : 0;
  const suffix = match ? match[2] : '';

  useEffect(() => {
    if (!ref.current || hasAnimated) return;
    const observer = new IntersectionObserver(
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
    return () => observer.disconnect();
  }, [target, suffix, value, duration, hasAnimated]);

  return (
    <span ref={ref} className="tabular-nums">
      {display || (hasAnimated ? String(value) : '0' + suffix)}
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
