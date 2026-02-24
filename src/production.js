import { usePlayerStore } from "./core/stores/player";

export function resourceProduction() {
  return usePlayerStore().getLayer("p").resource;
}