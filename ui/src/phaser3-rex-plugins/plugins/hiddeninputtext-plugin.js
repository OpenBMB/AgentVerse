import HiddenInputText from './behaviors/hiddentextedit/HiddenTextEdit.js';
import SetValue from './utils/object/SetValue.js';

class HiddenInputTextPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(textObject, config) {
        return new HiddenInputText(textObject, config);
    }
}

SetValue(window, 'RexPlugins.GameObjects.HiddenInputText', HiddenInputText);

export default HiddenInputTextPlugin;