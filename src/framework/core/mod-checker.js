import { getModInfo } from "@framework/mod-info";

export function checkModID() {
  if (getModInfo().id === null) {
    throw new Error("Please complete the mod info.");
  }
}