
import LoaderCallback from './loader/imageuri/ImageURILoaderCallback.js';

class ImageURILoaderPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);

        pluginManager.registerFileType('rexImageURI', LoaderCallback);
    }

    addToScene(scene) {
        scene.sys.load['rexImageURI'] = LoaderCallback;
    }
}

export default ImageURILoaderPlugin;