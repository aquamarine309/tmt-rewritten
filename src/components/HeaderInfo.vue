<script setup>
import { format, pluralize } from "@/utils/format";
import { usePlayerStore } from "@/core/stores/player";
import { computed, ref } from "vue";
import { useGameUpdate } from "@/utils/use-game-update";
import { Resources } from "@/resources";
import Decimal from "break_eternity.js";

const resource = computed(() => Resources.default);
const store = usePlayerStore();
const production = ref(new Decimal(0));

function update() {
  production.value.copyFrom(resource.value.production);
}
useGameUpdate(update);
</script>

<template>
  <div class="info">
    <div>You have <span class="res-accent">{{ format(store.player.resource) }}</span> {{ pluralize(resource.name, store.player.resource) }}.</div>
    <div>(+{{ format(production) }}/sec)</div>
  </div>
</template>

<style scope>
</style>