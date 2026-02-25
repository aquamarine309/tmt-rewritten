import { createApp } from "vue";
import GameUIComponent from "@/components/GameUIComponent";
import { createPinia } from "pinia";
import ZeroTooltip from "zero-tooltip";

export const ui = createApp(GameUIComponent);
const pinia = createPinia();

ui.use(pinia);
ui.use(ZeroTooltip);
ui.mount("#ui");
