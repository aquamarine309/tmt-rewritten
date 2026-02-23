<script setup>
import { getNodePosition, getNodeLayer } from "./tree-layout-info";
import { computed, ref } from "vue";
import { useGameUpdate } from "@/utils/use-game-update";

const props = defineProps({
  connection: {
    type: Array,
    required: true
  }
});

const pos1 = computed(() => getNodePosition(props.connection[0]));
const pos2 = computed(() => getNodePosition(props.connection[1]));

const bothUnlocked = ref(false);

function update() {
  bothUnlocked.value = props.connection.every(node => getNodeLayer(node).isUnlocked);
}
useGameUpdate(update);
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