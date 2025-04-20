"use client";

import { AccessoryGearbox } from "./accessory-gearbox";
import { OilSystemInterfaces } from "./oil-system";
import { FuelSystemComponents } from "./fuel-system";
import { IgnitionStarter } from "./ignition-starter";

export function AccessoryAssembly() {
  return (
    <group>
      <AccessoryGearbox />
      <OilSystemInterfaces />
      <FuelSystemComponents />
      <IgnitionStarter />
    </group>
  );
}
