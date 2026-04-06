<script setup>
import { ref, computed } from "vue";

const { info } = defineProps({
  info: {
    type: Object,
    required: true
  },
  color: {
    type: String,
    required: false
  }
});
</script>

<template>
  <div
    v-if="info.isUnlocked"
    class="info-box"
    :style=" { '--color-box': color || 'var(--color-layer)' }"
  >
    <button
      class="info-expand-btn"
      :class="info.isExpanded ? 'info-expand-btn--expanded' : ''"
      @click="info.isExpanded = !info.isExpanded"
    >
      <i
        class="fas"
        :class="info.isExpanded ? 'fa-minus-square' : 'fa-plus-square'"
      /> {{ info.title }}
    </button>
    <div
      v-if="info.isExpanded"
      class="info-content"
      v-html="info.text"
    />
    <div v-else class="hidden-box" />
  </div>
</template>

<style scoped>
.info-box {
  --color-box: var(--color-layer);
  width: 100%;
  padding: 3rem 10%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.info-expand-btn {
  width: fit-content;
  padding: 0.3rem 0.4rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  border: 0.3rem solid var(--color-box);
  font-size: 1.6rem;
  text-align: left;
  color: var(--color-box);
  background: var(--color-box);
  color: black;
}

.info-expand-btn--expanded {
}

.info-content {
  border: 0.3rem solid var(--color-box);
  background: var(--color-base);
  border-top-right-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  padding: 0.8rem;
  color: var(--color-accent);
  font-size: 1.3rem;
}

.hidden-box {
  height: 0.3rem;
  background: var(--color-box);
}
</style>