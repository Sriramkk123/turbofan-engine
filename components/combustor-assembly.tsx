"use client";

import { CombustorLiners } from "./combustor-liners";
import { FuelInjectorNozzles } from "./fuel-injector-nozzles";
import { TransitionDuct } from "./transition-duct";

export function CombustorAssembly() {
  return (
    <group position={[0, 0, 0]}>
      <CombustorLiners />
      <FuelInjectorNozzles />
      <TransitionDuct />
    </group>
  );
}
