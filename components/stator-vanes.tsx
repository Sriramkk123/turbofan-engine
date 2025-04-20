"use client"

import * as THREE from "three"

export function StatorVanes() {
  // Disk diameters for the 4 stages (from 1.80m to 1.20m)
  const diskDiameters = [1.8, 1.6, 1.4, 1.2]
  const diskSpacing = 0.25 // Spacing between disks

  // Create a single vane shape
  const createVaneShape = () => {
    const shape = new THREE.Shape()

    // Airfoil shape
    shape.moveTo(-0.03, 0)
    shape.bezierCurveTo(-0.03, 0.05, 0.03, 0.05, 0.03, 0)
    shape.bezierCurveTo(0.03, -0.05, -0.03, -0.05, -0.03, 0)

    return shape
  }

  // Create a custom geometry for the vane with 3D shape
  const createVaneGeometry = (height: number) => {
    const shape = createVaneShape()
    const extrudeSettings = {
      steps: 20,
      depth: 0.02,
      bevelEnabled: true,
      bevelThickness: 0.005,
      bevelSize: 0.005,
      bevelSegments: 3,
    }

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)

    // Apply 3D shaping to the geometry
    const positionAttribute = geometry.getAttribute("position")
    const vertex = new THREE.Vector3()

    for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(positionAttribute, i)

      // Calculate bow based on height (y-coordinate)
      const bowAmount = Math.sin((vertex.y / height) * Math.PI) * 0.02

      // Apply bow
      vertex.z += bowAmount

      positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z)
    }

    geometry.computeVertexNormals()
    return geometry
  }

  return (
    <group position={[0, 0, 0]}>
      {diskDiameters.map((diameter, stageIndex) => {
        const radius = diameter / 2 + 0.05 // Slightly larger than rotor
        const zPosition = stageIndex * diskSpacing + diskSpacing / 2 // Between rotors
        const vaneHeight = 0.3 // 300mm span

        return (
          <group key={stageIndex} position={[0, 0, zPosition]}>
            {/* Stator Ring */}
            <mesh>
              <cylinderGeometry args={[radius + 0.05, radius + 0.05, 0.02, 64, 1, true]} />
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
                    <meshStandardMaterial color="#808080" metalness={0.5} roughness={0.5} side={THREE.DoubleSide} />
                  </mesh>

                  {/* Platform shrouds */}
                  <mesh position={[0, -vaneHeight / 2, 0]}>
                    <boxGeometry args={[0.08, 0.01, 0.04]} />
                    <meshStandardMaterial color="#707070" />
                  </mesh>

                  {/* VSV actuators for first two stages */}
                  {stageIndex < 2 && (
                    <group position={[0, radius + 0.1, 0]} rotation={[0, 0, -angle]}>
                      <mesh>
                        <boxGeometry args={[0.05, 0.05, 0.08]} />
                        <meshStandardMaterial color="#606060" />
                      </mesh>
                      <mesh position={[0, 0.05, 0]}>
                        <cylinderGeometry args={[0.01, 0.01, 0.1, 8]} />
                        <meshStandardMaterial color="#404040" />
                      </mesh>
                    </group>
                  )}
                </group>
              )
            })}
          </group>
        )
      })}
    </group>
  )
}
