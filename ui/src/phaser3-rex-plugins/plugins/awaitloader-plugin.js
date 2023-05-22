import LoaderCallback from './loader/awaitloader/AwaitLoaderCallback.js';

class AwaitLoaderPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);

        pluginManager.registerFileType('rexAwait', LoaderCallback);
    }

    addToScene(scene) {
        scene.sys.load.rexAwait = LoaderCallback;
    }
}

export default AwaitLoaderPlugin;