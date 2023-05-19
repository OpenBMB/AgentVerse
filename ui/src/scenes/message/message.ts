import { Scene } from "phaser";

import { TextBox } from "../../classes/textbox";

export class TextboxScene extends Scene {
  private text!: string;
  private textbox!: TextBox;
  private keySpace!: Phaser.Input.Keyboard.Key;
  constructor() {
    super("textbox-scene");
  }
  preload(): void {
    this.keySpace = this.input.keyboard!.addKey("SPACE");
    this.keySpace.on("down", () => {
      this.scene.resume("town-scene");
      this.scene.stop();
    });
  }

  init(data: { text: string }): void {
    this.text = data.text;
  }

  create(): void {
    // this.message = new Message(this, 0, 560, "Receieve Message");
    this.textbox = new TextBox({
      scene: this,
      x: this.game.scale.width * 0.05,
      y: this.game.scale.width * 0.9,
      width: this.game.scale.width * 0.9,
      text: this.text,
    });
    this.add.existing(this.textbox);
  }
}
