<script setup>
import { format, pluralize } from "@framework/utils/format";

defineProps({
  layer: {
    type: Object,
    required: true
  }
});

</script>

<template>
  <i18n-t
    keypath="youHaveX"
    tag="div"
    class="info"
  >
    <template #amount>
      <span class="res-accent res-accent--layer">{{ format(layer.resource.value) }}</span>
    </template>
    <template #name>
      <span>{{ pluralize(layer.resource.name, layer.resource.value) }}</span>
    </template>
  </i18n-t>
</template>

<style scoped>
.res-accent--layer {
  color: var(--color-layer);
}
</style>