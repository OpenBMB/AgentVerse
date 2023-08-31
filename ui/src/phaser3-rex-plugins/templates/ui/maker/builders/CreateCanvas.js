import MergeStyle from './utils/MergeStyle.js';
import Canvas from '../../canvas/Canvas.js';
import SetTextureProperties from './utils/SetTextureProperties.js';


var CreateCanvas = function (scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);

    var width = data.width || 1;
    var height = data.height || 1;
    var gameObject = new Canvas(scene, 0, 0, width, height);

    if (data.fill !== undefined) {
        gameObject.fill(data.fill);
    }

    SetTextureProperties(gameObject, data);

    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateCanvas;