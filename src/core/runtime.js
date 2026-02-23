window.currentPlayer = null;

export function setPlayer(player) {
  currentPlayer = player;
}

export function getPlayer() {
  if (!currentPlayer) {
    throw new Error("Player not initialized yet");
  }
  return currentPlayer;
}
