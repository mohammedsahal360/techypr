'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NAV_LINKS } from '@/lib/constants';
import NeonButton from '@/components/ui/NeonButton';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Track scroll for glass effect and shrink
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for active section detection
  useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.querySelector(link.href.replace('#', '#'))
    ).filter(Boolean) as Element[];

    if (sections.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach((section) => observerRef.current?.observe(section));

    return () => observerRef.current?.disconnect();
  }, []);

  const scrollToSection = useCallback(
    (href: string) => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      if (mobileOpen) setMobileOpen(false);
    },
    [mobileOpen]
  );

  return (
    <>
      <motion.nav
        className={`${styles.navBase} ${scrolled ? styles.navScrolled : styles.navTransparent}`}
        style={{ height: scrolled ? 60 : 80 }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className={styles.innerContainer}>
          {/* Logo */}
          <button
            onClick={() => scrollToSection('#home')}
            className={styles.logoBtn}
            data-cursor="pointer"
          >
            <span className="gradient-text">TECHKSHETRA</span>
            <span className={styles.logoAccent}>&apos;26</span>
          </button>

          {/* Desktop nav links */}
          <div className={styles.desktopNav}>
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`${styles.navLink} ${
                  activeSection === link.href ? styles.navLinkActive : styles.navLinkInactive
                }`}
                data-cursor="pointer"
              >
                {activeSection === link.href && (
                  <motion.span
                    className={styles.navLinkBg}
                    layoutId="activeNav"
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 35,
                    }}
                  />
                )}
                <span className={styles.navLinkText}>{link.label}</span>
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className={styles.desktopCta}>
            <NeonButton variant="filled" href="#register">
              Register
            </NeonButton>
          </div>

          {/* Mobile hamburger */}
          <button
            className={styles.hamburgerBtn}
            onClick={() => setMobileOpen(!mobileOpen)}
            data-cursor="pointer"
            aria-label="Toggle menu"
          >
            <motion.span
              className={styles.hamburgerLine}
              animate={{
                rotate: mobileOpen ? 45 : 0,
                y: mobileOpen ? 5 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className={styles.hamburgerLine}
              animate={{ opacity: mobileOpen ? 0 : 1, scaleX: mobileOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className={styles.hamburgerLine}
              animate={{
                rotate: mobileOpen ? -45 : 0,
                y: mobileOpen ? -5 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at top right)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`${styles.mobileLink} ${
                  activeSection === link.href ? 'gradient-text' : styles.mobileLinkInactive
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
                data-cursor="pointer"
              >
                {link.label}
              </motion.button>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <NeonButton
                variant="filled"
                href="#register"
                onClick={() => setMobileOpen(false)}
              >
                Register Now
              </NeonButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
