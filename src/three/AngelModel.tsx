'use client';

import { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface AngelModelProps {
  mousePosition: { x: number; y: number };
  hovered: boolean;
  onPointerOver?: () => void;
  onPointerOut?: () => void;
  color?: string;
}

export default function AngelModel({ mousePosition, hovered, onPointerOver, onPointerOut, color = '#ed3a3aff' }: AngelModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Load the Draco compressed GLTF model
  const { scene } = useGLTF('/models/angel-compressed.glb');

  // Three.js doesn't support 8-char hex (RGBA), so strip alpha if present
  const safeColor = color.length === 9 && color.startsWith('#') ? color.slice(0, 7) : color;

  // Clone the scene so we can safely modify materials
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  // Set up emissive materials on mount and update on hover
  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        // Clone the material so we don't mutate the cached original
        const mat = child.material.clone();
        if (mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshPhysicalMaterial) {
          mat.emissive = new THREE.Color(safeColor);
          mat.emissiveIntensity = hovered ? 0.8 : 0.2;
          mat.needsUpdate = true;
        }
        child.material = mat;
      }
    });
  }, [clonedScene, hovered, safeColor]);

  useFrame((state) => {
    if (!groupRef.current) return;

    const t = state.clock.getElapsedTime();

    // Idle floating animation — gentle sine bob on Y
    groupRef.current.position.y = Math.sin(t) * 0.15;

    // Soft continuous Y-axis rotation at 0.1 rad/s
    groupRef.current.rotation.y += 0.1 * state.clock.getDelta() || 0.0017;

    // Mouse parallax — lerp toward mouse for smooth tracking
    const targetRotX = mousePosition.y * 0.15;
    const targetRotZ = -mousePosition.x * 0.08;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      0.05
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      targetRotZ,
      0.05
    );
  });

  return (
    <group ref={groupRef} scale={1.5} onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
      {/* Custom rim light from behind */}
      <pointLight
        color={safeColor}
        intensity={3}
        position={[0, 1, -3]}
        distance={10}
        decay={2}
      />
      {/* Blue fill light from the side */}
      <pointLight
        color="#3B82F6"
        intensity={2}
        position={[3, 0.5, 0]}
        distance={8}
        decay={2}
      />
      {/* Soft white key light from front */}
      <pointLight
        color="#ffffff"
        intensity={1.2}
        position={[-1, 2, 4]}
        distance={10}
        decay={2}
      />

      <primitive object={clonedScene} />
    </group>
  );
}

// Preload the model for faster startup
useGLTF.preload('/models/angel.glb');
