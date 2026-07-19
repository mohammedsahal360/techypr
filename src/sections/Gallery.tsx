'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { fadeUp, staggerContainer } from '@/lib/animations';
import SectionHeading from '@/components/ui/SectionHeading';
import styles from './Gallery.module.css';

const GALLERY_ITEMS = [
  { id: 1, title: 'Hackathon 2025', category: 'Competition', height: 'h-64' },
  { id: 2, title: 'Keynote Session', category: 'Event', height: 'h-80' },
  { id: 3, title: 'Robotics Arena', category: 'Competition', height: 'h-72' },
  { id: 4, title: 'Workshop Session', category: 'Workshop', height: 'h-64' },
  { id: 5, title: 'Prize Ceremony', category: 'Event', height: 'h-80' },
  { id: 6, title: 'Team Building', category: 'Fun', height: 'h-64' },
  { id: 7, title: 'Drone Race', category: 'Competition', height: 'h-72' },
  { id: 8, title: 'Cultural Night', category: 'Fun', height: 'h-80' },
  { id: 9, title: 'AI Demo Day', category: 'Workshop', height: 'h-64' },
];

function GalleryCard({ item, index }: { item: typeof GALLERY_ITEMS[number]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  const gradientClass = styles[`gradient${index % 5}` as keyof typeof styles];
  const heightMap: Record<string, string> = {
    'h-64': styles.cardHeight64,
    'h-72': styles.cardHeight72,
    'h-80': styles.cardHeight80,
  };
  const heightClass = heightMap[item.height] || styles.cardHeight64;

  return (
    <motion.div
      variants={fadeUp}
      className={`${styles.cardWrapper} ${heightClass}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background placeholder with gradient */}
      <div className={`${styles.bgPlaceholder} ${gradientClass}`}>
        {/* Pattern overlay */}
        <div className={`${styles.patternOverlay} cyber-grid`} />
        
        {/* Center icon */}
        <div className={styles.centerIconWrapper}>
          <div className={styles.centerIcon}>
            {item.category === 'Competition' ? '🏆' : item.category === 'Workshop' ? '💡' : item.category === 'Event' ? '🎤' : '🎉'}
          </div>
        </div>
      </div>

      {/* Holographic overlay on hover */}
      <motion.div
        className={styles.holographicOverlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.holographicGradient} />
        {/* Scanline effect */}
        <div className={`${styles.scanlinesOverlay} scanlines`} />
      </motion.div>

      {/* Content */}
      <div className={styles.contentWrapper}>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className={styles.category}>
            {item.category}
          </span>
          <h4 className={styles.title}>
            {item.title}
          </h4>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="gallery" ref={ref} className={styles.section}>
      {/* Background */}
      <div className={styles.bgWrapper}>
        <div className={styles.bgGlow} />
      </div>

      <div className={`${styles.container} section-container`}>
        <SectionHeading
          subtitle="Moments Captured"
          title="Gallery"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className={styles.masonry}
        >
          {GALLERY_ITEMS.map((item, index) => (
            <div key={item.id} className={styles.masonryItem}>
              <GalleryCard item={item} index={index} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
