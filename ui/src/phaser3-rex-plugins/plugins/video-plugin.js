import VideoDOMFactory from './gameobjects/video/videodom/Factory.js';
import VideoDOMCreator from './gameobjects/video/videodom/Creator.js';
import VideoCanvasFactory from './gameobjects/video/videocanvas/Factory.js';
import VideoCanvasCreator from './gameobjects/video/videocanvas/Creator.js';
import VideoDOM from './gameobjects/video/videodom/VideoDOM.js';
import VideoCanvas from './gameobjects/video/videocanvas/VideoCanvas.js';
import SetValue from './utils/object/SetValue.js';

class VideoPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexVideo', VideoDOMFactory, VideoDOMCreator);
        pluginManager.registerGameObject('rexVideoCanvas', VideoCanvasFactory, VideoCanvasCreator);        
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.Video', VideoDOM);
SetValue(window, 'RexPlugins.GameObjects.VideoCanvas', VideoCanvas);

export default VideoPlugin;