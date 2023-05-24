import { Actor } from "./actor";
import { DIRECTION } from "../utils";
import {
  MoveTo,
  PathFinder,
  Board,
} from "../phaser3-rex-plugins/plugins/board-components";
export class NPC extends Actor {
  private moveTo: MoveTo;
  private board: Board;
  private path: PathFinder.NodeType[] = [];

  public id: number;
  public direction: number = DIRECTION.DOWN;

  constructor(
    scene: Phaser.Scene,
    board: Board,
    x: number,
    y: number,
    name: string,
    id: number
  ) {
    super(scene, x, y, name);

    this.setName(name);
    this.board = board;
    this.id = id;
    // PHYSICS
    this.getBody().setSize(14, 10);
    this.getBody().setOffset(0, 0);
    this.getBody().setImmovable(true);
    // this.setOrigin(0, 1);

    this.initAnimations();
    this.moveTo = this.scene.rexBoard.add.moveTo(this, {
      speed: 110,
    });
  }

  update(): void {
    if (this.path.length > 0 && !this.moveTo.isRunning) {
      var tileXY = this.board.worldXYToTileXY(this.x, this.y);
      if (tileXY.x == this.path[0].x) {
        if (tileXY.y < this.path[0].y) this.changeDirection(DIRECTION.DOWN);
        else if (tileXY.y > this.path[0].y) this.changeDirection(DIRECTION.UP);
      } else if (tileXY.y == this.path[0].y) {
        if (tileXY.x < this.path[0].x) this.changeDirection(DIRECTION.RIGHT);
        else if (tileXY.x > this.path[0].x)
          this.changeDirection(DIRECTION.LEFT);
      }
      this.moveTo.moveTo(this.path.shift());
    }
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
    if (this.anims.isPlaying && !this.moveTo.isRunning)
      this.anims.setCurrentFrame(this.anims.currentAnim!.frames[0]);
  }

  public changeDirection(direction: number): void {
    this.direction = direction;
  }

  public moveAlongPath(path: PathFinder.NodeType[]): void {
    if (path.length == 0) return;
    if (this.moveTo.isRunning) return;
    if (this.path.length > 0) return;
    this.path = path;
  }
}
