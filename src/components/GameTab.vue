<script setup>
import { state } from "@/core/ui.init";
import * as components from "./tabs";
import { computed } from "vue";
import { Layer } from "@/core/layer";

const layer = computed(() => Layer[state.layer]);
const tab = computed(() => layer.value.tabs[state.tab]);
const color = computed(() => layer.value.config.color);
const styleObject = computed(() => ({
  "--color-layer": color.value
}));
</script>

<template>
  <div class="game-tab">
    <component
      :is="components[tab.component]"
      :style="styleObject"
      :layer="layer"
    />
  </div>
</template>

<style scoped>
.game-tab {
  --color-layer: var(--color-accent);
  width: 100%;
  height: 100%;
  position: relative;
}
</style>