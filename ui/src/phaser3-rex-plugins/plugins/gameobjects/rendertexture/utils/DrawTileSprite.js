import GetStampGameObject from './GetStampGameObject.js';

var DrawTileSprite = function (key, frame, x, y, width, height) {
    var gameObject = GetStampGameObject(this, 'TileSprite')
        .setTexture(key, frame)
        .setSize(width, height);

    this.batchDraw(gameObject, x, y);
}

export default DrawTileSprite;