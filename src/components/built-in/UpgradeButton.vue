<script setup>
import { format, quantify } from "@/utils/format";
import { computed } from "vue";
import EffectDisplay from "./EffectDisplay";

const { upgrade } = defineProps({
  upgrade: {
    type: Object,
    required: true
  }
});

const layer = computed(() => upgrade.layer);
const cost = computed(() => upgrade.cost);
const title = computed(() => upgrade.title);
const tooltip = computed(() => upgrade.config.tooltip || "");
const description = computed(() => funOrVal(upgrade.config.description));
const costResource = computed(() => {
  if (upgrade.config.getCurrency) {
    return upgrade.config.currencyName;
  }
  return layer.value.resName;
});

const classObject = computed(() => ({
  "main-btn": true,
  "upgrade-btn": true,
  "upgrade-btn--available": upgrade.canBeBought,
  "bought": upgrade.isBought
}));

function formatCost(cost) {
  return (upgrade.config.formatCost ?? format)(cost);
}

function purchase() {
  upgrade.purchase();
}

</script>

<template>
  <button
    v-if="upgrade.isUnlocked"
    :class="classObject"
    @click="purchase"
    v-tooltip="tooltip"
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