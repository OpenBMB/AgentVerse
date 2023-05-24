import Factory from './gameobjects/dom/filedropzone/Factory.js';
import Creator from './gameobjects/dom/filedropzone/Creator.js';
import FileDropZone from './gameobjects/dom/filedropzone/FileDropZone.js';
import SetValue from './utils/object/SetValue.js';

class FileDropZonePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexFileDropZone', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    // Note: Not working in iOS9+
    open(config) {
        return OpenFileChooser(this.game, config);
    }
}

SetValue(window, 'RexPlugins.GameObjects.FileDropZone', FileDropZone);

export default FileDropZonePlugin;