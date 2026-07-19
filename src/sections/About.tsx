'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { STATS } from '@/lib/constants';
import { fadeUp, slideLeft, slideRight, staggerContainer } from '@/lib/animations';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import styles from './About.module.css';

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={ref} className={styles.aboutSection}>
      {/* Background Effects */}
      <div className={styles.bgEffects}>
        <div className={styles.blurEffectLeft} />
        <div className={styles.blurEffectRight} />
      </div>

      <div className="section-container relative z-10">
        <SectionHeading
          subtitle="Discover the Future"
          title="About Techkshetra"
        />

        <div className={styles.contentGrid}>
          {/* Left: Animated Text */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className={styles.textBlock}
          >
            <p className={styles.paragraph}>
              Techkshetra&apos;26 is the annual technical festival of{' '}
              <span className={styles.highlight}>
                Rajagiri School of Engineering & Technology
              </span>
              , where the brightest minds converge to push the boundaries of 
              technology and innovation.
            </p>
            <p className={styles.paragraph}>
              Spanning two exhilarating days, the fest features hackathons, 
              AI challenges, robotics battles, cybersecurity competitions, 
              and cutting-edge workshops led by industry experts.
            </p>
            <p className={styles.paragraph}>
              More than just a competition — it&apos;s a{' '}
              <span className={`gradient-text ${styles.gradientHighlight}`}>
                movement that celebrates the spirit of technological evolution
              </span>
              , bringing together innovators, creators, and dreamers from 
              across the nation.
            </p>

            <motion.div
              variants={fadeUp}
              className={styles.regContainer}
            >
              <div className={`glass ${styles.regBadge}`}>
                <span className={styles.statusDot} />
                Registrations Open Now
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Floating Holographic Panels */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className={styles.holographicContainer}
          >
            {/* Panel 1 */}
            <motion.div
              className={styles.panel1}
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <GlassCard className={styles.panelCard} glow>
                <div className={styles.panelIcon}>⚡</div>
                <div>
                  <h4 className={styles.panelTitle}>Innovation Hub</h4>
                  <p className={styles.panelDesc}>Where ideas transform into reality</p>
                </div>
              </GlassCard>
            </motion.div>

            {/* Panel 2 */}
            <motion.div
              className={styles.panel2}
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <GlassCard className={styles.panelCard} glow>
                <div className={styles.panelIcon}>🚀</div>
                <div>
                  <h4 className={styles.panelTitle}>Future Tech</h4>
                  <p className={styles.panelDesc}>Exploring tomorrow&apos;s technology today</p>
                </div>
              </GlassCard>
            </motion.div>

            {/* Panel 3 */}
            <motion.div
              className={styles.panel3}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            >
              <GlassCard className={styles.panelCard} glow>
                <div className={styles.panelIcon}>🌐</div>
                <div>
                  <h4 className={styles.panelTitle}>Global Network</h4>
                  <p className={styles.panelDesc}>Connect with minds worldwide</p>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>

        {/* Statistics */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className={styles.statsGrid}
        >
          {STATS.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp}>
              <GlassCard className={styles.statCard} hover>
                <div className={`heading-lg gradient-text ${styles.statValue}`}>
                  {isInView && (
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  )}
                </div>
                <p className={styles.statLabel}>{stat.label}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
