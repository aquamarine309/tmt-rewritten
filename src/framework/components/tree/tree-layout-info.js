import { Layer, LayerLayout } from "@framework/core/layer";
import { EventHub, GAME_EVENT } from "@framework/core/event-hub";

export function getNodeLayer(id) {
  return Layer[id];
}

export const TREE_INFO = {
  BOX_SIZE: 150,
  NODE_SIZE: 100,
  SIDEBAR_NODE_SIZE: 40,
  WIDTH: 1000
};

const NodeCache = new Map();
export function getNodePosition(id) {
  if (NodeCache.has(id)) return NodeCache.get(id);
  for (let i = 0; i < LayerLayout.length; i++) {
    const row = LayerLayout[i].map(x => getNodeLayer(x)).filter(x => x.isUnlocked);
    for (let j = 0; j < row.length; j++) {
      if (row[j].id === id) {
        const output = {
          x: (j - row.length / 2 + 0.5) * TREE_INFO.BOX_SIZE + TREE_INFO.WIDTH / 2,
          y: (TREE_INFO.BOX_SIZE * i + TREE_INFO.NODE_SIZE).toString()
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