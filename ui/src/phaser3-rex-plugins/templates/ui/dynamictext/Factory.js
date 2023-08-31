import DynamicText from './DynamicText.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('dynamicText', function (x, y, width, height, config) {
    var gameObject = new DynamicText(this.scene, x, y, width, height, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.DynamicText', DynamicText);

export default DynamicText;