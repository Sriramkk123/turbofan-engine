"use client"

import * as THREE from "three"

export function InterstageRings() {
  // Disk diameters for the 4 stages (from 1.80m to 1.20m)
  const diskDiameters = [1.8, 1.6, 1.4, 1.2]
  const diskSpacing = 0.25 // Spacing between disks

  return (
    <group position={[0, 0, 0]}>
      {diskDiameters.map((diameter, stageIndex) => {
        const radius = diameter / 2 + 0.1 // Larger than rotor and stator
        const zPosition = stageIndex * diskSpacing

        // Skip the last one as it's not an interstage
        if (stageIndex === diskDiameters.length - 1) return null

        return (
          <group key={stageIndex} position={[0, 0, zPosition + diskSpacing / 2]}>
            {/* Interstage Casing Ring */}
            <mesh>
              <cylinderGeometry args={[radius, radius, 0.03, 64, 1, true]} />
              <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} side={THREE.DoubleSide} />
            </mesh>

            {/* Labyrinth seal grooves */}
            {[...Array(5)].map((_, i) => {
              const groovePosition = -0.01 + i * 0.005

              return (
                <mesh key={i} position={[0, 0, groovePosition]}>
                  <torusGeometry args={[radius - 0.005, 0.002, 16, 64]} />
                  <meshStandardMaterial color="#a0a0a0" />
                </mesh>
              )
            })}
          </group>
        )
      })}
    </group>
  )
}
