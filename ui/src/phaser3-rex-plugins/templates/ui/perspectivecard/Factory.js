import PerspectiveCard from './PerspectiveCard.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('perspectiveCard', function (config) {
    var gameObject = new PerspectiveCard(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.PerspectiveCard', PerspectiveCard);

export default PerspectiveCard;