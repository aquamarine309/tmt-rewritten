<script setup>
import { computed, ref } from "vue";
import Decimal from "break_eternity.js";
import { format, pluralize } from "@/utils/format";
import { useGameUpdate } from "@/utils/use-game-update";

const props = defineProps({
  layer: {
    type: Object,
    required: true
  }
});
const layer = props.layer;
const resource = ref(new Decimal(0));
const resourceName = computed(() => layer.config.prestige.resource);

function update() {
  resource.value.copyFrom(layer.resource);
}
useGameUpdate(update);

</script>

<template>
  <div class="info">You have <span class="res-accent res-accent--layer">{{ format(resource) }}</span> {{ pluralize(resourceName, resource) }}.</div>
</template>

<style scoped>
.res-accent--layer {
  color: var(--color-layer);
}
</style>