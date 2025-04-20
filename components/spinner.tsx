"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Cylinder, Cone } from "@react-three/drei"
import type * as THREE from "three"

export function Spinner() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.005
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Spinner / Nose Cone - Conical-ogive shape */}
      <Cone args={[0.25, 0.5, 32, 1, true]} position={[0, 0, 0.25]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
      </Cone>

      {/* Front bearing oil-seal flange */}
      <Cylinder args={[0.075, 0.075, 0.02, 32, 1, false]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#a0a0a0" metalness={0.7} roughness={0.3} />
      </Cylinder>

      {/* 6 bolts around flange */}
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2
        const x = Math.cos(angle) * 0.06
        const y = Math.sin(angle) * 0.06

        return (
          <Cylinder key={i} args={[0.01, 0.01, 0.03, 8]} position={[x, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#505050" metalness={0.9} roughness={0.1} />
          </Cylinder>
        )
      })}

      {/* Anti-ice tube channels */}
      {[...Array(4)].map((_, i) => {
        const angle = (i / 4) * Math.PI * 2
        const x = Math.cos(angle) * 0.2
        const y = Math.sin(angle) * 0.2

        return (
          <Cylinder
            key={i}
            args={[0.01, 0.01, 0.4, 8]}
            position={[x, y, 0.2]}
            rotation={[Math.PI / 2 - Math.PI / 8, 0, 0]}
          >
            <meshStandardMaterial color="#707070" metalness={0.6} roughness={0.4} />
          </Cylinder>
        )
      })}
    </group>
  )
}
