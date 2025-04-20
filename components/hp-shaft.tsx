"use client";

import { Cylinder } from "@react-three/drei";
import * as THREE from "three";

export function HpShaft() {
  return (
    <group>
      {/* Solid shaft: 80mm → 120mm OD, length 3.5m */}
      <Cylinder
        args={[0.06, 0.06, 3.5, 32]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color="#909090" metalness={0.7} roughness={0.3} />
      </Cylinder>
    </group>
  );
}
