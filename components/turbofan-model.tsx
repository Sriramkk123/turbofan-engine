"use client"

import { useState, Suspense } from "react"
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

// Define module types and their components
const modules = {
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
}

export default function TurbofanModel() {
  const [activeModule, setActiveModule] = useState("fan-module")
  const [activeComponent, setActiveComponent] = useState("full-assembly")

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
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <Suspense fallback={null}>
            {renderActiveComponent()}
            <Environment preset="studio" />
          </Suspense>
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} minDistance={2} maxDistance={10} />
        </Canvas>
      </div>

      <Card className="w-full rounded-none border-t">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center gap-4">
            <Label htmlFor="module-select" className="w-32">
              Select Module:
            </Label>
            <Select value={activeModule} onValueChange={handleModuleChange}>
              <SelectTrigger id="module-select" className="w-[240px]">
                <SelectValue placeholder="Select module" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(modules).map(([key, { label }]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Tabs value={activeComponent} onValueChange={setActiveComponent} className="w-full">
            <TabsList
              className="grid w-full"
              style={{ gridTemplateColumns: `repeat(${Object.keys(modules[activeModule].components).length}, 1fr)` }}
            >
              {Object.entries(modules[activeModule].components).map(([key, { label }]) => (
                <TabsTrigger key={key} value={key}>
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
