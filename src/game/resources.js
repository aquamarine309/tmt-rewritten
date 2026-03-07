import { ResourceState, bindLayer } from "@framework/resources";
import { usePlayerStore } from "@framework/core/stores/player";
import { ModInfo } from "./mod-info";
import { Layer } from "@framework/core/layer";
import { reactive } from "vue";
import { Effects } from "@framework/core/game-mechanics";

export const Resources = {
  default: reactive(new ResourceState("Point", {
    getValue() { return usePlayerStore().player.resource; },
    setValue(value) { usePlayerStore().player.resource = value; },
    startingValue() { return ModInfo.startingResource; },
    getProduction() {
      if (!Layer.alpha.upgrades[11].isBought) return DC.D0;
      return Effects.product(
        Layer.alpha.effects.words,
        Layer.alpha.upgrades[11],
        Layer.alpha.upgrades[12],
        Layer.alpha.upgrades[13]
      );
    }
  })),
  words: reactive(new ResourceState("Word", {
    getValue() { return usePlayerStore().getLayer("alpha").words; },
    setValue(value) { usePlayerStore().getLayer("alpha").words = value; }
  })),
  alpha: bindLayer("Alpha Point", "alpha"),
  beta: bindLayer("Beta Point", "beta"),
  gamma: bindLayer("Gamma Point", "gamma")
};