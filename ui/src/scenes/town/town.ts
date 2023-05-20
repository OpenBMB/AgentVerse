import * as Phaser from "phaser";
import {
  Scene,
  Tilemaps,
  GameObjects,
  Physics,
  Input,
  Math as Mathph,
} from "phaser";
import { Player } from "../../classes/player";
import { NPC } from "../../classes/npc";
import { DIRECTION } from "../../utils";
import {
  TextBox,
  Click,
} from "../../phaser3-rex-plugins/templates/ui/ui-components";
import UIPlugin from "../../phaser3-rex-plugins/templates/ui/ui-plugin";

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

export class TownScene extends Scene {
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
  private rexUI: UIPlugin;

  constructor() {
    super("town-scene");
  }

  create(): void {
    // Background
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

    this.keySpace = this.input.keyboard!.addKey("SPACE");

    // Player
    this.player = new Player(this, 256, 256);
    this.physics.add.collider(this.player, this.wallLayer);
    this.physics.add.collider(this.player, this.treeLayer);
    this.physics.add.collider(this.player, this.houseLayer);

    // NPC
    this.npcGroup = this.add.group();
    var npcPoints = this.map.filterObjects("npcs", (npc) => {
      return npc.type === "npc";
    });
    var npcs = npcPoints.map((npc) => {
      var id_property = npc.properties.filter((property) => {
        return property.name === "id";
      });
      this.npcGroup.add(
        new NPC(this, npc.x, npc.y, npc.name, id_property[0].value)
      );
    });
    this.physics.add.collider(this.npcGroup, this.wallLayer);
    this.physics.add.collider(this.npcGroup, this.treeLayer);
    this.physics.add.collider(this.npcGroup, this.houseLayer);
    this.physics.add.collider(this.player, this.npcGroup);

    this.keySpace.on("up", () => {
      var ret = getNearbyNPC(this.player, this.npcGroup);
      var npc = ret[0];
      if (npc) {
        (npc as NPC).changeDirection(ret[1]);
        this.createInputBox(npc);
      }
    });

    this.physics.world.setBounds(
      0,
      0,
      this.groundLayer.width + this.player.width,
      this.groundLayer.height
    );

    // Camera;
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

  update(): void {
    this.player.update();
    this.npcGroup.getChildren().forEach(function (npc) {
      (npc as NPC).update();
    });
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
        text: "Input your words",
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
    debugger;
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
        console.log(data);
        timer.destroy();
        waitingBox.destroy();
        var responseBox = this.createTextBox()
          .start(data.content, 50)
          .on("complete", () => {
            this.enableKeyboard();
            this.input.keyboard.on("keyup", () => {
              responseBox.destroy();
              this.input.keyboard.off("keyup");
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
      .layout();
    return textBox;
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
