<script setup>
import { format, pluralize } from "@/utils/format";
import { computed } from "vue";
import { Resources } from "@/resources";

const resource = computed(() => Resources.default);
</script>

<template>
  <div class="info">
    <div>You have <span class="res-accent">{{ format(resource.value) }}</span> {{ pluralize(resource.name, resource.value) }}.</div>
    <div>(+{{ format(resource.production) }}/sec)</div>
  </div>
</template>

<style scope>
</style>