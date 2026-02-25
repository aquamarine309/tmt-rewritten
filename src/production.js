import { usePlayerStore } from "./core/stores/player";
import { Layer } from "./core/layer";
import { DC } from "./utils/constants";
import { Effects } from "./core/game-mechanics";

export function resourceProduction() {
  if (!Layer.p.upgrades[11].isBought) return DC.D0;
  return Effects.product(
    Layer.p.upgrades[11],
    Layer.p.upgrades[12],
    Layer.p.upgrades[13]
  );
}