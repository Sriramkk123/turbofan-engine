"use client";

import { Cylinder } from "@react-three/drei";
import * as THREE from "three";

export function LpShaft() {
  return (
    <group>
      {/* Outer tube */}
      <Cylinder args={[0.075, 0.075, 6, 32]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#808080" metalness={0.7} roughness={0.3} />
      </Cylinder>
      {/* Inner bore */}
      <Cylinder args={[0.025, 0.025, 6.01, 32]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#303030" side={THREE.BackSide} />
      </Cylinder>
      {/* Journals at 1m intervals */}
      {Array.from({ length: 6 }).map((_, i) => {
        const z = -3 + i * 1;
        return (
          <Cylinder
            key={i}
            args={[0.08, 0.08, 0.1, 16]}
            position={[0, 0, z]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <meshStandardMaterial color="#606060" />
          </Cylinder>
        );
      })}
    </group>
  );
}
