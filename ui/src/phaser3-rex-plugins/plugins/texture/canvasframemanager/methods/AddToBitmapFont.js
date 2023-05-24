var AddToBitmapFont = function () {
    var textureKey = this.texture.key;
    // Don't add a new font data, reuse current font data
    var cacheData = this.bitmapFontCache.get(textureKey);
    if (!cacheData) {
        cacheData = {
            data: {
                retroFont: true,
                font: textureKey,
                size: this.cellWidth,
                lineHeight: this.cellHeight,
                chars: {}
            },
            texture: textureKey,
            frame: null,
        };
        this.bitmapFontCache.add(textureKey, cacheData);
    }
    var charData = cacheData.data.chars;    

    var letters = this.frameNames;
    for (var i = 0, cnt = letters.length; i < cnt; i++) {
        var char = letters[i];
        if (char === undefined) {
            continue;
        }

        var frame = this.texture.get(char);
        var x = frame.cutX,
            y = frame.cutY,
            width = frame.cutWidth,
            height = frame.cutHeight;

        charData[char.charCodeAt(0)] = {
            x: x, y: y,
            width: width, height: height,
            centerX: x + (width / 2),
            centerY: y + (height / 2),
            xOffset: 0,
            yOffset: 0,
            xAdvance: width,
            data: {},
            kerning: {},
            u0: frame.u0,
            v0: frame.v0,
            u1: frame.u1,
            v1: frame.v1
        }
    }

    return this;
}
export default AddToBitmapFont;