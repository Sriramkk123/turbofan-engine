"use client";

import * as THREE from "three";

export function LptStage3Blades() {
  const count = 24;
  const span = 0.375; // 375 mm span
  const radius = 0.45; // approximate radius for LPT stage 3

  return (
    <group>
      {[...Array(count)].map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <group key={i} position={[x, y, 0]} rotation={[0, 0, angle]}>
            {/* Blade */}
            <mesh position={[0, span / 2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <boxGeometry args={[0.012, span, 0.005]} />
              <meshStandardMaterial color="#b0b0b0" metalness={0.6} roughness={0.4} />
            </mesh>
            {/* Shrouded platform */}
            <mesh position={[0, -0.01, 0]}>
              <boxGeometry args={[0.02, 0.02, 0.005]} />
              <meshStandardMaterial color="#808080" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
