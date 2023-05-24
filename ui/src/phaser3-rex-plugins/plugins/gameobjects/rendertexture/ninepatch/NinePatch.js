import NinePatchBase from '../../../utils/ninepatch/NinePatch.js';
import DrawImage from '../utils/DrawImage.js';
import DrawTileSprite from '../utils/DrawTileSprite.js';

const RenderTexture = Phaser.GameObjects.RenderTexture;

class NinePatch extends NinePatchBase(RenderTexture, 'rexNinePatch') {
}

var Methods = {
    _beginDraw: RenderTexture.prototype.beginDraw,
    _endDraw: RenderTexture.prototype.endDraw,
    _drawImage: DrawImage,
    _drawTileSprite: DrawTileSprite,
}
Object.assign(
    NinePatch.prototype,
    Methods
);

export default NinePatch;