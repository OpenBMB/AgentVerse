import Image from '../image/Image.js';
import CreateDynamicTexture from '../../../../utils/rendertexture/CreateDynamicTexture.js';
import Snapshot from '../../../../utils/rendertexture/Snapshot.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class RenderTexture extends Image {
    constructor(scene, x, y, width, height, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', 32);
            height = GetValue(config, 'height', 32);
        }

        // dynamic-texture -> quad-image
        var texture = CreateDynamicTexture(scene, width, height);

        super(scene, x, y, texture, null, config);
        this.type = 'rexQuadRenderTexture';
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

    snapshot(gameObjects, config) {
        if (config === undefined) {
            config = {};
        }
        config.gameObjects = gameObjects;
        config.renderTexture = this.rt;

        Snapshot(config);

        if ((this.width !== this.frame.realWidth) || (this.height !== this.frame.realHeight)) {
            this.syncSize();
        }

        return this;
    }
}

export default RenderTexture;