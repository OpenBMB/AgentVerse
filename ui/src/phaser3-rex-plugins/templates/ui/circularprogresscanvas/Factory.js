import CircularProgressCanvas from './CircularProgressCanvas.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('circularProgressCanvas', function (x, y, radius, barColor, value, config) {
    var gameObject = new CircularProgressCanvas(this.scene, x, y, radius, barColor, value, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.CircularProgressCanvas', CircularProgressCanvas);

export default CircularProgressCanvas;