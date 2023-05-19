import Extend from '../../../utils/managers/Extend.js';
import Parser from './parser/Parser.js';
import AddSpriteManager from './methods/spritemanager/AddSpriteManager.js';
import AddTextManager from './methods/textmanager/AddTextManager.js';
import Methods from './methods/Methods.js';
import ClearEvents from './methods/utils/ClearEvents.js';

const EventEmitter = Phaser.Events.EventEmitter;
const GetValue = Phaser.Utils.Objects.GetValue;

class TagPlayer extends Extend(EventEmitter) {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }
        super();

        this.scene = scene;

        this.parser = new Parser(this, GetValue(config, 'parser', undefined));

        this.setTargetCamera(GetValue(config, 'camera', this.scene.sys.cameras.main));

        this.initManagers(scene, config);

        var spriteManagerConfig = GetValue(config, 'sprites');
        if ((spriteManagerConfig !== false) && (spriteManagerConfig !== null)) {
            AddSpriteManager.call(this, spriteManagerConfig);
        }

        var textManagerConfig = GetValue(config, 'texts');
        if ((textManagerConfig !== false) && (textManagerConfig !== null)) {
            AddTextManager.call(this, textManagerConfig);
        }

        this.setClickTarget(GetValue(config, 'clickTarget', scene));  // this.clickEE
    }

    get isPlaying() {
        return this.parser.isRunning;
    }

    get spriteManager() {
        return this.getGameObjectManager('sprite');
    }

    get textManager() {
        return this.getGameObjectManager('text');
    }

    get gameObjectManagerNames() {
        var names = [];
        for (var name in this.gameObjectManagers) {
            names.push(name);
        }
        return names;
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }

        ClearEvents(this);

        this.targetCamera = undefined;

        super.destroy();

        this.destroyManagers(fromScene);

        this.scene = undefined;
    }

    set timeScale(value) {
        this.setTimeScale(value);
    }

    get timeScale() {
        return this.getTimeScale();
    }

}

Object.assign(
    TagPlayer.prototype,
    Methods
);

export default TagPlayer;