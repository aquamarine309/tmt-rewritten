import { getPlayer } from "./core/runtime";

export function resourceProduction() {
  return getPlayer().layers.p.resource;
}