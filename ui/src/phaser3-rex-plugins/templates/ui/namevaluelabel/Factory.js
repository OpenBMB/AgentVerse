import NameValueLabel from './NameValueLabel.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('nameValueLabel', function (config) {
    var gameObject = new NameValueLabel(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.NameValueLabel', NameValueLabel);

export default NameValueLabel;