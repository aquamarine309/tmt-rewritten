import { format, formatX } from "@/utils/format";
import { DC } from "@/utils/constants";
import { Layer } from "@/core/layer";
import { usePlayerStore } from "@/core/stores/player";

export default {
  11: {
    id: 11,
    title: "First Upgrade",
    description: () => `You are starting to produce points. (${format(1)}/s)`,
    effect: DC.D1,
    cost: DC.D1
  },
  12: {
    id: 12,
    title: "Prestige Boost",
    description: "Prestige Points boost point gain.",
    effect: () => Layer.p.resource.pow(0.25).add(1),
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
    effect: () => Layer.p.resource.add(1).log10().times(0.05).add(1),
    formatEffect: value => formatX(value),
    cost: DC.E1,
    isUnlocked: () => Layer.p.upgrades[13].isBought
  }
}