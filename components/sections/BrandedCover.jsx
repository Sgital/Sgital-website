'use client';

import React from 'react';

// Simple branded cover card used in place of generic stock imagery.
// Uses the Sgital dark + amber palette, shows the category and post title.
const BrandedCover = ({ title, category, className = '', titleClassName = 'text-xl' }) => {
  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-neutral-900 ${className}`}
      aria-label={title}
    >
      {/* Grid texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />
      {/* Amber glow */}
      <div className="absolute -top-16 -right-16 w-56 h-56 bg-amber-400/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-10 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl" />

      <div className="relative h-full w-full flex flex-col justify-between p-6">
        {/* Top: brand mark + category */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 bg-amber-400 rounded-md flex items-center justify-center text-neutral-950 font-black text-sm">
              S
            </span>
            <span className="text-neutral-400 text-[11px] font-semibold tracking-[0.2em] uppercase">
              Sgital
            </span>
          </div>
          {category && (
            <span className="px-2.5 py-1 bg-amber-400/15 text-amber-400 text-[10px] font-semibold rounded-full uppercase tracking-wider">
              {category}
            </span>
          )}
        </div>

        {/* Title */}
        <div>
          <div className="w-10 h-0.5 bg-amber-400 mb-3" />
          <h3 className={`font-bold text-white leading-snug line-clamp-4 ${titleClassName}`}>
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default BrandedCover;
