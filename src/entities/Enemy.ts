import Phaser from "phaser";

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number
  ) {
    super(scene, x, y, "__enemy");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setImmovable(true);
  }

  update() {
    // AI comes next commit
  }
}