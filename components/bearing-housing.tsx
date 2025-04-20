"use client";

import { Cylinder } from "@react-three/drei";
import * as THREE from "three";

export function BearingHousing() {
  return (
    <group>
      {/* Housing block */}
      <mesh>
        <boxGeometry args={[0.8, 0.2, 0.4]} />
        <meshStandardMaterial color="#606060" metalness={0.5} roughness={0.5} />
      </mesh>
      {/* Oil-supply boss */}
      <Cylinder
        args={[0.02, 0.02, 0.1, 8]}
        position={[0.4, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <meshStandardMaterial color="#333333" />
      </Cylinder>
      {/* Oil-scavenge boss */}
      <Cylinder
        args={[0.02, 0.02, 0.1, 8]}
        position={[-0.4, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <meshStandardMaterial color="#333333" />
      </Cylinder>
    </group>
  );
}
