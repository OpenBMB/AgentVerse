import ToggleSwitch from './ToggleSwitch.js';

export default function (x, y, width, height, color, config) {
    var gameObject = new ToggleSwitch(this.scene, x, y, width, height, color, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};