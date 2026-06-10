import Phaser from "phaser";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  create() {
    const { width, height } = this.scale;

    this.add
      .text(width / 2, height / 2 - 50, "⚔️ DevDungeon", {
        fontSize: "48px",
        color: "#f8fafc"
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height / 2 + 20, "Boot Scene", {
        fontSize: "24px",
        color: "#94a3b8"
      })
      .setOrigin(0.5);

    this.add
      .text(
        width / 2,
        height / 2 + 80,
        "Phaser initialized successfully",
        {
          fontSize: "18px",
          color: "#64748b"
        }
      )
      .setOrigin(0.5);
  }
}