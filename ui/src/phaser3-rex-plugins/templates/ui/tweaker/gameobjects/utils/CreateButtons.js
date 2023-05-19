import Buttons from '../../../buttons/Buttons.js';

var CreateButtons = function (scene, config) {
    var gameObject = new Buttons(scene, config);
    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateButtons;