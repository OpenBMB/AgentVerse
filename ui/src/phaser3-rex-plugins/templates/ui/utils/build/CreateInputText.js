import CanvasInput from '../../canvasinput/CanvasInput.js';
import DeepClone from '../../../../plugins/utils/object/DeepClone.js';

var CreateInputText = function (scene, config, deepCloneConfig) {
    if (deepCloneConfig === undefined) {
        deepCloneConfig = true;
    }

    if (deepCloneConfig) {
        config = (config) ? DeepClone(config) : {};
    } else if (!config) {
        config = {};
    }


    var inputText = new CanvasInput(scene, config);
    scene.add.existing(inputText);
    return inputText;
}

export default CreateInputText;