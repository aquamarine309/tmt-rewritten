import { format, formatX, formatPow } from "@/utils/format";
import { DC } from "@/utils/constants";
import { Layer } from "@/core/layer";
import { usePlayerStore } from "@/core/stores/player";

// Upgrade id means its position
export default {
  11: {
    id: 11,
    title: "First Upgrade",
    // Description can be a function or a string
    // If there are some number, use function with format is better
    description: () => `You are starting to produce points. (${format(1)}/s)`,
    // Effect can be a function or a string
    effect: DC.D1,
    cost: DC.D1
  },
  12: {
    id: 12,
    title: "Prestige Boost",
    description: "Prestige Points boost point gain.",
    // Layer[id] get a LayerState instance
    effect: () => Layer.p.resource.pow(0.25).add(1),
    // FormatEffect can show the effect with formatting
    formatEffect: value => formatX(value),
    cost: DC.D2,
    isUnlocked: () => Layer.p.upgrades[11].isBought
  },
  13: {
    id: 13,
    title: "Self Powered",
    description: "Point boosts itself.",
    effect: () => usePlayerStore().player.resource.pow(0.1).div(5).add(1),
    formatEffect: value => formatX(value),
    cost: DC.D5,
    isUnlocked: () => Layer.p.upgrades[12].isBought
  },
  14: {
    id: 14,
    title: "Easy Reset",
    description: "You can gain more Prestige Points based on Prestige Points you have.",
    effect: () => Layer.p.resource.add(1).log10().times(0.05).add(1).powEffectOf(Layer.p.upgrades[21]),
    formatEffect: value => formatX(value),
    cost: DC.E1,
    isUnlocked: () => Layer.p.upgrades[13].isBought,
    tooltip: "Purchase to unlock the next layer!"
  },
  21: {
    id: 21,
    title: "Search Upgrade",
    description: "NaN Point provides a power to Upgrade 14.",
    effect: () => Layer.n.resource.add(1).sqrt(),
    formatEffect: value => formatPow(value),
    cost: DC.D20,
    isUnlocked: () => Layer.p.upgrades[14].isBought && Layer.n.milestones[0].isReached
  }
}

// Note: we use Effect instance to apply effect,
// so there is no need to write like this:
// if (Layer.p.upgrades[x].isBought) effect = effect.times(Layer.p.upgrades[x].effectValue);
// We uses this:
// effect = effect.timesEffectOf(Layer.p.upgrades[x].isBought);
// When we use more effects, we can write 
// effect = effect.timesEffectsOf(
//    Layer.p.upgrades[x].isBought,
//    Layer.p.upgrades[y].isBought,
// );
// Sometimes we use Layer.p.upgrades[x].effectOrDefault(DC.D0)
// to get effect if it can be applied and get default value if not
// More in AntimatterDimensionsSourceCode