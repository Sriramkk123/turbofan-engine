"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Cylinder } from "@react-three/drei"
import type * as THREE from "three"

export function RotorDisks() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.005
    }
  })

  // Disk diameters for the 4 stages (from 1.80m to 1.20m)
  const diskDiameters = [1.8, 1.6, 1.4, 1.2]
  const diskSpacing = 0.25 // Spacing between disks

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {diskDiameters.map((diameter, index) => {
        const radius = diameter / 2
        const zPosition = index * diskSpacing

        return (
          <group key={index} position={[0, 0, zPosition]}>
            {/* Rotor Disk */}
            <Cylinder args={[radius, radius, 0.02, 64, 1, false]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#b5b5b5" metalness={0.7} roughness={0.3} />
            </Cylinder>

            {/* Central bore */}
            <Cylinder args={[0.1, 0.1, 0.03, 32, 1, false]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#909090" metalness={0.8} roughness={0.2} />
            </Cylinder>

            {/* 24 fir-tree dovetail blade-root slots */}
            {[...Array(24)].map((_, i) => {
              const angle = (i / 24) * Math.PI * 2
              const x = Math.cos(angle) * (radius - 0.02)
              const y = Math.sin(angle) * (radius - 0.02)

              return (
                <group key={i} position={[x, y, 0]} rotation={[0, 0, angle]}>
                  <Cylinder args={[0.03, 0.03, 0.02, 3, 1, false]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <meshStandardMaterial color="#707070" metalness={0.6} roughness={0.4} />
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
