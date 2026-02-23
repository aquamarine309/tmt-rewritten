import { state } from "./ui.init";

export class TabState {
  constructor(config) {
    this.component = config.is;
    this.id = config.id;
    this.condition = config.condition;
  }
  
  get isUnlocked() {
    return !this.condition || this.condition();
  }
  
  get isOpen() {
    return state.view.tab === this.id;
  }
  
  show() {
    state.view.tab = this.id;
  }
}