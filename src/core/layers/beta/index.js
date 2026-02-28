import { DC, LAYER_TYPE } from "@/utils/constants";
import { GAME_EVENT } from "@/core/event-hub";
import { Layer } from "@/core/layer";
import { usePlayerStore } from "@/core/stores/player";
import { Resources } from "@/resources";

import milestones from "./milestones";

export default {
  id: "beta",
  name: "β",
  requirement: (layer, id) => layer === "alpha" && id === 14,
  checkEvent: GAME_EVENT.UPGRADE_BOUGHT,
  color: "#f5a937",
  getPlayerData() {
    return {};
  },
  resource: Resources.beta,
  prestige: {
    baseResource: Resources.alpha,
    startingResource: DC.D0,
    type: LAYER_TYPE.STATIC,
    requirement: DC.E1,
    exponent: DC.D1,
    gainMult: DC.D1,
    gainExp: DC.D1,
    base: DC.D3,
    resetFn() {
      Resources.default.reset();
      Resources.alpha.reset();
      Layer.alpha.resetUpgrades();
    }
  },
  tabs: [
    {
      name: "Beta",
      is: "BetaTab"
    }
  ],
  milestones
};