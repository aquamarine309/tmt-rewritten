<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
import LayerNode from "./LayerNode";
import NodeConnection from "./NodeConnection";
import { Layer, LayerConnections } from "@framework/core/layer";
import { TREE_INFO } from "./tree-layout-info";

const layers = computed(() => Layer.all.filter(x => !x.isSidebar));
const connections = computed(() => LayerConnections);
const treeLayout = ref(null);

const scrollToMiddle = () => {
  const container = treeLayout.value;
  if (!container) return;
  const maxScrollLeft = container.scrollWidth - container.clientWidth;
  if (maxScrollLeft > 0) {
    container.scrollLeft = maxScrollLeft / 2;
  }
};

let resizeObserver = null;

onMounted(() => {
  nextTick(() => {
    scrollToMiddle();
  });

  resizeObserver = new ResizeObserver(() => {
    scrollToMiddle();
  });
  if (treeLayout.value) {
    resizeObserver.observe(treeLayout.value);
  }
});

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
});
</script>

<template>
  <div
    class="tree-layout"
    ref="treeLayout"
  >
    <svg
      class="layer-svg"
      :width="TREE_INFO.WIDTH"
    >
      <NodeConnection
        v-for="(connection, idx) in connections"
        :key="idx + '-connection'"
        :connection="connection"
      />
    </svg>
    <div
      class="layer-node-container"
      :style="{ width: `${TREE_INFO.WIDTH}px` }"
    >
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
  overflow: auto;
}

.layer-node-container,
.layer-svg {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
}
</style>