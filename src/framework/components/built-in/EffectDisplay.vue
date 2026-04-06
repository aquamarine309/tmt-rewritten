<script setup>
import { computed } from "vue";
import { funOrVal } from "@framework/utils/extensions";

const props = defineProps({
  config: {
    type: Object,
    required: true
  }
});

const config = props.config;
const formatEffect = computed(() => config.formatEffect || null);
const effect = computed(() => funOrVal(config.effect));
</script>

<template>
  <span v-if="formatEffect">
    {{ $t("currently", { value: formatEffect(effect) }) }}
  </span>
</template>