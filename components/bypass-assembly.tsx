"use client"

import { BypassDuct } from "./bypass-duct"
import { SplitCowling } from "./split-cowling"
import { PylonAttachFittings } from "./pylon-attach-fittings"

export function BypassAssembly() {
  return (
    <group position={[0, 0, 0]}>
      <BypassDuct />
      <SplitCowling />
      <PylonAttachFittings />
    </group>
  )
}
