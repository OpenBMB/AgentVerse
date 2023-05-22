import { Actor } from "./actor";
import { DIRECTION, DIRECTION_TO_TEXT } from "../utils";
export class NPC extends Actor {
  public id: number;
  public direction: number = DIRECTION.DOWN;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    name: string,
    id: number
  ) {
    super(scene, x, y, name);

    this.setName(name);
    this.id = id;
    // PHYSICS
    this.getBody().setSize(14, 20);
    this.getBody().setOffset(0, 0);
    this.getBody().setImmovable(true);

    this.initAnimations();
  }

  update(): void {
    var text = "";
    switch (this.direction) {
      case DIRECTION.UP:
        text = "up";
        break;
      case DIRECTION.DOWN:
        text = "down";
        break;
      case DIRECTION.LEFT:
        text = "left";
        break;
      case DIRECTION.RIGHT:
        text = "right";
        break;
    }
    this.anims.play(this.name + "-walk-" + text, true);
    if (this.anims.isPlaying)
      this.anims.setCurrentFrame(this.anims.currentAnim!.frames[0]);
  }

  public changeDirection(direction: number): void {
    this.direction = direction;
  }
}
