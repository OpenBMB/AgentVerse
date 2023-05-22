import GetStampGameObject from './GetStampGameObject.js';

var DrawImage = function (key, frame, x, y, width, height) {
    var gameObject = GetStampGameObject(this, 'Image')
        .setTexture(key, frame)
        .setDisplaySize(width, height);

    this.batchDraw(gameObject, x, y);
}

export default DrawImage;