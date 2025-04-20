"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Cylinder, Torus } from "@react-three/drei"
import type * as THREE from "three"

export function HpcRotorDisks() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.005
    }
  })

  // Disk diameters for the 10 stages (from 1.20m to 0.40m)
  const diskDiameters = [1.2, 1.12, 1.04, 0.96, 0.88, 0.8, 0.72, 0.64, 0.56, 0.48, 0.4]
  const diskSpacing = 0.15 // Spacing between disks

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {diskDiameters.map((diameter, index) => {
        const radius = diameter / 2
        const zPosition = index * diskSpacing

        return (
          <group key={index} position={[0, 0, zPosition]}>
            {/* Rotor Disk */}
            <Cylinder args={[radius, radius, 0.015, 64, 1, false]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
            </Cylinder>

            {/* Central bore */}
            <Cylinder args={[0.08, 0.08, 0.02, 32, 1, false]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#b8860b" metalness={0.9} roughness={0.1} />
            </Cylinder>

            {/* Shroud segments on each rim */}
            <Torus args={[radius - 0.01, 0.005, 16, 64, Math.PI * 2]} position={[0, 0, 0.008]}>
              <meshStandardMaterial color="#c0c0c0" metalness={0.7} roughness={0.3} />
            </Torus>

            {/* Inter-stage seal clearances */}
            {index < diskDiameters.length - 1 && (
              <Torus args={[radius * 0.7, 0.003, 16, 64, Math.PI * 2]} position={[0, 0, diskSpacing / 2]}>
                <meshStandardMaterial color="#a0a0a0" metalness={0.6} roughness={0.4} />
              </Torus>
            )}

            {/* 24 blade attachment points */}
            {[...Array(24)].map((_, i) => {
              const angle = (i / 24) * Math.PI * 2
              const x = Math.cos(angle) * (radius - 0.01)
              const y = Math.sin(angle) * (radius - 0.01)

              return (
                <group key={i} position={[x, y, 0]} rotation={[0, 0, angle]}>
                  <Cylinder args={[0.02, 0.02, 0.015, 3, 1, false]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <meshStandardMaterial color="#b8860b" metalness={0.7} roughness={0.3} />
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
