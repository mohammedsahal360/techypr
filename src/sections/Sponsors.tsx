'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { SPONSORS } from '@/lib/constants';
import { fadeUp } from '@/lib/animations';
import SectionHeading from '@/components/ui/SectionHeading';
import styles from './Sponsors.module.css';

function SponsorCard({ sponsor }: { sponsor: SponsorItem }) {
  const tierClass = styles[`tier${sponsor.tier}` as keyof typeof styles];

  return (
    <div className={styles.cardWrapper}>
      <div className={`${styles.card} glass-strong`}>
        {/* Placeholder Logo */}
        <div className={`${styles.sponsorName} ${tierClass}`}>
          {sponsor.name}
        </div>
        <span className={styles.sponsorTier}>{sponsor.tier}</span>
      </div>
    </div>
  );
}

type SponsorItem = { name: string; tier: string };

function MarqueeRow({ sponsors, direction = 'left', speed = 30 }: { sponsors: SponsorItem[]; direction?: 'left' | 'right'; speed?: number }) {
  const duplicated = [...sponsors, ...sponsors, ...sponsors];

  return (
    <div className={styles.marqueeContainer}>
      <motion.div
        className={styles.marqueeContent}
        animate={{
          x: direction === 'left' ? [0, -(sponsors.length * 216)] : [-(sponsors.length * 216), 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        }}
      >
        {duplicated.map((sponsor, index) => (
          <SponsorCard key={`${sponsor.name}-${index}`} sponsor={sponsor} />
        ))}
      </motion.div>
    </div>
  );
}

export default function Sponsors() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const row1 = SPONSORS.filter((_, i) => i % 2 === 0) as SponsorItem[];
  const row2 = SPONSORS.filter((_, i) => i % 2 !== 0) as SponsorItem[];

  return (
    <section id="sponsors" ref={ref} className={styles.section}>
      {/* Background */}
      <div className={styles.bgWrapper}>
        <div className={styles.bgGlow} />
      </div>

      <div className={styles.container}>
        <div className="section-container">
          <SectionHeading
            subtitle="Powered By"
            title="Our Sponsors"
          />
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className={styles.marquees}
        >
          {/* Gradient fade edges */}
          <div className={styles.marqueeRowWrapper}>
            <div className={styles.fadeLeft} />
            <div className={styles.fadeRight} />
            <MarqueeRow sponsors={row1} direction="left" speed={35} />
          </div>

          <div className={styles.marqueeRowWrapper}>
            <div className={styles.fadeLeft} />
            <div className={styles.fadeRight} />
            <MarqueeRow sponsors={row2} direction="right" speed={40} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
