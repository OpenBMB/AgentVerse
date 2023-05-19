import { GameObjects } from "phaser";
const TILE_SIZE = 16;

export class TextBox extends GameObjects.Container {
  backgroundColor: number;
  textPadding: number;
  textElement: GameObjects.Text;

  constructor({ scene, x, y, width, text }) {
    super(scene, 0, 0, []);

    this.backgroundColor = 0x006363;
    this.textPadding = 20;

    // Init text first, so box can adapt to its height
    this._initText(width, text);
    const height = this.textElement.height + this.textPadding * 2;

    this._initBox(height, width);

    // Add text after box, so its on the box
    this.add(this.textElement);

    this.setPosition(x, y);
    this.setSize(width, height);

    scene.add.existing(this);
  }

  _initBox(height: number, width: number) {
    const background = this.scene.add
      .rectangle(0, 0, width, height, this.backgroundColor)
      .setOrigin(0, 0);
    this.add(background);

    // Init corners
    const topLeft = this._addSprite(0, 0, 0);
    const topRight = this._addSprite(width - TILE_SIZE, 0, 2);
    const bottomLeft = this._addSprite(0, height - TILE_SIZE, 6);
    const bottomRight = this._addSprite(
      width - TILE_SIZE,
      height - TILE_SIZE,
      8
    );

    // Init middle parts

    // Init top middle
    this._addSprite(topLeft.getRightCenter().x!, 0, 1, topRight.x - TILE_SIZE);

    // Init middle left
    this._addSprite(
      0,
      topLeft.getBottomCenter().y!,
      3,
      null,
      bottomLeft.y - TILE_SIZE
    );

    // Init middle right
    this._addSprite(
      topRight.x,
      topRight.getBottomCenter().y!,
      5,
      null,
      bottomRight.y - TILE_SIZE
    );

    // Init bottom middle
    this._addSprite(
      bottomLeft.getRightCenter().x!,
      bottomLeft.y,
      7,
      bottomRight.x - TILE_SIZE
    );
  }

  _addSprite(
    x: number,
    y: number,
    frame: number,
    width: number | null = null,
    height: number | null = null
  ) {
    const sprite = this.scene.add
      .sprite(x, y, "textbox", frame)
      .setOrigin(0, 0);

    if (width !== null) {
      sprite.displayWidth = width;
    }

    if (height !== null) {
      sprite.displayHeight = height;
    }

    this.add(sprite);

    return sprite;
  }

  _initText(width: number, text: string) {
    const textWidth = width - this.textPadding * 2;

    this.textElement = this.scene.add.text(
      this.textPadding,
      this.textPadding,
      text,
      this._getTextStyle(textWidth)
    );
  }

  _getTextStyle(width: number) {
    return {
      fontSize: 20,
      lineSpacing: 10,
      wordWrap: { width },
    };
  }
}
