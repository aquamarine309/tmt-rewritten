<script setup>
import { getNodePosition, getNodeLayer } from "./tree-layout-info";
import { computed, ref } from "vue";

const { connection } = defineProps({
  connection: {
    type: Array,
    required: true
  }
});

const pos1 = computed(() => getNodePosition(connection[0]));
const pos2 = computed(() => getNodePosition(connection[1]));

const bothUnlocked = computed(() => connection.every(x => getNodeLayer(x).isUnlocked));
</script>

<template>
  <line
    v-if="bothUnlocked"
    :x1="pos1.x"
    :y1="pos1.y"
    :x2="pos2.x"
    :y2="pos2.y"
    class="line-style"
  />
</template>

<style scoped>
.line-style {
  stroke: white;
  stroke-width: 12px;
}
</style>