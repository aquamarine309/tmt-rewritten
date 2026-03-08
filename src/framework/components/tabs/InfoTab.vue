<script setup>
import { getModInfo } from "@framework/mod-info";
import { usePlayerStore } from "@framework/core/stores/player";
import { formatTime } from "@framework/utils/format";
import { computed, ref } from "vue";
import { useGameUpdate } from "@framework/utils/use-game-update";

const store = usePlayerStore();
const now = ref(Date.now());
const timeDiff = computed(() => (now.value - store.player.records.gameCreated) / 1000);
const name = computed(() => getModInfo().name);
const author = computed(() => getModInfo().author);

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