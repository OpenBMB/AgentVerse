import StatesRoundRectangle from './StatesRoundRectangle.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('statesRoundRectangle', function (config) {
    var gameObject = new StatesRoundRectangle(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.StatesRoundRectangle', StatesRoundRectangle);

export default StatesRoundRectangle;