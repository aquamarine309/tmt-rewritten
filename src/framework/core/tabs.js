import { state } from "./ui.init";

export class TabState {
  constructor(config) {
    this.component = config.is;
    this.id = config.id;
    this.condition = config.condition;
    this.name = config.name;
  }
  
  get isUnlocked() {
    return !this.condition || this.condition();
  }
  
  show() {
    state.tab = this.id;
    state.forcedTab = "";
  }
}