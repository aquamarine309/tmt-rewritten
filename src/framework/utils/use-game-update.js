import { onUnmounted } from "vue";
import { EventHub, GAME_EVENT } from "@framework/core/event-hub";
import { state } from "@framework/core/ui.init";

export function useGameUpdate(updateFn) {
  on$(GAME_EVENT.UPDATE, updateFn);
  if (state.initialized) {
    updateFn();
  }
}

export function on$(event, fn) {
  const handler = () => {
    if (state.initialized) {
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