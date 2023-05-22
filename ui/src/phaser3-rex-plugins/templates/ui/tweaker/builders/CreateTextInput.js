import TextInput from '../gameobjects/inputfield/TextInput.js';

var CreateTextInput = function (scene, config, style) {
    var gameObject = new TextInput(scene, style);
    scene.add.existing(gameObject);

    gameObject.setInputTextReadOnly(!!config.inputTextReadOnly);

    return gameObject;
}

export default CreateTextInput;