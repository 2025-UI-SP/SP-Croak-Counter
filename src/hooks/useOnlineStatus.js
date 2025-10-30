/**
 * React hook that returns the current online status.
 * Returns: boolean (true if the browser reports being online)
 * Uses `navigator.onLine` + `online`/`offline` events + polling.
 */
import { useState, useEffect, useRef } from 'react';

export default function useOnlineStatus() {
  const [online, setOnline] = useState(() => {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  });
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;

    if (typeof window === 'undefined' || !('onLine' in navigator)) {
      return () => {
        mounted.current = false;
      };
    }

    const update = () => {
      if (mounted.current) {
        setOnline(navigator.onLine);
      }
    };

    // Initial sync
    update();

    // Listen to browser events
    window.addEventListener('online', update);
    window.addEventListener('offline', update);

    // Poll every 15 seconds
    const interval = setInterval(update, 15_000);

    return () => {
      mounted.current = false;
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
      clearInterval(interval);
    };
  }, []);

  return online;
}