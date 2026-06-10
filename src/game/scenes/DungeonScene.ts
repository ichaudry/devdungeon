import Phaser from "phaser";

import { Player } from "@entities/Player";
import { SceneKeys } from "../SceneKeys";

export class DungeonScene extends Phaser.Scene {
    private player!: Player;

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

        graphics.fillStyle(0x1e293b);
        graphics.fillRect(0, 0, 64, 64);

        graphics.lineStyle(1, 0x334155);

        graphics.strokeRect(0, 0, 64, 64);

        graphics.generateTexture(
            "__floor",
            64,
            64
        );
    }

    create() {
        const worldWidth = 3000;
        const worldHeight = 3000;

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

        for (let x = 0; x < worldWidth; x += 64) {
            for (
                let y = 0;
                y < worldHeight;
                y += 64
            ) {
                this.add.image(
                    x,
                    y,
                    "__floor"
                ).setOrigin(0);
            }
        }

        this.player = new Player(
            this,
            worldWidth / 2,
            worldHeight / 2
        );

        this.cameras.main.startFollow(
            this.player,
            true,
            0.08,
            0.08
        );

        this.cameras.main.setZoom(1.25);

        this.add
            .text(
                20,
                20,
                "WASD to move",
                {
                    fontSize: "18px",
                    color: "#ffffff"
                }
            )
            .setScrollFactor(0);
    }

    update() {
        this.player.update();
    }
}