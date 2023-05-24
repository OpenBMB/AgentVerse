import LineProgressCanvas from './LineProgressCanvas.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('circularProgressCanvas', function (x, y, width, height, barColor, value, config) {
    var gameObject = new LineProgressCanvas(this.scene, x, y, width, height, barColor, value, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.LineProgressCanvas', LineProgressCanvas);

export default LineProgressCanvas;