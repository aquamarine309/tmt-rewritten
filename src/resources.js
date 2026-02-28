import { NotImplementedError } from "./utils/not-implemented-error.js";
import { usePlayerStore } from "@/core/stores/player";
import { DC } from "./utils/constants";
import { Layer } from "./core/layer";
import { Effects } from "./core/game-mechanics";
import { ModInfo } from "./mod-info";
import { reactive } from "vue";

class ResourceState {
  constructor(name, config) {
    this._getValue = config.getValue;
    this._setValue = config.setValue;
    this._startingValue = config.startingValue || DC.D0;
    this._getProduction = config.getProduction;
    this.name = name;
  }

  get value() {
    return this._getValue();
  }
  
  set value(value) {
    this._setValue(value);
  }
  
  add(value) {
    this.value = this.value.add(value);
  }
  
  subtract(value) {
    this.value = this.value.sub(value);
  }
  
  get startingValue() {
    return funOrVal(this._startingValue);
  }
  
  reset() {
    this.value = this._startingValue;
  }
  
  get production() {
    return this._getProduction();
  }
  
  tick(diff) {
    this.add(this.production.times(diff));
  }
}

function bindLayer(name, layerID, options = {}) {
  return reactive(new ResourceState(name, {
    getValue() { return usePlayerStore().getLayer(layerID).resource; },
    setValue(value) { usePlayerStore().getLayer(layerID).resource = value; },
    ...options
  }));
}

export const Resources = {
  default: reactive(new ResourceState("Point", {
    getValue() { return usePlayerStore().player.resource; },
    setValue(value) { usePlayerStore().player.resource = value; },
    startingValue() { return ModInfo.startingValue; },
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