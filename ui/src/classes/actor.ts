import { Physics } from "phaser";
export class Actor extends Physics.Arcade.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.getBody().setCollideWorldBounds(true);
  }

  protected getBody(): Physics.Arcade.Body {
    return this.body as Physics.Arcade.Body;
  }

  initAnimations(): void {
    this.scene.anims.create({
      key: this.name + "-walk-down",
      frames: this.scene.anims.generateFrameNumbers(this.name, {
        start: 0,
        end: 2,
      }),
      frameRate: 6,
    });
    this.scene.anims.create({
      key: this.name + "-walk-up",
      frames: this.scene.anims.generateFrameNumbers(this.name, {
        start: 3,
        end: 5,
      }),
      frameRate: 6,
    });
    this.scene.anims.create({
      key: this.name + "-walk-left",
      frames: this.scene.anims.generateFrameNumbers(this.name, {
        start: 6,
        end: 8,
      }),
      frameRate: 6,
    });
    this.scene.anims.create({
      key: this.name + "-walk-right",
      frames: this.scene.anims.generateFrameNumbers(this.name, {
        start: 9,
        end: 11,
      }),
      frameRate: 6,
    });
  }
}
