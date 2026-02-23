import { DEV } from "@/env";
import { player } from "./player";
import { EventHub, GAME_EVENT } from "./event-hub";
import { GameUI } from "./ui";
import { resourceProduction } from "@/production";

export const GameLoop = {
  interval: null,

  devSpeed: 1,

  get updateRate() {
    return player.options.updateRate;
  },

  set updateRate(value) {
    player.options.updateRate = value;
    this.restart();
  },

  start() {
    if (this.interval !== null) {
      throw new Error("GameLoop has already started.");
    }
    this.interval = setInterval(() => this.tick(), this.updateRate);
  },

  stop() {
    if (this.interval === null) return;
    clearInterval(this.interval);
    this.interval = null;
  },

  restart() {
    this.stop();
    this.start();
  },

  /* eslint-disable no-unused-vars */
  tick(ms) {
    let diff = ms ?? Date.now() - player.lastUpdate;
    player.lastUpdate += diff;

    const realDiff = diff;
    if (DEV) {
      diff *= this.devSpeed;
    }

    const seconds = diff / 1000;
    
    player.resource = player.resource.add(resourceProduction().times(seconds));

    GameUI.update();
    EventHub.dispatch(GAME_EVENT.GAME_TICK_AFTER);
  }
};