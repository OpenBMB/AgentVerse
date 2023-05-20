import { Actor } from "./actor";
export class Player extends Actor {
  private keyW: Phaser.Input.Keyboard.Key;
  private keyA: Phaser.Input.Keyboard.Key;
  private keyS: Phaser.Input.Keyboard.Key;
  private keyD: Phaser.Input.Keyboard.Key;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "Brendan");

    // Keys
    this.initKeyboard();

    // PHYSICS
    this.getBody().setSize(14, 21);
    this.getBody().setOffset(0, 0);

    // ANIMATIONS
    this.initAnimations();
  }

  update(): void {
    this.getBody().setVelocity(0);

    var pressed_flag = false;
    if (this.keyW.enabled && this.keyW?.isDown) {
      this.getBody().setVelocityY(-110);
      this.anims.play("walk-up", true);
      pressed_flag = true;
    }

    if (this.keyA.enabled && this.keyA?.isDown) {
      // this.getBody().setOffset(48, 15);
      this.getBody().setVelocityX(-110);
      this.anims.play("walk-left", true);
      pressed_flag = true;
    }

    if (this.keyS.enabled && this.keyS?.isDown) {
      this.getBody().setVelocityY(110);
      this.anims.play("walk-down", true);
      pressed_flag = true;
    }

    if (this.keyD.enabled && this.keyD?.isDown) {
      this.getBody().setVelocityX(110);
      this.anims.play("walk-right", true);
      // this.getBody().setOffset(15, 15);
      pressed_flag = true;
    }

    if (!pressed_flag && this.anims.isPlaying) {
      this.anims.setCurrentFrame(this.anims.currentAnim!.frames[0]);
    }
  }

  initAnimations(): void {
    this.scene.anims.create({
      key: "walk-down",
      frames: this.scene.anims.generateFrameNumbers("Brendan", {
        start: 0,
        end: 2,
      }),
      frameRate: 6,
    });
    this.scene.anims.create({
      key: "walk-up",
      frames: this.scene.anims.generateFrameNumbers("Brendan", {
        start: 3,
        end: 5,
      }),
      frameRate: 6,
    });
    this.scene.anims.create({
      key: "walk-left",
      frames: this.scene.anims.generateFrameNumbers("Brendan", {
        start: 6,
        end: 8,
      }),
      frameRate: 6,
    });
    this.scene.anims.create({
      key: "walk-right",
      frames: this.scene.anims.generateFrameNumbers("Brendan", {
        start: 9,
        end: 11,
      }),
      frameRate: 6,
    });
  }

  initKeyboard(): void {
    this.keyW = this.scene.input.keyboard!.addKey("W");
    this.keyA = this.scene.input.keyboard!.addKey("A");
    this.keyS = this.scene.input.keyboard!.addKey("S");
    this.keyD = this.scene.input.keyboard!.addKey("D");
  }
}
