"use client";

import { Cylinder } from "@react-three/drei";
import * as THREE from "three";

export function ThrustReverserCascades() {
  const countDoors = 4;
  const countPanels = 6;
  const panelSize = [0.3, 0.2];
  const radius = 0.25;

  return (
    <group>
      {/* Blocker doors */}
      {Array.from({ length: countDoors }).map((_, i) => {
        const angle = (i / countDoors) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <mesh key={`door-${i}`} position={[x, y, 0]} rotation={[0, 0, angle]}>
            <boxGeometry args={[0.05, 0.2, 0.01]} />
            <meshStandardMaterial color="#505050" />
          </mesh>
        );
      })}
      {/* Cascade panels */}
      {Array.from({ length: countPanels }).map((_, i) => {
        const angle = (i / countPanels) * Math.PI * 2;
        const x = Math.cos(angle) * (radius + 0.05);
        const y = Math.sin(angle) * (radius + 0.05);
        return (
          <mesh key={`panel-${i}`} position={[x, y, -0.02]} rotation={[0, 0, angle]}>
            <planeGeometry args={[panelSize[0], panelSize[1]]} />
            <meshStandardMaterial color="#707070" side={THREE.DoubleSide} />
          </mesh>
        );
      })}
      {/* Actuator horns */}
      {Array.from({ length: countDoors }).map((_, i) => {
        const angle = (i / countDoors) * Math.PI * 2;
        const x = Math.cos(angle) * (radius + 0.1);
        const y = Math.sin(angle) * (radius + 0.1);
        return (
          <mesh key={`horn-${i}`} position={[x, y, 0.1]} rotation={[0, 0, angle]}>
            <cylinderGeometry args={[0.005, 0.005, 0.1, 8]} />
            <meshStandardMaterial color="#909090" />
          </mesh>
        );
      })}
      {/* Trunnions */}
      {Array.from({ length: countDoors }).map((_, i) => {
        const angle = (i / countDoors) * Math.PI * 2 + Math.PI / 4;
        const x = Math.cos(angle) * (radius + 0.05);
        const y = Math.sin(angle) * (radius + 0.05);
        return (
          <mesh key={`trunnion-${i}`} position={[x, y, -0.05]} rotation={[Math.PI / 2, 0, angle]}>
            <cylinderGeometry args={[0.01, 0.01, 0.02, 8]} />
            <meshStandardMaterial color="#404040" />
          </mesh>
        );
      })}
    </group>
  );
}
