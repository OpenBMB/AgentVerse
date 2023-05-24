import ScrollBar from './ScrollBar.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('scrollBar', function (config) {
    var gameObject = new ScrollBar(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.ScrollBar', ScrollBar);

export default ScrollBar;