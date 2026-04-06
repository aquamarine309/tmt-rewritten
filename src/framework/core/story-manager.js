import { ref } from 'vue'
import { EventHub, GAME_EVENT } from '@framework/core/event-hub'
import { funOrVal } from "@framework/utils/extensions";
import { mapGameDataToObject } from "@framework/utils/map-game-data";

class StoryTrigger {
  constructor(config) {
    this.config = config;
  }
  
  get id() {
    return this.config.id;
  }
  
  get priority() {
    return this.config.priority;
  }
  
  get content() {
    return funOrVal(this.config.content);
  }
  
  get checkCondition() {
    return !this.config.condition || this.config.condition();
  }
  
  queue() {
    StoryManager.queueTrigger(this);
  }
}

export const StoryManager = {
  triggers: null,
  queue: ref([]),
  isShowing: false,
  currentTrigger: null,
  
  registerTriggers(triggers) {
    if (this.triggers !== null) return;
    this.triggers = mapGameDataToObject(triggers, config => new StoryTrigger(config));
  },
  
  get triggered() {
    return player.storyTriggers;
  },
  
  queueTrigger(trigger) {
    let index = this.queue.value.findIndex(t => t.priority < trigger.priority);
    if (index === -1) index = this.queue.value.length;
    this.queue.value.splice(index, 0, trigger);
    if (!this.isShowing) {
      this.showNext();
    }
  },

  async showNext() {
    if (this.queue.value.length === 0) {
      this.isShowing = false;
      return;
    }
    this.isShowing = true;
    const trigger = this.queue.value.shift();
    this.currentTrigger = trigger;
    EventHub.ui.dispatch(GAME_EVENT.SHOW_FULLSCREEN_STORY, {
      trigger,
      onClose: () => {
        if (trigger.onHide) trigger.onHide();
        this.currentTrigger = null;
        this.showNext();
      }
    })
    if (trigger.onShow) trigger.onShow();
  },

  clearTriggered() {
    this.triggered.clear();
  }
}