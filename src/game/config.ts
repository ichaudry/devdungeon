import Phaser from "phaser";

import { BootScene } from "./scenes/BootScene";

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,

  width: 1280,
  height: 720,

  parent: "game-container",

  backgroundColor: "#0f172a",

  scene: [BootScene],

  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  },

  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};