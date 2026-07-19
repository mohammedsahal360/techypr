'use client';

import { motion } from 'motion/react';
import AnimatedText from './AnimatedText';
import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({
  title,
  subtitle,
  className = '',
  align = 'center',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? styles.alignCenter : styles.alignLeft;

  return (
    <div className={`${styles.container} ${alignClass} ${className}`}>
      {/* Accent gradient bar */}
      <motion.div
        className={styles.accentBar}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ originX: align === 'center' ? 0.5 : 0 }}
      />

      {/* Subtitle in serif italic */}
      {subtitle && (
        <motion.p
          className={`subtitle ${styles.subtitle}`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Main heading with gradient text */}
      <h2 className="heading-lg gradient-text">
        <AnimatedText text={title} variant="words" delay={0.1} />
      </h2>
    </div>
  );
}
