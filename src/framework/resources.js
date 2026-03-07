import { NotImplementedError } from "./utils/not-implemented-error.js";
import { usePlayerStore } from "@framework/core/stores/player";
import { DC } from "./utils/constants";
import { Layer } from "./core/layer";
import { reactive } from "vue";

export class ResourceState {
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
    this.value = funOrVal(this._startingValue);
  }
  
  get production() {
    return this._getProduction();
  }
  
  tick(diff) {
    this.add(this.production.times(diff));
  }
}

export function bindLayer(name, layerID, options = {}) {
  return reactive(new ResourceState(name, {
    getValue() { return usePlayerStore().getLayer(layerID).resource; },
    setValue(value) { usePlayerStore().getLayer(layerID).resource = value; },
    ...options
  }));
}