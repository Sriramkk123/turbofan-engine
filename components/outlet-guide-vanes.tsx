"use client"

import * as THREE from "three"

export function OutletGuideVanes() {
  // Create a single OGV shape
  const createOGVShape = () => {
    const shape = new THREE.Shape()

    // Airfoil shape
    shape.moveTo(-0.05, 0)
    shape.bezierCurveTo(-0.05, 0.1, 0.05, 0.1, 0.05, 0)
    shape.bezierCurveTo(0.05, -0.1, -0.05, -0.1, -0.05, 0)

    return shape
  }

  // Create a custom geometry for the OGV with twist
  const createTwistedOGVGeometry = () => {
    const shape = createOGVShape()
    const extrudeSettings = {
      steps: 20,
      depth: 0.5,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.01,
      bevelSegments: 3,
    }

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)

    // Apply twist to the geometry
    const positionAttribute = geometry.getAttribute("position")
    const vertex = new THREE.Vector3()

    for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(positionAttribute, i)

      // Calculate twist based on depth (z-coordinate)
      const twistAmount = ((vertex.z / 0.5) * Math.PI) / 6 // 30° twist

      // Apply twist around z-axis
      const x = vertex.x
      const y = vertex.y

      vertex.x = x * Math.cos(twistAmount) - y * Math.sin(twistAmount)
      vertex.y = x * Math.sin(twistAmount) + y * Math.cos(twistAmount)

      positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z)
    }

    geometry.computeVertexNormals()
    return geometry
  }

  return (
    <group position={[0, 0, 0.5]}>
      {/* 24 Outlet Guide Vanes */}
      {[...Array(24)].map((_, i) => {
        const angle = (i / 24) * Math.PI * 2
        const radius = 1.0
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius

        return (
          <group key={i} position={[x, y, 0]} rotation={[0, 0, angle]}>
            <mesh geometry={createTwistedOGVGeometry()} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#a0a0a0" metalness={0.5} roughness={0.5} side={THREE.DoubleSide} />
            </mesh>

            {/* Inner platform */}
            <mesh position={[0, -0.25, 0]}>
              <boxGeometry args={[0.15, 0.05, 0.5]} />
              <meshStandardMaterial color="#808080" metalness={0.6} roughness={0.4} />
            </mesh>

            {/* Outer platform */}
            <mesh position={[0, 0.25, 0]}>
              <boxGeometry args={[0.15, 0.05, 0.5]} />
              <meshStandardMaterial color="#808080" metalness={0.6} roughness={0.4} />
            </mesh>
          </group>
        )
      })}

      {/* Inner barrel */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.75, 0.75, 0.5, 64, 1, true]} />
        <meshStandardMaterial color="#606060" metalness={0.7} roughness={0.3} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}
