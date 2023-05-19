import FixWidthSizer from './FixWidthSizer.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('fixWidthSizer', function (x, y, minWidth, minHeight, config) {
    var gameObject = new FixWidthSizer(this.scene, x, y, minWidth, minHeight, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.FixWidthSizer', FixWidthSizer);

export default FixWidthSizer;