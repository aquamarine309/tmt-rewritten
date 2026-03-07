export class InfoState {
  constructor(config) {
    this.config = config;
  }
  
  get id() {
    return this.config.id;
  }
  
  get isUnlocked() {
    return !this.config.isUnlocked || this.config.isUnlocked();
  }
  
  get title() { return this.config.title; }
  
  get text() { return funOrVal(this.config.text); }
}