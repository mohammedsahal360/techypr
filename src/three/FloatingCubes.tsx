'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';

interface CubeData {
  position: [number, number, number];
  scale: number;
  rotationSpeed: [number, number, number];
  floatOffset: number;
  floatAmplitude: number;
}

const CUBE_COUNT = 18;

function generateCubes(): CubeData[] {
  const cubes: CubeData[] = [];
  for (let i = 0; i < CUBE_COUNT; i++) {
    cubes.push({
      position: [
        (Math.random() - 0.5) * 20, // x: -10 to 10
        -3 + Math.random() * 8,     // y: -3 to 5
        (Math.random() - 0.5) * 20, // z: -10 to 10
      ],
      scale: 0.1 + Math.random() * 0.4,
      rotationSpeed: [
        (Math.random() - 0.5) * 0.4,
        (Math.random() - 0.5) * 0.4,
        (Math.random() - 0.5) * 0.2,
      ],
      floatOffset: Math.random() * Math.PI * 2,
      floatAmplitude: 0.1 + Math.random() * 0.3,
    });
  }
  return cubes;
}

function FloatingCube({ data }: { data: CubeData }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const t = state.clock.getElapsedTime();

    // Independent rotation
    meshRef.current.rotation.x += data.rotationSpeed[0] * 0.01;
    meshRef.current.rotation.y += data.rotationSpeed[1] * 0.01;
    meshRef.current.rotation.z += data.rotationSpeed[2] * 0.01;

    // Floating up/down with sin(time + offset)
    meshRef.current.position.y =
      data.position[1] + Math.sin(t + data.floatOffset) * data.floatAmplitude;
  });

  return (
    <mesh
      ref={meshRef}
      position={data.position}
      scale={data.scale}
      geometry={geometry}
    >
      <meshStandardMaterial
        color="#7C3AED"
        transparent
        opacity={0.15}
        metalness={0.5}
        roughness={0.2}
        emissive="#7C3AED"
        emissiveIntensity={0.1}
        depthWrite={false}
      />
      <Edges
        threshold={15}
        color="#A855F7"
        linewidth={1}
      />
    </mesh>
  );
}

export default function FloatingCubes() {
  const cubes = useMemo(() => generateCubes(), []);

  return (
    <group>
      {cubes.map((cube, i) => (
        <FloatingCube key={i} data={cube} />
      ))}
    </group>
  );
}
