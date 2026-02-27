<script setup>
import UpgradeButton from "./UpgradeButton";
import { computed } from "vue";

const { layer, visibleRows } = defineProps({
  layer: {
    type: Object,
    required: true
  },
  visibleRows: {
    type: Array,
    required: false
  }
});

const upgrades = computed(() => layer.upgrades);

const visibleUpgrades = computed(() => {
  const u = upgrades.value.all;
  if (visibleRows) {
    return u.filter(x => visibleRows.includes(Math.floor(x.id / 10)));
  }
  return u;
});


const maxRow = computed(() => visibleUpgrades.value.map(x => Math.floor(x.id / 10)).max());
const maxColumn = computed(() => visibleUpgrades.value.map(x => x.id % 10).max());

function getUpgrade(x, y) {
  return upgrades.value[10 * x + y];
}
</script>

<template>
  <div class="upgrade-grid">
    <div
      class="upgrade-row"
      v-for="i in maxRow"
      :key="i + '-row'"
    >
      <template v-for="j in maxColumn">
        <UpgradeButton
          v-if="getUpgrade(i, j)"
          :key="i * 10 + j + '-upgrade'"
          :upgrade="getUpgrade(i, j)"
        />
      </template>
    </div>
  </div>
</template>