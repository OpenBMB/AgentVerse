import StatesRoundRectangle from '../../statesroundrectangle/StatesRoundRectangle.js';

var CreateButtonRoundRectangleBackground = function (scene, config) {
    var gameObject = new StatesRoundRectangle(scene, config);
    scene.add.existing(gameObject);

    return gameObject;
}

export default CreateButtonRoundRectangleBackground;