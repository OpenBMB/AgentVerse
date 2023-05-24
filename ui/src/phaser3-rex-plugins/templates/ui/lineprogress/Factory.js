import LineProgress from './LineProgress.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('lineProgress', function (x, y, width, height, barColor, value, config) {
    var gameObject = new LineProgress(this.scene, x, y, width, height, barColor, value, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.LineProgress', LineProgress);

export default LineProgress;