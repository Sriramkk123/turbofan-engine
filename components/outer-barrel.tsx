"use client";

import { Cylinder } from "@react-three/drei";

export function OuterBarrel() {
  const segments = 64;
  const radius = 1.25; // Ø2.5m
  const length = 1.5;
  const lugs = 6;

  return (
    <group>
      {/* Fan case shell */}
      <Cylinder args={[radius, radius, length, segments]} rotation={[Math.PI / 2, 0, 0]}>  
        <meshStandardMaterial color="#787878" metalness={0.4} roughness={0.6} />
      </Cylinder>
      {/* Mounting lugs */}
      {Array.from({ length: lugs }).map((_, i) => {
        const angle = (i / lugs) * Math.PI * 2;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        return (
          <mesh key={i} position={[x, y, 0.75]} rotation={[0, 0, angle]}>  
            <cylinderGeometry args={[0.02, 0.02, 0.1, 8]} />
            <meshStandardMaterial color="#909090" />
          </mesh>
        );
      })}
    </group>
  );
}
