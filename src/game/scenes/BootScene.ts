import Phaser from "phaser";

import { SceneKeys } from "../SceneKeys";

export class BootScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.BOOT);
  }

  create() {
    this.scene.start(SceneKeys.MENU);
  }
}