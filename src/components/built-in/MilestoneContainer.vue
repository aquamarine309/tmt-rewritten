<script setup>
import MilestoneButton from "./MilestoneButton";
import { computed } from "vue";

const props = defineProps({
  layer: {
    type: Object,
    required: true
  }
});

const layer = props.layer;
const milestones = computed(() => layer.milestones.all);
</script>

<template>
  <div class="milestone-container">
    <MilestoneButton
      v-for="milestone in milestones"
      :key="milestone.id"
      :milestone
    />
  </div>
</template>

<style scoped>
.milestone-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>