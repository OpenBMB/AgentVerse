import ToggleSwitchShape from './ToggleSwitchShape.js';

export default function (x, y, width, height, color, config) {
    var gameObject = new ToggleSwitchShape(this.scene, x, y, width, height, color, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};