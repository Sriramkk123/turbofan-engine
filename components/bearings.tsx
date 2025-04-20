"use client";

import { Cylinder } from "@react-three/drei";
import * as THREE from "three";

export function Bearings() {
  const count = 4;
  const length = 0.1; // 100 mm
  const radius = 0.09; // inner fit around shaft

  return (
    <group>
      {/* Fluid-film journal bearings */}
      {Array.from({ length: count }).map((_, i) => {
        const z = -1.5 + i * 1; // spaced at 1 m intervals
        return (
          <group key={i} position={[0, 0, z]}>
            <Cylinder args={[radius, radius, length, 32]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#999999" metalness={0.5} roughness={0.4} />
            </Cylinder>
            {/* Oil port */}
            <mesh position={[radius + 0.02, 0, z]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.01, 0.01, 0.05, 8]} />
              <meshStandardMaterial color="#333333" />
            </mesh>
          </group>
        );
      })}

      {/* Tilting-pad thrust bearing at flange */}
      <group position={[0, 0, 2]}> 
        <Cylinder args={[0.1, 0.1, 0.05, 32]} rotation={[Math.PI / 2, 0, 0]}> 
          <meshStandardMaterial color="#707070" metalness={0.6} roughness={0.4} />
        </Cylinder>
      </group>
    </group>
  );
}
