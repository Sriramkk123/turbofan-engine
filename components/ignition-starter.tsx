"use client";

import { Cylinder } from "@react-three/drei";
import * as THREE from "three";

export function IgnitionStarter() {
  const count = 20; // one set per combustor
  const radius = 0.35;

  return (
    <group>
      {Array.from({ length: count }).map((_, i) => {
        const baseAngle = (i / count) * Math.PI * 2;
        return [0, Math.PI].map((offset, j) => {
          const angle = baseAngle + offset;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return (
            <group key={`${i}-${j}`} position={[x, y, 0]} rotation={[0, 0, angle]}>  
              {/* Spark igniter housing */}
              <Cylinder args={[0.01, 0.01, 0.05, 8]} rotation={[Math.PI / 2, 0, 0]}>  
                <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
              </Cylinder>
              {/* HT lead clip */}
              <mesh position={[0.02, 0, 0]}>  
                <boxGeometry args={[0.02, 0.005, 0.005]} />
                <meshStandardMaterial color="#000000" />
              </mesh>
            </group>
          );
        });
      })}
    </group>
  );
}
