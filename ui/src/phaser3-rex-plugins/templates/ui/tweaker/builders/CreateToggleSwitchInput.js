import ToggleSwitchInput from '../gameobjects/inputfield/ToggleSwitchInput.js';

var CreateToggleSwitchInput = function (scene, config, style) {
    var gameObject = new ToggleSwitchInput(scene, style);
    scene.add.existing(gameObject);

    return gameObject;
}

export default CreateToggleSwitchInput;