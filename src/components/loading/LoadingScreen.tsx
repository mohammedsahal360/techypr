'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './LoadingScreen.module.css';

interface LoadingScreenProps {
  onComplete: () => void;
  isSceneReady?: boolean; // Kept for backwards compatibility if passed from ClientPage
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const duration = 2500; // ~2.5 seconds minimum (reverted to faster)
    const steps = 60;
    const increment = 100 / steps;
    const interval = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      // Add slight randomness for realism
      const jitter = Math.random() * 2;
      const newProgress = Math.min(100, current + jitter);
      setProgress(Math.round(newProgress));

      if (current >= 100) {
        clearInterval(timer);
        setProgress(100);
        // Small delay before fade out
        setTimeout(() => {
          setIsVisible(false);
          // Fallback/Force completion to prevent mobile browser freezing issues with framer-motion exit hooks
          setTimeout(() => onComplete(), 850);
        }, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  const handleExitComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`${styles.container} scanlines`}
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: 'blur(20px)',
          }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Ambient glow */}
          <div className={styles.ambientGlowContainer}>
            <div className={styles.ambientGlow} />
          </div>

          {/* Glitch Text */}
          <div className={styles.glitchContainer}>
            <h1
              className={styles.glitchText}
              style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}
            >
              TECHKSHETRA&apos;26
            </h1>

            {/* Red glitch layer */}
            <h1
              className={`${styles.glitchText} ${styles.glitchLayer}`}
              style={{
                fontSize: 'clamp(2rem, 6vw, 5rem)',
                color: '#ff0040',
                clipPath: 'inset(10% 0 60% 0)',
                animation: 'glitch-1 2s infinite linear alternate-reverse',
              }}
              aria-hidden
            >
              TECHKSHETRA&apos;26
            </h1>

            {/* Blue glitch layer */}
            <h1
              className={`${styles.glitchText} ${styles.glitchLayer}`}
              style={{
                fontSize: 'clamp(2rem, 6vw, 5rem)',
                color: '#00d4ff',
                clipPath: 'inset(50% 0 20% 0)',
                animation: 'glitch-2 2s infinite linear alternate-reverse',
              }}
              aria-hidden
            >
              TECHKSHETRA&apos;26
            </h1>
          </div>

          {/* Progress bar */}
          <div className={styles.progressContainer}>
            <div className={styles.progressBarBackground}>
              <motion.div
                className={styles.progressBarFill}
                style={{
                  background:
                    'linear-gradient(90deg, #7C3AED, #A855F7, #FF4DFF)',
                }}
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
            </div>

            {/* Progress glow */}
            <motion.div
              className={styles.progressGlow}
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.6), transparent)',
                filter: 'blur(6px)',
                width: `${progress}%`,
              }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />

            {/* Percentage text */}
            <motion.p
              className={styles.percentageText}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {progress}%
            </motion.p>
          </div>

          {/* CSS glitch keyframes */}
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes glitch-1 {
              0% { clip-path: inset(10% 0 60% 0); transform: translate(-3px, -1px); }
              20% { clip-path: inset(70% 0 5% 0); transform: translate(3px, 2px); }
              40% { clip-path: inset(20% 0 50% 0); transform: translate(-2px, 1px); }
              60% { clip-path: inset(60% 0 15% 0); transform: translate(2px, -2px); }
              80% { clip-path: inset(5% 0 80% 0); transform: translate(-1px, 2px); }
              100% { clip-path: inset(40% 0 30% 0); transform: translate(3px, -1px); }
            }
            @keyframes glitch-2 {
              0% { clip-path: inset(50% 0 20% 0); transform: translate(3px, 1px); }
              20% { clip-path: inset(15% 0 55% 0); transform: translate(-2px, -1px); }
              40% { clip-path: inset(65% 0 10% 0); transform: translate(1px, 2px); }
              60% { clip-path: inset(30% 0 40% 0); transform: translate(-3px, -2px); }
              80% { clip-path: inset(80% 0 3% 0); transform: translate(2px, 1px); }
              100% { clip-path: inset(10% 0 65% 0); transform: translate(-1px, -1px); }
            }
          ` }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
