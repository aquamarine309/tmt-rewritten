<script setup>
const { layer } = defineProps(["layer"]);
import { format, formatX, pluralize } from "@/utils/format";
import { toRef } from "vue";

const words = toRef(layer.customResources, "words");
function spellWord() {
  layer.functions.spellWord();
}
</script>

<template>
  <div>
    <div class="info">
      You have spelt <span class="res-accent">{{ format(words.value, 0) }}</span> {{ pluralize("word", words.value) }},
      which provides global point gain by <span class="res-accent">{{ formatX(layer.effects.words.effectValue) }}</span>.
    </div>
    <div class="upgrade-row">
      <button
        class="main-btn main-btn--big"
        @click="spellWord"
      >
        Click to spell a word.
      </button>
    </div>
  </div>
</template>

<style scoped>
.main-btn {
  background-color: var(--color-layer);
}
</style>