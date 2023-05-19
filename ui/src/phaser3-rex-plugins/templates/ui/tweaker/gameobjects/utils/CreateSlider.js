import Slider from '../../../slider/Slider.js';

var CreateSlider = function (scene, config) {
    var gameObject = new Slider(scene, config);
    scene.add.existing(gameObject);

    return gameObject;
}

export default CreateSlider;