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

  private intersects(
    room: Room,
    rooms: Room[]
  ): boolean {
    return rooms.some((other) => {
      return (
        room.x <
          other.x +
            other.width +
            2 &&
        room.x +
          room.width +
          2 >
          other.x &&
        room.y <
          other.y +
            other.height +
            2 &&
        room.y +
          room.height +
          2 >
          other.y
      );
    });
  }

  generate(): DungeonData {
    const tiles = Array.from(
      { length: this.height },
      () => Array(this.width).fill(0)
    );

    const rooms: Room[] = [];

    const targetRooms = randomInt(
      12,
      18
    );

    let attempts = 0;

    while (
      rooms.length < targetRooms &&
      attempts < 200
    ) {
      attempts++;

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

      if (
        this.intersects(
          room,
          rooms
        )
      ) {
        continue;
      }

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
          tiles[y][x] = 1;
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
        tiles[y1][x] = 1;
      }

      for (
        let y = Math.min(y1, y2);
        y <= Math.max(y1, y2);
        y++
      ) {
        tiles[y][x2] = 1;
      }
    }

    return {
      rooms,
      tiles
    };
  }
}