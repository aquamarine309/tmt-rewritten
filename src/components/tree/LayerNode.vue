<script setup>
import { computed } from "vue";
import { getNodePosition } from "./tree-layout-info";
import { quantify } from "@/utils/format";
import Decimal from "break_eternity.js";

const { layer } = defineProps({
  layer: {
    type: Object,
    required: true
  }
});

const position = computed(() => getNodePosition(layer.id));
const styleObject = computed(() => ({
  "--node-color": layer.config.color,
  left: position.value.x,
  top: `${position.value.y}px`
}));
const resource = computed(() => layer.resource);

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
    v-tooltip="quantify(resource.name, resource.value, 0)"
  >
    {{ layer.name }}
  </button>
</template>

<style scoped>
.layer-node {
  --node-color: white;
  border: 0.5rem solid rgba(0, 0, 0, 0.125);
  border-radius: 50%;
  background-color: var(--node-color);
  color: rgba(0, 0, 0, 0.5);
  font-size: 4rem;
  width: 10rem;
  height: 10rem;
  line-height: 10rem;
  position: absolute;
  transform: translate(-50%, -50%);
  cursor: pointer;
}

.layer-node--notify {
  box-shadow: 0 0 1rem 0.1rem red;
}
</style>