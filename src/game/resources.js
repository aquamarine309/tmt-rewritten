import { Resources } from "@framework/resources";
import { usePlayerStore } from "@framework/core/stores/player";
import { getModInfo } from "@framework/mod-info";
import { Layer } from "@framework/core/layer";
import { reactive } from "vue";
import { Effects } from "@framework/core/game-mechanics";
import { DC } from "@framework/utils/constants";

Resources.register("default", {
  name: "Point",
  isDefault: true,
  getValue() { return usePlayerStore().player.resource; },
  setValue(value) { usePlayerStore().player.resource = value; },
  startingValue() { return getModInfo().startingResource; },
  getProduction() {
    if (!Layer.alpha.upgrades[11].isBought) return DC.D0;
    return Effects.product(
      Layer.alpha.effects.words,
      Layer.alpha.upgrades[11],
      Layer.alpha.upgrades[12],
      Layer.alpha.upgrades[13]
    );
   }
});

Resources.register("words", {
  getValue() { return usePlayerStore().getLayer("alpha").words; },
  setValue(value) { usePlayerStore().getLayer("alpha").words = value; }
});

Resources.bindLayer("alpha", "alpha", { name: "Alpha Point" });
Resources.bindLayer("beta", "beta", { name: "Beta Point" });
Resources.bindLayer("gamma", "gamma", { name: "Gamma Point" });