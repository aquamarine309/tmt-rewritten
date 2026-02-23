import { Layer, LayerLayout } from "@/core/layer";
import { EventHub, GAME_EVENT } from "@/core/event-hub";

export function getNodeLayer(id) {
  return Layer[id];
}

const TREE_INFO = {
  ROW_HEIGHT: 150,
  NODE_SIZE: 100
};

const NodeCache = new Map();
export function getNodePosition(id) {
  if (NodeCache.has(id)) return NodeCache.get(id);
  for (let i = 0; i < LayerLayout.length; i++) {
    const row = LayerLayout[i].map(x => getNodeLayer(x)).filter(x => x.isUnlocked);
    for (let j = 0; j < row.length; j++) {
      if (row[j].id === id) {
        const output = {
          x: `${100 * (j + 1) / (row.length + 1)}%`,
          y: (TREE_INFO.ROW_HEIGHT * i + TREE_INFO.NODE_SIZE).toString()
        };
        NodeCache.set(id, output);
        return output;
      }
    }
  }
  NodeCache.set(id, null);
  return null;
}

EventHub.ui.on(GAME_EVENT.LAYER_UNLOCKED, () => NodeCache.clear());