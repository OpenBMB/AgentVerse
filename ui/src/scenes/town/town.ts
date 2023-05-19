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
// import { Agents, Message } from '../../classes/message';
// import UIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";
// import { TextBox } from "../../classes/textbox";

export class TownScene extends Scene {
  private map: Tilemaps.Tilemap;
  private tileset: Tilemaps.Tileset;
  private groundLayer: Tilemaps.TilemapLayer;
  private wallLayer: Tilemaps.TilemapLayer;
  private flowerLayer: Tilemaps.TilemapLayer;
  private treeLayer: Tilemaps.TilemapLayer;
  private houseLayer: Tilemaps.TilemapLayer;

  private player: Physics.Arcade.Sprite;
  private npcGroup: GameObjects.Group;
  private keySpace: Phaser.Input.Keyboard.Key;
  // private message!: GameObjects.Text;

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
    var npc = new NPC(this, 400, 340);
    this.npcGroup.add(npc);
    this.physics.add.collider(this.npcGroup, this.wallLayer);
    this.physics.add.collider(this.npcGroup, this.treeLayer);
    this.physics.add.collider(this.npcGroup, this.houseLayer);
    this.physics.add.collider(this.player, this.npcGroup);

    this.keySpace.on("down", () => {
      var npc: Physics.Arcade.Sprite | null = getNearbyNPC(
        this.player,
        this.npcGroup
      );
      if (npc) {
        createTextBox(this);
      }
    });

    // this.physics.add.overlap(this.player, this.npcGroup, interact, null, this);

    // message (this, x_position, y_position)
    // this.message = new Message(this, 0, 560);

    this.physics.world.setBounds(
      0,
      0,
      this.groundLayer.width + this.player.width,
      this.groundLayer.height
    );

    // Camera
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
    // this.npc.update();
    // this.conversation.updateMessage();
    // this.conversation.getMessage();
  }
}

function createTextBox(scene: Scene) {
  console.log("Hi");
  scene.scene.launch("textbox-scene", { text: Math.random().toString() });
  scene.scene.pause("town-scene");
}

function getNearbyNPC(
  player: Physics.Arcade.Sprite,
  npcGroup: GameObjects.Group
): Physics.Arcade.Sprite | null {
  var nearbyObject: Physics.Arcade.Sprite | null = null;
  const nearbyDistance = Math.max(player.width, player.height);

  npcGroup.getChildren().forEach(function (object) {
    const distance = Mathph.Distance.Between(
      player.x,
      player.y,
      (object as Physics.Arcade.Sprite).x,
      (object as Physics.Arcade.Sprite).y
    );

    if (distance <= nearbyDistance) {
      nearbyObject = object as Physics.Arcade.Sprite;
    }
  });

  return nearbyObject;
}
