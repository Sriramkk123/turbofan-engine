"use client";

import { Cylinder } from "@react-three/drei";
import * as THREE from "three";

export function PylonMountLugs() {
  const spacing = 1.2; // 1.2m apart
  return (
    <group>
      {[ -spacing/2, spacing/2 ].map((x, i) => (
        <group key={i} position={[x, 0, -0.05]}>  
          {/* Mount lug block */}
          <mesh>
            <boxGeometry args={[0.2, 0.1, 0.1]} />
            <meshStandardMaterial color="#606060" />
          </mesh>
          {/* M20 bolt hole */}
          <Cylinder args={[0.01, 0.01, 0.12, 16]} rotation={[Math.PI/2, 0, 0]}>  
            <meshStandardMaterial color="#000000" />
          </Cylinder>
        </group>
      ))}
    </group>
  );
}
