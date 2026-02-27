<script setup>
import { computed } from "vue";
import EffectDisplay from "./EffectDisplay";
import { quantify } from "@/utils/format";

const { milestone } = defineProps({
  milestone: {
    type: Object,
    required: true
  }
});

const layer = computed(() => milestone.layer);
const requirement = computed(() => milestone.requirement);
const resource = computed(() => layer.value.config.prestige.resource);
const description = computed(() => funOrVal(milestone.config.description));
</script>

<template>
  <button
    class="main-btn milestone-btn"
    :class="{ 'bought': milestone.isReached }"
  >
    <span class="milestone-title">{{ quantify(resource, requirement, 0) }}</span>
    <span>{{ description }}</span>
    <EffectDisplay :config="milestone.config" />
  </button>
</template>

<style scoped>
.milestone-btn {
  width: 40rem;
  min-height: 8rem;
  height: auto;
  border-radius: 0;
}

.milestone-title {
  font-weight: bold;
  font-size: 1.5rem;
}
</style>