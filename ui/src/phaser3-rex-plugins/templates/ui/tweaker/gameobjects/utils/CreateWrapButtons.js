import FixWidthButtons from '../../../fixwidthbuttons/FixWidthButtons.js';

var CreateWrapButtons = function (scene, config) {
    var gameObject = new FixWidthButtons(scene, config);
    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateWrapButtons;