"use client";

import { Sphere } from "@react-three/drei";
import * as THREE from "three";

export function FuelInjectorNozzles() {
  const nozzles = Array.from({ length: 20 });
  return (
    <group position={[0, 0, 0]}>
      {nozzles.map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const x = Math.cos(angle) * 0.65;
        const y = Math.sin(angle) * 0.65;
        return (
          <group key={i} position={[x, y, 0]} rotation={[0, 0, angle]}>
            {/* Swirler body */}
            <Sphere args={[0.025, 16, 16]}>
              <meshStandardMaterial color="#606060" metalness={0.6} roughness={0.4} />
            </Sphere>
            {/* Four injection ports each */}
            {Array.from({ length: 4 }).map((__, j) => {
              const portAngle = (j / 4) * Math.PI * 2;
              const px = x + Math.cos(portAngle) * 0.05;
              const py = y + Math.sin(portAngle) * 0.05;
              return (
                <mesh key={j} position={[px - x, py - y, 0]} rotation={[Math.PI / 2, 0, 0]}>
                  <cylinderGeometry args={[0.0025, 0.0025, 0.01, 8]} />
                  <meshStandardMaterial color="#202020" />
                </mesh>
              );
            })}
          </group>
        );
      })}
    </group>
  );
}
