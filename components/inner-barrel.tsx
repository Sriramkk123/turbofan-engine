"use client";

import { Cylinder } from "@react-three/drei";

export function InnerBarrel() {
  const segments = 64;
  const inlet = 0.35; // Ø700mm
  const outlet = 0.25; // Ø500mm
  const length = 1.0;
  const bosses = 12;

  return (
    <group>
      {/* Tapered shell */}
      <Cylinder
        args={[inlet, outlet, length, segments]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color="#606060" metalness={0.3} roughness={0.7} />
      </Cylinder>
      {/* Stator vane mount bosses */}
      {Array.from({ length: bosses }).map((_, i) => {
        const angle = (i / bosses) * Math.PI * 2;
        const x = inlet * Math.cos(angle);
        const y = inlet * Math.sin(angle);
        return (
          <mesh key={i} position={[x, y, 0.5]}>  
            <boxGeometry args={[0.02, 0.02, 0.02]} />
            <meshStandardMaterial color="#808080" />
          </mesh>
        );
      })}
    </group>
  );
}
