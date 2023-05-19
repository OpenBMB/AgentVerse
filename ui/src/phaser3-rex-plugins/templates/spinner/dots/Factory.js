import Dots from './Dots.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('dots', function (config) {
    var gameObject = new Dots(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.Spinner.Dots', Dots);

export default Dots;