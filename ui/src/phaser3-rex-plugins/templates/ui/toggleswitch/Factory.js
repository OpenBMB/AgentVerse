import ToggleSwitch from './ToggleSwitch.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('toggleSwitch', function (x, y, width, height, color, config) {
    var gameObject = new ToggleSwitch(this.scene, x, y, width, height, color, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.ToggleSwitch', ToggleSwitch);

export default ToggleSwitch;