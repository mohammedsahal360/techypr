'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { TIMELINE } from '@/lib/constants';
import { fadeUp, staggerContainer } from '@/lib/animations';
import SectionHeading from '@/components/ui/SectionHeading';
import styles from './Timeline.module.css';

function TimelineNode({ item, index }: { item: typeof TIMELINE[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={`${styles.timelineNode} ${index % 2 === 0 ? styles.nodeEven : styles.nodeOdd}`}
    >
      {/* Content Card */}
      <div className={`${styles.contentWrapper} ${index % 2 === 0 ? styles.contentEven : styles.contentOdd}`}>
        <div className={`glass-strong ${styles.contentCard}`}>
          <div className={styles.timeContainer}>
            <span className={styles.dayBadge}>
              {item.day}
            </span>
            <span className={styles.timeText}>{item.time}</span>
          </div>
          <h4 className={styles.title}>
            {item.title}
          </h4>
          <p className={styles.description}>{item.description}</p>
        </div>
      </div>

      {/* Center Node */}
      <div className={styles.centerNodeWrapper}>
        <motion.div
          className={styles.centerNode}
          animate={isInView ? {
            boxShadow: [
              '0 0 0 0 rgba(124, 58, 237, 0.4)',
              '0 0 0 10px rgba(124, 58, 237, 0)',
            ],
          } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>

      {/* Spacer */}
      <div className={styles.spacer} />
    </motion.div>
  );
}

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="timeline" ref={sectionRef} className={styles.timelineSection}>
      {/* Background */}
      <div className={styles.bgEffects}>
        <div className={styles.blurCircle} />
      </div>

      <div className="section-container relative z-10">
        <SectionHeading
          subtitle="The Journey"
          title="Event Timeline"
        />

        <div className={styles.timelineContainer}>
          {/* Vertical Line */}
          <div className={styles.verticalLineDesktop}>
            <motion.div
              className={styles.animatedLine}
              style={{ height: lineHeight }}
            />
          </div>

          {/* Mobile Line */}
          <div className={styles.verticalLineMobile}>
            <motion.div
              className={styles.animatedLine}
              style={{ height: lineHeight }}
            />
          </div>

          {/* Timeline Items */}
          <div className={styles.itemsContainer}>
            {TIMELINE.map((item, index) => (
              <TimelineNode key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
