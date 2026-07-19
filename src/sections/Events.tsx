'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'motion/react';
import { EVENTS } from '@/lib/constants';
import { fadeUp, staggerContainer } from '@/lib/animations';
import SectionHeading from '@/components/ui/SectionHeading';
import NeonButton from '@/components/ui/NeonButton';
import styles from './Events.module.css';

function EventCard({ event, index }: { event: typeof EVENTS[number]; index: number }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowX, setGlowX] = useState(50);
  const [glowY, setGlowY] = useState(50);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setRotateX((y - 0.5) * -15);
    setRotateY((x - 0.5) * 15);
    setGlowX(x * 100);
    setGlowY(y * 100);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className={styles.eventCardWrapper}
    >
      <div className={`glass-strong ${styles.cardInner}`}>
        {/* Glow effect following mouse */}
        <div
          className={styles.glowEffect}
          style={{
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(124, 58, 237, 0.15), transparent 50%)`,
          }}
        />

        {/* Animated border gradient */}
        <div className={styles.borderAnimationWrapper}>
          <div className={`animate-shimmer ${styles.animatedBorder}`}>
            <div className={styles.borderInner} />
          </div>
        </div>

        <div className={styles.contentContainer}>
          {/* Category Badge */}
          <div className={styles.categoryBadge}>
            {event.category}
          </div>

          {/* Icon */}
          <div className={styles.iconWrapper}>
            {event.icon}
          </div>

          {/* Title */}
          <h3 className={styles.title}>
            {event.title}
          </h3>

          {/* Description */}
          <p className={styles.description}>
            {event.description}
          </p>

          {/* Date */}
          <div className={styles.dateContainer}>
            <svg className={styles.dateIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {event.date}
          </div>

          {/* Register Button */}
          <NeonButton
            variant="outline"
            className={styles.registerBtn}
          >
            Register Now
          </NeonButton>
        </div>
      </div>
    </motion.div>
  );
}

export default function Events() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="events" ref={ref} className={styles.eventsSection}>
      {/* Background */}
      <div className={styles.bgEffect}>
        <div className={styles.blurCircle} />
      </div>

      <div className="section-container relative z-10">
        <SectionHeading
          subtitle="Compete & Conquer"
          title="Featured Events"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className={styles.eventsGrid}
        >
          {EVENTS.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
