<script setup>
import { MainDisplay, ResetButton } from "@/components/built-in";
import { computed } from "vue";
import { Layer } from "@/core/layer";

const layer = computed(() => Layer.p);
</script>

<template>
  <div>
    <MainDisplay :layer="layer" />
    <ResetButton :layer="layer" />
  </div>
</template>