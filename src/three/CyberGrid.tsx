'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Grid } from '@react-three/drei';
import * as THREE from 'three';

export default function CyberGrid() {
  const gridRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!gridRef.current) return;

    const t = state.clock.getElapsedTime();

    // Scroll along Z to create forward-movement illusion
    gridRef.current.position.z = -(t * 0.8) % 1;
  });

  return (
    <group position={[0, -2, 0]}>
      <Grid
        ref={gridRef}
        args={[60, 60]}
        cellSize={0.8}
        cellThickness={0.6}
        cellColor="#7C3AED"
        sectionSize={3.2}
        sectionThickness={1.2}
        sectionColor="#A855F7"
        fadeDistance={25}
        fadeStrength={1.5}
        fadeFrom={0.5}
        followCamera={false}
        infiniteGrid
        side={THREE.DoubleSide}
      />

      {/* Additional glow plane underneath for neon ground effect */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshBasicMaterial
          color="#7C3AED"
          transparent
          opacity={0.03}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
