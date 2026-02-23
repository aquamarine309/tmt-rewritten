<script setup>
import LayerNode from "./LayerNode";
import NodeConnection from "./NodeConnection";
import { Layer, LayerConnections } from "@/core/layer";
import { computed } from "vue";

const layers = Layer.all;
const connections = computed(() => LayerConnections);
</script>

<template>
  <div class="tree-layout">
    <svg class="layer-svg">
      <NodeConnection
        v-for="(connection, idx) in connections"
        :key="idx + '-connection'"
        :connection="connection"
      />
    </svg>
    <div class="layer-node-container">
      <LayerNode
        v-for="layer in layers"
        :key="layer.id"
        :layer="layer"
      />
    </div>
  </div>
</template>


<style scoped>
.tree-layout {
  width: 100%;
  height: 100%;
  position: relative;
}

.layer-node-container,
.layer-svg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>