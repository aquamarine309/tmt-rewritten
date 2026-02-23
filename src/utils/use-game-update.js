import { onUnmounted } from "vue";
import { EventHub, GAME_EVENT } from "@/core/event-hub";
import { state } from "@/core/ui.init";

export function useGameUpdate(updateFn) {
  on$(GAME_EVENT.UPDATE, updateFn);
  if (state.view.initialized) {
    updateFn();
  }
}

export function on$(event, fn) {
  const handler = () => {
    if (state.view.initialized) {
      fn();
    }
  }
  
  if (fn) {
    EventHub.ui.on(event, handler);
  }
  
  onUnmounted(() => {
    EventHub.ui.off(event, handler);
  });
}