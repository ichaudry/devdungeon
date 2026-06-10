import Phaser from "phaser";
import { DungeonData } from "@systems/dungeon/DungeonGenerator";

export class Minimap {
  private readonly scale = 2;

  private readonly offsetX: number;
  private readonly offsetY: number;

  private playerMarker: Phaser.GameObjects.Rectangle;

  constructor(
    scene: Phaser.Scene,
    dungeon: DungeonData
  ) {
    const width =
      dungeon.tiles[0].length *
      this.scale;

    const height =
      dungeon.tiles.length *
      this.scale;

    this.offsetX =
      scene.scale.width -
      width -
      20;

    this.offsetY = 20;

    const panel =
      scene.add.rectangle(
        this.offsetX - 6,
        this.offsetY - 6,
        width + 12,
        height + 12,
        0x020617,
        0.9
      );

    panel.setOrigin(0);
    panel.setScrollFactor(0);
    panel.setDepth(1000);

    const graphics =
      scene.add.graphics();

    graphics.setScrollFactor(0);
    graphics.setDepth(1001);

    for (
      let y = 0;
      y < dungeon.tiles.length;
      y++
    ) {
      for (
        let x = 0;
        x < dungeon.tiles[y].length;
        x++
      ) {
        if (
          dungeon.tiles[y][x] !== 1
        ) {
          continue;
        }

        graphics.fillStyle(
          0xe2e8f0
        );

        graphics.fillRect(
          this.offsetX +
            x * this.scale,
          this.offsetY +
            y * this.scale,
          this.scale,
          this.scale
        );
      }
    }

    this.playerMarker =
      scene.add.rectangle(
        this.offsetX,
        this.offsetY,
        6,
        6,
        0x38bdf8
      );

    this.playerMarker.setScrollFactor(
      0
    );

    this.playerMarker.setDepth(
      1002
    );
  }

  update(
    playerX: number,
    playerY: number,
    tileSize: number
  ) {
    this.playerMarker.x =
      this.offsetX +
      (playerX / tileSize) *
        this.scale;

    this.playerMarker.y =
      this.offsetY +
      (playerY / tileSize) *
        this.scale;
  }
}