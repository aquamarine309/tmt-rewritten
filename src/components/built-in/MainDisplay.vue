<script setup>
import { format, pluralize } from "@/utils/format";

defineProps({
  layer: {
    type: Object,
    required: true
  }
});

</script>

<template>
  <div class="info">You have <span class="res-accent res-accent--layer">{{ format(layer.resource.value) }}</span> {{ pluralize(layer.resource.name, layer.resource.value) }}.</div>
</template>

<style scoped>
.res-accent--layer {
  color: var(--color-layer);
}
</style>