"use client";

import { InnerBarrel } from "./inner-barrel";
import { OuterBarrel } from "./outer-barrel";
import { StrutsYPipes } from "./struts-y-pipes";
import { PylonMountLugs } from "./pylon-mount-lugs";

export function MountingAssembly() {
  return (
    <group>
      <InnerBarrel />
      <OuterBarrel />
      <StrutsYPipes />
      <PylonMountLugs />
    </group>
  );
}
