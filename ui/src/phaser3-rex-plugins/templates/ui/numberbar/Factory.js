import NumberBar from './NumberBar.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('numberBar', function (config) {
    var gameObject = new NumberBar(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.NumberBar', NumberBar);

export default NumberBar;