"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function RotorBlades() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.005
    }
  })

  // Disk diameters for the 4 stages (from 1.80m to 1.20m)
  const diskDiameters = [1.8, 1.6, 1.4, 1.2]
  const diskSpacing = 0.25 // Spacing between disks

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

  // Create a custom geometry for the blade with twist
  const createTwistedBladeGeometry = (rootChord: number, tipChord: number, height: number) => {
    const shape = createBlade(rootChord, tipChord, height)
    const extrudeSettings = {
      steps: 20,
      depth: 0.02,
      bevelEnabled: true,
      bevelThickness: 0.005,
      bevelSize: 0.005,
      bevelSegments: 3,
    }

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)

    // Apply twist to the geometry
    const positionAttribute = geometry.getAttribute("position")
    const vertex = new THREE.Vector3()

    for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(positionAttribute, i)

      // Calculate twist based on height (y-coordinate)
      const twistAmount = ((vertex.y / height) * Math.PI) / 6 // 30° twist

      // Apply twist around y-axis
      const x = vertex.x
      const z = vertex.z

      vertex.x = x * Math.cos(twistAmount) - z * Math.sin(twistAmount)
      vertex.z = x * Math.sin(twistAmount) + z * Math.cos(twistAmount)

      positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z)
    }

    geometry.computeVertexNormals()
    return geometry
  }

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {diskDiameters.map((diameter, stageIndex) => {
        const radius = diameter / 2
        const zPosition = stageIndex * diskSpacing
        const bladeHeight = 0.3 // 300mm span
        const rootChord = 0.1 // 100mm root chord
        const tipChord = 0.04 // 40mm tip chord

        return (
          <group key={stageIndex} position={[0, 0, zPosition]}>
            {/* 24 Rotor Blades per stage */}
            {[...Array(24)].map((_, i) => {
              const angle = (i / 24) * Math.PI * 2
              const x = Math.cos(angle) * radius
              const y = Math.sin(angle) * radius

              return (
                <group key={i} position={[x, y, 0]} rotation={[0, 0, angle]}>
                  <mesh
                    geometry={createTwistedBladeGeometry(rootChord, tipChord, bladeHeight)}
                    position={[0, 0, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  >
                    <meshStandardMaterial color="#a0a0a0" metalness={0.7} roughness={0.3} side={THREE.DoubleSide} />
                  </mesh>

                  {/* Internal mass-tuning holes (simplified representation) */}
                  <mesh position={[0, 0.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.01, 0.01, 0.03, 8]} />
                    <meshStandardMaterial color="#505050" />
                  </mesh>
                </group>
              )
            })}
          </group>
        )
      })}
    </group>
  )
}
