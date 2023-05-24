import RoundRectangleCanvas from './RoundRectangleCanvas.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('roundRectangleCanvas', function (x, y, width, height, radius, fillStyle, strokeStyle, lineWidth, fillColor2, isHorizontalGradient) {
    var gameObject = new RoundRectangleCanvas(this.scene, x, y, width, height, radius, fillStyle, strokeStyle, lineWidth, fillColor2, isHorizontalGradient);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.RoundRectangleCanvas', RoundRectangleCanvas);

export default RoundRectangleCanvas;