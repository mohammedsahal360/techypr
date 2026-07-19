'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface MousePosition {
  /** Normalized X position (-1 to 1) */
  x: number;
  /** Normalized Y position (-1 to 1) */
  y: number;
  /** Raw clientX */
  clientX: number;
  /** Raw clientY */
  clientY: number;
}

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    clientX: 0,
    clientY: 0,
  });

  const rafRef = useRef<number>(0);
  const latestEvent = useRef<{ clientX: number; clientY: number } | null>(null);

  const updatePosition = useCallback(() => {
    if (latestEvent.current) {
      const { clientX, clientY } = latestEvent.current;
      const x = (clientX / window.innerWidth) * 2 - 1;
      const y = (clientY / window.innerHeight) * 2 - 1;
      setPosition({ x, y, clientX, clientY });
      latestEvent.current = null;
    }
    rafRef.current = requestAnimationFrame(updatePosition);
  }, []);

  useEffect(() => {
    // Return zeros on touch devices
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      latestEvent.current = { clientX: e.clientX, clientY: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [updatePosition]);

  return position;
}
