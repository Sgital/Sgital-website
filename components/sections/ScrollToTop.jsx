'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * Scrolls window to top on every route change.
 * Must be rendered inside <BrowserRouter>.
 */
const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
