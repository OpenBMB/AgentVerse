import ColorInput from '../../colorinput/colorinput/ColorInput.js';
import DeepClone from '../../../../plugins/utils/object/DeepClone.js';

var CreateColorInput = function (scene, config, deepCloneConfig) {
    if (deepCloneConfig === undefined) {
        deepCloneConfig = true;
    }

    if (deepCloneConfig) {
        config = (config) ? DeepClone(config) : {};
    } else if (!config) {
        config = {};
    }


    var inputText = new ColorInput(scene, config);
    scene.add.existing(inputText);
    return inputText;
}

export default CreateColorInput;