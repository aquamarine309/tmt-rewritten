<script setup>
import { MainDisplay, ResetButton } from "@/components/built-in";

defineProps(["layer"]);
</script>

<template>
  <div>
    <MainDisplay :layer />
    <ResetButton :layer />
  </div>
</template>