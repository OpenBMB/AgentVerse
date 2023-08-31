import Factory from './gameobjects/shape/lineprogress/Factory.js';
import Creator from './gameobjects/shape/lineprogress/Creator.js';
import LineProgress from './gameobjects/shape/lineprogress/LineProgress.js';
import SetValue from './utils/object/SetValue.js';

class LineProgressPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexLineProgress', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.LineProgress', LineProgress);

export default LineProgressPlugin;