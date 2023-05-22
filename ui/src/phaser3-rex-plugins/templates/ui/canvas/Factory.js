import Canvas from './Canvas.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('canvas', function (x, y, width, height) {
    var gameObject = new Canvas(this.scene, x, y, width, height);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.Canvas', Canvas);

export default Canvas;