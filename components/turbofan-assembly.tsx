"use client";

import { FullAssembly } from "./full-assembly";
import { BypassAssembly } from "./bypass-assembly";
import { LpcAssembly } from "./lpc-assembly";
import { HpcAssembly } from "./hpc-assembly";
import { CombustorAssembly } from "./combustor-assembly";
import { TurbineAssembly } from "./turbine-assembly";
import { ShaftsAssembly } from "./shafts-assembly";
import { AccessoryAssembly } from "./accessory-assembly";
import { ExhaustAssembly } from "./exhaust-assembly";
import { MountingAssembly } from "./mounting-assembly";

export function TurbofanAssembly() {
  const offsets = [0, 1.1, 1.45, 1.2, 1.0, 0.5, 1.0, 0.2, 0.3, 0.8];
  const comps = [
    FullAssembly,
    BypassAssembly,
    LpcAssembly,
    HpcAssembly,
    CombustorAssembly,
    TurbineAssembly,
    ShaftsAssembly,
    AccessoryAssembly,
    ExhaustAssembly,
    MountingAssembly,
  ];
  const positions = offsets.reduce<number[]>((acc, off) => {
    const prev = acc.length ? acc[acc.length - 1] : 0;
    acc.push(prev + off);
    return acc;
  }, []);

  return (
    <group>
      {positions.map((pos, idx) => {
        const Comp = comps[idx];
        return (
          <group key={idx} position={[0, 0, pos]}>
            <Comp />
          </group>
        );
      })}
    </group>
  );
}
