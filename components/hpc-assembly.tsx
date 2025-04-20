"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"
import { HpcRotorDisks } from "./hpc-rotor-disks"
import { HpcBlades } from "./hpc-blades"
import { HpcStatorVanes } from "./hpc-stator-vanes"

export function HpcAssembly() {
  const rotatingPartsRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (rotatingPartsRef.current) {
      rotatingPartsRef.current.rotation.z += 0.005
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Stationary parts */}
      <HpcStatorVanes />

      {/* Rotating parts */}
      <group ref={rotatingPartsRef}>
        <HpcRotorDisks />
        <HpcBlades />
      </group>
    </group>
  )
}
