"use client"

import { Cylinder } from "@react-three/drei"
import * as THREE from "three"

export function FanCase() {
  return (
    <group position={[0, 0, 0]}>
      {/* Fan Case - Composite cylindrical case */}
      <Cylinder args={[1.275, 1.275, 1.5, 64, 1, true]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#404040" metalness={0.4} roughness={0.6} side={THREE.DoubleSide} />
      </Cylinder>

      {/* Inner rub-strip liner */}
      <Cylinder args={[1.255, 1.255, 1.5, 64, 1, true]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#606060" metalness={0.2} roughness={0.8} side={THREE.DoubleSide} />
      </Cylinder>

      {/* Acoustic liner panels */}
      <Cylinder args={[1.325, 1.325, 1.0, 64, 1, true]} position={[0, 0, 0.25]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#505050" metalness={0.3} roughness={0.7} side={THREE.DoubleSide} />
      </Cylinder>

      {/* Four external thrust-frame mounting lugs */}
      {[...Array(4)].map((_, i) => {
        const angle = (i / 4) * Math.PI * 2
        const x = Math.cos(angle) * 1.325
        const y = Math.sin(angle) * 1.325

        return (
          <group key={i} position={[x, y, 0]} rotation={[0, 0, angle]}>
            <mesh>
              <boxGeometry args={[0.2, 0.15, 0.15]} />
              <meshStandardMaterial color="#707070" metalness={0.6} roughness={0.4} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}
