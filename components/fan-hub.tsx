"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Cylinder } from "@react-three/drei"
import type * as THREE from "three"

export function FanHub() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.005
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Fan Hub (Rotor Disk) - Titanium alloy disk */}
      <Cylinder args={[1.225, 1.225, 0.15, 64, 1, false]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#b5b5b5" metalness={0.7} roughness={0.3} />
      </Cylinder>

      {/* Central bore */}
      <Cylinder args={[0.1, 0.1, 0.16, 32, 1, false]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#909090" metalness={0.8} roughness={0.2} />
      </Cylinder>

      {/* 18 fir-tree dovetail blade-root slots */}
      {[...Array(18)].map((_, i) => {
        const angle = (i / 18) * Math.PI * 2
        const x = Math.cos(angle) * 1.2
        const y = Math.sin(angle) * 1.2

        return (
          <group key={i} position={[x, y, 0]} rotation={[0, 0, angle]}>
            <Cylinder args={[0.05, 0.05, 0.15, 3, 1, false]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#707070" metalness={0.6} roughness={0.4} />
            </Cylinder>
          </group>
        )
      })}

      {/* Four balance-weight pockets */}
      {[...Array(4)].map((_, i) => {
        const angle = (i / 4) * Math.PI * 2 + Math.PI / 8
        const x = Math.cos(angle) * 1.0
        const y = Math.sin(angle) * 1.0

        return (
          <Cylinder key={i} args={[0.08, 0.08, 0.1, 16]} position={[x, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#505050" metalness={0.5} roughness={0.5} />
          </Cylinder>
        )
      })}
    </group>
  )
}
