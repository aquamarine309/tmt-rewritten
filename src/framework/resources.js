import { NotImplementedError } from "./utils/not-implemented-error.js";
import { usePlayerStore } from "@framework/core/stores/player";
import { DC } from "./utils/constants";
import { Layer } from "./core/layer";
import { reactive } from "vue";

class ResourceState {
  constructor(config) {
    this._getValue = config.getValue;
    this._setValue = config.setValue;
    this._startingValue = config.startingValue || DC.D0;
    this._getProduction = config.getProduction;
    this.name = config.name;
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

export const Resources = {
  _all: {},
  
  _default: null,
  
  register(id, config) {
    if (!config) {
      throw new Error("Config is required.");
    }
    if (this._all[id]) {
      throw new Error("The resource has been registered.");
    }
    const resource = reactive(new ResourceState(config));
    this._all[id] = resource;
    if (config.isDefault) {
      if (this._default !== null) {
        throw new Error("Only single default resource is allowed.");
      }
      this._default = resource;
    }
  },
  
  getDefault() {
    return this._default;
  },
  
  bindLayer(id, layerID, options = {}) {
    this.register(id, {
      getValue() { return usePlayerStore().getLayer(layerID).resource; },
      setValue(value) { usePlayerStore().getLayer(layerID).resource = value; },
      ...options
    });
  },
  
  get(id) {
    return this._all[id];
  }
};