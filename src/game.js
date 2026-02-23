import "./utils/extensions";
import { GameUI } from "./core/ui";
import { state } from "./core/ui.init";
import { GameStorage } from "./core/storage";
import "./utils/crash";
import { ModInfo } from "./mod-info";

window.onload = function() {
  GameUI.initialized = true;
  state.view.initialized = true;
  document.title = ModInfo.name;
};

export function init() {
  GameStorage.init();
}