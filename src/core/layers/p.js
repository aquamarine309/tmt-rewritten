import { DC, LAYER_TYPE } from "@/utils/constants";
import { GAME_EVENT } from "@/core/event-hub";
import { usePlayerStore } from "@/core/stores/player";

export default {
  id: "p",
  name: "P",
  requirement: () => true,
  checkEvent: GAME_EVENT.AFTER_LOADING,
  color: "#6080f3",
  getPlayerData() {
    return {};
  },
  prestige: {
    startingResource: DC.D0,
    resource: "Prestige Points",
    baseResource: "Points",
    getBaseAmount() {
      return usePlayerStore().player.resource;
    },
    setBaseAmount(value) {
      usePlayerStore().player.resource = value;
    },
    type: LAYER_TYPE.NORMAL,
    requirement: DC.E1,
    exponent: DC.D0_5,
    gainMult: DC.D1,
    gainExp: DC.D1,
    resetFn() {
      usePlayerStore().player.resource = DC.D0;
    }
  },
  tabs: ["PTab"]
};