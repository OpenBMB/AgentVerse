import MergeStyle from './utils/MergeStyle.js';
import NinePatch from '../../ninepatch2/NinePatch.js';

var CreateNinePatch2 = function (scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);

    var gameObject = new NinePatch(scene, data);

    scene.add.existing(gameObject);
    return gameObject;
}
export default CreateNinePatch2;