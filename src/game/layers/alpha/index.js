import { DC, LAYER_TYPE } from "@framework/utils/constants";
import { GAME_EVENT } from "@framework/core/event-hub";
import { usePlayerStore } from "@framework/core/stores/player";
import { Layer } from "@framework/core/layer";
import { Resources } from "@framework/resources";

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
  effects: {
    words: {
      effect: () => Resources.get("words").value.add(1).log10().add(1),
      effectCondition: () => Layer.alpha.upgrades[21].isBought
    }
  },
  // Resource in this layer
  resource: () => Resources.get("alpha"),
  customResources: {
    words: () => Resources.get("words")
  },
  customFunctions: {
    spellWord() {
      Resources.get("words").add(1);
    }
  },
  // Prestige data
  prestige: {
    baseResource: () => Resources.get("default"),
    type: LAYER_TYPE.NORMAL, // See the-modding-tree
    requirement: DC.E1,
    exponent: DC.D0_5,
    gainMult: () => Layer.alpha.upgrades[14].effectOrDefault(DC.D1),
    gainExp: DC.D1,
    // Performs when reset
    resetFn() {
      Resources.get("default").value = DC.D0;
    }
  },
  tabs: [
    {
      name: "Alpha",
      is: "AlphaTab"
    },
    {
      name: "Words",
      is: "WordsTab",
      condition: () => Layer.alpha.upgrades[22].isBought
    }
  ],
  upgrades,
  info
};