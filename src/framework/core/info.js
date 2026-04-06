import { funOrVal } from "@framework/utils/extensions";

export class InfoState {
  constructor(config, layer) {
    this.config = config;
    this.layer = layer;
  }
  
  get id() {
    return this.config.id;
  }
  
  get isUnlocked() {
    return !this.config.isUnlocked || this.config.isUnlocked();
  }
  
  get title() { return this.config.title; }
  
  get text() { return funOrVal(this.config.text); }
  
  get isHidden() { return (this.layer.data.infoBits & (1 << this.id)) !== 0; }
  
  set isHidden(value) {
    if (value) {
      this.layer.data.infoBits |= (1 << this.id);
    } else {
      this.layer.data.infoBits &= ~(1 << this.id);
    }
  }
  
  get isExpanded() {
    return !this.isHidden;
  }
  
  set isExpanded(value) {
    this.isHidden = !value;
  }
}