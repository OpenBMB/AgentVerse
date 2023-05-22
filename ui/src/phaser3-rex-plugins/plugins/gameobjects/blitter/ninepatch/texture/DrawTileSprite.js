import AddImage from '../../blitterbase/utils/AddImage.js';

var DrawTileSprite = function (key, frame, x, y, width, height) {
    var frameObj = this.texture.get(frame);
    var frameWidth = frameObj.width,
        frameHeight = frameObj.height;
    var colCount = Math.floor(width / frameWidth),
        rowCount = Math.floor(height / frameHeight);
    // Align images at center
    x += (width - (colCount * frameWidth)) / 2;
    y += (height - (rowCount * frameHeight)) / 2;
    for (var colIndex = 0; colIndex < colCount; colIndex++) {
        for (var rowIndex = 0; rowIndex < rowCount; rowIndex++) {
            AddImage(this, {
                frame: frame,
                x: x + (colIndex * frameWidth),
                y: y + (rowIndex * frameHeight),
            })
        }
    }

}

export default DrawTileSprite;