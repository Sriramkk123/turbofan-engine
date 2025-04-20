"use client";

import * as THREE from "three";

export function Mixer() {
  const length = 0.8; // 800 mm
  const chevrons = 12;
  const radius = 0.35; // approximate for sweep

  return (
    <group>
      {/* Lobed mixer body */}
      <mesh>
        <torusGeometry args={[radius, 0.1, 16, 100, Math.PI * 2]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#505050" metalness={0.4} roughness={0.6} />
      </mesh>
      {/* Trailing-edge chevrons */}
      {Array.from({ length: chevrons }).map((_, i) => {
        const angle = (i / chevrons) * Math.PI * 2;
        const x = Math.cos(angle) * (radius + 0.1);
        const y = Math.sin(angle) * (radius + 0.1);
        return (
          <mesh key={i} position={[x, y, 0.4]} rotation={[Math.PI / 2, 0, angle]}>
            <boxGeometry args={[0.01, 0.05, 0.1]} />
            <meshStandardMaterial color="#707070" />
          </mesh>
        );
      })}
    </group>
  );
}
