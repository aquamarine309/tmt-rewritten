import { DC, LAYER_TYPE } from "@framework/utils/constants";
import { EventHub, GAME_EVENT } from "./event-hub";

export class PrestigeState {
  constructor(config, layer) {
    this.config = config;
    this.layer = layer;
  }
  
  get requirement() {
    return this.config.requirement;
  }
  
  get baseResource() {
    return this.config.baseResource();
  }
  
  get type() {
    return this.config.type;
  }
  
  get canReset() {
    switch (this.type) {
      case LAYER_TYPE.NORMAL: {
        return this.baseResource.value.gte(this.requirementAt(DC.D0));
      }
      case LAYER_TYPE.STATIC: {
        return this.baseResource.value.gte(this.requirementAt(this.layer.resource.value));
      }
    }
    return false;
  }
  
  gainedResourceAt(amount) {
    return this.requirement.bulkAt(amount);
  }
  
  requirementAt(amount) {
    return this.requirement.requirementAt(amount);
  }
  
  get pending() {
    if (!this.canReset) return DC.D0;
    const gain = this.gainedResourceAt(this.baseResource.value).floor();
    switch (this.type) {
      case LAYER_TYPE.NORMAL: {
        return gain;
      }
      case LAYER_TYPE.STATIC: {
        return gain.minus(this.layer.resource.value);
      }
    }
    return null;
  }
  
  get nextAt() {
    switch (this.type) {
      case LAYER_TYPE.NORMAL: {
        return this.requirementAt(this.pending);
      }
      case LAYER_TYPE.STATIC: {
        return this.requirementAt(this.pending.add(this.layer.resource.value));
      }
    }
    return null;
  }
  
  reset() {
    if (!this.canReset) return;
    this.layer.resource.add(this.pending);
    this.config.resetFn();
    EventHub.dispatch(GAME_EVENT.PRESTIGE_RESET, this.layer.id);
  }
}