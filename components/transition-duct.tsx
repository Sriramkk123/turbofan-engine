"use client";

import { Cylinder } from "@react-three/drei";
import * as THREE from "three";

export function TransitionDuct() {
  return (
    <group>
      {/* Conical transition from Ø450mm to Ø420mm, length 200mm */}
      <Cylinder
        args={[0.225, 0.21, 0.2, 64, 1, true]}
        position={[0, 0, 0.6]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial
          color="#505050"
          metalness={0.3}
          roughness={0.7}
          side={THREE.DoubleSide}
        />
      </Cylinder>
      {/* Four mounting lugs on exit flange */}
      {[...Array(4)].map((_, i) => {
        const angle = (i / 4) * Math.PI * 2;
        const x = Math.cos(angle) * 0.225;
        const y = Math.sin(angle) * 0.225;
        return (
          <group key={i} position={[x, y, 0.7]} rotation={[0, 0, angle]}>
            <mesh>
              <boxGeometry args={[0.02, 0.02, 0.01]} />
              <meshStandardMaterial
                color="#707070"
                metalness={0.6}
                roughness={0.4}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
