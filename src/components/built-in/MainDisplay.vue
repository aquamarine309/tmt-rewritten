<script setup>
import { computed, ref } from "vue";
import { format, pluralize } from "@/utils/format";

const { layer } = defineProps({
  layer: {
    type: Object,
    required: true
  }
});
const resourceName = computed(() => layer.resName);

</script>

<template>
  <div class="info">You have <span class="res-accent res-accent--layer">{{ format(layer.resource) }}</span> {{ pluralize(resourceName, layer.resource) }}.</div>
</template>

<style scoped>
.res-accent--layer {
  color: var(--color-layer);
}
</style>