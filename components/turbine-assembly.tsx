"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";
import { HptNozzleGuideVanes } from "./hpt-nozzle-guide-vanes";
import { HptRotorBlades } from "./hpt-rotor-blades";
import { LptStage2Blades } from "./lpt-stage2-blades";
import { LptStage3Blades } from "./lpt-stage3-blades";
import { LptStage4Blades } from "./lpt-stage4-blades";
import { TurbineCasing } from "./turbine-casing";

export function TurbineAssembly() {
  const rotatingPartsRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (rotatingPartsRef.current) {
      rotatingPartsRef.current.rotation.z += 0.005;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Stationary parts */}
      <TurbineCasing />
      <HptNozzleGuideVanes />

      {/* Rotating parts */}
      <group ref={rotatingPartsRef}>
        <HptRotorBlades />
        <LptStage2Blades />
        <LptStage3Blades />
        <LptStage4Blades />
      </group>
    </group>
  );
}
