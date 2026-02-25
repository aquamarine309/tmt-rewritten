<script setup>
import { computed, ref } from "vue";
import { getNodePosition } from "./tree-layout-info";
import { useGameUpdate } from "@/utils/use-game-update";
import Decimal from "break_eternity.js";
import { quantify } from "@/utils/format";

const props = defineProps({
  layer: {
    type: Object,
    required: true
  }
});

const layer = props.layer;
const layerName = computed(() => layer.name);
const position = computed(() => getNodePosition(layer.id));
const styleObject = computed(() => ({
  "--node-color": layer.config.color,
  left: position.value.x,
  top: `${position.value.y}px`
}));
const resource = ref(new Decimal(0));
const isUnlocked = ref(false);
const resourceName = computed(() => layer.config.prestige.resource);
const upgradeAffordable = ref(false);

function showLayer() {
  layer.show();
}

function update() {
  isUnlocked.value = layer.isUnlocked;
  resource.value.copyFrom(layer.resource);
  if (layer.cheapestUpgrade?.value) {
    upgradeAffordable.value = layer.cheapestUpgrade.value.canBeBought;
  } else {
    upgradeAffordable.value = false;
  }
}
useGameUpdate(update);
</script>

<template>
  <button
    v-if="isUnlocked"
    class="layer-node"
    :class="{ 'layer-node--notify': upgradeAffordable }"
    :style="styleObject"
    @click="showLayer"
    v-tooltip="quantify(resourceName, resource, 0)"
  >
    {{ layerName }}
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