<script setup>
import { computed, ref } from "vue";
import Decimal from "break_eternity.js";
import { format } from "@/utils/format";
import { useGameUpdate } from "@/utils/use-game-update";

const props = defineProps({
  layer: {
    type: Object,
    required: true
  }
});
const layer = props.layer;
const color = computed(() => layer.config.color);
const resource = ref(new Decimal(0));
const resourceName = computed(() => layer.config.prestige.resource);

function update() {
  resource.value.copyFrom(layer.resource);
}
useGameUpdate(update);

const styleObject = computed(() => ({ color: color.value }));
</script>

<template>
  <div class="info">You have <span :style="styleObject">{{ format(resource )}}</span> {{ resourceName }}.</div>
</template>