'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 2000;
const BOUNDS_Y = { min: -5, max: 8 };
const BOUNDS_XZ = 15;

// Color palette for particles
const PALETTE = [
  new THREE.Color('#7C3AED'),
  new THREE.Color('#A855F7'),
  new THREE.Color('#3B82F6'),
];

export default function Particles() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors, sizes, velocities } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const siz = new Float32Array(PARTICLE_COUNT);
    const vel = new Float32Array(PARTICLE_COUNT * 3); // vx, vy, vz per particle

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Random starting position
      pos[i3] = (Math.random() - 0.5) * BOUNDS_XZ * 2;
      pos[i3 + 1] = BOUNDS_Y.min + Math.random() * (BOUNDS_Y.max - BOUNDS_Y.min);
      pos[i3 + 2] = (Math.random() - 0.5) * BOUNDS_XZ * 2;

      // Random color from palette
      const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      col[i3] = color.r;
      col[i3 + 1] = color.g;
      col[i3 + 2] = color.b;

      // Random size between 0.5 and 3
      siz[i] = 0.5 + Math.random() * 2.5;

      // Velocities: gentle upward + slight horizontal drift
      vel[i3] = (Math.random() - 0.5) * 0.003; // vx — horizontal drift
      vel[i3 + 1] = 0.003 + Math.random() * 0.008; // vy — upward
      vel[i3 + 2] = (Math.random() - 0.5) * 0.003; // vz — horizontal drift
    }

    return { positions: pos, colors: col, sizes: siz, velocities: vel };
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [positions, colors, sizes]);

  useFrame(() => {
    if (!pointsRef.current) return;

    const posAttr = pointsRef.current.geometry.getAttribute('position') as THREE.BufferAttribute;
    const posArr = posAttr.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Apply velocity
      posArr[i3] += velocities[i3];
      posArr[i3 + 1] += velocities[i3 + 1];
      posArr[i3 + 2] += velocities[i3 + 2];

      // Respawn at bottom when reaching top
      if (posArr[i3 + 1] > BOUNDS_Y.max) {
        posArr[i3] = (Math.random() - 0.5) * BOUNDS_XZ * 2;
        posArr[i3 + 1] = BOUNDS_Y.min;
        posArr[i3 + 2] = (Math.random() - 0.5) * BOUNDS_XZ * 2;
      }
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry} frustumCulled={false}>
      <pointsMaterial
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        size={1.5}
        depthWrite={false}
      />
    </points>
  );
}
