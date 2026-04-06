import { GameMechanicState } from "./game-mechanic";

export class MilestoneState extends GameMechanicState {
  constructor(config, layer) {
    super(config);
    this.layer = layer;
    this._reached = false;
  }

  get requirement() {
    return this.config.requirement;
  }

  get resource() {
    if (this.config.resource) {
      return this.config.resource();
    }
    return this.layer.resource;
  }

  get isReached() {
    return this.resource.value.gte(this.requirement);
  }

  get isEffectActive() {
    return this.isReached;
  }

  checkReach() {
    const nowReached = this.isReached;
    if (nowReached && !this._reached) {
      if (this.config.onReach) {
        this.config.onReach(this.layer, this);
      }
    }
    this._reached = nowReached;
  }

  resetReachState() {
    this._reached = false;
  }
  
  syncReachState() {
    this._reached = this.isReached;
  }
}