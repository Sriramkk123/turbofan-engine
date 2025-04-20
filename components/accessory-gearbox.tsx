"use client";

import { Cylinder } from "@react-three/drei";
import * as THREE from "three";

export function AccessoryGearbox() {
  return (
    <group>
      {/* Aluminum housing */}
      <mesh>
        <boxGeometry args={[0.5, 0.3, 0.2]} />
        <meshStandardMaterial color="#b0b0b0" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Three mounting lugs */}
      {[...Array(3)].map((_, i) => {
        const angle = (i / 3) * Math.PI * 2;
        const x = Math.cos(angle) * 0.25;
        const y = Math.sin(angle) * 0.15;
        return (
          <mesh key={i} position={[x, y, 0.1]} rotation={[0, 0, angle]}>
            <boxGeometry args={[0.05, 0.05, 0.1]} />
            <meshStandardMaterial color="#909090" />
          </mesh>
        );
      })}
      {/* LP-shaft drive gear boss */}
      <Cylinder args={[0.05, 0.05, 0.1, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#404040" />
      </Cylinder>
    </group>
  );
}
