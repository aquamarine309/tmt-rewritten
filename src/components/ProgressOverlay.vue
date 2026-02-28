<script setup>
import { computed } from "vue";
import { formatInt } from "@/utils/format";
import { state } from "@/core/ui.init";

const progressBar = computed(() => state.modal.progressBar);
</script>

<template>
  <div
    class="overlay"
    v-if="progressBar"
  >
    <h1>{{ progressBar.label }}</h1>
    <h2>Progress: {{ formatInt(progressBar.current) }}/{{ formatInt(progressBar.max) }}</h2>
    <br>
    <div class="upgrade-row">
      <button
        class="main-btn"
        v-for="(button, index) in progressBar.buttons"
        :key="index"
        @click="() => button.click()"
        :disabled="!button.condition(progressBar.current, progressBar.max)"
      >
        {{ button.text }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 8;
  color: var(--color-accent);
}

.main-btn:not(:disabled) {
  background-color: var(--color-accent);
}
</style>