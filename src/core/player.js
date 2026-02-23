import { deepmergeAll } from "@/utils/deepmerge";
import { ModInfo } from "@/mod-info";
import Decimal from "break_eternity.js";
import { Layers } from "./layer";
import { setPlayer } from "./runtime";

export function getDefaultPlayer() {
  return {
    options: {
      currentTab: "",
      currentSubtab: ""
    },
    lastUpdate: Date.now(),
    resource: Decimal.fromValue_noAlloc(ModInfo.startingResource),
    version: ModInfo.version,
    layers: Layers.getData()
  };
}

export let player = getDefaultPlayer();

export function updatePlayerDependency() {
  setPlayer(player);
}

export function resetPlayerData() {
  player = deepmergeAll([{}, getDefaultPlayer()]);
  updatePlayerDependency();
}

export function updatePlayerData(newPlayer) {
  player = newPlayer;
  updatePlayerDependency();
}