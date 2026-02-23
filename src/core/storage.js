import { DEV } from "@/env";
import { Lazy } from "./cache";
import { player, resetPlayerData, updatePlayerData, updatePlayerDependency } from "./player";
import { migrations } from "./migrations";
import { Serializer } from "./serializer";
import { GameLoop } from "./game-loop";
import { simulateTime } from "./offline-simulation";
import { EventHub, GAME_EVENT } from "./event-hub";

export const GameStorage = {
  saveInterval: 2e4,

  get timeSinceLastSave() {
    return this._timeSinceLastSave;
  },

  set timeSinceLastSave(value) {
    this._timeSinceLastSave = value;
    if (this._timeSinceLastSave >= this.saveInterval) {
      this.save();
    }
  },

  get saveKey() {
    return DEV ? "tmtr-dev-save" : "tmtr-save";
  },

  init() {
    const localSave = localStorage.getItem(this.saveKey);
    if (localSave === null) {
      this.updatePlayerData();
    } else {
      this.importSave(localSave);
    }
    setInterval(() => this.save(), this.saveInterval);
  },

  importFromJSON(json) {
    GameLoop.stop();
    const playerObject = json;
    updatePlayerData(migrations.patchPlayer(playerObject));
    this.updatePlayerData();
  },

  exportToClipboard() {
    copyToClipboard(Serializer.encode(JSON.stringify(player)));
    GameUI.notify.info("");
  },

  importSave(save) {
    try {
      this.importFromJSON(Serializer.decode(save));
    } catch (e) {
      console.log(e);
    }
  },

  get canSave() {
    return true;
  },

  save() {
    if (!this.canSave) return;
    localStorage.setItem(this.saveKey, Serializer.encode(JSON.stringify(player)));
    this._timeSinceLastSave = 0;
    this.hasSaved = true;
  },

  hardReset() {
    resetPlayerData();
    player.lastUpdate = Date.now();
    this.save();
    this.updatePlayerData();
  },

  updatePlayerData() {
    updatePlayerDependency();
    Lazy.invalidateAll();
    const diff = Date.now() - player.lastUpdate;
    if (diff > 1e4) {
      simulateTime(diff / 1000);
    } else {
      GameLoop.restart();
      this.save();
    }
    EventHub.dispatch(GAME_EVENT.AFTER_LOADING);
  },

  // Some minimal save verification; if the save is valid then this returns an empty string, otherwise it returns a
  // a string roughly stating what's wrong with the save. In order for importing to work properly, this must return
  // an empty string.
  checkPlayerObject(save) {
    // Sometimes save is the output of GameSaveSerializer.deserialize, and if that function fails then it will result
    // in the input parameter here being undefined
    if (save === undefined || save === null) return "Save decoding failed (invalid format)";
    // Right now all we do is check for the existence of an mass prop, but if we wanted to do further save
    // verification then here's where we'd do it
    if (save.mass === undefined) return "Save does not have mass property";

    // Recursively check for any NaN props and add any we find to an array
    const invalidProps = [];
    function checkNaN(obj, path) {
      let hasNaN = false;
      for (const key in obj) {
        const prop = obj[key];
        let thisNaN;
        switch (typeof prop) {
          case "object":
            thisNaN = checkNaN(prop, `${path}.${key}`);
            hasNaN = hasNaN || thisNaN;
            break;
          case "number":
            thisNaN = Number.isNaN(prop);
            hasNaN = hasNaN || thisNaN;
            if (thisNaN) invalidProps.push(`${path}.${key}`);
            break;
          case "string":
            // If we're attempting to import, all NaN entries will still be strings
            thisNaN = prop === "NaN";
            hasNaN = hasNaN || thisNaN;
            if (thisNaN) invalidProps.push(`${path}.${key}`);
            break;
        }
      }
      return hasNaN;
    }
    checkNaN(save, "player");

    if (invalidProps.length === 0) return "";
    return `${quantify("NaN player property", invalidProps.length)} found:
      ${invalidProps.join(", ")}`;
  },
}

export function convertBitsToArray(bits, startIndex = 0) {
  const arr = [];
  let b = bits;
  let idx = startIndex;
  while (b !== 0) {
    if ((b & 1) === 1) arr.push(idx);
    b >>= 1;
    idx++;
  }
  return arr;
}