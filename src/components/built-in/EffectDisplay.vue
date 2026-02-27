<script setup>
import { computed } from "vue";

const props = defineProps({
  config: {
    type: Object,
    required: true
  }
});

const config = props.config;
const formatEffect = computed(() => config.formatEffect || null);
const effect = computed(() => funOrVal(config.effect));
</script>

<template>
  <span v-if="formatEffect">
    Currently: {{ formatEffect(effect) }}
  </span>
</template>