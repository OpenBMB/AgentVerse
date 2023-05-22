import Image from '../image/Image.js';
import RenderTexture from '../rendertexture/RenderTexture.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const DefaultImageConfig = { key: '__WHITE' };
const ClassMap = {
    image: Image,
    rendertexture: RenderTexture
}

var CreatePerspectiveObject = function (scene, config) {
    if (config === undefined) {
        config = DefaultImageConfig;
    }

    var perspectiveObject;
    if (IsPlainObject(config)) {
        if (!config.hasOwnProperty('type')) {
            if (config.hasOwnProperty('key')) {
                config.type = 'image';
            } else if (config.hasOwnProperty('width')) {
                config.type = 'rendertexture';
            }
        }

        perspectiveObject = new (ClassMap[config.type])(scene, config);
        scene.add.existing(perspectiveObject);
    } else {
        perspectiveObject = config;
    }

    return perspectiveObject;
}

export default CreatePerspectiveObject;