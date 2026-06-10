import Phaser from "phaser";
import { DungeonData } from "./DungeonGenerator";

export class DungeonRenderer {
  static render(
    scene: Phaser.Scene,
    dungeon: DungeonData,
    tileSize: number
  ) {
    const walls =
      scene.physics.add.staticGroup();

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
        const walkable =
          dungeon.tiles[y][x] === 1;

        scene.add
          .rectangle(
            x * tileSize,
            y * tileSize,
            tileSize,
            tileSize,
            walkable
              ? 0x1e293b
              : 0x0f172a
          )
          .setOrigin(0);

        if (!walkable) {
          const wall =
            scene.add.rectangle(
              x * tileSize +
                tileSize / 2,
              y * tileSize +
                tileSize / 2,
              tileSize,
              tileSize,
              0x0f172a,
              0
            );

          scene.physics.add.existing(
            wall,
            true
          );

          walls.add(
            wall as Phaser.GameObjects.Rectangle
          );
        }
      }
    }

    return walls;
  }
}