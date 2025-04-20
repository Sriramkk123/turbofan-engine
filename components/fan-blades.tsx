"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function FanBlades() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.005
    }
  })

  // Create a single fan blade shape
  const createBlade = () => {
    const shape = new THREE.Shape()

    // Base of blade (root)
    shape.moveTo(-0.3, 0)
    shape.lineTo(0.3, 0)

    // Taper to tip
    shape.lineTo(0.125, 1.0)
    shape.lineTo(-0.125, 1.0)
    shape.lineTo(-0.3, 0)

    return shape
  }

  // Create a custom geometry for the blade with twist
  const createTwistedBladeGeometry = () => {
    const shape = createBlade()
    const extrudeSettings = {
      steps: 20,
      depth: 0.05,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 5,
    }

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)

    // Apply twist to the geometry
    const positionAttribute = geometry.getAttribute("position")
    const vertex = new THREE.Vector3()

    for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(positionAttribute, i)

      // Calculate twist based on height (y-coordinate)
      const twistAmount = ((vertex.y / 1.0) * Math.PI * 2) / 3 // 120° twist

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
      {/* 18 Fan Blades */}
      {[...Array(18)].map((_, i) => {
        const angle = (i / 18) * Math.PI * 2
        const x = Math.cos(angle) * 1.225
        const y = Math.sin(angle) * 1.225

        return (
          <group key={i} position={[x, y, 0]} rotation={[0, 0, angle]}>
            <mesh geometry={createTwistedBladeGeometry()} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#303030" metalness={0.3} roughness={0.7} side={THREE.DoubleSide} />
            </mesh>

            {/* Stainless-steel leading-edge insert */}
            <mesh position={[-0.25, 0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <boxGeometry args={[0.05, 1.0, 0.05]} />
              <meshStandardMaterial color="#a0a0a0" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Tip fence */}
            <mesh position={[0, 0.975, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <boxGeometry args={[0.25, 0.05, 0.05]} />
              <meshStandardMaterial color="#505050" metalness={0.5} roughness={0.5} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}
