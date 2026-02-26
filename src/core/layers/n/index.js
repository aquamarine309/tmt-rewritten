import { DC, LAYER_TYPE } from "@/utils/constants";
import { GAME_EVENT } from "@/core/event-hub";
import { Layer } from "@/core/layer";
import { usePlayerStore } from "@/core/stores/player";

import milestones from "./milestones";

export default {
  id: "n",
  name: "N",
  requirement: (layer, id) => layer === "p" && id === 14,
  checkEvent: GAME_EVENT.UPGRADE_BOUGHT,
  color: "#c58937",
  getPlayerData() {
    return {};
  },
  prestige: {
    startingResource: DC.D0,
    resource: "NaN Point",
    baseResource: "Prestige Point",
    getBaseAmount() { return Layer.p.resource; },
    setBaseAmount(value) { Layer.p.resource = value; },
    type: LAYER_TYPE.STATIC,
    requirement: DC.D20,
    exponent: DC.D1,
    gainMult: DC.D1,
    gainExp: DC.D1,
    base: DC.D2,
    resetFn() {
      Layer.p.resource = DC.D0;
      Layer.p.resetUpgrades();
      usePlayerStore().player.resource = DC.E1;
    }
  },
  tabs: ["NTab"],
  milestones
};