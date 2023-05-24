import ColorInput from './ColorInput.js';
import ObjectFactory from '../../ObjectFactory.js';
import SetValue from '../../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('colorInput', function (config) {
    var gameObject = new ColorInput(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.ColorInput', ColorInput);

export default ColorInput;