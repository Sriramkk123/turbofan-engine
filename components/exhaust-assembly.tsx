"use client";

import { CoreNozzle } from "./core-nozzle";
import { Mixer } from "./mixer";
import { ThrustReverserCascades } from "./thrust-reverser-cascades";

export function ExhaustAssembly() {
  return (
    <group>
      <CoreNozzle />
      <Mixer />
      <ThrustReverserCascades />
    </group>
  );
}
