import { DC, LAYER_TYPE } from "@/utils/constants";
import { GAME_EVENT } from "@/core/event-hub";
import { usePlayerStore } from "@/core/stores/player";
import { Layer } from "@/core/layer";
import { Resources } from "@/resources";

import upgrades from "./upgrades";
import info from "./info";

// Simple Guide:
// "DC" means "Decimal Constant", which caches most common decimals (See constants.js)

export default {
  id: "alpha", // Layer id
  name: "α", // Layer name
  requirement: () => true, // Check when the specific event triggered, and try to unlock this layer
  checkEvent: GAME_EVENT.AFTER_LOADING, // See EventHub.js for more information
  color: "#70a0f7", // Layer color (will be set to --color-layer css variable)
  getPlayerData() {
    // It will added to player.layers[this.id]
    // Note: "isUnlocked" and "resource" property are defaultly added to it.
    return {};
  },
  // Resource in this layer
  resource: Resources.alpha,
  // Prestige data
  prestige: {
    baseResource: Resources.default,
    type: LAYER_TYPE.NORMAL, // See the-modding-tree
    requirement: DC.E1,
    exponent: DC.D0_5,
    gainMult: () => Layer.alpha.upgrades[14].effectOrDefault(DC.D1),
    gainExp: DC.D1,
    // Performs when reset
    resetFn() {
      Resources.default.value = DC.D0;
    }
  },
  // Use component name or an object like { is: "InfoTab", isUnlocked: () => ... }
  tabs: ["AlphaTab"],
  upgrades,
  info
};