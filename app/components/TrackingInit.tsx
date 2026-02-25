'use client';

import { useEffect } from 'react';
import { initTracking } from '@/lib/tracking';

export default function TrackingInit() {
  useEffect(() => {
    const cleanup = initTracking();
    return cleanup;
  }, []);

  return null;
}
