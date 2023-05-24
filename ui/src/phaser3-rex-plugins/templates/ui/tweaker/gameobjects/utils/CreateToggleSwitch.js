import ToggleSwitch from '../../../toggleswitch/ToggleSwitch.js';

var CreateToggleSwitch = function (scene, config) {
    var gameObject = new ToggleSwitch(scene, config);
    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateToggleSwitch;