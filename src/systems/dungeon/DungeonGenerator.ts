import { Room } from "./Room";

export interface DungeonData {
  rooms: Room[];
  tiles: number[][];
}

function randomInt(
  min: number,
  max: number
): number {
  return (
    Math.floor(
      Math.random() * (max - min + 1)
    ) + min
  );
}

export class DungeonGenerator {
  private readonly width: number;
  private readonly height: number;

  constructor(
    width: number,
    height: number
  ) {
    this.width = width;
    this.height = height;
  }

  generate(): DungeonData {
    const tiles = Array.from(
      { length: this.height },
      () => Array(this.width).fill(0)
    );

    const rooms: Room[] = [];

    const roomCount = randomInt(12, 18);

    for (let i = 0; i < roomCount; i++) {
      const room: Room = {
        x: randomInt(
          2,
          this.width - 15
        ),
        y: randomInt(
          2,
          this.height - 15
        ),
        width: randomInt(6, 12),
        height: randomInt(6, 12)
      };

      rooms.push(room);

      for (
        let x = room.x;
        x < room.x + room.width;
        x++
      ) {
        for (
          let y = room.y;
          y < room.y + room.height;
          y++
        ) {
          if (
            x >= 0 &&
            x < this.width &&
            y >= 0 &&
            y < this.height
          ) {
            tiles[y][x] = 1;
          }
        }
      }
    }

    for (let i = 1; i < rooms.length; i++) {
      const previous = rooms[i - 1];
      const current = rooms[i];

      const x1 = Math.floor(
        previous.x +
          previous.width / 2
      );

      const y1 = Math.floor(
        previous.y +
          previous.height / 2
      );

      const x2 = Math.floor(
        current.x +
          current.width / 2
      );

      const y2 = Math.floor(
        current.y +
          current.height / 2
      );

      for (
        let x = Math.min(x1, x2);
        x <= Math.max(x1, x2);
        x++
      ) {
        if (
          x >= 0 &&
          x < this.width &&
          y1 >= 0 &&
          y1 < this.height
        ) {
          tiles[y1][x] = 1;
        }
      }

      for (
        let y = Math.min(y1, y2);
        y <= Math.max(y1, y2);
        y++
      ) {
        if (
          x2 >= 0 &&
          x2 < this.width &&
          y >= 0 &&
          y < this.height
        ) {
          tiles[y][x2] = 1;
        }
      }
    }

    return {
      rooms,
      tiles
    };
  }
}