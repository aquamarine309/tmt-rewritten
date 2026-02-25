<script setup>
import { format, pluralize } from "@/utils/format";
import { usePlayerStore } from "@/core/stores/player";
import { ModInfo } from "@/mod-info";
import { resourceProduction } from "@/production";
import { ref } from "vue";
import { useGameUpdate } from "@/utils/use-game-update";
import Decimal from "break_eternity.js";

const resourceName = ModInfo.resourceName;
const store = usePlayerStore();
const production = ref(new Decimal(0));

function update() {
  production.value.copyFrom(resourceProduction());
}
useGameUpdate(update);
</script>

<template>
  <div class="info">
    <div>You have <span class="res-accent">{{ format(store.player.resource) }}</span> {{ pluralize(resourceName, store.player.resource) }}.</div>
    <div>(+{{ format(production) }}/sec)</div>
  </div>
</template>

<style scope>
</style>