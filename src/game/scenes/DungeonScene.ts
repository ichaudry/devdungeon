import Phaser from "phaser";

export class DungeonScene extends Phaser.Scene {
  constructor() {
    super("DungeonScene");
  }

  create() {
    const { width, height } = this.scale;

    this.cameras.main.setBackgroundColor("#111827");

    this.add
      .text(
        width / 2,
        height / 2 - 40,
        "Dungeon Prototype",
        {
          fontSize: "42px",
          color: "#f8fafc"
        }
      )
      .setOrigin(0.5);

    this.add
      .text(
        width / 2,
        height / 2 + 20,
        "Player movement arrives next commit",
        {
          fontSize: "20px",
          color: "#94a3b8"
        }
      )
      .setOrigin(0.5);
  }
}