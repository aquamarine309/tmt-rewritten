<script setup>
import Decimal from "break_eternity.js";
import { useGameUpdate } from "@/utils/use-game-update";
import { ref, computed } from "vue";

const props = defineProps({
  config: {
    type: Object,
    required: true
  }
});

const config = props.config;
const effect = ref(new Decimal(0));
const formatEffect = computed(() => config.formatEffect || null);
function update() {
  if (formatEffect.value !== null) {
    effect.value.copyFrom(config.effect());
  }
}
useGameUpdate(update);
</script>

<template>
  <span v-if="formatEffect">
    Currently: {{ formatEffect(effect) }}
  </span>
</template>