<script setup>
import {
  MainDisplay,
  ResetButton,
  UpgradeGrid,
  InfoBox
} from "@/components/built-in";

defineProps(["layer"]);
</script>

<template>
  <div>
    <InfoBox :info="layer.info.first" />
    <MainDisplay :layer />
    <ResetButton :layer />
    <UpgradeGrid :layer />
  </div>
</template>