<script setup>
import TreeLayout from "./tree/TreeLayout";
import HeaderInfo from "./HeaderInfo";
import GameTab from "./GameTab";
import { state } from "@framework/core/ui.init";
import { computed } from "vue";
import { getModInfo } from "@framework/mod-info";
import { usePlayerStore } from "@framework/core/stores/player";
import ForcedTabSidebar from "./ForcedTabSidebar";
import ProgressOverlay from "./ProgressOverlay";

const tabVisible = computed(() => state.layer !== "" || state.forcedTab !== "");
const version = computed(() => getModInfo().versionDisplay);
const store = computed(() => usePlayerStore());

function clearTab() {
  state.layer = "";
  state.forcedTab = "";
}
</script>

<template>
  <div
    v-if="state.initialized"
    class="game-ui"
  >
    <ProgressOverlay />
    <div
      class="game-panel"
      v-if="!store.player.options.singlePage || !tabVisible"
    >
      <HeaderInfo />
      <TreeLayout />
      <ForcedTabSidebar />
      <div class="version">v{{ version }}</div>
    </div>
    <div
      v-if="tabVisible"
      class="game-panel tab-panel"
    >
      <GameTab />
      <div
        class="back-btn"
        @click="clearTab()"
      >
        ←
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-panel {
  flex: 1;
  padding: 3rem 1rem;
  position: relative;
}

.game-panel:not(:first-child) {
  border-left: 2px solid #808080;
}

.tab-panel {
  padding-top: 0;
}

.back-btn {
  color: var(--color-accent);
  font-size: 3rem;
  position: absolute;
  left: 2rem;
  top: 1rem;
  font-weight: bold;
}

.version {
  color: var(--color-accent);
  font-size: 2rem;
  position: absolute;
  right: 3rem;
  top: 2rem;
  font-weight: bold;
}
</style>