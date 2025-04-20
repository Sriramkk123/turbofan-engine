"use client";

import * as THREE from "three";

export function HptNozzleGuideVanes() {
  const count = 24;
  const span = 0.4; // 400 mm
  const radius = 0.6; // approximate radius
  const leanAngle = Math.PI / 18; // ~10° lean

  const createVaneShape = () => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.02, 0);
    shape.bezierCurveTo(-0.02, 0.02, 0.02, 0.02, 0.02, 0);
    shape.bezierCurveTo(0.02, -0.02, -0.02, -0.02, -0.02, 0);
    return shape;
  };

  const createVaneGeometry = (height: number) => {
    const shape = createVaneShape();
    const geometry = new THREE.ExtrudeGeometry(shape, { steps: 1, depth: height, bevelEnabled: false });
    return geometry;
  };

  return (
    <group>
      {[...Array(count)].map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <group key={i} position={[x, y, 0]} rotation={[0, leanAngle, angle]}>
            {/* Dovetail root */}
            <mesh position={[0, -0.02, 0]}> 
              <boxGeometry args={[0.04, 0.02, 0.04]} />
              <meshStandardMaterial color="#404040" />
            </mesh>
            {/* Vane */}
            <mesh geometry={createVaneGeometry(span)} rotation={[-Math.PI / 2, 0, 0]}> 
              <meshStandardMaterial color="#909090" metalness={0.5} roughness={0.5} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
