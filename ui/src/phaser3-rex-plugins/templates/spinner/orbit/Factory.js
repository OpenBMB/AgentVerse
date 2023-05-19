import Orbit from './Orbit.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('orbit', function (config) {
    var gameObject = new Orbit(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.Spinner.Orbit', Orbit);

export default Orbit;