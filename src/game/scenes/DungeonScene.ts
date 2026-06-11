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

    private kills = 0;

    private hpText!: Phaser.GameObjects.Text;
    private killText!: Phaser.GameObjects.Text;
    private roomCountText!: Phaser.GameObjects.Text;
    private enemyCountText!: Phaser.GameObjects.Text;

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

        for (const enemy of this.enemies) {
            this.physics.add.collider(
                enemy,
                walls
            );
        }

        this.cameras.main.startFollow(
            this.player,
            true,
            0.08,
            0.08
        );

        this.cameras.main.setZoom(1);

        this.minimap = new Minimap(
            this,
            dungeon,
            this.enemies
        );

        this.roomCountText =
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

        this.hpText =
            this.add
                .text(
                    20,
                    45,
                    "HP: 10",
                    {
                        fontSize: "18px",
                        color: "#22c55e"
                    }
                )
                .setScrollFactor(0);

        this.killText =
            this.add
                .text(
                    20,
                    70,
                    "Kills: 0",
                    {
                        fontSize: "18px",
                        color: "#f59e0b"
                    }
                )
                .setScrollFactor(0);

        this.enemyCountText =
            this.add
                .text(
                    20,
                    95,
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
                120,
                "WASD Move | SPACE Attack",
                {
                    fontSize: "18px",
                    color: "#94a3b8"
                }
            )
            .setScrollFactor(0);
    }

    private attackEnemies() {
        for (
            let i =
                this.enemies.length - 1;
            i >= 0;
            i--
        ) {
            const enemy =
                this.enemies[i];

            if (!enemy.active) {
                continue;
            }

            const distance =
                Phaser.Math.Distance.Between(
                    this.player.x,
                    this.player.y,
                    enemy.x,
                    enemy.y
                );

            if (distance <= 80) {
                enemy.takeDamage(1);

                if (
                    enemy.isDead()
                ) {
                    this.enemies.splice(
                        i,
                        1
                    );

                    this.kills++;
                }
            }
        }
    }

    update() {
        this.player.update();

        if (
            this.player.attackPressed() &&
            this.player.canAttack()
        ) {
            this.player.performAttack();

            this.attackEnemies();
        }

        for (const enemy of this.enemies) {
            enemy.update();
        }

        this.hpText.setText(
            `HP: ${this.player.getHealth()}`
        );

        this.killText.setText(
            `Kills: ${this.kills}`
        );

        this.enemyCountText.setText(
            `Enemies: ${this.enemies.length}`
        );

        this.minimap.update(
            this.player.x,
            this.player.y,
            this.tileSize,
            this.enemies
        );
    }
}