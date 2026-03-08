import { getModInfo } from "@framework/mod-info";
import Decimal from "break_eternity.js";
import { Layers } from "./layer";

export function getDefaultPlayer() {
  return {
    options: {
      updateRate: 33,
      singlePage: false
    },
    records: {
      gameCreated: Date.now()
    },
    lastUpdate: Date.now(),
    resource: Decimal.fromValue_noAlloc(getModInfo().startingResource),
    version: getModInfo().version,
    layers: Layers.getData()
  };
}