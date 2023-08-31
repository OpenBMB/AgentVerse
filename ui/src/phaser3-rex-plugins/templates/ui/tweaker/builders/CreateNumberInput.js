import NumberInput from '../gameobjects/inputfield/NumberInput.js';

var CreateNumberInput = function (scene, config, style) {
    var gameObject = new NumberInput(scene, style);
    scene.add.existing(gameObject);

    gameObject.setInputTextReadOnly(!!config.inputTextReadOnly);

    return gameObject;
}

export default CreateNumberInput;