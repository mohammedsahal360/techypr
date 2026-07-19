'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import dynamic from 'next/dynamic';
import styles from './ClientPage.module.css';

// Dynamic imports for sections
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Events from '@/sections/Events';
import Timeline from '@/sections/Timeline';
import Sponsors from '@/sections/Sponsors';
import Gallery from '@/sections/Gallery';
import Team from '@/sections/Team';
import Footer from '@/sections/Footer';

import LoadingScreen from '@/components/loading/LoadingScreen';
const CustomCursor = dynamic(() => import('@/components/cursor/CustomCursor'), { ssr: false });
const Navbar = dynamic(() => import('@/components/navigation/Navbar'), { ssr: false });

export default function ClientPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSceneReady, setIsSceneReady] = useState(false);

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen 
            onComplete={() => setIsLoading(false)} 
            isSceneReady={isSceneReady} 
          />
        )}
      </AnimatePresence>

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navbar />

      {/* Noise overlay */}
      <div className="noise" />

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Mouse-reactive background light */}
        <MouseLight />

        <Hero onSceneReady={() => setIsSceneReady(true)} />
        <About />
        <Events />
        <Timeline />
        <Sponsors />
        <Gallery />
        <Team />
        <Footer />
      </main>
    </>
  );
}

// Mouse-reactive background glow
function MouseLight() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY + window.scrollY });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <div
      className={styles.mouseLight}
      style={{
        background: `radial-gradient(800px circle at ${pos.x}px ${pos.y}px, rgba(124, 58, 237, 0.06), transparent 40%)`,
      }}
    />
  );
}
