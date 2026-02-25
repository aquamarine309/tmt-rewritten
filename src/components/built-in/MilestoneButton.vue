<script setup>
import { ref, computed } from "vue";
import { useGameUpdate } from "@/utils/use-game-update";
import EffectDisplay from "./EffectDisplay";
import { quantify } from "@/utils/format";

const props = defineProps({
  milestone: {
    type: Object,
    required: true
  }
});

const milestone = props.milestone;
const layer = computed(() => milestone.layer);
const isReached = ref(false);
const requirement = computed(() => milestone.requirement);
const resource = computed(() => layer.value.config.prestige.resource);
const description = computed(() => funOrVal(milestone.config.description));

function update() {
  isReached.value = milestone.isReached;
}
useGameUpdate(update);
</script>

<template>
  <button
    class="main-btn milestone-btn"
    :class="{ 'bought': isReached }"
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