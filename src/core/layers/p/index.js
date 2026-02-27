import { DC, LAYER_TYPE } from "@/utils/constants";
import { GAME_EVENT } from "@/core/event-hub";
import { usePlayerStore } from "@/core/stores/player";
import { Layer } from "@/core/layer";

import upgrades from "./upgrades";
import info from "./info";

// Simple Guide:
// "DC" means "Decimal Constant", which caches most common decimals (See constants.js)

export default {
  id: "p", // Layer id
  name: "P", // Layer name
  requirement: () => true, // Check when the specific event triggered, and try to unlock this layer
  checkEvent: GAME_EVENT.AFTER_LOADING, // See EventHub.js for more information
  color: "#6080f3", // Layer color (will be set to --color-layer css variable)
  getPlayerData() {
    // It will added to player.layers[this.id]
    // Note: "isUnlocked" and "resource" property are defaultly added to it.
    return {};
  },
  // Prestige data
  prestige: {
    startingResource: DC.D0, // This will set to player.layer[this.id].resource
    resource: "Prestige Point", // This layer's resource Name
    baseResource: "Point", // The dependent resource for reset
    getBaseAmount() {
      // usePlayerStore().player will return the player data
      return usePlayerStore().player.resource; // Resource getter
    },
    setBaseAmount(value) {
      usePlayerStore().player.resource = value; // Resource setter
    },
    type: LAYER_TYPE.NORMAL, // See the-modding-tree
    requirement: DC.E1,
    exponent: DC.D0_5,
    // Decimal prototype has added many Effect functions(see game-mechanics/effects.js)
    gainMult: () => DC.D1.timesEffectOf(Layer.p.upgrades[14]),
    gainExp: DC.D1,
    // Performs when reset
    resetFn() {
      usePlayerStore().player.resource = DC.D0;
    }
  },
  // Use component name or an object like { is: "InfoTab", isUnlocked: () => ... }
  tabs: ["PTab"],
  upgrades,
  info
};