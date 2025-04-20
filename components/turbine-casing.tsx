"use client";

import { Cylinder } from "@react-three/drei";
import * as THREE from "three";

export function TurbineCasing() {
  return (
    <group>
      {/* Two-piece segmented shell */}
      {[0, Math.PI].map((rot, i) => (
        <Cylinder
          key={i}
          args={[0.8, 0.8, 0.5, 64, 1, true]}
          rotation={[Math.PI / 2, 0, rot]}
        >
          <meshStandardMaterial
            color="#505050"
            metalness={0.6}
            roughness={0.4}
            side={THREE.DoubleSide}
          />
        </Cylinder>
      ))}
      {/* Tie-bolt flanges */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 0.8;
        const y = Math.sin(angle) * 0.8;
        return (
          <group key={i} position={[x, y, 0.25]} rotation={[0, 0, angle]}>
            <mesh>
              <boxGeometry args={[0.02, 0.02, 0.1]} />
              <meshStandardMaterial color="#707070" metalness={0.5} roughness={0.5} />
            </mesh>
          </group>
        );
      })}
      {/* Outer shroud segments */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const x = Math.cos(angle) * 0.8;
        const y = Math.sin(angle) * 0.8;
        return (
          <mesh key={i} position={[x, y, -0.25]} rotation={[0, 0, angle]}>
            <planeGeometry args={[0.2, 0.05]} />
            <meshStandardMaterial color="#606060" side={THREE.DoubleSide} />
          </mesh>
        );
      })}
    </group>
  );
}
