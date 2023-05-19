import ColorPicker from './ColorPicker.js';
import ObjectFactory from '../../ObjectFactory.js';
import SetValue from '../../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('colorPicker', function (config) {
    var gameObject = new ColorPicker(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.ColorPicker', ColorPicker);

export default ColorPicker;