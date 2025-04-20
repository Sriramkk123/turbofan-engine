"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";
import { LpShaft } from "./lp-shaft";
import { HpShaft } from "./hp-shaft";
import { Bearings } from "./bearings";
import { BearingHousing } from "./bearing-housing";

export function ShaftsAssembly() {
  const rotatingRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (rotatingRef.current) {
      rotatingRef.current.rotation.z += 0.005;
    }
  });

  return (
    <group>
      {/* Housing (stationary) */}
      <BearingHousing />
      {/* Rotating parts */}
      <group ref={rotatingRef}>
        <LpShaft />
        <HpShaft />
        <Bearings />
      </group>
    </group>
  );
}
