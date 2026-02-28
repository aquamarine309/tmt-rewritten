import { DC, LAYER_TYPE } from "@/utils/constants";
import { EventHub, GAME_EVENT } from "./event-hub";

export class PrestigeState {
  constructor(config, layer) {
    this.config = config;
    this.layer = layer;
  }
  
  get baseResource() {
    return this.config.baseResource;
  }
  
  get type() {
    return this.config.type;
  }
  
  get requirement() {
    return this.config.requirement;
  }
  
  get exponent() {
    return funOrVal(this.config.exponent);
  }
  
  get gainMult() {
    return funOrVal(this.config.gainMult);
  }
  
  get gainExp() {
    return funOrVal(this.config.gainExp);
  }
  
  get base() {
    return funOrVal(this.config.base);
  }
  
  get canReset() {
    switch (this.type) {
      case LAYER_TYPE.NORMAL: {
        return this.baseResource.value.gte(this.requirementAt(DC.D1));
      }
      case LAYER_TYPE.STATIC: {
        return this.baseResource.value.gte(this.requirementAt(this.layer.resource.value.add(1)));
      }
    }
    return false;
  }
  
  gainedResourceAt(amount) {
    if (amount.lt(this.resource)) return DC.D0;
    switch (this.type) {
      case LAYER_TYPE.NORMAL: {
        return amount.div(this.requirement).pow(this.exponent).times(this.gainMult.pow(this.gainExp));
      }
      case LAYER_TYPE.STATIC: {
        // Formula; (gainExp * log_base(amount / (req * mul)))^(1 / exp)
        return amount.div(this.requirement.times(this.gainMult)).log(this.base).times(this.gainExp).pow(this.exponent.recip());
      }
    }
    return null;
  }
  
  requirementAt(amount) {
    switch (this.type) {
      case LAYER_TYPE.NORMAL: {
        return amount.div(this.gainMult.pow(this.gainExp)).root(this.exponent).times(this.requirement);
      }
      case LAYER_TYPE.STATIC: {
        return this.base.pow(amount.pow(this.exponent).div(this.gainExp)).times(this.requirement.times(this.gainMult));
      }
    }
    return null;
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
        return this.requirementAt(this.pending.add(1));
      }
      case LAYER_TYPE.STATIC: {
        return this.requirementAt(this.pending.add(this.layer.resource.value).add(1));
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