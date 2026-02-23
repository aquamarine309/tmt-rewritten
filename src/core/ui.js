import { createApp } from "vue";
import GameUIComponent from "@/components/GameUIComponent";
import { EventHub, GAME_EVENT } from "@/core/event-hub";
console.log(createApp);
import { getPlayer } from "./runtime";
import { DEV } from "@/env";

const ReactivityComplainer = {
  complain() {
    this.checkReactivity(getPlayer(), "player");
  },
  checkReactivity(obj, path) {
    if (obj === undefined || obj === null) {
      return;
    }
    if (obj.__ob__ !== undefined) {
      throw new Error(`Boi you fukked up - ${path} became REACTIVE (oh shite)`);
    }
    for (const key in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
      const prop = obj[key];
      if (typeof prop === "object") {
        this.checkReactivity(prop, `${path}.${key}`);
      }
    }
  }
};

export const GameUI = {
  events: [],
  flushPromise: undefined,
  initialized: false,
  dispatch(event, args) {
    const index = this.events.indexOf(event);
    if (index !== -1) {
      this.events.splice(index, 1);
    }
    if (event !== GAME_EVENT.UPDATE) {
      this.events.push([event, args]);
    }
    if (this.flushPromise) return;
    this.flushPromise = Promise.resolve()
      .then(this.flushEvents.bind(this));
  },
  flushEvents() {
    this.flushPromise = undefined;
    for (const event of this.events) {
      EventHub.ui.dispatch(event[0], event[1]);
    }
    EventHub.ui.dispatch(GAME_EVENT.UPDATE);
    if (DEV) {
      ReactivityComplainer.complain();
    }
    this.events = [];
  },
  update() {
    this.dispatch(GAME_EVENT.UPDATE);
  }
};

export const ui = createApp(GameUIComponent);

ui.mount("#ui");
