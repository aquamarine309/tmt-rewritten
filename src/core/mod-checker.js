import { ModInfo } from "@/mod-info";

export function checkModID() {
  if (ModInfo.id === null) {
    throw new Error("Please complete the mod info.");
  }
}