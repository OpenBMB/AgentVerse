import Triangle from './Triangle.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('triangle', function (x, y, width, height, fillColor, fillAlpha) {
    var gameObject = new Triangle(this.scene, x, y, width, height, fillColor, fillAlpha);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.Triangle', Triangle);

export default Triangle;