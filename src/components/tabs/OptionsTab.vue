<script setup>
import { usePlayerStore } from "@/core/stores/player";
import { useGameStorageStore } from "@/core/stores/storage";
const store = usePlayerStore();
const storage = useGameStorageStore();

function hardReset() {
  if (prompt("Please input \"Hard Reset\" to reset this save.") === "Hard Reset") {
    storage.hardReset();
  }
}

function save() {
  return storage.save();
}

function importSave() {
  storage.importSave(prompt("Input Your Save."));
}

function exportSave() {
  storage.exportToClipboard();
}
</script>

<template>
  <div class="upgrade-grid">
    <div class="upgrade-row">
      <button
        class="main-btn options-btn"
        @click="hardReset"
      >
        HARD RESET
      </button>
      <button
        class="main-btn options-btn"
        @click="save"
      >
        Save Game
      </button>
      <button
        class="main-btn options-btn"
        @click="importSave"
      >
        Import Save
      </button>
      <button
        class="main-btn options-btn"
        @click="exportSave"
      >
        Export Save
      </button>
    </div>
    <div class="upgrade-row">
      <button
        class="main-btn options-btn"
        @click="store.player.options.singlePage = !store.player.options.singlePage"
      >
        Single Page: {{ store.player.options.singlePage ? "ON" : "OFF" }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.options-btn {
  width: 12rem;
  height: 12rem;
  background-color: #d0d0d0;
}
</style>