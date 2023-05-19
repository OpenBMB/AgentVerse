import RangeInput from '../gameobjects/inputfield/RangeInput.js';

var CreateRangeInput = function (scene, config, style) {
    var gameObject = new RangeInput(scene, style);
    scene.add.existing(gameObject);

    gameObject.setRange(config.min, config.max, config.step);
    gameObject.setInputTextReadOnly(!!config.inputTextReadOnly);

    return gameObject;
}

export default CreateRangeInput;