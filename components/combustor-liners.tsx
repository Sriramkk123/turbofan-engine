"use client";

import { Cylinder } from "@react-three/drei";
import * as THREE from "three";

export function CombustorLiners() {
  return (
    <group position={[0, 0, 0]}>
      {/* Outer liner */}
      <Cylinder args={[0.325, 0.325, 1.0, 64, 1, true]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#303030" metalness={0.3} roughness={0.7} side={THREE.DoubleSide} />
      </Cylinder>
      {/* Ceramic TBC inner coating */}
      <Cylinder args={[0.225, 0.225, 1.0, 64, 1, true]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#cca990" metalness={0.2} roughness={0.8} side={THREE.DoubleSide} />
      </Cylinder>
      {/* Film-cooling holes (500 holes in 20 rows) */}
      {Array.from({ length: 20 }).map((_, row) =>
        Array.from({ length: 25 }).map((__, col) => {
          const angle = (col / 25) * Math.PI * 2;
          const z = (row / 19 - 0.5) * 1.0;
          const x = Math.cos(angle) * 0.325;
          const y = Math.sin(angle) * 0.325;
          return (
            <mesh key={`${row}-${col}`} position={[x, y, z]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.001, 0.001, 0.01, 8]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
          );
        })
      )}
    </group>
  );
}
