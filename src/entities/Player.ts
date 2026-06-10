import Phaser from "phaser";

export class Player extends Phaser.Physics.Arcade.Sprite {
  private cursors!: {
    w: Phaser.Input.Keyboard.Key;
    a: Phaser.Input.Keyboard.Key;
    s: Phaser.Input.Keyboard.Key;
    d: Phaser.Input.Keyboard.Key;
  };

  private readonly speed = 250;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number
  ) {
    super(scene, x, y, "__player");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);

    this.cursors = scene.input.keyboard!.addKeys({
      w: Phaser.Input.Keyboard.KeyCodes.W,
      a: Phaser.Input.Keyboard.KeyCodes.A,
      s: Phaser.Input.Keyboard.KeyCodes.S,
      d: Phaser.Input.Keyboard.KeyCodes.D
    }) as typeof this.cursors;
  }

  update() {
    let velocityX = 0;
    let velocityY = 0;

    if (this.cursors.a.isDown) {
      velocityX = -1;
    }

    if (this.cursors.d.isDown) {
      velocityX = 1;
    }

    if (this.cursors.w.isDown) {
      velocityY = -1;
    }

    if (this.cursors.s.isDown) {
      velocityY = 1;
    }

    const vector = new Phaser.Math.Vector2(
      velocityX,
      velocityY
    ).normalize();

    this.setVelocity(
      vector.x * this.speed,
      vector.y * this.speed
    );
  }
}