<script setup>
import { ref, computed } from "vue";

const { info } = defineProps({
  info: {
    type: Object,
    required: true
  }
});

const expanded = ref(true);

</script>

<template>
  <div
    v-if="info.isUnlocked"
    class="info-box"
  >
    <button
      class="info-expand-btn"
      :class="expanded ? 'info-expand-btn--expanded' : ''"
      @click="expanded = !expanded"
    >
      <i
        class="fas"
        :class="expanded ? 'fa-minus-square' : 'fa-plus-square'"
      /> {{ info.title }}
    </button>
    <div
      v-if="expanded"
      class="info-content"
      v-html="info.text"
    />
    <div v-else class="hidden-box" />
  </div>
</template>

<style scoped>
.info-box {
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
  border: 0.3rem solid var(--color-layer);
  font-size: 1.6rem;
  text-align: left;
  color: var(--color-layer);
  background: var(--color-layer);
  color: black;
}

.info-expand-btn--expanded {
}

.info-content {
  border: 0.3rem solid var(--color-layer);
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
  background: var(--color-layer);
}
</style>