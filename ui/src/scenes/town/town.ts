import * as Phaser from "phaser";
import { Scene, Tilemaps, GameObjects, Physics, Math as Mathph } from "phaser";
import { Player } from "../../classes/player";
import { NPC } from "../../classes/npc";
import { DIRECTION } from "../../utils";
import {
  TextBox,
  Click,
} from "../../phaser3-rex-plugins/templates/ui/ui-components";
import UIPlugin from "../../phaser3-rex-plugins/templates/ui/ui-plugin";
import BoardPlugin from "../../phaser3-rex-plugins/plugins/board-plugin";
import { PathFinder } from "../../phaser3-rex-plugins/plugins/board-components";
import { TileXYType } from "../../phaser3-rex-plugins/plugins/board/types/Position";
import { shuffle } from "../../utils";
import { COLOR_DARK, COLOR_LIGHT, COLOR_PRIMARY } from "../../constants";

export class TownScene extends Scene {
  private timeFrame: number = 0;
  private isQuerying: boolean = false;

  private map: Tilemaps.Tilemap;
  private tileset: Tilemaps.Tileset;
  private groundLayer: Tilemaps.TilemapLayer;
  private wallLayer: Tilemaps.TilemapLayer;
  private flowerLayer: Tilemaps.TilemapLayer;
  private treeLayer: Tilemaps.TilemapLayer;
  private houseLayer: Tilemaps.TilemapLayer;

  private player: Player;
  private npcGroup: GameObjects.Group;
  private keySpace: Phaser.Input.Keyboard.Key;
  private keyEnter: Phaser.Input.Keyboard.Key;
  public rexUI: UIPlugin;
  public rexBoard: BoardPlugin;
  private board: BoardPlugin.Board;
  private pathFinder: PathFinder;

  constructor() {
    super("town-scene");
  }

  create(): void {
    this.keySpace = this.input.keyboard!.addKey("SPACE");
    this.keyEnter = this.input.keyboard!.addKey("ENTER");
    this.initMap();
    this.initSprite();
    this.initCamera();
    // this.add.grid(0, 0, 1024, 1024, 16, 16, 0x000000).setAlpha(0.1);
  }

  update(time, delta): void {
    this.timeFrame += delta;
    this.player.update();

    this.npcGroup.getChildren().forEach(function (npc) {
      (npc as NPC).update();
    });
    if (this.timeFrame > 5000) {
      if (!this.isQuerying) {
        this.isQuerying = true;
        var allNpcs = this.npcGroup.getChildren();
        var shouldUpdate = [];

        for (let i = 0; i < this.npcGroup.getLength(); i++) {
          // for (let i = 0; i < 1; i++) {
          if (
            !(allNpcs[i] as NPC).isMoving() &&
            !(allNpcs[i] as NPC).isTalking()
          ) {
            shouldUpdate.push(i);
          }
        }

        fetch("http://127.0.0.1:10002/make_decision", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "same-origin",
          body: JSON.stringify({
            agent_ids: shouldUpdate,
          }),
        }).then((response) => {
          response.json().then((data) => {
            this.npcGroup.getChildren().forEach(function (npc) {
              (npc as NPC).destroyTextBox();
            });
            for (let i = 0; i < data.length; i++) {
              var npc = allNpcs[shouldUpdate[i]] as NPC;
              if (data[i].content == "") continue;
              var content = JSON.parse(data[i].content);
              switch (content.action) {
                case "MoveTo":
                  var tile = this.getRandomTileAtLocation(content.to);
                  if (tile == undefined) break;
                  npc.destroyTextBox();
                  this.moveNPC(shouldUpdate[i], tile, undefined, content.to);
                  break;
                case "Speak":
                  var ret = this.getNPCNeighbor(content.to);
                  var tile = ret[0];
                  var finalDirection = ret[1];
                  var listener = ret[2];
                  if (tile == undefined) break;
                  this.moveNPC(
                    shouldUpdate[i],
                    tile,
                    finalDirection,
                    undefined,
                    listener
                  );
                  npc.setTextBox(content.text);
                  break;
                default:
                  npc.setTextBox("[" + content.action + "]");
                  break;
              }
            }
            this.isQuerying = false;
          });
        });
      }
      this.timeFrame = 0;
    }
  }

  initMap(): void {
    this.map = this.make.tilemap({
      key: "town",
      tileWidth: 16,
      tileHeight: 16,
    });
    this.tileset = this.map.addTilesetImage("town", "tiles")!;
    this.groundLayer = this.map.createLayer("ground", this.tileset, 0, 0)!;
    this.wallLayer = this.map.createLayer("wall", this.tileset, 0, 0)!;
    this.flowerLayer = this.map.createLayer("flower", this.tileset, 0, 0)!;
    this.treeLayer = this.map.createLayer("tree", this.tileset, 0, 0)!;
    this.houseLayer = this.map.createLayer("house", this.tileset, 0, 0)!;

    this.wallLayer.setCollisionByProperty({ collides: true });
    this.treeLayer.setCollisionByProperty({ collides: true });
    this.houseLayer.setCollisionByProperty({ collides: true });
    this.board = this.rexBoard.createBoardFromTilemap(this.map);
    this.board.getAllChess().forEach((chess) => {
      var collide = ["wall", "tree", "house"].includes(chess.layer.name);
      if (collide && chess.index != -1) {
        chess.rexChess.setBlocker();
      }
    });
    this.pathFinder = this.rexBoard.add.pathFinder({
      occupiedTest: true,
      blockerTest: true,
      pathMode: "straight",
      cacheCost: true,
    });
  }

  initSprite(): void {
    // NPC
    this.npcGroup = this.add.group();
    var npcPoints = this.map.filterObjects("npcs", (npc) => {
      return npc.type === "npc";
    });
    for (let i = 0; i < npcPoints.length; i++) {
      var npcPoint = this.map.findObject("npcs", (npc) => {
        for (let j = 0; j < npc.properties.length; j++) {
          if (npc.properties[j].name === "id") {
            return npc.properties[j].value === i;
          }
        }
      });
      var tileXY = this.board.worldXYToTileXY(npcPoint.x, npcPoint.y);
      var npc = new NPC(
        this,
        this.board,
        npcPoint.x,
        npcPoint.y,
        npcPoint.name,
        npcPoint.properties[0].value
      );
      this.board.addChess(npc, tileXY.x, tileXY.y, 0, true);
      this.physics.add.collider(npc, this.npcGroup);
      this.npcGroup.add(npc);
    }

    this.physics.add.collider(this.npcGroup, this.wallLayer);
    this.physics.add.collider(this.npcGroup, this.treeLayer);
    this.physics.add.collider(this.npcGroup, this.houseLayer);
    // this.physics.add.collider(this.npcGroup, this.npcGroup);

    // Player
    this.player = new Player(this, 288, 240);
    this.physics.add.collider(this.player, this.wallLayer);
    this.physics.add.collider(this.player, this.treeLayer);
    this.physics.add.collider(this.player, this.houseLayer);
    this.physics.add.collider(
      this.player,
      this.npcGroup,
      (player: Player, npc: NPC) => {
        npc.pauseMoving();
        var checkResumeWalk = this.time.addEvent({
          delay: 1000,
          callback: () => {
            const nearbyDistance = 1.1 * Math.max(player.width, player.height);
            var distance = Mathph.Distance.Between(
              player.x,
              player.y,
              npc.x,
              npc.y
            );
            if (distance > nearbyDistance) {
              npc.resumeMoving();
              checkResumeWalk.destroy();
            }
          },
        });
      }
    );

    this.keySpace.on("up", () => {
      var ret = getNearbyNPC(this.player, this.npcGroup);
      var npc = ret[0];
      if (npc) {
        npc = npc as NPC;
        (npc as NPC).changeDirection(ret[1]);
        (npc as NPC).setTalking(true);
        this.createInputBox(npc);
      }
    });
    // this.keyEnter.on("up", () => {});

    this.physics.world.setBounds(
      0,
      0,
      this.groundLayer.width + this.player.width,
      this.groundLayer.height
    );
  }

  initCamera(): void {
    this.cameras.main.setSize(this.game.scale.width, this.game.scale.height);
    this.cameras.main.setBounds(
      0,
      0,
      this.groundLayer.width,
      this.groundLayer.height
    );
    this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
    this.cameras.main.setZoom(4);
  }

  disableKeyboard(): void {
    this.input.keyboard.manager.enabled = false;
  }

  enableKeyboard(): void {
    this.input.keyboard.manager.enabled = true;
  }

  createInputBox(npc: Physics.Arcade.Sprite) {
    this.disableKeyboard();
    var upperLeftCorner = this.cameras.main.getWorldPoint(
      this.cameras.main.width * 0.2,
      this.cameras.main.height * 0.3
    );
    var x = upperLeftCorner.x;
    var y = upperLeftCorner.y;
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var scale = this.cameras.main.zoom;

    var inputText = this.rexUI.add
      .inputText({
        x: x,
        y: y,
        width: width * 0.6,
        height: height * 0.3,
        type: "textarea",
        text: "",
        color: "#ffffff",
        border: 2,
        backgroundColor: "#" + COLOR_DARK.toString(16),
        borderColor: "#" + COLOR_LIGHT.toString(16),
      })
      .setOrigin(0)
      .setScale(1 / scale, 1 / scale)
      .setFocus()
      .setAlpha(0.8);

    const self = this;
    var submitBtn = this.rexUI.add
      .label({
        x: x,
        y: y + inputText.height / scale + 5,
        background: this.rexUI.add
          .roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY)
          .setStrokeStyle(2, COLOR_LIGHT),
        text: this.add.text(0, 0, "Submit"),
        space: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
        },
      })
      .setOrigin(0)
      .setScale(1 / scale, 1 / scale)
      .layout();

    var cancelBtn = this.rexUI.add
      .label({
        x: x + submitBtn.width / scale + 5,
        y: y + inputText.height / scale + 5,
        background: this.rexUI.add
          .roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY)
          .setStrokeStyle(2, COLOR_LIGHT),
        text: this.add.text(0, 0, "Cancel"),
        space: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
        },
      })
      .setOrigin(0)
      .setScale(1 / scale, 1 / scale)
      .layout();

    submitBtn.onClick(function (
      click: Click,
      gameObject: Phaser.GameObjects.GameObject,
      pointer: Phaser.Input.Pointer,
      event: Phaser.Types.Input.EventData
    ) {
      let text = inputText.text;
      inputText.destroy();
      gameObject.destroy();
      cancelBtn.destroy();
      self.submitPrompt(text, npc);
    });

    cancelBtn.onClick(function (
      click: Click,
      gameObject: Phaser.GameObjects.GameObject,
      pointer: Phaser.Input.Pointer,
      event: Phaser.Types.Input.EventData
    ) {
      inputText.destroy();
      gameObject.destroy();
      submitBtn.destroy();
      self.enableKeyboard();
    });
  }

  submitPrompt(prompt: string, npc: Physics.Arcade.Sprite) {
    var waitingBox = this.createTextBox().start(
      "Waiting for the response...",
      200
    );
    var timer = this.time.addEvent({
      delay: 6000, // ms
      callback: () => {
        waitingBox.destroy();
        waitingBox = this.createTextBox().start(
          "Waiting for the response...",
          200
        );
      },
      loop: true,
    });
    fetch("http://127.0.0.1:10002/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify({
        content: prompt,
        sender: "Brendan",
        receiver_id: (npc as NPC).id,
        receiver: (npc as NPC).name,
      }),
    }).then((response) => {
      response.json().then((data) => {
        // console.log(data);
        timer.destroy();
        waitingBox.destroy();
        var content = JSON.parse(data.content);
        var responseBox = this.createTextBox()
          .start(content.text, 25)
          .on("complete", () => {
            this.enableKeyboard();
            this.input.keyboard.on("keydown", () => {
              responseBox.destroy();
              this.input.keyboard.off("keydown");
              (npc as NPC).setTalking(false);
            });
          });
      });
    });
  }

  createTextBox(): TextBox {
    var upperLeftCorner = this.cameras.main.getWorldPoint(
      this.cameras.main.width * 0.1,
      this.cameras.main.height * 0.8
    );
    var x = upperLeftCorner.x;
    var y = upperLeftCorner.y;
    var width = this.cameras.main.width * 0.8;
    var height = this.cameras.main.height * 0.15;
    var textBox = this.rexUI.add
      .textBox({
        x: x,
        y: y,
        background: this.rexUI.add.roundRectangle(
          0,
          0,
          2,
          2,
          20,
          COLOR_PRIMARY
        ),
        text: this.add
          .text(0, 0, "", {
            fixedWidth: width,
            wordWrap: {
              width: width,
            },
          })
          .setFixedSize(width, height),
        space: {
          left: 20,
          right: 20,
          top: 20,
          bottom: 20,
          icon: 10,
          text: 10,
        },
      })
      .setScale(0.25, 0.25)
      .setOrigin(0)
      .setDepth(Number.MAX_SAFE_INTEGER)
      .layout();
    return textBox;
  }

  getRandomTileAtLocation(location_name: string): TileXYType {
    var location = this.map.findObject("location", function (object) {
      return object.name == location_name;
    });
    var x = location.x;
    var y = location.y;
    var width = location.width;
    var height = location.height;
    var cnt = 0;
    debugger;
    do {
      if (cnt > 10) {
        console.log("Failed to find a random tile");
        return null;
      }
      var worldX = Math.floor(Math.random() * width) + x;
      var worldY = Math.floor(Math.random() * height) + y;
      var tile = this.board.worldXYToTileXY(worldX, worldY);
      cnt++;
    } while (
      this.board.hasBlocker(tile.x, tile.y) || // has wall
      this.board.tileXYToChessArray(tile.x, tile.y).length !=
        this.map.layers.length // has npc
    );
    return tile;
  }

  getNPCNeighbor(npc_name: string): [TileXYType, number, NPC] {
    var npc = this.npcGroup.getChildren().find((npc) => {
      return (npc as NPC).name == npc_name;
    }) as NPC;
    var npcTile = this.board.worldXYToTileXY(npc.x, npc.y);
    var directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
    var order = shuffle([0, 1, 2, 3]);
    var tileX = undefined;
    var tileY = undefined;
    for (let i = 0; i < 4; i++) {
      var direction = directions[order[i]];
      var tmpX = npcTile.x + direction[0];
      var tmpY = npcTile.y + direction[1];
      if (
        !this.board.hasBlocker(tmpX, tmpY) && // no wall
        this.board.tileXYToChessArray(tmpX, tmpY).length ==
          this.map.layers.length // no npc)
      ) {
        tileX = tmpX;
        tileY = tmpY;
        break;
      }
    }
    var finalDirection = DIRECTION.DOWN;
    if (direction[0] == 0 && direction[1] == 1) {
      finalDirection = DIRECTION.UP;
    } else if (direction[0] == 0 && direction[1] == -1) {
      finalDirection = DIRECTION.DOWN;
    } else if (direction[0] == 1 && direction[1] == 0) {
      finalDirection = DIRECTION.LEFT;
    } else if (direction[0] == -1 && direction[1] == 0) {
      finalDirection = DIRECTION.RIGHT;
    }
    return [{ x: tileX, y: tileY }, finalDirection, npc];
  }

  moveNPC(
    npcId: number,
    tile,
    finalDirection: number = undefined,
    targetLocation: string = undefined,
    targetNPC: NPC = undefined
  ): void {
    var npc = this.npcGroup.getChildren()[npcId] as NPC;
    var npc_chess = this.board.worldXYToChess(npc.x, npc.y);
    this.pathFinder.setChess(npc_chess);
    // var tmp = this.board.chessToTileXYZ(npc_chess);
    var path = this.pathFinder.findPath({
      x: tile.x,
      y: tile.y,
    } as TileXYType);
    npc.setTargetNPC(targetNPC);
    npc.moveAlongPath(path, finalDirection, targetLocation);
  }
}

function getNearbyNPC(
  player: Physics.Arcade.Sprite,
  npcGroup: GameObjects.Group
): [Physics.Arcade.Sprite | null, number] {
  var nearbyObject: Physics.Arcade.Sprite | null = null;

  // Not rigorous. Just a rough estimation. Requires that the npcs have
  // similar width and height to player.
  const nearbyDistance = 1.1 * Math.max(player.width, player.height);

  var direction = 0;
  npcGroup.getChildren().forEach(function (object) {
    var _object = object as Physics.Arcade.Sprite;
    const distance = Mathph.Distance.Between(
      player.x,
      player.y,
      _object.x,
      _object.y
    );

    if (distance <= nearbyDistance) {
      nearbyObject = _object;
      var x_ratio = (player.x - _object.x) / _object.width;
      var y_ratio = (player.y - _object.y) / _object.height;
      if (Math.abs(x_ratio) > Math.abs(y_ratio)) {
        if (x_ratio > 0) {
          direction = DIRECTION.RIGHT;
        } else {
          direction = DIRECTION.LEFT;
        }
      } else {
        if (y_ratio > 0) {
          direction = DIRECTION.DOWN;
        } else {
          direction = DIRECTION.UP;
        }
      }
    }
  });

  return [nearbyObject, direction];
}
