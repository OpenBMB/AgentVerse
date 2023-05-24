import DrawImage from '../utils/DrawImage.js';
import DrawTileSprite from '../utils/DrawTileSprite.js';

const DistanceBetween = Phaser.Math.Distance.Between;
const AngleBetween = Phaser.Math.Angle.Between;

var UpdateTexture = function () {
    if (!this.redraw) {
        return this;
    }
    this.redraw = false;

    // Note: Don't use clear method here
    // this.clear();  // this.setSize(w,h) will clear content

    var lineStartFrame = this.lineStartFrame;
    var lineEndFrame = this.lineEndFrame;
    var lineBodyFrame = this.lineBodyFrame;
    var lineStartOffset = 0;
    var width = DistanceBetween(this.x0, this.y0, this.x1, this.y1),
        height = 0,
        rotation = AngleBetween(this.x0, this.y0, this.x1, this.y1);
    if (lineStartFrame) {
        lineStartOffset = this.lineStartOrigin * lineStartFrame.cutWidth;
        width += lineStartOffset;
        height = lineStartFrame.cutHeight;
    }
    if (lineEndFrame) {
        width += ((1 - this.lineEndOrigin) * lineEndFrame.cutWidth);
        height = Math.max(height, lineEndFrame.cutHeight);
    }
    if (lineBodyFrame) {
        var lineBodyHeight = (this.lineBodyWidth !== undefined) ? this.lineBodyWidth : lineBodyFrame.cutHeight;
        height = Math.max(height, lineBodyHeight);
    }

    width = Math.floor(width);
    height = Math.floor(height);

    // no line
    if ((width <= 0) || (height <= 0)) {
        this
            .setPosition(this.x0, this.y0)
            .setSize(1, 1)
            .setRotation(rotation);
        return this;
    }

    if ((this.width === width) && (this.height === height)) {
        this.setSize(width + 1, height + 1); // Force size changing, to clear content
    }

    this
        .setSize(width, height)
        .setPosition(this.x0, this.y0)
        .setRotation(rotation)
        .setOrigin(0, 0); // Set origin to (0,0) before pasting textures

    var offsetX, offsetY;
    var remainderWidth = this.width;

    this.beginDraw();

    // Draw line start
    if (lineStartFrame) {
        offsetX = 0;
        offsetY = (this.height - lineStartFrame.cutHeight) / 2;
        this.drawFrame(this.lineStartTexture, this.lineStartFrameName, offsetX, offsetY);
        remainderWidth -= lineStartFrame.cutWidth;
    }
    // Draw line end
    if (lineEndFrame) {
        offsetX = this.width - lineEndFrame.cutWidth;
        offsetY = (this.height - lineEndFrame.cutHeight) / 2;
        this.drawFrame(this.lineEndTexture, this.lineEndFrameName, offsetX, offsetY);
        remainderWidth -= lineEndFrame.cutWidth;
    }

    // Draw line body
    if (lineBodyFrame && (remainderWidth > 0) && (lineBodyHeight > 0)) {
        offsetX = (lineStartFrame) ? lineStartFrame.cutWidth : 0;
        offsetY = (this.height - lineBodyHeight) / 2;

        if (this.lineBodyExtendMode === 0) {
            DrawImage.call(this,
                this.lineBodyTexture, this.lineBodyFrameName,
                offsetX, offsetY,
                remainderWidth, lineBodyHeight
            );
        } else {
            DrawTileSprite.call(this,
                this.lineBodyTexture, this.lineBodyFrameName,
                offsetX, offsetY,
                remainderWidth, lineBodyHeight
            );
        }
    }

    this.endDraw();

    var originX = 1 - ((width - lineStartOffset) / width);
    this.setOrigin(originX, 0.5);
}

export default UpdateTexture;