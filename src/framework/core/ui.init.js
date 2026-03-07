import { reactive } from "vue";

export const state = reactive({
  modal: {
    queue: [],
    current: undefined,
    progressBar: undefined,
  },
  layer: "",
  tab: 0,
  forcedTab: "",
  initialized: false
});
