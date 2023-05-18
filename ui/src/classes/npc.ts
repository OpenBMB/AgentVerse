import { Actor } from './actor';
export class NPC extends Actor {
  //private keyW: Phaser.Input.Keyboard.Key;
  //private keyA: Phaser.Input.Keyboard.Key;
  //private keyS: Phaser.Input.Keyboard.Key;
  //private keyD: Phaser.Input.Keyboard.Key;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'npc');
    // KEYS
    //this.keyW = this.scene.input.keyboard.addKey('W');
    //this.keyA = this.scene.input.keyboard.addKey('A');
    //this.keyS = this.scene.input.keyboard.addKey('S');
    //this.keyD = this.scene.input.keyboard.addKey('D');
    // PHYSICS
    this.getBody().setSize(14, 20);
    this.getBody().setOffset(0, 0);
    this.getBody().setImmovable(true);
  }
  update(): void {
    /*
    this.getBody().setVelocity(0);
    if (this.keyW?.isDown) {
      // this.body.velocity.y = -110;
      this.getBody().setVelocityY(-110);
    }
    if (this.keyA?.isDown) {
      // this.body.velocity.x = -110;
      // this.checkFlip();
      // this.getBody().setOffset(48, 15);
      this.getBody().setVelocityX(-110);
    }
    if (this.keyS?.isDown) {
      // this.body.velocity.y = 110;
      this.getBody().setVelocityY(110);
    }
    if (this.keyD?.isDown) {
      // this.body.velocity.x = 110;
      this.getBody().setVelocityX(110);
      // this.checkFlip();
      // this.getBody().setOffset(15, 15);
    }
    */
  }
}

