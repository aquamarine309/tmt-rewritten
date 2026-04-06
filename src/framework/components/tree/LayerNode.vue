<script setup>
import { computed } from "vue";
import { getNodePosition, TREE_INFO } from "./tree-layout-info";
import { quantify } from "@framework/utils/format";
import Decimal from "break_eternity.js";
import { funOrVal } from "@framework/utils/extensions";

const { layer } = defineProps({
  layer: {
    type: Object,
    required: true
  }
});

const position = computed(() => getNodePosition(layer.id));
const isSidebar = computed(() => layer.isSidebar);
const styleObject = computed(() => {
  if (isSidebar.value) {
    return {
      "--node-color": layer.color,
      "--node-size": `${TREE_INFO.SIDEBAR_NODE_SIZE}px`,
      position: "relative"
    };
  }
  return {
    "--node-color": layer.color,
    "--node-size": `${TREE_INFO.NODE_SIZE}px`,
    position: "absolute",
    left: `${position.value.x}px`,
    top: `${position.value.y}px`,
    transform: "translate(-50%, -50%)"
  };
});
const resource = computed(() => layer.resource);
const tooltip = computed(() => {
  if (layer.config.customTooltip) return funOrVal(layer.config.customTooltip);
  if (layer.config.resource) return quantify(resource.value.name, resource.value.value, 0);
  return layer.fullName;
});

function showLayer() {
  layer.show();
}
</script>

<template>
  <button
    v-if="layer.isUnlocked"
    class="layer-node"
    :class="{ 'layer-node--notify': layer.cheapestUpgrade?.isAffordable }"
    :style="styleObject"
    @click="showLayer"
    v-tooltip="tooltip"
    v-html="layer.name"
  />
</template>

<style scoped>
.layer-node {
  --node-color: white;
  --node-size: 10rem;
  border: calc(0.05 * var(--node-size)) solid rgba(0, 0, 0, 0.125);
  border-radius: 50%;
  background-color: var(--node-color);
  color: rgba(0, 0, 0, 0.5);
  font-size: calc(0.4 * var(--node-size));
  width: var(--node-size);
  height: var(--node-size);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.layer-node--notify {
  box-shadow: 0 0 1rem 0.1rem red;
}
</style>