<script setup>
import { useGameUpdate } from "@/utils/use-game-update";
import Decimal from "break_eternity.js";
import { format, quantify } from "@/utils/format";
import { ref, computed } from "vue";
import EffectDisplay from "./EffectDisplay";

const props = defineProps({
  upgrade: {
    type: Object,
    required: false
  }
});

const upgrade = props.upgrade;
const layer = computed(() => upgrade.layer);
const isUnlocked = ref(false);
const isBought = ref(false);
const canBeBought = ref(false);
const cost = computed(() => upgrade.cost);
const title = computed(() => upgrade.title);
const description = computed(() => funOrVal(upgrade.config.description));
const costResource = computed(() => {
  if (upgrade.config.getCurrency) {
    return upgrade.config.currencyName;
  }
  return layer.value.config.prestige.resource;
});

const classObject = computed(() => ({
  "main-btn": true,
  "upgrade-btn": true,
  "upgrade-btn--available": canBeBought.value,
  "bought": isBought.value
}));

function formatCost(cost) {
  return (upgrade.config.formatCost ?? format)(cost);
}

function purchase() {
  upgrade.purchase();
}

function update() {
  isUnlocked.value = upgrade.isUnlocked;
  isBought.value = upgrade.isBought;
  canBeBought.value = upgrade.canBeBought;
}
useGameUpdate(update);
</script>

<template>
  <button
    v-if="upgrade && isUnlocked"
    :class="classObject"
    @click="purchase"
  >
    <span class="upgrade-title">{{ title }}</span>
    <span class="upgrade-description">{{ description }}</span>
    <EffectDisplay :config="upgrade.config" />
    <br>
    <span>Cost: {{ quantify(costResource, cost, null, formatCost) }}</span>
  </button>
</template>

<style scoped>
.upgrade-btn {
  width: 12rem;
  height: 12rem;
  color: black;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: default;
}

.upgrade-title {
  font-size: 1.3rem;
  font-weight: bold;
}

.upgrade-btn--available {
  background: var(--color-layer);
  cursor: pointer;
}
</style>