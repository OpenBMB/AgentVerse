import ColorComponents from './ColorComponents.js';
import ObjectFactory from '../../ObjectFactory.js';
import SetValue from '../../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('colorComponents', function (config) {
    var gameObject = new ColorComponents(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.ColorComponents', ColorComponents);

export default ColorComponents;