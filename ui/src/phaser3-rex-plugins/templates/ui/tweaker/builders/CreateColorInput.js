import ColorInput from '../gameobjects/inputfield/ColorInput.js';

var CreateColorInput = function (scene, config, style) {
    var gameObject = new ColorInput(scene, style);
    scene.add.existing(gameObject);

    return gameObject;
}

export default CreateColorInput;