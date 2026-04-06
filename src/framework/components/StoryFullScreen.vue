<script setup>
import { EventHub, GAME_EVENT } from '@framework/core/event-hub'
import { ref, onMounted, onUnmounted } from 'vue';

const visible = ref(false);
const currentText = ref("");
let onCloseCallback = null;

const show = ({ trigger, onClose }) => {
  currentText.value = trigger.content;
  onCloseCallback = onClose;
  visible.value = true;
}

const close = () => {
  visible.value = false;
  if (onCloseCallback) onCloseCallback();
}

onMounted(() => {
  EventHub.ui.on(GAME_EVENT.SHOW_FULLSCREEN_STORY, show);
});

onUnmounted(() => {
  EventHub.ui.off(GAME_EVENT.SHOW_FULLSCREEN_STORY, show);
});
</script>

<template>
  <Transition name="fade">
    <div v-if="visible" class="story-fullscreen" @click.self="close">
      <div class="story-container">
        <p
          class="info story"
          v-html="currentText"
        />
        <p class="click-hint">{{ $t("clickHint") }}</p>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.story-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(0.4rem);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.story-container {
  max-width: 60rem;
  width: 80%;
  max-height: 80vh;
  overflow-y: auto;
  background: transparent;
}
.click-hint {
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  margin-top: 1rem;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.story {
  width: 100;
  border-bottom: 0.2rem solid #808080;
  padding: 2rem;
}
</style>