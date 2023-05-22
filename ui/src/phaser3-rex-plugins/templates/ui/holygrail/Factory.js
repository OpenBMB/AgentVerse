import HolyGrail from './HolyGrail.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('holyGrail', function (config) {
    var gameObject = new HolyGrail(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.HolyGrail', HolyGrail);

export default HolyGrail;