"use client";

import { Cylinder } from "@react-three/drei";
import * as THREE from "three";

export function OilSystemInterfaces() {
  return (
    <group>
      {/* Pickup flange */}
      <mesh>
        <torusGeometry args={[0.05, 0.01, 16, 32]} />
        <meshStandardMaterial color="#404040" />
      </mesh>
      {/* Scavenge outlet */}
      <Cylinder args={[0.02, 0.02, 0.1, 16]} position={[0.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>   
        <meshStandardMaterial color="#303030" />
      </Cylinder>
      {/* Oil-cooler pad */}
      <mesh position={[-0.1, 0, 0]}>
        <boxGeometry args={[0.1, 0.02, 0.05]} />
        <meshStandardMaterial color="#505050" />
      </mesh>
    </group>
  );
}
