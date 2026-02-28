<script setup>
import { state } from "@/core/ui.init";
import * as components from "./tabs";
import { computed } from "vue";
import { Layer } from "@/core/layer";
import TabButton from "@/components/TabButton";

const layer = computed(() => Layer[state.layer]);
const currentTab = computed(() => layer.value.tabs[state.tab]);
const color = computed(() => layer.value.config.color);
const styleObject = computed(() => ({
  "--color-layer": color.value
}));
const tabUnlocked = computed(() => layer.value.tabs.filter(x => x.isUnlocked));
</script>

<template>
  <div class="game-tab">
    <div
      class="tab-container"
      v-if="!state.forcedTab && tabUnlocked.length > 1"
    >
      <TabButton
        :style="styleObject"
        v-for="tab in tabUnlocked"
        :key="tab.id"
        :tab
      />
    </div>
    <component
      v-if="state.forcedTab"
      :is="components[state.forcedTab]"
    />
    <component
      v-else-if="currentTab"
      :is="components[currentTab.component]"
      :style="styleObject"
      :layer="layer"
    />
  </div>
</template>

<style scoped>
.game-tab {
  --color-layer: var(--color-accent);
  width: 100%;
  height: 100%;
  position: relative;
  padding-top: 7.5rem;
}

.tab-container {
  position: absolute;
  top: 0;
  left: 0;
  padding: 4rem 5rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
</style>