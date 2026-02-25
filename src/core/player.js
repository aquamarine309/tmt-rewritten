import { ModInfo } from "@/mod-info";
import Decimal from "break_eternity.js";
import { Layers } from "./layer";

export function getDefaultPlayer() {
  return {
    options: {
      updateRate: 33,
      singlePage: false
    },
    lastUpdate: Date.now(),
    resource: Decimal.fromValue_noAlloc(ModInfo.startingResource),
    version: ModInfo.version,
    layers: Layers.getData()
  };
}