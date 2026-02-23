import { DC, LAYER_TYPE } from "@/utils/constants";
import { EventHub, GAME_EVENT } from "./event-hub";

export class PrestigeState {
  constructor(config, layer) {
    this.config = config;
    this.layer = layer;
  }
  
  get currency() {
    return this.config.getBaseAmount();
  }
  
  set currency(value) {
    this.config.setBaseAmount(value);
  }
  
  get type() {
    return this.config.type;
  }
  
  get requirement() {
    return this.config.requirement;
  }
  
  get exponent() {
    return this.config.exponent;
  }
  
  get gainMult() {
    return this.config.gainMult;
  }
  
  get gainExp() {
    return this.config.gainExp;
  }
  
  get canReset() {
    return this.currency.gte(this.requirement);
  }
  
  gainedResourceAt(amount) {
    if (amount.lt(this.resource)) return DC.D0;
    switch (this.type) {
      case LAYER_TYPE.NORMAL: {
        return amount.div(this.requirement).pow(this.exponent).times(this.gainMult.pow(this.gainExp));
      }
    }
    return null;
  }
  
  requirememtAt(amount) {
    switch (this.type) {
      case LAYER_TYPE.NORMAL: {
        return amount.div(this.gainMult.pow(this.gainExp)).root(this.exponent).times(this.requirement);
      }
    }
    return null;
  }
  
  get pending() {
    return this.gainedResourceAt(this.currency).floor();
  }
  
  get nextAt() {
    return this.requirememtAt(this.pending.add(1));
  }
  
  reset() {
    if (!this.canReset) return;
    const pending = this.pending;
    this.layer.resource = this.layer.resource.add(pending);
    this.config.resetFn();
    EventHub.dispatch(GAME_EVENT.PRESTIGE_RESET, this.layer.id);
  }
}