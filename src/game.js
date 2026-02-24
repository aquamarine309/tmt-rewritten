import "./utils/extensions";
import { state } from "./core/ui.init";
import { useGameStorageStore } from "./core/stores/storage";
import "./utils/crash";
import { ModInfo } from "./mod-info";
import { checkModID } from "./core/mod-checker";

window.onload = function() {
  state.initialized = true;
  document.title = ModInfo.name;
};

export function init() {
  checkModID();
  useGameStorageStore().init();
}