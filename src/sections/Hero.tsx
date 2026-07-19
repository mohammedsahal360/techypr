'use client';

import { useRef, Suspense } from 'react';
import { motion } from 'motion/react';
import dynamic from 'next/dynamic';
import { staggerContainer, fadeUp, blurIn, charStagger, charVariant } from '@/lib/animations';
import NeonButton from '@/components/ui/NeonButton';
import CountdownTimer from '@/components/ui/CountdownTimer';
import styles from './Hero.module.css';

import ErrorBoundary from '@/components/ErrorBoundary';

// Dynamic import for Three.js scene (no SSR)
const AngelScene = dynamic(() => import('@/three/AngelScene'), {
  ssr: false,
  loading: () => (
    <div className={styles.loadingWrapper}>
      <div className={styles.spinner} />
    </div>
  ),
});

const title = "TECHKSHETRA'26";

export default function Hero({ onSceneReady }: { onSceneReady?: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="home" ref={sectionRef} className={styles.heroSection}>
      {/* 3D Background Canvas */}
      <div className={styles.sceneWrapper}>
        <ErrorBoundary fallback={<div style={{ width: '100%', height: '100%', background: 'transparent' }} />}>
          <AngelScene onReady={onSceneReady} />
        </ErrorBoundary>
      </div>

      {/* Gradient Overlays */}
      <div className={styles.gradientOverlays}>
        {/* Bottom gradient for text readability */}
        <div className={styles.gradientBottom} />
        {/* Top subtle gradient */}
        <div className={styles.gradientTop} />
        {/* Side gradients */}
        <div className={styles.gradientLeft} />
        <div className={styles.gradientRight} />
      </div>

      {/* Content Overlay */}
      <div className={styles.contentOverlay}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className={styles.contentContainer}
        >
          <div className={styles.topSection}>
            {/* Main Title - Character by character */}
            <motion.h1
              variants={charStagger}
              className={`heading-xl ${styles.title}`}
            >
              {title.split('').map((char, i) => (
                <motion.span
                  key={i}
                  variants={charVariant}
                  className={`gradient-text ${styles.char}`}
                  style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subtitle */}
            <div className={styles.subtitleContainer}>
              <motion.p variants={fadeUp} className={styles.subtitleText}>
                Official Technical Fest
              </motion.p>
              <motion.p variants={fadeUp} className={styles.universityText}>
                Rajagiri School of Engineering &amp; Technology
              </motion.p>
            </div>

            {/* Tagline */}
            <motion.p
              variants={blurIn}
              className={`subtitle glow-text ${styles.tagline}`}
            >
              &ldquo;Where Innovation Meets Infinity.&rdquo;
            </motion.p>
          </div>

          <div className={styles.bottomSection}>
            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              className={styles.ctaContainer}
            >
              <NeonButton variant="filled" href="#events">
                Explore Events
              </NeonButton>
              <NeonButton variant="outline" href="#register">
                Register
              </NeonButton>
              <NeonButton
                variant="ghost"
                icon={
                  <svg className={styles.icon} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                }
              >
                Watch Trailer
              </NeonButton>
            </motion.div>

            {/* Countdown Timer */}
            <motion.div variants={fadeUp} className={styles.timerContainer}>
              <CountdownTimer />
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className={styles.scrollIndicator}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className={styles.scrollContent}>
            <span className={styles.scrollText}>Scroll</span>
            <svg className={styles.scrollIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

