<script setup>
import { format, pluralize, quantifyInt } from "@framework/utils/format";
import { computed } from "vue";
import { Resources } from "@game/resources";
import { GameLoop } from "@framework/core/game-loop";

const resource = computed(() => Resources.default);
</script>

<template>
  <div class="info">
    <div>You have <span class="res-accent">{{ format(resource.value) }}</span> {{ pluralize(resource.name, resource.value) }}.</div>
    <div>(+{{ format(resource.production) }}/sec)</div>
    <div class="small-text">Current FPS: {{ quantifyInt("frame", GameLoop.fps) }}/sec</div>
  </div>
</template>

<style scope>
.small-text {
  font-size: 1rem;
}
</style>