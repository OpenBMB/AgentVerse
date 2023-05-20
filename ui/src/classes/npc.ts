import { Actor } from "./actor";
export class NPC extends Actor {
  public id: number;
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
  }
}
