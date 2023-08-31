var UpdateTexture = function () {
    this.clear();

    if (this.textureKey === undefined) {
        return this;
    }
    var texture = this.scene.sys.textures.get(this.textureKey);
    if (!texture) {
        return this;
    }

    var minWidth = this.columns.minWidth * this.maxFixedPartScaleX;  // Fixed-part width
    var minHeight = this.rows.minHeight * this.maxFixedPartScaleY;   // Fixed-part height
    var stretchWidth = this.width - minWidth;
    var stretchHeight = this.height - minHeight;
    var fixedPartScaleX = (stretchWidth >= 0) ? this.maxFixedPartScaleX : (this.width / minWidth);
    var fixedPartScaleY = (stretchHeight >= 0) ? this.maxFixedPartScaleY : (this.height / minHeight);

    if (this.preserveRatio) {
        var minScale = Math.min(fixedPartScaleX, fixedPartScaleY);
        if (fixedPartScaleX > minScale) {
            var compensationWidth = (fixedPartScaleX - minScale) * minWidth;
            if (stretchWidth >= 0) {
                stretchWidth += compensationWidth;
            } else {
                stretchWidth = compensationWidth;
            }
            fixedPartScaleX = minScale;
        }
        if (fixedPartScaleY > minScale) {
            var compensationHeight = (fixedPartScaleY - minScale) * minHeight;
            if (stretchHeight >= 0) {
                stretchHeight += compensationHeight;
            } else {
                stretchHeight = compensationHeight;
            }
            fixedPartScaleY = minScale;
        }
    }
    this.columns.scale = fixedPartScaleX;
    this.rows.scale = fixedPartScaleY;

    var proportionWidth;
    if (stretchWidth > 0) {
        proportionWidth = (this.columns.stretch > 0) ? (stretchWidth / this.columns.stretch) : 0;
    } else {
        proportionWidth = 0;
    }

    var proportionHeight;
    if (stretchHeight > 0) {
        proportionHeight = (this.rows.stretch > 0) ? (stretchHeight / this.rows.stretch) : 0;
    } else {
        proportionHeight = 0;
    }

    var frameName, col, row, colWidth, rowHeight;
    var offsetX = 0, offsetY = 0;
    var imageType;

    this._beginDraw();
    for (var j = 0, jcnt = this.rows.count; j < jcnt; j++) {
        row = this.rows.data[j];
        rowHeight = (row.stretch === 0) ? (row.height * fixedPartScaleY) : (proportionHeight * row.stretch);

        offsetX = 0;
        for (var i = 0, icnt = this.columns.count; i < icnt; i++) {
            col = this.columns.data[i];
            colWidth = (col.stretch === 0) ? (col.width * fixedPartScaleX) : (proportionWidth * col.stretch);

            frameName = this.getFrameNameCallback(i, j, this.baseFrameName);
            if (texture.has(frameName) && (colWidth > 0) && (rowHeight > 0)) {
                if ((row.stretch === 0) && (col.stretch === 0)) { // Fixed parts
                    imageType = 0; // Draw image
                } else { // Stretchable parts
                    if (this.getStretchMode(i, j) === 0) { // Scaled image
                        imageType = 0; // Draw scaled image
                    } else { // Repeat tile-sprite
                        imageType = 1; // Draw tile-sprite
                    }
                }

                if (imageType === 0) {
                    this._drawImage(
                        this.textureKey, frameName,
                        offsetX, offsetY,
                        colWidth, rowHeight
                    );
                } else {
                    this._drawTileSprite(
                        this.textureKey, frameName,
                        offsetX, offsetY,
                        colWidth, rowHeight
                    );
                }
            }

            offsetX += colWidth;
        }

        offsetY += rowHeight;
    }
    this._endDraw();
}

export default UpdateTexture;