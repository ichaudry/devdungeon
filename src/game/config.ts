import Phaser from "phaser";

import { BootScene } from "./scenes/BootScene";
import { MenuScene } from "./scenes/MenuScene";
import { DungeonScene } from "./scenes/DungeonScene";

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,

  width: 1280,
  height: 720,

  parent: "game-container",

  backgroundColor: "#020617",

  scene: [
    BootScene,
    MenuScene,
    DungeonScene
  ],

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