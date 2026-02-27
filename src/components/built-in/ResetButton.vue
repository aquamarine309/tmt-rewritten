<script setup>
import { computed } from "vue";
import { format, quantify } from "@/utils/format";

const { layer } = defineProps({
  layer: {
    type: Object,
    required: true
  }
});

const prestige = computed(() => layer.prestige);
const baseResource = computed(() => prestige.value.baseResource);

const classObject = computed(() => ({
  "reset-btn": true,
  "main-btn": true,
  "reset-btn--available": prestige.value.canReset
}));
function reset() {
  prestige.value.reset();
}
</script>

<template>
  <div class="reset-row">
    <button
      :class="classObject"
      @click="reset"
    >
      <span>Reset for +{{ quantify(layer.resource.name, prestige.pending, 0) }}</span>
      <br>
      <span>Next at: {{ quantify(baseResource.name, prestige.nextAt) }}</span>
    </button>
    <div class="info">You have {{ quantify(baseResource.name, baseResource.value) }}.</div>
  </div>
</template>

<style scoped>
.reset-btn {
  width: 18rem;
  height: 12rem;
}

.reset-btn--available {
  background: var(--color-layer);
  cursor: pointer;
}

.reset-row {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
