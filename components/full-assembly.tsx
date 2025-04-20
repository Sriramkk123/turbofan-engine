"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"
import { Spinner } from "./spinner"
import { FanHub } from "./fan-hub"
import { FanBlades } from "./fan-blades"
import { FanCase } from "./fan-case"
import { OutletGuideVanes } from "./outlet-guide-vanes"

export function FullAssembly() {
  const rotatingPartsRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (rotatingPartsRef.current) {
      rotatingPartsRef.current.rotation.z += 0.005
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Stationary parts */}
      <FanCase />
      <OutletGuideVanes />

      {/* Rotating parts */}
      <group ref={rotatingPartsRef}>
        <Spinner />
        <FanHub />
        <FanBlades />
      </group>
    </group>
  )
}
