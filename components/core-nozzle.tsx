"use client";

import { Cylinder } from "@react-three/drei";
import * as THREE from "three";

export function CoreNozzle() {
  return (
    <group>
      {/* Convergent bell nozzle: inlet Ø420mm → outlet Ø300mm, length 400mm */}
      <Cylinder args={[0.15, 0.21, 0.4, 64, 1, true]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#606060" metalness={0.5} roughness={0.5} side={THREE.DoubleSide} />
      </Cylinder>
      {/* Variable-geometry petals */}
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const x = Math.cos(angle) * 0.21;
        const y = Math.sin(angle) * 0.21;
        return (
          <mesh key={i} position={[x, y, 0.2]} rotation={[Math.PI / 2, 0, angle]}>
            <boxGeometry args={[0.01, 0.05, 0.2]} />
            <meshStandardMaterial color="#707070" />
          </mesh>
        );
      })}
    </group>
  );
}
