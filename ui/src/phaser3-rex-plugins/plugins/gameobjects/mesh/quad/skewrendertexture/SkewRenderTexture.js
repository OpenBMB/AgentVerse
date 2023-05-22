import SkewImage from '../skewimage/SkewImage.js';
import CreateDynamicTexture from '../../../../utils/rendertexture/CreateDynamicTexture.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class SkewRenderTexture extends SkewImage {
    constructor(scene, x, y, width, height) {
        if (IsPlainObject(x)) {
            var config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', 32);
            height = GetValue(config, 'height', 32);
        }

        // dynamic-texture -> quad-image
        var texture = CreateDynamicTexture(scene, width, height);

        super(scene, x, y, texture, null);
        this.type = 'rexSkewRenderTexture';
        this.rt = this.texture;
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        super.destroy(fromScene);

        this.rt.destroy();
        this.rt = null;
    }
}

export default SkewRenderTexture;