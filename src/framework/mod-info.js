let modInfo = null;

export function registerModInfo(config) {
  modInfo = config;
}

export function getModInfo() {
  return modInfo;
}