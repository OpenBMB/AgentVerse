import MergeStyle from './utils/MergeStyle.js';
import CircleMaskImage from '../../circlemaskimage/CircleMaskImage.js';
import SetTextureProperties from './utils/SetTextureProperties.js';

var CreateCircleMaskImage = function (scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);
    var gameObject = new CircleMaskImage(scene, 0, 0, data.key, data.frame, data);

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

export default CreateCircleMaskImage;