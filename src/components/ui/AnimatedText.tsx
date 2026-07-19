'use client';

import { motion } from 'motion/react';
import styles from './AnimatedText.module.css';

interface AnimatedTextProps {
  text: string;
  className?: string;
  variant?: 'words' | 'chars' | 'lines';
  delay?: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: delay,
    },
  }),
};

const wordVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

const charContainerVariants = {
  hidden: { opacity: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: delay,
    },
  }),
};

const charVariants = {
  hidden: { opacity: 0, y: 30, rotateX: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

const lineVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

export default function AnimatedText({
  text,
  className = '',
  variant = 'words',
  delay = 0,
}: AnimatedTextProps) {
  if (variant === 'lines') {
    return (
      <motion.div
        className={className}
        variants={lineVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        custom={delay}
      >
        {text}
      </motion.div>
    );
  }

  if (variant === 'chars') {
    const characters = text.split('');
    return (
      <motion.span
        className={`${styles.inlineBlock} ${className}`}
        variants={charContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        custom={delay}
        aria-label={text}
      >
        {characters.map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            className={styles.inlineBlock}
            variants={charVariants}
            style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.span>
    );
  }

  // Default: 'words'
  const words = text.split(' ');
  return (
    <motion.span
      className={`${styles.inlineBlock} ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      custom={delay}
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className={`${styles.inlineBlock} ${styles.marginRight}`}
          variants={wordVariants}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
