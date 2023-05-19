import Rings from './Rings.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('rings', function (config) {
    var gameObject = new Rings(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.Spinner.Rings', Rings);

export default Rings;