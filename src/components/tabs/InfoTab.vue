<script setup>
import { ModInfo } from "@/mod-info";
import { usePlayerStore } from "@/core/stores/player";
import { formatTime } from "@/utils/format";
import { computed, ref } from "vue";
import { useGameUpdate } from "@/utils/use-game-update";

const store = usePlayerStore();
const now = ref(Date.now());
const timeDiff = computed(() => (now.value - store.player.records.gameCreated) / 1000);
const name = ModInfo.name;
const author = ModInfo.author;

function update() {
  now.value = Date.now();
}
useGameUpdate(update);
</script>

<template>
  <div class="info-tab">
    <h1>{{ name }}</h1>
    <h3>Made by {{ author }}</h3>
    <h3>The Modding Tree Rewritten by aquamarine309</h3>
    <br>
    <div>You have played for {{ formatTime(timeDiff) }}.</div>
    <br>
    <h2>THANKS FOR PLAYING!</h2>
  </div>
</template>

<style scoped>
.info-tab {
  color: var(--color-accent);
  font-size: 1.3rem;
}
</style>