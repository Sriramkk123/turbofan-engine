"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"
import { RotorDisks } from "./rotor-disks"
import { RotorBlades } from "./rotor-blades"
import { StatorVanes } from "./stator-vanes"
import { InterstageRings } from "./interstage-rings"

export function LpcAssembly() {
  const rotatingPartsRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (rotatingPartsRef.current) {
      rotatingPartsRef.current.rotation.z += 0.005
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Stationary parts */}
      <StatorVanes />
      <InterstageRings />

      {/* Rotating parts */}
      <group ref={rotatingPartsRef}>
        <RotorDisks />
        <RotorBlades />
      </group>
    </group>
  )
}
