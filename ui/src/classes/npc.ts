import { Actor } from "./actor";
import { DIRECTION } from "../utils";
import {
  MoveTo,
  PathFinder,
  Board,
} from "../phaser3-rex-plugins/plugins/board-components";
import { Label } from "../phaser3-rex-plugins/templates/ui/ui-components";
import { COLOR_DARK, COLOR_LIGHT, COLOR_PRIMARY } from "../constants";
import { TownScene } from "../scenes";
import eventsCenter from "./event_center";

export class NPC extends Actor {
  private moveTo: MoveTo;
  private board: Board;
  private canMove: boolean = true;
  private talkWithPlayer: boolean = false;
  private path: PathFinder.NodeType[] = [];
  private finalDirection: number = undefined;
  private targetLocation: string = undefined;
  private targetNPC: NPC = undefined;
  private textBox: Label = undefined;

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
    this.getBody().setSize(14, 16);
    this.getBody().setOffset(0, 4);
    this.getBody().setImmovable(true);
    this.setOrigin(0, 0.2);

    this.initAnimations();
    this.moveTo = this.scene.rexBoard.add.moveTo(this, {
      speed: 55,
      sneak: true,
    });
    this.listenToDirectionEvent();
  }

  update(): void {
    if (this.path.length > 0 && !this.moveTo.isRunning && this.canMove) {
      var tileXY = this.board.worldXYToTileXY(this.x, this.y);
      if (tileXY.x == this.path[0].x) {
        if (tileXY.y < this.path[0].y) this.changeDirection(DIRECTION.DOWN);
        else if (tileXY.y > this.path[0].y) this.changeDirection(DIRECTION.UP);
      } else if (tileXY.y == this.path[0].y) {
        if (tileXY.x < this.path[0].x) this.changeDirection(DIRECTION.RIGHT);
        else if (tileXY.x > this.path[0].x)
          this.changeDirection(DIRECTION.LEFT);
      }
      var move = this.moveTo.moveTo(this.path.shift());
      move.removeAllListeners("complete");
      move.on("complete", () => {
        if (this.path.length == 0) {
          this.changeDirection(this.finalDirection);
          this.emitTurnEvent();
          if (this.targetLocation != undefined) {
            fetch("http://127.0.0.1:10002/update_location", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "same-origin",
              body: JSON.stringify({
                agent_locations: {
                  [this.name]: this.targetLocation,
                },
              }),
            });
          }
        }
      });
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
    this.updateTextBox();
    this.depth = this.y + this.height * 0.8;
  }

  listenToDirectionEvent(): void {
    eventsCenter.on(this.name + "-up", () => {
      this.changeDirection(DIRECTION.UP);
    });
    eventsCenter.on(this.name + "-down", () => {
      this.changeDirection(DIRECTION.DOWN);
    });
    eventsCenter.on(this.name + "-left", () => {
      this.changeDirection(DIRECTION.LEFT);
    });
    eventsCenter.on(this.name + "-right", () => {
      this.changeDirection(DIRECTION.RIGHT);
    });
  }

  emitTurnEvent(): void {
    // Make the listener NPC turn to the speaker NPC.
    if (this.targetNPC == undefined) return;
    var direction = "";
    switch (this.finalDirection) {
      case DIRECTION.UP:
        direction = "down";
        break;
      case DIRECTION.DOWN:
        direction = "up";
        break;
      case DIRECTION.LEFT:
        direction = "right";
        break;
      case DIRECTION.RIGHT:
        direction = "left";
        break;
    }
    eventsCenter.emit(this.targetNPC.name + "-" + direction);
    this.setTargetNPC();
  }

  updateTextBox(): void {
    if (this.textBox == undefined) return;
    this.textBox.setOrigin(0.5, 1.0);
    var scale = this.scene.cameras.main.zoom;
    this.textBox.setX(this.x + this.width / 2);
    this.textBox.setY(this.y - this.height * 0.2);
    this.textBox.depth = this.y + this.height * 0.8;
    this.textBox.getChildren().forEach((child) => {
      child.setDepth(this.y + this.height * 0.8);
    });
  }

  public setTextBox(text: string): void {
    this.destroyTextBox();
    var scale = this.scene.cameras.main.zoom;
    var scene = this.scene as TownScene;
    this.textBox = scene.rexUI.add
      .label({
        x: this.x + this.width / 2,
        y: this.y - this.height * 0.2,
        width: 24 * scale,
        orientation: "x",
        background: scene.rexUI.add.roundRectangle(
          0,
          0,
          2,
          2,
          20,
          COLOR_PRIMARY,
          0.7
        ),
        text: scene.rexUI.wrapExpandText(
          scene.add.text(0, 0, text, {
            fontSize: 10,
          })
        ),
        expandTextWidth: true,
        space: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
        },
      })
      .setOrigin(0.5, 1.0)
      .setScale(1 / scale, 1 / scale)
      .setDepth(this.y + this.height * 0.8)
      .layout();
  }

  public destroyTextBox(): void {
    if (this.textBox != undefined) this.textBox.destroy();
    this.textBox = undefined;
  }

  public changeDirection(direction: number): void {
    if (direction == undefined) return;
    this.direction = direction;
  }

  public moveAlongPath(
    path: PathFinder.NodeType[],
    finalDirection: number = undefined,
    targetLocation: string = undefined
  ): void {
    if (path.length == 0) return;
    if (this.moveTo.isRunning) return;
    if (this.path.length > 0) return;
    this.path = path;
    this.finalDirection = finalDirection;
    this.targetLocation = targetLocation;
  }

  public pauseMoving(): void {
    this.moveTo.stop();
    this.canMove = false;
  }

  public resumeMoving(): void {
    this.moveTo.resume();
    this.canMove = true;
  }

  public isMoving(): boolean {
    return this.moveTo.isRunning || this.path.length > 0;
  }

  public isTalking(): boolean {
    return this.talkWithPlayer;
  }

  public setTalking(talking: boolean): void {
    this.talkWithPlayer = talking;
  }

  public setTargetNPC(targetNPC: NPC = undefined): void {
    this.targetNPC = targetNPC;
  }
}
