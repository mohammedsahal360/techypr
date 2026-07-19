import type { Variants } from 'motion/react';

// ── Fade In ──
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } 
  },
};

// ── Fade Up ──
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } 
  },
};

// ── Fade Down ──
export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } 
  },
};

// ── Scale In ──
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } 
  },
};

// ── Slide In from Left ──
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } 
  },
};

// ── Slide In from Right ──
export const slideRight: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } 
  },
};

// ── Blur In ──
export const blurIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(20px)' },
  visible: { 
    opacity: 1, 
    filter: 'blur(0px)', 
    transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] } 
  },
};

// ── Stagger Container ──
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

// ── Stagger Fast Container ──
export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

// ── Character Stagger ──
export const charStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
};

export const charVariant: Variants = {
  hidden: { opacity: 0, y: 30, rotateX: -90 },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } 
  },
};

// ── Glow Pulse ──
export const glowPulse: Variants = {
  initial: {
    boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)',
  },
  animate: {
    boxShadow: [
      '0 0 20px rgba(124, 58, 237, 0.3)',
      '0 0 40px rgba(124, 58, 237, 0.6)',
      '0 0 20px rgba(124, 58, 237, 0.3)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// ── Mask Reveal ──
export const maskReveal: Variants = {
  hidden: { 
    clipPath: 'inset(0 100% 0 0)',
    opacity: 0 
  },
  visible: { 
    clipPath: 'inset(0 0% 0 0)',
    opacity: 1,
    transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] }
  },
};

// ── 3D Card Tilt ──
export const cardHover = {
  rest: { 
    scale: 1, 
    rotateX: 0, 
    rotateY: 0,
    transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }
  },
  hover: { 
    scale: 1.03,
    transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }
  },
};
