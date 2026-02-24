import { defineStore } from "pinia";
import { ref } from "vue";
import { getDefaultPlayer } from "@/core/player";
import "../ui";

export const usePlayerStore = defineStore("player", () => {
  const player = ref(getDefaultPlayer());
  
  function updatePlayer(newData) {
    player.value = newData;
  }
  
  function resetPlayer() {
    player.value = getDefaultPlayer();
  }
  
  function getLayer(id) {
    return player.value.layers[id];
  }
  
  return {
    player,
    updatePlayer,
    resetPlayer,
    getLayer
  };
});