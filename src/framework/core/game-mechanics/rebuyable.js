import { GameMechanicState } from "./game-mechanic";
import { EventHub, GAME_EVENT } from "@framework/core/event-hub";
import Decimal from "break_eternity.js";
import { DC } from "@framework/utils/constants";

export class RebuyableState extends GameMechanicState {
  constructor(config, layer) {
    const configCopy = { ...config };
    const effect = config.effect;
    configCopy.effect = () => effect(this.amount);
    super(configCopy);
    this.layer = layer;
    this.requirement = config.requirement;
  }
  
  get cap() {
    return this.config.cap ?? Decimal.dInf;
  }

  get amount() {
    return this.layer.data.rebuyables[this.id] ?? DC.D0;
  }

  set amount(value) {
    const newVal = value.clamp(0, this.cap);
    this.layer.data.rebuyables[this.id] = newVal;
  }

  get cost() {
    if (this.requirement) {
      return this.requirement.requirementAt(this.amount);
    } else {
      throw new Error(`Rebuyable ${this.id} has no cost definition`);
    }
  }

  get resource() {
    if (this.config.resource) {
      return this.config.resource();
    }
    return this.layer.resource;
  }

  get isUnlocked() {
    return !this.config.isUnlocked || this.config.isUnlocked();
  }

  get canBeBought() {
    if (!this.isUnlocked) return false;
    if (this.isCapped) return false;
    return this.resource.value.gte(this.cost);
  }

  purchase() {
    if (!this.canBeBought) return;
    this.resource.subtract(this.cost);
    this.amount = this.amount.add(1);
    this.config.onPurchased?.();
    EventHub.dispatch(GAME_EVENT.REBUYABLE_BOUGHT, this.layer.id, this.id, this.amount);
  }
  
  buyMax() {
    if (!this.canBeBought) return;
    const bulk = this.requirement.bulkAt(this.resource.value);
    this.resource.subtract(this.requirement.requirement(bulk.minus(1)));
    this.amount = bulk;
    this.config.onPurchased?.();
    EventHub.dispatch(GAME_EVENT.REBUYABLE_BOUGHT, this.layer.id, this.id, this.amount);
  }

  get isBought() {
    return this.amount.gt(0);
  }
  
  get isCapped() {
    return this.amount.gte(this.cap);
  }

  get isEffectActive() {
    return this.isBought;
  }

  get isFree() {
    return false;
  }
  
  get title() {
    return this.config.title;
  }
}