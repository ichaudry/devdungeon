import Phaser from "phaser";

import { SceneKeys } from "../SceneKeys";

export class MenuScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.MENU);
  }

  create() {
    const { width, height } = this.scale;

    this.add
      .text(
        width / 2,
        height / 2 - 120,
        "⚔️ DevDungeon",
        {
          fontSize: "56px",
          color: "#f8fafc"
        }
      )
      .setOrigin(0.5);

    this.add
      .text(
        width / 2,
        height / 2 - 40,
        "Programming concepts become weapons",
        {
          fontSize: "24px",
          color: "#94a3b8"
        }
      )
      .setOrigin(0.5);

    const startButton = this.add
      .text(
        width / 2,
        height / 2 + 80,
        "[ Start Adventure ]",
        {
          fontSize: "32px",
          color: "#38bdf8"
        }
      )
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    startButton.on("pointerdown", () => {
      this.scene.start(SceneKeys.DUNGEON);
    });
  }
}