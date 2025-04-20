"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function HpcBlades() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.005
    }
  })

  // Disk diameters for the 10 stages (from 1.20m to 0.40m)
  const diskDiameters = [1.2, 1.12, 1.04, 0.96, 0.88, 0.8, 0.72, 0.64, 0.56, 0.48, 0.4]
  const diskSpacing = 0.15 // Spacing between disks

  // Blade lengths for the 10 stages (from 250mm to 50mm)
  const bladeLengths = [0.25, 0.23, 0.21, 0.19, 0.17, 0.15, 0.13, 0.11, 0.09, 0.07, 0.05]

  // Create a single blade shape
  const createBlade = (rootChord: number, tipChord: number, height: number) => {
    const shape = new THREE.Shape()

    // Base of blade (root)
    shape.moveTo(-rootChord / 2, 0)
    shape.lineTo(rootChord / 2, 0)

    // Taper to tip
    shape.lineTo(tipChord / 2, height)
    shape.lineTo(-tipChord / 2, height)
    shape.lineTo(-rootChord / 2, 0)

    return shape
  }

  // Create a custom geometry for the blade with cooling channels
  const createBladeGeometry = (rootChord: number, tipChord: number, height: number, stage: number) => {
    const shape = createBlade(rootChord, tipChord, height)
    const extrudeSettings = {
      steps: 20,
      depth: 0.01 + (0.01 * (10 - stage)) / 10, // Thicker blades for earlier stages
      bevelEnabled: true,
      bevelThickness: 0.003,
      bevelSize: 0.003,
      bevelSegments: 3,
    }

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
    return geometry
  }

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {diskDiameters.map((diameter, stageIndex) => {
        if (stageIndex >= 10) return null // Only 10 stages

        const radius = diameter / 2
        const zPosition = stageIndex * diskSpacing
        const bladeHeight = bladeLengths[stageIndex]
        const rootChord = 0.05 - (0.02 * stageIndex) / 10 // Decreasing chord size
        const tipChord = rootChord * 0.6 // Taper ratio

        return (
          <group key={stageIndex} position={[0, 0, zPosition]}>
            {/* 24 Blades per stage */}
            {[...Array(24)].map((_, i) => {
              const angle = (i / 24) * Math.PI * 2
              const x = Math.cos(angle) * radius
              const y = Math.sin(angle) * radius

              return (
                <group key={i} position={[x, y, 0]} rotation={[0, 0, angle]}>
                  <mesh
                    geometry={createBladeGeometry(rootChord, tipChord, bladeHeight, stageIndex)}
                    position={[0, 0, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  >
                    <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} side={THREE.DoubleSide} />
                  </mesh>

                  {/* Simplified representation of cooling channels */}
                  {[...Array(3)].map((_, j) => {
                    const channelPos = (j + 1) * (bladeHeight / 4)
                    return (
                      <mesh key={j} position={[0, channelPos, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.002, 0.002, rootChord * 0.8, 8]} />
                        <meshStandardMaterial color="#303030" />
                      </mesh>
                    )
                  })}
                </group>
              )
            })}
          </group>
        )
      })}
    </group>
  )
}
