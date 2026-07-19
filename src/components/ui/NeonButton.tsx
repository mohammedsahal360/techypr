'use client';

import { useRef, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import styles from './NeonButton.module.css';

interface NeonButtonProps {
  children: React.ReactNode;
  variant?: 'filled' | 'outline' | 'ghost';
  href?: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

export default function NeonButton({
  children,
  variant = 'filled',
  href,
  onClick,
  className = '',
  icon,
}: NeonButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [magnetic, setMagnetic] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.15;
    const deltaY = (e.clientY - centerY) * 0.15;
    setMagnetic({ x: deltaX, y: deltaY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMagnetic({ x: 0, y: 0 });
  }, []);

  const isOutline = variant === 'outline';
  const isFilled = variant === 'filled';
  const isGhost = variant === 'ghost';

  const baseStyles = styles.base;

  const variantStyles = {
    filled: styles.variantFilled,
    outline: styles.variantOutline,
    ghost: styles.variantGhost,
  };

  const content = (
    <>
      {/* Outline Variant Animated Border */}
      {isOutline && (
        <>
          {/* The animated gradient background (sits at the very back) */}
          <span className={`neon-border-bg ${styles.neonBorderBg}`} />
          {/* The dark background that covers the center, leaving just the 2px border */}
          <span className={styles.outlineInner} />
        </>
      )}

      {/* Filled Variant Hover Gradient */}
      {isFilled && (
        <motion.span
          className={styles.filledHoverBg}
          whileHover={{ opacity: 0.3 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Content wrapper to ensure z-index above the absolute backgrounds */}
      <span className={styles.contentWrapper}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.text}>{children}</span>
      </span>
    </>
  );

  const motionProps = {
    ref: buttonRef,
    className: `${baseStyles} ${variantStyles[variant]} ${className}`,
    animate: { x: magnetic.x, y: magnetic.y },
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 25,
    },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };

  if (href) {
    return (
      <motion.a
        href={href}
        {...motionProps}
        ref={undefined}
        data-cursor="pointer"
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      {...motionProps}
      data-cursor="pointer"
    >
      {content}
    </motion.button>
  );
}
