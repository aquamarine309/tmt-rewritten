<script setup>
import {
  MainDisplay,
  ResetButton,
  UpgradeGrid
} from "@/components/built-in";

defineProps(["layer"]);
</script>

<template>
  <div>
    <MainDisplay :layer />
    <ResetButton :layer />
    <UpgradeGrid :layer />
  </div>
</template>