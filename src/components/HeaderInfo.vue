<script setup>
import { format } from "@/utils/format";
import { usePlayerStore } from "@/core/stores/player";
import { ModInfo } from "@/mod-info";

const resourceName = ModInfo.resourceName;
const store = usePlayerStore();
</script>

<template>
  <div class="info">
    <div>You have <span class="res-accent">{{ format(store.player.resource) }}</span> {{ resourceName }}.</div>
  </div>
</template>

<style scope>
</style>