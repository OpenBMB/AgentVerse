import CanvasInput from './CanvasInput.js'

export default function (x, y, width, height, config) {
    var gameObject = new CanvasInput(this.scene, x, y, width, height, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};