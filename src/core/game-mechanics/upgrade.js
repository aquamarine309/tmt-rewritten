import { GameMechanicState } from "./game-mechanic";
import { EventHub, GAME_EVENT } from "@/core/event-hub";

export class UpgradeState extends GameMechanicState {
  constructor(config, layer) {
    super(config);
    this.layer = layer;
    this._customCurrency = config.getCurrency !== undefined;
  }
  
  get currency() {
    if (this._customCurrency) {
      return this.config.getCurrency();
    }
    return this.layer.resource;
  }
  
  set currency(value) {
    if (this._customCurrency) {
      this.config.setCurrency(value);
    }
    this.layer.resource = value;
  }
  
  get cost() {
    return this.config.cost;
  }
  
  get isUnlocked() {
    return !this.config.isUnlocked || this.config.isUnlocked();
  }
  
  get isAffordable() {
    return this.currency.gte(this.cost);
  }
  
  get isAvailableForPurchase() {
    return this.isUnlocked && !this.isBought;
  }
  
  get canBeBought() {
    return this.isAffordable && this.isAvailableForPurchase;
  }
  
  get isBought() {
    return this.layer.data.upgrades.has(this.id);
  }
  
  set isBought(value) {
    if (value) {
      this.layer.data.upgrades.add(this.id);
    } else {
      this.layer.data.upgrades.delete(this.id);
    }
  }
  
  get isFree() {
    return false;
  }
  
  purchase() {
    if (!this.canBeBought) return;
    this.isBought = true;
    if (!this.isFree) {
      this.currency = this.currency.sub(this.cost);
    }
    this.config.onPurchased?.();
    EventHub.dispatch(GAME_EVENT.UPGRADE_BOUGHT, this.layer.id, this.id);
  }
  
  get title() {
    return this.config.title;
  }
  
  get isEffectActive() {
    return this.isBought;
  }
}