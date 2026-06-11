import Phaser from "phaser";

import { Player } from "@entities/Player";
import { Enemy } from "@entities/Enemy";

import { DungeonGenerator } from "@systems/dungeon/DungeonGenerator";
import { DungeonRenderer } from "@systems/dungeon/DungeonRenderer";

import { EnemySpawner } from "@systems/enemy/EnemySpawner";

import { SceneKeys } from "../SceneKeys";
import { Minimap } from "@ui/Minimap";

export class DungeonScene extends Phaser.Scene {
  private player!: Player;
  private minimap!: Minimap;

  private enemies: Enemy[] = [];

  private readonly tileSize = 64;

  constructor() {
    super(SceneKeys.DUNGEON);
  }

  preload() {
    const graphics = this.make.graphics({
      x: 0,
      y: 0,
      add: false
    });

    graphics.fillStyle(0x38bdf8);
    graphics.fillRect(0, 0, 32, 32);

    graphics.generateTexture(
      "__player",
      32,
      32
    );

    graphics.clear();

    graphics.fillStyle(0xa855f7);
    graphics.fillRect(0, 0, 28, 28);

    graphics.generateTexture(
      "__enemy",
      28,
      28
    );
  }

  create() {
    const mapWidth = 80;
    const mapHeight = 80;

    const generator =
      new DungeonGenerator(
        mapWidth,
        mapHeight
      );

    const dungeon =
      generator.generate();

    const worldWidth =
      mapWidth * this.tileSize;

    const worldHeight =
      mapHeight * this.tileSize;

    this.physics.world.setBounds(
      0,
      0,
      worldWidth,
      worldHeight
    );

    this.cameras.main.setBounds(
      0,
      0,
      worldWidth,
      worldHeight
    );

    const walls =
      DungeonRenderer.render(
        this,
        dungeon,
        this.tileSize
      );

    const spawnRoom =
      dungeon.rooms[0];

    const spawnX =
      (spawnRoom.x +
        spawnRoom.width / 2) *
      this.tileSize;

    const spawnY =
      (spawnRoom.y +
        spawnRoom.height / 2) *
      this.tileSize;

    this.player = new Player(
      this,
      spawnX,
      spawnY
    );

    this.physics.add.collider(
      this.player,
      walls
    );

    const enemySpawner =
      new EnemySpawner(
        this,
        this.tileSize
      );

    this.enemies =
      enemySpawner.spawnEnemies(
        dungeon.rooms
      );

    this.cameras.main.startFollow(
      this.player,
      true,
      0.08,
      0.08
    );

    this.cameras.main.setZoom(1);

    this.minimap = new Minimap(
      this,
      dungeon
    );

    this.add
      .text(
        20,
        20,
        `Rooms: ${dungeon.rooms.length}`,
        {
          fontSize: "18px",
          color: "#ffffff"
        }
      )
      .setScrollFactor(0);

    this.add
      .text(
        20,
        45,
        `Enemies: ${this.enemies.length}`,
        {
          fontSize: "18px",
          color: "#a855f7"
        }
      )
      .setScrollFactor(0);

    this.add
      .text(
        20,
        70,
        "WASD to move",
        {
          fontSize: "18px",
          color: "#94a3b8"
        }
      )
      .setScrollFactor(0);
  }

  update() {
    this.player.update();

    for (const enemy of this.enemies) {
      enemy.update();
    }

    this.minimap.update(
      this.player.x,
      this.player.y,
      this.tileSize
    );
  }
}