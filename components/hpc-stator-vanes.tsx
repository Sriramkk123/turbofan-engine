"use client"

import * as THREE from "three"
import { Cylinder } from "@react-three/drei"

export function HpcStatorVanes() {
  // Disk diameters for the 10 stages (from 1.20m to 0.40m)
  const diskDiameters = [1.2, 1.12, 1.04, 0.96, 0.88, 0.8, 0.72, 0.64, 0.56, 0.48, 0.4]
  const diskSpacing = 0.15 // Spacing between disks

  // Blade lengths for the 10 stages (from 250mm to 50mm)
  const bladeLengths = [0.25, 0.23, 0.21, 0.19, 0.17, 0.15, 0.13, 0.11, 0.09, 0.07, 0.05]

  // Create a single vane shape
  const createVaneShape = () => {
    const shape = new THREE.Shape()

    // Airfoil shape
    shape.moveTo(-0.02, 0)
    shape.bezierCurveTo(-0.02, 0.03, 0.02, 0.03, 0.02, 0)
    shape.bezierCurveTo(0.02, -0.03, -0.02, -0.03, -0.02, 0)

    return shape
  }

  // Create a custom geometry for the vane
  const createVaneGeometry = (height: number) => {
    const shape = createVaneShape()
    const extrudeSettings = {
      steps: 20,
      depth: 0.01,
      bevelEnabled: true,
      bevelThickness: 0.002,
      bevelSize: 0.002,
      bevelSegments: 3,
    }

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
    return geometry
  }

  return (
    <group position={[0, 0, 0]}>
      {diskDiameters.map((diameter, stageIndex) => {
        if (stageIndex >= 10) return null // Only 10 stages

        const radius = diameter / 2 + 0.03 // Slightly larger than rotor
        const zPosition = stageIndex * diskSpacing + diskSpacing / 2 // Between rotors
        const vaneHeight = bladeLengths[stageIndex]

        return (
          <group key={stageIndex} position={[0, 0, zPosition]}>
            {/* Stator Casing Ring */}
            <mesh>
              <cylinderGeometry args={[radius + 0.03, radius + 0.03, 0.02, 64, 1, true]} />
              <meshStandardMaterial color="#505050" metalness={0.6} roughness={0.4} side={THREE.DoubleSide} />
            </mesh>

            {/* 24 Stator Vanes per stage */}
            {[...Array(24)].map((_, i) => {
              const angle = (i / 24) * Math.PI * 2
              const x = Math.cos(angle) * radius
              const y = Math.sin(angle) * radius

              return (
                <group key={i} position={[x, y, 0]} rotation={[0, 0, angle]}>
                  <mesh geometry={createVaneGeometry(vaneHeight)} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <meshStandardMaterial color="#909090" metalness={0.5} roughness={0.5} side={THREE.DoubleSide} />
                  </mesh>

                  {/* Platform shrouds */}
                  <mesh position={[0, -vaneHeight / 2, 0]}>
                    <boxGeometry args={[0.06, 0.01, 0.03]} />
                    <meshStandardMaterial color="#707070" />
                  </mesh>
                </group>
              )
            })}

            {/* Seal blocks with spring clips */}
            {[...Array(8)].map((_, i) => {
              const angle = (i / 8) * Math.PI * 2
              const x = Math.cos(angle) * (radius + 0.03)
              const y = Math.sin(angle) * (radius + 0.03)

              return (
                <group key={i} position={[x, y, 0]} rotation={[0, 0, angle]}>
                  {/* Seal block */}
                  <mesh>
                    <boxGeometry args={[0.04, 0.02, 0.02]} />
                    <meshStandardMaterial color="#606060" />
                  </mesh>

                  {/* Spring clip */}
                  <Cylinder args={[0.005, 0.005, 0.03, 8]} position={[0, 0.01, 0]} rotation={[0, Math.PI / 2, 0]}>
                    <meshStandardMaterial color="#c0c0c0" />
                  </Cylinder>
                </group>
              )
            })}
          </group>
        )
      })}
    </group>
  )
}
