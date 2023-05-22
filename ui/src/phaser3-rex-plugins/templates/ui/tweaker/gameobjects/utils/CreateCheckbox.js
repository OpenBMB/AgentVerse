import Checkbox from '../../../checkbox/Checkbox.js';

var CreateCheckbox = function (scene, config) {
    var gameObject = new Checkbox(scene, config);
    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateCheckbox;