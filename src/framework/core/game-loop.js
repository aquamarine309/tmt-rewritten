import { DEV } from "@framework/env";
import { usePlayerStore } from "./stores/player";
import { EventHub, GAME_EVENT, GameUI } from "./event-hub";
import { Resources } from "@framework/resources";
import { reactive } from "vue";

export const GameLoop = reactive({
  interval: null,

  devSpeed: 1,

  fps: 0,
  frameCount: 0,
  lastFpsUpdate: 0,

  get updateRate() {
    return usePlayerStore().player.options.updateRate;
  },

  set updateRate(value) {
    usePlayerStore().player.options.updateRate = value;
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

  tick(ms) {
    const player = usePlayerStore().player;
    let diff = ms ?? Date.now() - player.lastUpdate;
    player.lastUpdate += diff;

    const realDiff = diff;
    if (DEV) {
      diff *= this.devSpeed;
    }

    const seconds = diff / 1000;
    
    Resources.getDefault().tick(seconds);

    GameUI.update();
    EventHub.dispatch(GAME_EVENT.GAME_TICK_AFTER);

    this.updateFPS();
  },

  updateFPS() {
    const now = Date.now();
    this.frameCount++;

    if (now - this.lastFpsUpdate >= 1000) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.lastFpsUpdate = now;
    }
  }
});