<script setup>
import { format, quantify } from "@framework/utils/format";
import { computed } from "vue";
import EffectDisplay from "./EffectDisplay";
import { funOrVal } from "@framework/utils/extensions";
import Decimal from "break_eternity.js";

const { upgrade } = defineProps({
  upgrade: {
    type: Object,
    required: true
  }
});

const layer = computed(() => upgrade.layer);
const cost = computed(() => upgrade.cost);
const title = computed(() => upgrade.title);
const amount = computed(() => upgrade.amount);
const cap = computed(() => upgrade.cap);
const hasCap = computed(() => cap.value.lt(Decimal.dInf));
const tooltip = computed(() => upgrade.config.tooltip || "");
const description = computed(() => funOrVal(upgrade.config.description));
const costResource = computed(() => upgrade.resource.name);

const classObject = computed(() => ({
  "main-btn": true,
  "upgrade-btn": true,
  "upgrade-btn--available": upgrade.canBeBought,
  "bought": upgrade.isCapped
}));

function formatCost(cost) {
  return (upgrade.config.formatCost ?? format)(cost);
}

function purchase() {
  upgrade.purchase();
}

const amountText = computed(() => {
  if (hasCap.value) return `${format(amount.value, 0)}/${format(cap.value, 0)}`;
  return format(amount.value, 0);
});

</script>

<template>
  <button
    v-if="upgrade.isUnlocked"
    :class="classObject"
    @click="purchase"
    v-tooltip="tooltip"
  >
    <span class="upgrade-title">{{ title }}</span>
    <span class="upgrade-description">[{{ amountText }}]</span>
    <span class="upgrade-description">{{ description }}</span>
    <EffectDisplay :config="upgrade.config" />
    <br>
    <span>{{ $t("cost", { value: quantify(costResource, cost, null, formatCost) }) }}</span>
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