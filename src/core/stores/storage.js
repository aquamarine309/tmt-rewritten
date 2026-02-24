import { defineStore } from "pinia";
import { DEV } from "@/env";
import { Lazy } from "@/core/cache";
import { migrations } from "./migrations";
import { Serializer } from "./serializer";
import { GameLoop } from "@/core/game-loop";
import { simulateTime } from "@/core/offline-simulation";
import { EventHub, GAME_EVENT, GameUI } from "@/core/event-hub";
import { usePlayerStore } from "./player";

export const useGameStorageStore = defineStore("gameStorage", {
  state: () => ({
    _timeSinceLastSave: 0,
    hasSaved: false,
    saveInterval: 20000,
  }),

  getters: {
    timeSinceLastSave: state => state._timeSinceLastSave,
    saveKey: () => (DEV ? "tmtr-dev-save" : "tmtr-save"),
    canSave: () => true,
  },
  
  actions: {
    addElapsedTime(delta) {
      this._timeSinceLastSave += delta;
      if (this._timeSinceLastSave >= this.saveInterval) {
        this.save();
      }
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
      const store = usePlayerStore();
      store.updatePlayer(migrations.patchPlayer(playerObject));
      this.updatePlayerData();
    },

    exportToClipboard() {
      const player = usePlayerStore().player;
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

    save() {
      if (!this.canSave) return;
      const player = usePlayerStore().player;
      localStorage.setItem(this.saveKey, Serializer.encode(JSON.stringify(player)));
      this._timeSinceLastSave = 0;
      this.hasSaved = true;
    },

    hardReset() {
      const store = usePlayerStore();
      store.resetPlayer();
      this.save();
      this.updatePlayerData();
    },

    updatePlayerData() {
      Lazy.invalidateAll();
      const player = usePlayerStore().player;
      const diff = Date.now() - player.lastUpdate;
      if (diff > 10000) {
        simulateTime(diff / 1000);
      } else {
        GameLoop.restart();
        this.save();
      }
      EventHub.dispatch(GAME_EVENT.AFTER_LOADING);
    },

    checkPlayerObject(save) {
      if (save === undefined || save === null) return "Save decoding failed (invalid format)";
      if (save.mass === undefined) return "Save does not have mass property";

      const invalidProps = [];
      const checkNaN = (obj, path) => {
        let hasNaN = false;
        for (const key in obj) {
          const prop = obj[key];
          let thisNaN;
          switch (typeof prop) {
            case "object":
              thisNaN = checkNaN(prop, `${path}.${key}`);
              hasNaN = hasNaN || thisNaN;
              break
            case "number":
              thisNaN = Number.isNaN(prop);
              hasNaN = hasNaN || thisNaN;
              if (thisNaN) invalidProps.push(`${path}.${key}`);
              break;
            case "string":
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
  },
});