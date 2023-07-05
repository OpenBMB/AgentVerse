import RoundRectangle from '../../roundrectangle/RoundRectangle.js';

var CreateRoundRectangle = function (scene, config) {
    var gameObject = new RoundRectangle(scene, config);
    scene.add.existing(gameObject);

    return gameObject;
}

export default CreateRoundRectangle;