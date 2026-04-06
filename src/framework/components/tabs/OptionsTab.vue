<script setup>
import { usePlayerStore } from "@framework/core/stores/player";
import { useGameStorageStore } from "@framework/core/stores/storage";
import i18n from "@framework/core/messages";

const store = usePlayerStore();
const storage = useGameStorageStore();

function hardReset() {
  const value = i18n.global.t("hardReset");
  if (prompt(i18n.global.t("hardResetMessage", { value })) === value) {
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
        {{ $t("hardReset") }}
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