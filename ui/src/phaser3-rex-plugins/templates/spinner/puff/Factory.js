import Puff from './Puff.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('puff', function (config) {
    var gameObject = new Puff(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.Spinner.Puff', Puff);

export default Puff;