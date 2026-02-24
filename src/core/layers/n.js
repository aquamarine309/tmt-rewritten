import { DC, LAYER_TYPE } from "@/utils/constants";
import { GAME_EVENT } from "@/core/event-hub";
import { Layer } from "@/core/layer";
import { usePlayerStore } from "@/core/stores/player";

export default {
  id: "n",
  name: "N",
  requirement: () => Layer.p.resource.gte(DC.D20),
  checkEvent: GAME_EVENT.PRESTIGE_RESET,
  color: "#c58937",
  getPlayerData() {
    return {};
  },
  prestige: {
    startingResource: DC.D0,
    resource: "NaN Points",
    baseResource: "Prestige Points",
    getBaseAmount() { return Layer.p.resource; },
    setBaseAmount(value) { Layer.p.resource = value; },
    type: LAYER_TYPE.NORMAL,
    requirement: DC.D20,
    exponent: DC.D0_1,
    gainMult: DC.D1,
    gainExp: DC.D1,
    resetFn() {
      Layer.p.resource = DC.D0;
      usePlayerStore().player.resource = DC.E1;
    }
  },
  tabs: ["NTab"]
};