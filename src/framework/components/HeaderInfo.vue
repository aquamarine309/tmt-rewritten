<script setup>
import { format, pluralize, formatInt } from "@framework/utils/format";
import { computed } from "vue";
import { Resources } from "@framework/resources";
import { GameLoop } from "@framework/core/game-loop";

const resource = computed(() => Resources.getDefault());
</script>

<template>
  <div class="info">
    <i18n-t
      keypath="youHaveX"
      tag="div"
    >
      <template #amount>
        <span class="res-accent">{{ format(resource.value) }}</span>
      </template>
      <template #name>
        <span>{{ pluralize(resource.name, resource.value) }}</span>
      </template>
    </i18n-t>
    <div>(+{{ format(resource.production) }}/{{ $t("secondShort") }})</div>
    <div class="small-text">{{ $t("fps", { frames: formatInt(GameLoop.fps) }, GameLoop.fps) }}</div>
  </div>
</template>

<style scope>
.small-text {
  font-size: 1rem;
}
</style>