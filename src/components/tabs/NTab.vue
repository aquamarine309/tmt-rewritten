<script setup>
import {
  MainDisplay,
  ResetButton,
  MilestoneContainer
} from "@/components/built-in";

defineProps(["layer"]);
</script>

<template>
  <div>
    <MainDisplay :layer />
    <ResetButton :layer />
    <MilestoneContainer :layer />
  </div>
</template>