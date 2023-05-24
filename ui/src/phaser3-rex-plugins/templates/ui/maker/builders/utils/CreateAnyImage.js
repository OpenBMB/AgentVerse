import MergeStyle from './MergeStyle.js';
import SetTextureProperties from './SetTextureProperties.js';

var CreateAnyImage = function (scene, data, view, styles, customBuilders, ImageClass) {
    data = MergeStyle(data, styles);
    var gameObject = new ImageClass(scene, 0, 0, data.key, data.frame);

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

export default CreateAnyImage;