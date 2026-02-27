import { GameMechanicState } from "./game-mechanic";

export class MilestoneState extends GameMechanicState {
  constructor(config, layer) {
    super(config);
    this.layer = layer;
  }
  
  get requirement() {
    return this.config.requirement;
  }
  
  get resource() {
    return this.layer.resource;
  }
  
  get isReached() {
    return this.resource.value.gte(this.requirement);
  }
  
  get isEffectActive() {
    return this.isReached;
  }
}