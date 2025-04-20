"use client";

import * as THREE from "three";

export function HptRotorBlades() {
  const count = 24;
  const span = 0.38; // 380 mm
  const radius = 0.6; // approximate radius for HPT

  return (
    <group>
      {[...Array(count)].map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <group key={i} position={[x, y, 0]} rotation={[0, 0, angle]}>
            {/* Rotor Blade */}
            <mesh position={[0, span / 2, 0]} rotation={[-Math.PI / 2, 0, 0]}> 
              <boxGeometry args={[0.015, span, 0.005]} />
              <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Conformal cooling holes */}
            {[...Array(3)].map((_, j) => {
              const holeY = (j + 1) * (span / 4);
              return (
                <mesh key={j} position={[0, holeY, 0]} rotation={[-Math.PI / 2, 0, 0]}> 
                  <cylinderGeometry args={[0.003, 0.003, 0.01, 8]} />
                  <meshStandardMaterial color="#404040" />
                </mesh>
              );
            })}
          </group>
        );
      })}
    </group>
  );
}
