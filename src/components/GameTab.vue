<script setup>
import { state } from "@/core/ui.init";
import * as components from "./tabs";
import { computed } from "vue";
import { Layer } from "@/core/layer";

const layer = computed(() => Layer[state.view.layer]);
const tab = computed(() => layer.value.tabs[state.view.tab]);
</script>

<template>
  <div class="game-tab">
    <component :is="components[tab.component]" />
  </div>
</template>

<style scoped>
.game-tab {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>