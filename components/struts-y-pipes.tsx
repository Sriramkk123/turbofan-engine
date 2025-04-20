"use client";

import { Cylinder } from "@react-three/drei";

export function StrutsYPipes() {
  const count = 4;
  const strutLength = 1.0;
  const pipeLength = 0.2;
  const radius = 0.6;

  return (
    <group>
      {/* Struts with Y-pipes */}
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <group key={i} position={[x, y, 0]} rotation={[0, 0, angle]}>
            {/* Main strut */}
            <Cylinder args={[0.05, 0.05, strutLength, 8]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#707070" />
            </Cylinder>
            {/* Y junction pipes */}
            <group position={[0, strutLength / 2, 0]}>
              <Cylinder args={[0.05, 0.05, pipeLength, 8]} position={[0, pipeLength / 2, 0]} rotation={[0, 0, Math.PI / 4]}>
                <meshStandardMaterial color="#404040" />
              </Cylinder>
              <Cylinder args={[0.05, 0.05, pipeLength, 8]} position={[0, pipeLength / 2, 0]} rotation={[0, 0, -Math.PI / 4]}>
                <meshStandardMaterial color="#404040" />
              </Cylinder>
            </group>
          </group>
        );
      })}
    </group>
  );
}
