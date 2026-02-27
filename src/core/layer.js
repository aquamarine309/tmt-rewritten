import { mapGameDataToObject } from "@/utils/map-game-data";
import { LayerData } from "./layers";
import { EventHub, GAME_EVENT } from "./event-hub";
import { PrestigeState } from "./prestige";
import { InfoState } from "./info";
import { TabState } from "./tabs";
import { UpgradeState, MilestoneState } from "./game-mechanics";
import { state } from "./ui.init";
import { DC } from "@/utils/constants";
import { Lazy } from "./cache";
import Decimal from "break_eternity.js";
import { Resources } from "@/resources";
import { usePlayerStore } from "@/core/stores/player";

export { LayerConnections, LayerLayout } from "./layers";

class LayerState {
  prestige = null;
  tabs = null;
  upgrades = null;
  milestones = null;
  info = null;
  
  cheapestUpgrade = null;

  constructor(config) {
    this.config = config;
    EventHub.logic.on(config.checkEvent, args => this.tryUnlock(...args));
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
    
    if (config.upgrades) {
      this.upgrades = mapGameDataToObject(
        config.upgrades,
        upg => new UpgradeState(upg, this)
      );
      this.cheapestUpgrade = new Lazy(() => {
        const upgradesLeft = this.upgrades.all.filter(x => x.isAvailableForPurchase);
        if (upgradesLeft.length === 0) return null;
        return upgradesLeft.reduce((a, b) => a.cost.gt(b.cost) ? b : a);
      });
      this.cheapestUpgrade.invalidateOn(GAME_EVENT.UPGRADE_BOUGHT);
    }
    
    if (config.milestones) {
      this.milestones = mapGameDataToObject(
        config.milestones,
        milestone => new MilestoneState(milestone, this)
      );
    }
    
    if (config.info) {
      this.info = mapGameDataToObject(
        config.info,
        info => new InfoState(info)
      );
    }
  }
  
  get isOpen() {
    return state.layer === this.id;
  }
  
  show() {
     state.layer = this.id;
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
    playerData.resource = this.config.startingResource || DC.D0;
    if (this.upgrade !== null) {
      playerData.upgrades = new Set();
    }
    return playerData;
  }
  
  get data() {
    return usePlayerStore().getLayer(this.id);
  }
  
  get resource() {
    return this.config.resource;
  }
  
  tryUnlock(...args) {
    if (this.isUnlocked || !this.config.requirement(...args)) return;
    this.isUnlocked = true;
    EventHub.dispatch(GAME_EVENT.LAYER_UNLOCKED);
  }
  
  resetUpgrades() {
    if (this.upgrades === null) return;
    for (const upgrade of this.upgrades.all) {
      upgrade.isBought = false;
    }
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