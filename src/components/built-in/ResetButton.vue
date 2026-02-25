<script setup>
import { useGameUpdate } from "@/utils/use-game-update";
import { computed, ref } from "vue";
import Decimal from "break_eternity.js";
import { format, quantify } from "@/utils/format";

const props = defineProps({
  layer: {
    type: Object,
    required: true
  }
});

const layer = props.layer;
const prestige = layer.prestige;
const color = computed(() => layer.config.color);
const resource = ref(new Decimal(0));
const nextAt = ref(new Decimal(0));
const gain = ref(new Decimal(0));
const baseResource = computed(() => layer.config.prestige.baseResource);
const resourceName = computed(() => layer.config.prestige.resource);

const canReset = ref(false);

const classObject = computed(() => ({
  "reset-btn": true,
  "main-btn": true,
  "reset-btn--available": canReset.value
}));

const styleObject = computed(() => ({
  "--color-layer": color.value
}));

function update() {
  canReset.value = prestige.canReset;
  resource.value.copyFrom(prestige.currency);
  gain.value.copyFrom(prestige.pending);
  nextAt.value.copyFrom(prestige.nextAt);
}
useGameUpdate(update);

function reset() {
  prestige.reset();
}
</script>

<template>
  <div class="reset-row">
    <button
      :style="styleObject"
      :class="classObject"
      @click="reset"
    >
      <span>Reset for +{{ quantify(resourceName, gain, 0) }}</span>
      <br>
      <span>Next at: {{ quantify(baseResource, nextAt) }}</span>
    </button>
    <div class="info">You have {{ quantify(baseResource, resource) }}.</div>
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
