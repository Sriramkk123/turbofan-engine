"use client"

import { useState, Suspense } from "react"
import type { ComponentType } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, PerspectiveCamera } from "@react-three/drei"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Spinner } from "./spinner"
import { FanHub } from "./fan-hub"
import { FanBlades } from "./fan-blades"
import { FanCase } from "./fan-case"
import { OutletGuideVanes } from "./outlet-guide-vanes"
import { FullAssembly } from "./full-assembly"
import { BypassDuct } from "./bypass-duct"
import { SplitCowling } from "./split-cowling"
import { PylonAttachFittings } from "./pylon-attach-fittings"
import { BypassAssembly } from "./bypass-assembly"
import { RotorDisks } from "./rotor-disks"
import { RotorBlades } from "./rotor-blades"
import { StatorVanes } from "./stator-vanes"
import { InterstageRings } from "./interstage-rings"
import { LpcAssembly } from "./lpc-assembly"
import { HpcRotorDisks } from "./hpc-rotor-disks"
import { HpcBlades } from "./hpc-blades"
import { HpcStatorVanes } from "./hpc-stator-vanes"
import { HpcAssembly } from "./hpc-assembly"
import { CombustorLiners } from "./combustor-liners"
import { FuelInjectorNozzles } from "./fuel-injector-nozzles"
import { TransitionDuct } from "./transition-duct"
import { CombustorAssembly } from "./combustor-assembly"
import { HptNozzleGuideVanes } from "./hpt-nozzle-guide-vanes"
import { HptRotorBlades } from "./hpt-rotor-blades"
import { LptStage2Blades } from "./lpt-stage2-blades"
import { LptStage3Blades } from "./lpt-stage3-blades"
import { LptStage4Blades } from "./lpt-stage4-blades"
import { TurbineCasing } from "./turbine-casing"
import { TurbineAssembly } from "./turbine-assembly"
import { LpShaft } from "./lp-shaft"
import { HpShaft } from "./hp-shaft"
import { Bearings } from "./bearings"
import { BearingHousing } from "./bearing-housing"
import { ShaftsAssembly } from "./shafts-assembly"
import { AccessoryGearbox } from "./accessory-gearbox"
import { OilSystemInterfaces } from "./oil-system"
import { FuelSystemComponents } from "./fuel-system"
import { IgnitionStarter } from "./ignition-starter"
import { AccessoryAssembly } from "./accessory-assembly"
import { CoreNozzle } from "./core-nozzle"
import { Mixer } from "./mixer"
import { ThrustReverserCascades } from "./thrust-reverser-cascades"
import { ExhaustAssembly } from "./exhaust-assembly"
import { InnerBarrel } from "./inner-barrel"
import { OuterBarrel } from "./outer-barrel"
import { StrutsYPipes } from "./struts-y-pipes"
import { PylonMountLugs } from "./pylon-mount-lugs"
import { MountingAssembly } from "./mounting-assembly"
import { TurbofanAssembly } from "./turbofan-assembly"

// Define module types and their components
const modules: Record<string, { label: string; components: Record<string, { label: string; component: ComponentType<any> }>; }> = {
  "fan-module": {
    label: "Fan Module",
    components: {
      "full-assembly": { label: "Full Assembly", component: FullAssembly },
      spinner: { label: "Spinner", component: Spinner },
      "fan-hub": { label: "Fan Hub", component: FanHub },
      "fan-blades": { label: "Fan Blades", component: FanBlades },
      "fan-case": { label: "Fan Case", component: FanCase },
      "outlet-guide-vanes": { label: "OGVs", component: OutletGuideVanes },
    },
  },
  "bypass-module": {
    label: "Bypass Duct & Cowling",
    components: {
      "bypass-assembly": { label: "Full Assembly", component: BypassAssembly },
      "bypass-duct": { label: "Bypass Duct", component: BypassDuct },
      "split-cowling": { label: "Split Cowling", component: SplitCowling },
      "pylon-attach": { label: "Pylon Attach Fittings", component: PylonAttachFittings },
    },
  },
  "lpc-module": {
    label: "Low-Pressure Compressor",
    components: {
      "lpc-assembly": { label: "Full Assembly", component: LpcAssembly },
      "rotor-disks": { label: "Rotor Disks", component: RotorDisks },
      "rotor-blades": { label: "Rotor Blades", component: RotorBlades },
      "stator-vanes": { label: "Stator Vanes", component: StatorVanes },
      "interstage-rings": { label: "Interstage Rings", component: InterstageRings },
    },
  },
  "hpc-module": {
    label: "High-Pressure Compressor",
    components: {
      "hpc-assembly": { label: "Full Assembly", component: HpcAssembly },
      "hpc-rotor-disks": { label: "Rotor Disks", component: HpcRotorDisks },
      "hpc-blades": { label: "Blades", component: HpcBlades },
      "hpc-stator-vanes": { label: "Stator Vanes & Seals", component: HpcStatorVanes },
    },
  },
  "combustor-module": {
    label: "Combustion Chamber",
    components: {
      "combustor-assembly": { label: "Full Assembly", component: CombustorAssembly },
      "combustor-liners": { label: "Liners", component: CombustorLiners },
      "fuel-injector-nozzles": { label: "Nozzles", component: FuelInjectorNozzles },
      "transition-duct": { label: "Transition Duct", component: TransitionDuct },
    },
  },
  "turbine-module": {
    label: "Turbine Section",
    components: {
      "turbine-assembly": { label: "Full Assembly", component: TurbineAssembly },
      "hpt-nozzle-guide-vanes": { label: "HPT Nozzle Guide Vanes", component: HptNozzleGuideVanes },
      "hpt-rotor-blades": { label: "HPT Rotor Blades", component: HptRotorBlades },
      "lpt-stage2-blades": { label: "LPT Stage 2 Blades", component: LptStage2Blades },
      "lpt-stage3-blades": { label: "LPT Stage 3 Blades", component: LptStage3Blades },
      "lpt-stage4-blades": { label: "LPT Stage 4 Blades", component: LptStage4Blades },
      "turbine-casing": { label: "Turbine Casing", component: TurbineCasing },
    },
  },
  "shafts-module": {
    label: "Shafts & Bearings",
    components: {
      "shafts-assembly": { label: "Full Assembly", component: ShaftsAssembly },
      "lp-shaft": { label: "LP Shaft", component: LpShaft },
      "hp-shaft": { label: "HP Shaft", component: HpShaft },
      "bearings": { label: "Bearings", component: Bearings },
      "bearing-housing": { label: "Bearing Housing", component: BearingHousing },
    },
  },
  "accessory-module": {
    label: "Accessory Systems",
    components: {
      "accessory-assembly": { label: "Full Assembly", component: AccessoryAssembly },
      "accessory-gearbox": { label: "Accessory Gearbox", component: AccessoryGearbox },
      "oil-system-interfaces": { label: "Oil System Interfaces", component: OilSystemInterfaces },
      "fuel-system-components": { label: "Fuel System Components", component: FuelSystemComponents },
      "ignition-starter": { label: "Ignition & Starter", component: IgnitionStarter },
    },
  },
  "exhaust-module": {
    label: "Exhaust & Mixer",
    components: {
      "exhaust-assembly": { label: "Full Assembly", component: ExhaustAssembly },
      "core-nozzle": { label: "Core Nozzle", component: CoreNozzle },
      "mixer": { label: "Mixer", component: Mixer },
      "thrust-reverser-cascades": { label: "Thrust Reverser Cascades", component: ThrustReverserCascades },
    },
  },
  "mounting-module": {
    label: "Mounting & Fairings",
    components: {
      "mounting-assembly": { label: "Full Assembly", component: MountingAssembly },
      "inner-barrel": { label: "Inner Barrel / Core Case", component: InnerBarrel },
      "outer-barrel": { label: "Outer Barrel / Fan Case", component: OuterBarrel },
      "struts-y-pipes": { label: "Struts & Y‑Pipes", component: StrutsYPipes },
      "pylon-mount-lugs": { label: "Pylon Mount Lugs", component: PylonMountLugs },
    },
  },
}

export default function TurbofanModel() {
  const [activeModule, setActiveModule] = useState("fan-module")
  const [activeComponent, setActiveComponent] = useState("full-assembly")
  const [assemblyView, setAssemblyView] = useState(true)
  const toggleView = () => setAssemblyView(v => !v)

  // When changing modules, reset to the full assembly of that module
  const handleModuleChange = (value: string) => {
    setActiveModule(value)
    setActiveComponent(Object.keys(modules[value].components)[0]) // Select first component (full assembly)
  }

  // Function to render the appropriate component based on active selections
  const renderActiveComponent = () => {
    const ComponentToRender = modules[activeModule].components[activeComponent]?.component
    return ComponentToRender ? <ComponentToRender /> : null
  }

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex-1 relative">
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={assemblyView ? [12, 0, 0] : [0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <Suspense fallback={null}>
            {assemblyView ? <TurbofanAssembly /> : renderActiveComponent()}
            <Environment preset="studio" />
          </Suspense>
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} minDistance={2} maxDistance={10} />
        </Canvas>
        {/* Floating control panel */}
        <div className="absolute top-4 left-4 z-20 flex flex-col space-y-2 bg-white bg-opacity-75 p-2 rounded shadow">
          <button className="px-2 py-1 bg-gray-200 rounded w-full" onClick={toggleView}>
            {assemblyView ? "View Modules" : "View Full Engine"}
          </button>
          {!assemblyView && (
            <div className="flex items-center gap-2">
              <Label htmlFor="module-select">Select Module:</Label>
              <Select value={activeModule} onValueChange={handleModuleChange}>
                <SelectTrigger id="module-select">
                  <SelectValue placeholder="Select module" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(modules).map(([key, mod]) => (
                    <SelectItem key={key} value={key}>{mod.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          {!assemblyView && (
            <Tabs value={activeComponent} onValueChange={setActiveComponent} className="w-full">
              <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${Object.keys(modules[activeModule].components).length}, 1fr)` }}>
                {Object.entries(modules[activeModule].components).map(([key, comp]) => (
                  <TabsTrigger key={key} value={key}>{comp.label}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  )
}
