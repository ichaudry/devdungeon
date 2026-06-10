import Phaser from "phaser";

import { gameConfig } from "./config";

let game: Phaser.Game | null = null;

export function initializeGame() {
  if (game) {
    return game;
  }

  game = new Phaser.Game(gameConfig);

  return game;
}

export function destroyGame() {
  if (!game) {
    return;
  }

  game.destroy(true);

  game = null;
}