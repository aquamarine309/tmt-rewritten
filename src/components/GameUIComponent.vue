<script setup>
import TreeLayout from "./tree/TreeLayout";
import HeaderInfo from "./HeaderInfo";
import GameTab from "./GameTab";
import { state } from "@/core/ui.init";
import { computed } from "vue";

const tabVisible = computed(() => state.layer !== "");
const singlePage = false;

</script>

<template>
  <div
    v-if="state.initialized"
    class="game-ui"
  >
    <div
      class="game-panel"
      v-if="!singlePage || !tabVisible"
    >
      <HeaderInfo />
      <TreeLayout />
    </div>
    <div
      v-if="tabVisible"
      class="game-panel"
    >
      <GameTab />
      <div
        class="back-btn"
        @click="state.layer = ''"
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

.back-btn {
  color: var(--color-accent);
  font-size: 3rem;
  position: absolute;
  left: 2rem;
  top: 1rem;
  font-weight: bold;
}
</style>