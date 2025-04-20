"use client"

import * as THREE from "three"

export function BypassDuct() {
  // Create a custom geometry for the bypass duct
  const createBypassDuctGeometry = () => {
    const points = []
    const innerRadius1 = 1.0 // Inner radius at inlet
    const innerRadius2 = 0.7 // Inner radius at outlet
    const outerRadius1 = 1.25 // Outer radius at inlet (2.5m diameter)
    const outerRadius2 = 0.9 // Outer radius at outlet (1.8m diameter)
    const length = 0.3 // 300mm axial length
    const segments = 64

    // Create the outer surface points
    for (let i = 0; i <= segments; i++) {
      const t = i / segments
      const outerRadius = outerRadius1 * (1 - t) + outerRadius2 * t
      points.push(new THREE.Vector2(outerRadius, t * length))
    }

    // Create the inner surface points (going back)
    for (let i = segments; i >= 0; i--) {
      const t = i / segments
      const innerRadius = innerRadius1 * (1 - t) + innerRadius2 * t
      points.push(new THREE.Vector2(innerRadius, t * length))
    }

    // Close the shape
    points.push(new THREE.Vector2(outerRadius1, 0))

    const shape = new THREE.Shape(points)
    const geometry = new THREE.LatheGeometry(points, 64)

    return geometry
  }

  return (
    <group position={[0, 0, 0.5]}>
      {/* Main Bypass Duct */}
      <mesh>
        <latheGeometry
          args={[
            [
              new THREE.Vector2(1.0, 0), // Inner radius at inlet
              new THREE.Vector2(0.7, 0.3), // Inner radius at outlet
              new THREE.Vector2(0.9, 0.3), // Outer radius at outlet (with 5mm thickness)
              new THREE.Vector2(1.25, 0), // Outer radius at inlet (with 5mm thickness)
              new THREE.Vector2(1.0, 0), // Close the shape
            ],
            64,
          ]}
        />
        <meshStandardMaterial color="#505050" metalness={0.6} roughness={0.4} side={THREE.DoubleSide} />
      </mesh>

      {/* Upper-half acoustic liner segments */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 16) * Math.PI + Math.PI / 16 // Upper half only
        const radius = 1.125 // Average radius
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        const width = (Math.PI * radius) / 8 // Arc width

        return (
          <group key={i} position={[x, y, 0.15]} rotation={[0, 0, angle + Math.PI / 2]}>
            <mesh>
              <boxGeometry args={[width, 0.04, 0.25]} />
              <meshStandardMaterial color="#707070" metalness={0.3} roughness={0.7} />
            </mesh>
            {/* Perforated face */}
            <mesh position={[0, -0.02, 0]}>
              <boxGeometry args={[width, 0.001, 0.25]} />
              <meshStandardMaterial color="#909090" metalness={0.5} roughness={0.5} transparent={true} opacity={0.8} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}
