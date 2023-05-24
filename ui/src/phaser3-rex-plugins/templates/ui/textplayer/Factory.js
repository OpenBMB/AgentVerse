import TextPlayer from './TextPlayer.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('textPlayer', function (x, y, width, height, config) {
    var gameObject = new TextPlayer(this.scene, x, y, width, height, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.TextPlayer', TextPlayer);

export default TextPlayer;