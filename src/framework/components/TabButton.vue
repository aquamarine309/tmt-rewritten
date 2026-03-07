<script setup>
const { tab } = defineProps({
  tab: {
    type: Object,
    required: true
  }
});

function show() {
  tab.show();
}
</script>

<template>
  <button
    class="tab-btn"
    @click="show"
  >
    {{ tab.name }}
  </button>
</template>

<style scoped>
.tab-btn {
  border: 0.3rem solid var(--color-layer);
  border-radius: 1rem;
  padding: 0.3rem 1.5rem;
  margin: 0 1rem;
  background: var(--color-base);
  color: var(--color-accent)
}
</style>