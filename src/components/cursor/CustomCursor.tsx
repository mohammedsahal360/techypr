'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useSpring } from 'motion/react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useRef(0);
  const cursorY = useRef(0);
  const velocityX = useRef(0);
  const velocityY = useRef(0);
  const prevX = useRef(0);
  const prevY = useRef(0);
  const dotRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  // Spring-animated values for the outer ring
  const springX = useSpring(0, { stiffness: 150, damping: 20, mass: 0.5 });
  const springY = useSpring(0, { stiffness: 150, damping: 20, mass: 0.5 });

  const updateDot = useCallback(() => {
    if (!dotRef.current) return;

    // Calculate velocity
    velocityX.current = cursorX.current - prevX.current;
    velocityY.current = cursorY.current - prevY.current;
    prevX.current = cursorX.current;
    prevY.current = cursorY.current;

    // Calculate stretch based on velocity
    const speed = Math.sqrt(
      velocityX.current * velocityX.current +
        velocityY.current * velocityY.current
    );
    const stretch = Math.min(speed * 0.15, 2);
    const angle =
      Math.atan2(velocityY.current, velocityX.current) * (180 / Math.PI);

    const scaleX = 1 + stretch;
    const scaleY = 1 - stretch * 0.3;

    dotRef.current.style.transform = `translate(${cursorX.current}px, ${cursorY.current}px) translate(-50%, -50%) rotate(${angle}deg) scale(${scaleX}, ${scaleY})`;

    // Update spring targets for outer ring
    springX.set(cursorX.current);
    springY.set(cursorY.current);

    rafRef.current = requestAnimationFrame(updateDot);
  }, [springX, springY]);

  useEffect(() => {
    // Hide on touch devices
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: coarse)').matches
    ) {
      return;
    }

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.current = e.clientX;
      cursorY.current = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive =
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[data-cursor="pointer"]') ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A';

      setIsHovering(!!isInteractive);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    rafRef.current = requestAnimationFrame(updateDot);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [updateDot]);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className={styles.dot}
        style={{
          width: isHovering ? 12 : 8,
          height: isHovering ? 12 : 8,
          backgroundColor: '#7C3AED',
          borderRadius: '50%',
          transition: 'width 0.2s, height 0.2s',
        }}
      />

      {/* Outer ring */}
      <motion.div
        className={styles.ring}
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovering ? 56 : 40,
          height: isHovering ? 56 : 40,
          border: `1px solid ${isHovering ? 'rgba(124, 58, 237, 0.6)' : 'rgba(124, 58, 237, 0.35)'}`,
          transition: 'width 0.3s, height 0.3s, border-color 0.3s',
        }}
      />
    </>
  );
}
