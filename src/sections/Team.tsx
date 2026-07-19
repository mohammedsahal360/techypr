'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { TEAM } from '@/lib/constants';
import { fadeUp, staggerContainer } from '@/lib/animations';
import SectionHeading from '@/components/ui/SectionHeading';
import styles from './Team.module.css';

function TeamCard({ member, index }: { member: typeof TEAM[number]; index: number }) {
  const gradientClass = styles[`gradient${index % 8}` as keyof typeof styles];

  return (
    <motion.div variants={fadeUp} className={styles.cardWrapper}>
      <div className={`${styles.card} glass-strong`}>
        {/* Holographic border on hover */}
        <div className={styles.holographicBorder}>
          <div className={styles.holographicInner}>
            <div className={`${styles.holographicGradient} animate-shimmer`} />
          </div>
        </div>

        {/* Avatar */}
        <div className={styles.avatarWrapper}>
          <div className={`${styles.avatar} ${gradientClass}`}>
            {member.name.charAt(0)}
          </div>
          {/* Ring animation on hover */}
          <div className={styles.avatarRing1} />
          <div className={styles.avatarRing2} />
        </div>

        {/* Info */}
        <h4 className={styles.memberName}>
          {member.name}
        </h4>
        <p className={styles.memberPosition}>{member.position}</p>

        {/* Social Links */}
        <div className={styles.socialLinks}>
          <a href={member.github} className={`${styles.socialLink} glass`} aria-label={`${member.name} GitHub`}>
            <svg className={styles.socialIcon} viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href={member.linkedin} className={`${styles.socialLink} glass`} aria-label={`${member.name} LinkedIn`}>
            <svg className={styles.socialIcon} viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href={member.twitter} className={`${styles.socialLink} glass`} aria-label={`${member.name} Twitter`}>
            <svg className={styles.socialIcon} viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Team() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="team" ref={ref} className={styles.section}>
      {/* Background */}
      <div className={styles.bgWrapper}>
        <div className={styles.bgGlow} />
      </div>

      <div className={`${styles.container} section-container`}>
        <SectionHeading
          subtitle="The Masterminds"
          title="Our Team"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className={styles.grid}
        >
          {TEAM.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
