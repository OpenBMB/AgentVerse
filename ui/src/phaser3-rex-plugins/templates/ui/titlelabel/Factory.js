import TitleLabel from './TitleLabel.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('titleLabel', function (config) {
    var gameObject = new TitleLabel(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.TitleLabel', TitleLabel);

export default TitleLabel;