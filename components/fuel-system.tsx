"use client";

import { Cylinder } from "@react-three/drei";

export function FuelSystemComponents() {
  return (
    <group>
      {/* Engine-driven fuel pump housing */}
      <mesh position={[0.2, 0, 0]}>
        <boxGeometry args={[0.15, 0.1, 0.1]} />
        <meshStandardMaterial color="#707070" />
      </mesh>
      {/* FADEC-style control block */}
      <mesh position={[0.4, 0, 0]}>
        <boxGeometry args={[0.1, 0.08, 0.05]} />
        <meshStandardMaterial color="#505050" />
      </mesh>
      {/* Quick-disconnect lines */}
      {[...Array(3)].map((_, i) => {
        const angle = (i / 3) * Math.PI * 2;
        const x = 0.3 * Math.cos(angle);
        const y = 0.3 * Math.sin(angle);
        return (
          <mesh key={i} position={[x, y, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 0.4, 8]} />
            <meshStandardMaterial color="#303030" />
          </mesh>
        );
      })}
    </group>
  );
}
