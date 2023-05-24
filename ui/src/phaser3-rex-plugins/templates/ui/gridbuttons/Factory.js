import GridButtons from './GridButtons.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('gridButtons', function (config) {
    var gameObject = new GridButtons(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.GridButtons', GridButtons);

export default GridButtons;