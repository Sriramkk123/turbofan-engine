"use client"

import * as THREE from "three"

export function SplitCowling() {
  return (
    <group position={[0, 0, 0.5]}>
      {/* Upper Cowling Panel */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[1.3, 0.95, 0.3, 64, 1, true, 0, Math.PI]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#303030" metalness={0.4} roughness={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* Upper Cowling Thickness */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[1.308, 0.958, 0.3, 64, 1, true, 0, Math.PI]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#303030" metalness={0.4} roughness={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* Lower Cowling Panel */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[1.3, 0.95, 0.3, 64, 1, true, Math.PI, Math.PI]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#404040" metalness={0.4} roughness={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* Lower Cowling Thickness */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[1.308, 0.958, 0.3, 64, 1, true, Math.PI, Math.PI]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#404040" metalness={0.4} roughness={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* Hinge Flanges - Left */}
      <mesh position={[-1.3, 0, 0]}>
        <boxGeometry args={[0.05, 0.15, 0.3]} />
        <meshStandardMaterial color="#505050" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Hinge Flanges - Right */}
      <mesh position={[1.3, 0, 0]}>
        <boxGeometry args={[0.05, 0.15, 0.3]} />
        <meshStandardMaterial color="#505050" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Quick-release fasteners */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const x = Math.cos(angle) * 1.3
        const y = Math.sin(angle) * 1.3

        return (
          <mesh key={i} position={[x, y, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.05, 8]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
          </mesh>
        )
      })}

      {/* Inspection Doors - Upper */}
      <mesh position={[0, 1.0, 0.1]}>
        <boxGeometry args={[0.3, 0.2, 0.01]} />
        <meshStandardMaterial color="#505050" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Inspection Doors - Lower */}
      <mesh position={[0, -1.0, 0.1]}>
        <boxGeometry args={[0.3, 0.2, 0.01]} />
        <meshStandardMaterial color="#505050" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  )
}
