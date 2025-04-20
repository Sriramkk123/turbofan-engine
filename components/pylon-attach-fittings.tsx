"use client"

import { Cylinder } from "@react-three/drei"

export function PylonAttachFittings() {
  return (
    <group position={[0, 0, 0.5]}>
      {/* Four lower-cowling mounting feet */}
      {[...Array(4)].map((_, i) => {
        const angle = (i / 4) * Math.PI + Math.PI / 4 // Lower half only
        const x = Math.cos(angle) * 1.3
        const y = Math.sin(angle) * 1.3

        return (
          <group key={i} position={[x, y, 0]} rotation={[0, 0, angle + Math.PI / 2]}>
            {/* Mounting foot */}
            <mesh>
              <boxGeometry args={[0.15, 0.1, 0.08]} />
              <meshStandardMaterial color="#707070" metalness={0.7} roughness={0.3} />
            </mesh>

            {/* Pin hole */}
            <Cylinder args={[0.0125, 0.0125, 0.15, 16]} position={[0, -0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#505050" metalness={0.6} roughness={0.4} />
            </Cylinder>
          </group>
        )
      })}
    </group>
  )
}
