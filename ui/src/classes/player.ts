import { Actor } from "./actor";
export class Player extends Actor {
  private keyW: Phaser.Input.Keyboard.Key;
  private keyA: Phaser.Input.Keyboard.Key;
  private keyS: Phaser.Input.Keyboard.Key;
  private keyD: Phaser.Input.Keyboard.Key;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "Brendan");

    this.setName("Brendan");

    // Keys
    this.initKeyboard();

    // PHYSICS
    this.getBody().setSize(14, 16);
    this.getBody().setOffset(0, 5);

    // ANIMATIONS
    this.initAnimations();
  }

  update(): void {
    this.getBody().setVelocity(0);

    var pressed_flag = false;
    if (this.keyW.enabled && this.keyW?.isDown) {
      this.getBody().setVelocityY(-110);
      this.anims.play(this.name + "-walk-up", true);
      pressed_flag = true;
    }

    if (this.keyA.enabled && this.keyA?.isDown) {
      // this.getBody().setOffset(48, 15);
      this.getBody().setVelocityX(-110);
      this.anims.play(this.name + "-walk-left", true);
      pressed_flag = true;
    }

    if (this.keyS.enabled && this.keyS?.isDown) {
      this.getBody().setVelocityY(110);
      this.anims.play(this.name + "-walk-down", true);
      pressed_flag = true;
    }

    if (this.keyD.enabled && this.keyD?.isDown) {
      this.getBody().setVelocityX(110);
      this.anims.play(this.name + "-walk-right", true);
      // this.getBody().setOffset(15, 15);
      pressed_flag = true;
    }

    if (!pressed_flag && this.anims.isPlaying) {
      this.anims.setCurrentFrame(this.anims.currentAnim!.frames[0]);
    }
    this.depth = this.y + 0.5 * this.height;
  }

  initKeyboard(): void {
    this.keyW = this.scene.input.keyboard!.addKey("W");
    this.keyA = this.scene.input.keyboard!.addKey("A");
    this.keyS = this.scene.input.keyboard!.addKey("S");
    this.keyD = this.scene.input.keyboard!.addKey("D");
  }
}
