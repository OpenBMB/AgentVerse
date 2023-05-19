
import LoaderCallback from './loader/scripttag/ScriptTagLoaderCallback.js';

class ScriptTagLoaderPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);

        pluginManager.registerFileType('rexScriptTag', LoaderCallback);
    }

    addToScene(scene) {
        scene.sys.load['rexScriptTag'] = LoaderCallback;
    }
}

export default ScriptTagLoaderPlugin;