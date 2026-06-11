import Phaser from "phaser";

import { Room } from "@systems/dungeon/Room";
import { Enemy } from "@entities/Enemy";

export class EnemySpawner {
  constructor(
    private readonly scene: Phaser.Scene,
    private readonly tileSize: number
  ) {}

  spawnEnemies(
    rooms: Room[]
  ): Enemy[] {
    const enemies: Enemy[] = [];

    for (let i = 2; i < rooms.length; i++) {
      const room = rooms[i];

      const shouldSpawn =
        Math.random() < 0.45;

      if (!shouldSpawn) {
        continue;
      }

      const x =
        (room.x +
          room.width / 2) *
        this.tileSize;

      const y =
        (room.y +
          room.height / 2) *
        this.tileSize;

      enemies.push(
        new Enemy(
          this.scene,
          x,
          y
        )
      );
    }

    return enemies;
  }
}