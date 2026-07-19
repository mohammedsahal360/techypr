'use client';

import { Suspense, useState, useCallback, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import AngelModel from './AngelModel';
import Particles from './Particles';
import CyberGrid from './CyberGrid';
import FloatingCubes from './FloatingCubes';
import Effects from './Effects';

interface AngelSceneProps {
  className?: string;
  color?: string;
  onReady?: () => void;
}

// Helper component that mounts when Suspense resolves
function SceneReady({ onReady }: { onReady?: () => void }) {
  useEffect(() => {
    if (onReady) onReady();
  }, [onReady]);
  return null;
}

export default function AngelScene({ className, color, onReady }: AngelSceneProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  // Track normalised mouse position (-1 to 1) relative to the canvas
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    setMousePosition({ x, y });
  }, []);

  // Double-click reset: OrbitControls will handle via its own reset
  const handleDoubleClick = useCallback(() => {
    // OrbitControls reset is handled by the component's own ref if needed
    // For now this is a placeholder — the controls constrain movement enough
  }, []);

  return (
    <div
      ref={canvasContainerRef}
      className={className}
      onMouseMove={handleMouseMove}
      onDoubleClick={handleDoubleClick}
      style={{ width: '100%', height: '100%' }}
    >
      <Canvas
        camera={{
          fov: 45,
          position: [0, 0, 5],
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: 3, // ACESFilmicToneMapping
        }}
        style={{ background: 'transparent' }}
      >
        {/* Scene fog for depth fade */}
        <fog attach="fog" args={['#050510', 5, 15]} />

        {/* Ambient fill so nothing is pitch black */}
        <ambientLight intensity={0.15} color="#A855F7" />

        <Suspense fallback={null}>
          <SceneReady onReady={onReady} />
          {/* 3D Angel Model */}
          <AngelModel
            mousePosition={mousePosition}
            hovered={hovered}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            color={color}
          />

          {/* Floating particles */}
          <Particles />

          {/* Animated cyber grid floor */}
          <CyberGrid />

          {/* Floating translucent cubes */}
          <FloatingCubes />

          {/* Night environment for reflections */}
          <Environment preset="night" />
        </Suspense>

        {/* Post-processing stack */}
        <Effects />

        {/* Orbit controls — constrained, no zoom/pan */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 3}
          makeDefault
        />
      </Canvas>
    </div>
  );
}
