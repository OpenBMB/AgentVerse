import MergeStyle from './utils/MergeStyle.js';
import SetTextureProperties from './utils/SetTextureProperties.js';

const PhaserVideo = Phaser.GameObjects.Video;

var CreateVideo = function (scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);
    var gameObject = new PhaserVideo(scene, 0, 0, data.key);

    if (data.width !== undefined) {
        gameObject.setDisplayWidth(data.width);
    }
    if (data.height !== undefined) {
        gameObject.setDisplayHeight(data.height);
    }

    SetTextureProperties(gameObject, data);

    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateVideo;