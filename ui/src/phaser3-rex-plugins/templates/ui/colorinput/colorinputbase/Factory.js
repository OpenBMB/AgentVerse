import ColorInputBase from './ColorInputBase.js';
import ObjectFactory from '../../ObjectFactory.js';
import SetValue from '../../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('colorInputLite', function (config) {
    var gameObject = new ColorInputBase(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.ColorInputBase', ColorInputBase);

export default ColorInputBase;