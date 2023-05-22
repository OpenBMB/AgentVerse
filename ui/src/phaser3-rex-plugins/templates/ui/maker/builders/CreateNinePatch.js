import MergeStyle from './utils/MergeStyle.js';
import NinePatch from '../../ninepatch/NinePatch.js';
import SetTextureProperties from './utils/SetTextureProperties.js';

var CreateNinePatch = function (scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);

    var gameObject = new NinePatch(scene, data);

    SetTextureProperties(gameObject, data);

    scene.add.existing(gameObject);
    return gameObject;
}
export default CreateNinePatch;