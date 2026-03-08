import { mapGameDataToObject } from "@framework/utils/map-game-data";
import { EventHub, GAME_EVENT } from "./event-hub";
import { PrestigeState } from "./prestige";
import { InfoState } from "./info";
import { TabState } from "./tabs";
import { UpgradeState, MilestoneState } from "./game-mechanics";
import { state } from "./ui.init";
import { DC } from "@framework/utils/constants";
import { Lazy } from "./cache";
import Decimal from "break_eternity.js";
import { Resources } from "@framework/resources";
import { usePlayerStore } from "@framework/core/stores/player";
import { reactive } from "vue";
import { GameMechanicState } from "./game-mechanics";

class LayerState extends GameMechanicState {
  functions = {};
  customResources = {};
  tabs = null;

  constructor(config) {
    super(config);
    EventHub.logic.on(config.checkEvent, args => this.tryUnlock(...args));
    this.bindData();
  }
  
  bindData() {
    if (this.config.customFunctions) {
      const custom = this.config.customFunctions;
      for (const key in custom) {
        this.functions[key] = custom[key].bind(this);
      }
    }
    
    if (this.config.customResources) {
      const custom = this.config.customResources;
      for (const key in custom) {
        this.customResources[key] = custom[key]();
      }
    }
    
    this.bindTabs();
    this.bindPrestige();
    this.bindUpgrades();
    this.bindMilestones();
    this.bindInfo();
    this.bindCustomMechanics();
  }
  
  bindPrestige() {
    this.prestige = null;
    if (this.config.prestige) {
      this.prestige = new PrestigeState(this.config.prestige, this);
    }
  }
  
  bindUpgrades() {
    this.upgrades = null;
    this.cheapestUpgrade = null;
    if (this.config.upgrades) {
      this.upgrades = mapGameDataToObject(
        this.config.upgrades,
        upg => new UpgradeState(upg, this)
      );
      this.cheapestUpgrade = new Lazy(() => {
        const upgradesLeft = this.upgrades.all.filter(x => x.isAvailableForPurchase);
        if (upgradesLeft.length === 0) return null;
        return upgradesLeft.reduce((a, b) => a.cost.gt(b.cost) ? b : a);
      });
      this.cheapestUpgrade.invalidateOn(GAME_EVENT.UPGRADE_BOUGHT);
    }
  }
  
  bindTabs() {
    const tabs = this.config.tabs;
    this.tabs = tabs.map((tab, index) => (new TabState({
        id: index,
        ...tab
      })
    ));
  }
  
  bindMilestones() {
    this.milestones = null;
    if (this.config.milestones) {
      this.milestones = mapGameDataToObject(
        this.config.milestones,
        milestone => new MilestoneState(milestone, this)
      );
    }
  }
  
  bindInfo() {
    this.info = null;
    if (this.config.info) {
      this.info = mapGameDataToObject(
        this.config.info,
        info => new InfoState(info)
      );
    }
  }
  
  bindCustomMechanics() {
    const mechanics = this.config.customMechanics;
    if (!mechanics) return;
    for (const mechanic of mechanics) {
      this[mechanic.id] = null;
      const CustomState = mechanic.state;
      if (Array.isArray(mechanic.data)) {
        this[mechanic.id] = mapGameDataToObject(
          mechanic.data,
          config => new CustomState(config, this)
        );
      } else {
        this[mechanic.id] = new CustomState(mechanic.data, this);
      }
    }
  }
  
  get isOpen() {
    return state.layer === this.id;
  }
  
  show() {
     state.layer = this.id;
     this.tabs[0].show();
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
    const custom = this.customResources;
    for (const key in custom) {
      playerData[key] = custom[key].startingValue;
    }
    if (this.upgrade !== null) {
      playerData.upgrades = new Set();
    }
    return playerData;
  }
  
  get data() {
    return usePlayerStore().getLayer(this.id);
  }
  
  get resource() {
    return this.config.resource();
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
  
  get isEffectActive() {
    return this.isUnlocked;
  }
}

export let Layer = null;
export let LayerLayout = null;
export let LayerConnections = null;

export function registerLayer(data) {
  Layer = mapGameDataToObject(
    data.layers,
    config => reactive(new LayerState(config))
  );
  LayerLayout = data.layout;
  LayerConnections = data.connections;
}

export const Layers = {
  getData() {
    const data = {};
    for (const layer of Layer.all) {
      data[layer.id] = layer.createPlayerData();
    }
    return data;
  }
};