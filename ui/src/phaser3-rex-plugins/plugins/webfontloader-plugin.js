import LoaderCallback from './loader/webfontloader/WebFontLoaderCallback.js';

class WebFontLoaderPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);

        pluginManager.registerFileType('rexWebFont', LoaderCallback);
    }

    addToScene(scene) {
        scene.sys.load['rexWebFont'] = LoaderCallback;
    }
}

export default WebFontLoaderPlugin;