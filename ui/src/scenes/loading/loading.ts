import { Scene } from "phaser";

export class LoadingScene extends Scene {
  // private player!: GameObjects.Sprite;

  constructor() {
    super("loading-scene");
  }

  preload(): void {
    this.load.baseURL = "assets/";

    // PLAYER LOADING
    // this.load.image('king', 'sprites/king.png');
    this.load.spritesheet("player", "sprites/npc1.png", {
      frameWidth: 14,
      frameHeight: 20,
    });
    // this.load.atlas('a-king', 'spritesheets/a-king.png', 'spritesheets/a-king_atlas.json');

    // NPC LOADING
    this.load.spritesheet("npc", "sprites/npc1.png", {
      frameWidth: 14,
      frameHeight: 20,
    });

    // MESSAGE BLABK LOADING
    // this.load.spritesheet('message', 'message/message_box.png', { frameWidth: 128, frameHeight: 48 });

    // MAP LOADING
    this.load.image({
      key: "tiles",
      url: "tilemaps/tiles/tileset.png",
    });
    this.load.tilemapTiledJSON("town", "tilemaps/json/town.json");

    // CHEST LOADING
    // this.load.spritesheet('tiles_spr', 'tilemaps/tiles/dungeon-16-16.png', {
    //   frameWidth: 16,
    //   frameHeight: 16,
    // });

    this.load.spritesheet(
      "textbox",
      "https://nick-hat-boecker.de/files/images/dynamic_box.png",
      {
        frameWidth: 16,
        frameHeight: 16,
      }
    );
  }

  create(): void {
    // this.scene.start('level-1-scene');
    // this.scene.start('ui-scene');
    this.scene.start("town-scene");
    // this.scene.start("textbox-scene");
    // this.scene.start("message-scene");
  }
}
