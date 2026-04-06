<script setup>
import { state } from "@framework/core/ui.init";
import { Layer, SidebarLayers } from "@framework/core/layer";
import LayerNode from "./tree/LayerNode";
import { computed } from "vue";

const layers = computed(() => SidebarLayers.map(id => Layer[id]));
</script>

<template>
  <div class="custom-tab-sidebar">
    <LayerNode
      v-for="layer in layers"
      :layer
      :key="layer.id"
    />
  </div>
</template>

<style scoped>
.custom-tab-sidebar {
  position: absolute;
  right: 3rem;
  top: 6rem;
  width: 6rem;
  display: flex;
  felx-direction: column;
  justify-content: center;
}
</style>