import { createApp } from "vue";
import GameUIComponent from "@/components/GameUIComponent";
import { createPinia } from "pinia";

export const ui = createApp(GameUIComponent);
const pinia = createPinia();

ui.use(pinia);
ui.mount("#ui");
