import { mapGameDataToObject } from "@/utils/map-game-data";
import { LayerData } from "./layers";
export { LayerConnections, LayerLayout } from "./layers";
import { EventHub, GAME_EVENT } from "./event-hub";
import { PrestigeState } from "./prestige";
import { TabState } from "./tabs";
import { state } from "./ui.init";
import { DC } from "@/utils/constants";
import { getPlayer } from "./runtime";

class LayerState {
  constructor(config) {
    this.config = config;
    EventHub.logic.on(config.checkEvent, (...args) => this.tryUnlock(...args));
    this.prestige = new PrestigeState(config.prestige, this);
    const tabs = config.tabs;
    this.tabs = tabs.map((tab, index) => {
      if (typeof tab === "string") {
        return new TabState({
          is: tab,
          id: index
        });
      }
      return new TabState({
        id: index,
        ...tab
      });
    });
  }
  
  get isOpen() {
    return state.view.layer === this.id;
  }
  
  show() {
     state.view.layer = this.id;
     this.tabs[0].show();
  }

  get id() {
    return this.config.id;
  }

  get name() {
    return this.config.name;
  }

  get isUnlocked() {
    return this.data.isUnlocked;
  }

  set isUnlocked(value) {
    this.data.isUnlocked = value;
  }

  createPlayerData() {
    const playerData = this.config.getPlayerData();
    playerData.isUnlocked = false;
    playerData.resource = this.config.prestige.startingResource || DC.D0;
    return playerData;
  }
  
  get data() {
    return getPlayer().layers[this.id];
  }
  
  get resource() {
    return this.data.resource;
  }
  
  set resource(value) {
    this.data.resource = value;
  }
  
  tryUnlock(...args) {
    if (this.isUnlocked || !this.config.requirement(...args)) return;
    this.isUnlocked = true;
    EventHub.dispatch(GAME_EVENT.LAYER_UNLOCKED);
  }
}

export const Layer = mapGameDataToObject(
  LayerData,
  config => new LayerState(config)
);

export const Layers = {
  getData() {
    const data = {};
    for (const layer of Layer.all) {
      data[layer.id] = layer.createPlayerData();
    }
    return data;
  }
};