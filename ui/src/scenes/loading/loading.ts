import { Scene } from "phaser";

export class LoadingScene extends Scene {
  // private player!: GameObjects.Sprite;

  constructor() {
    super("loading-scene");
  }

  preload(): void {
    this.load.baseURL = "assets/";

    // SPRITE LOADING
    this.load.spritesheet("Brendan", "sprites/brendan.png", {
      frameWidth: 14,
      frameHeight: 21,
    });

    this.load.spritesheet("May", "sprites/may.png", {
      frameWidth: 14,
      frameHeight: 20,
    });

    this.load.spritesheet("Birch", "sprites/birch.png", {
      frameWidth: 16,
      frameHeight: 20,
    });

    this.load.spritesheet("Steven", "sprites/steven.png", {
      frameWidth: 16,
      frameHeight: 21,
    });

    this.load.spritesheet("Maxie", "sprites/maxie.png", {
      frameWidth: 16,
      frameHeight: 20,
    });

    this.load.spritesheet("Archie", "sprites/archie.png", {
      frameWidth: 16,
      frameHeight: 20,
    });

    this.load.spritesheet("Joseph", "sprites/joseph.png", {
      frameWidth: 14,
      frameHeight: 21,
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
  }

  create(): void {
    // this.scene.start('level-1-scene');
    // this.scene.start('ui-scene');
    this.scene.start("town-scene");
    // this.scene.start("textbox-scene");
    // this.scene.start("message-scene");
  }
}
