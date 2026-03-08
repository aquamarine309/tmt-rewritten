import { createApp } from "vue";
import GameUIComponent from "@framework/components/GameUIComponent";
import { createPinia } from "pinia";
import ZeroTooltip from "zero-tooltip";

let customComponents = null;

export function registerCustomComponents(config) {
  customComponents = config;
}

export function getCustomComponents() {
  return customComponents;
}

export const ui = createApp(GameUIComponent);
const pinia = createPinia();

ui.use(pinia);
ui.use(ZeroTooltip, {
  showWarnings: false
});
ui.mount("#ui");
