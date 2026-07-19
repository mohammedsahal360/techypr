'use client';

import { useCountdown } from '@/hooks/useCountdown';
import { FEST_DATE } from '@/lib/constants';
import { motion, AnimatePresence } from 'motion/react';
import styles from './CountdownTimer.module.css';

interface TimeUnitProps {
  value: number;
  label: string;
}

function TimeUnit({ value, label }: TimeUnitProps) {
  const displayValue = String(value).padStart(2, '0');

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={displayValue}
            className={styles.number}
            initial={{ y: -20, scale: 1.15, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, scale: 0.85, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 30,
            }}
          >
            {displayValue}
          </motion.span>
        </AnimatePresence>

        {/* Purple top glow accent */}
        <div className={styles.accent} />
      </div>

      <span className={styles.label}>
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <div className={styles.separatorContainer}>
      <motion.span
        className={styles.dot}
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <motion.span
        className={styles.dot}
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
      />
    </div>
  );
}

export default function CountdownTimer() {
  const { days, hours, minutes, seconds } = useCountdown(FEST_DATE);

  return (
    <div className={styles.timerContainer}>
      <TimeUnit value={days} label="Days" />
      <Separator />
      <TimeUnit value={hours} label="Hours" />
      <Separator />
      <TimeUnit value={minutes} label="Minutes" />
      <Separator />
      <TimeUnit value={seconds} label="Seconds" />
    </div>
  );
}
