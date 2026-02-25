<script setup>
import UpgradeButton from "./UpgradeButton";
import { computed } from "vue";

const props = defineProps({
  layer: {
    type: Object,
    required: true
  },
  visibleRows: {
    type: Array,
    required: false
  }
});

const upgrades = computed(() => props.layer.upgrades);

const visibleUpgrades = computed(() => {
  const u = upgrades.value.all;
  if (props.visibleRows) {
    return u.filter(x => props.visibleRows.includes(Math.floor(x.id / 10)));
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
      <UpgradeButton
        v-for="j in maxColumn"
        :key="i * 10 + j + ' -upgrade'"
        :upgrade="getUpgrade(i, j)"
      />
    </div>
  </div>
</template>