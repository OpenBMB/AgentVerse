import CheckboxInput from '../gameobjects/inputfield/CheckboxInput.js';

var CreateCheckboxInput = function (scene, config, style) {
    var gameObject = new CheckboxInput(scene, style);
    scene.add.existing(gameObject);

    return gameObject;
}

export default CreateCheckboxInput;