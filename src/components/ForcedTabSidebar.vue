<script setup>
import { state } from "@/core/ui.init";
</script>

<template>
  <div class="forced-tab-sidebar">
    <button
      class="main-btn forced-tab-btn"
      @click="state.forcedTab = 'OptionsTab'"
    >
      <i class="fas fa-cog" />
    </button>
  </div>
</template>

<style scoped>
.forced-tab-sidebar {
  position: absolute;
  left: 0;
  top: 0;
  width: 6rem;
}

.forced-tab-btn {
  background: none;
  border: none;
  width: 6rem;
  height: 6rem;
  color: var(--color-accent);
  font-size: 3rem;
}
</style>