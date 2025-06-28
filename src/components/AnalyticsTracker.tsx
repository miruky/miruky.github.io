'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { startTracking } from '@/lib/analytics';

/**
 * Invisible client component that tracks page views.
 * Placed once in the root layout.
 */
export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Do not track admin routes
    if (pathname.startsWith('/admin')) return;

    const cleanup = startTracking(pathname);
    return cleanup;
  }, [pathname]);

  return null;
}
