<script setup>
import { format } from "@/utils/format";
import Decimal from "break_eternity.js";
import { getPlayer } from "@/core/runtime";
import { useGameUpdate } from "@/utils/use-game-update";
import { ModInfo } from "@/mod-info";
import { ref } from "vue";

const resource = ref(new Decimal(0));
function update() {
  resource.value.copyFrom(getPlayer().resource);
}
useGameUpdate(update);
const resourceName = ModInfo.resourceName;
</script>

<template>
  <div class="info">
    <div>You have <span class="res-accent">{{ format(resource) }}</span> {{ resourceName }}.</div>
  </div>
</template>

<style scope>
</style>