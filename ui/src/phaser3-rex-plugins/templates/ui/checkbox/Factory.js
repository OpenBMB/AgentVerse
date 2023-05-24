import Checkbox from './Checkbox.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('checkbox', function (x, y, width, height, color, config) {
    var gameObject = new Checkbox(this.scene, x, y, width, height, color, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.Checkbox', Checkbox);

export default Checkbox;