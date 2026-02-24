import { deepmergeAll } from "@/utils/deepmerge";
import { getDefaultPlayer } from "../player";

export const migrations = {
  patches: {

  },

  prePatch(saveData) {
    // Initialize all possibly undefined properties that were not present in
    // previous versions and which could be overwritten by deepmerge
    saveData.version = saveData.version || 0;
  },

  // Patch up to the specified version; we need this functionality in order to properly migrate both saves from
  // much older versions and saves from in-development versions
  patch(saveData, maxVersion) {
    this.prePatch(saveData);
    // This adds all the undefined properties to the save which are in player.js
    const player = deepmergeAll([getDefaultPlayer(), saveData]);
    const versions = Object.keys(this.patches).map(parseFloat).sort();
    let version;
    while ((version = versions.find(v => player.version < v && v < maxVersion)) !== undefined) {
      const patch = this.patches[version];
      patch(player);
      player.version = version;
    }
    return player;
  },

  patchPlayer(saveData) {
    // Plus 1 because this the threshold is exclusive (it migrates up to but not including the maxVersion)
    return this.patch(saveData, Object.keys(migrations.patches).map(parseFloat).max() + 1);
  }
};