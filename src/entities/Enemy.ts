import Phaser from "phaser";

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  private readonly speed = 80;

  private direction =
    new Phaser.Math.Vector2();

  private nextDecision = 0;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number
  ) {
    super(scene, x, y, "__enemy");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);

    this.chooseDirection();
  }

  private chooseDirection() {
    const directions = [
      new Phaser.Math.Vector2(1, 0),
      new Phaser.Math.Vector2(-1, 0),
      new Phaser.Math.Vector2(0, 1),
      new Phaser.Math.Vector2(0, -1),
      new Phaser.Math.Vector2(0, 0)
    ];

    this.direction =
      Phaser.Utils.Array.GetRandom(
        directions
      );

    this.nextDecision =
      Date.now() +
      Phaser.Math.Between(
        1000,
        2500
      );
  }

  update() {
    if (
      Date.now() >
      this.nextDecision
    ) {
      this.chooseDirection();
    }

    this.setVelocity(
      this.direction.x *
        this.speed,
      this.direction.y *
        this.speed
    );
  }
}