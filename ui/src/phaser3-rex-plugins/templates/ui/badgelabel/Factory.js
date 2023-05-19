import BadgeLabel from './BadgeLabel.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('badgeLabel', function (config) {
    var gameObject = new BadgeLabel(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.BadgeLabel', BadgeLabel);

export default BadgeLabel;