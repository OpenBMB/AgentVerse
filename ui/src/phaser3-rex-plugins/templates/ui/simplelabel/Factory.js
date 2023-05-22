import SimpleLabel from './SimpleLabel.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('simpleLabel', function (config, creators) {
    var gameObject = new SimpleLabel(this.scene, config, creators);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.SimpleLabel', SimpleLabel);

export default SimpleLabel;