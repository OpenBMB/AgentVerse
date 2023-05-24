import Extend from '../../../utils/managers/Extend.js';
import DynamicText from '../dynamictext/DynamicText.js';
import Parser from './parser/Parser.js';
import TypeWriter from './typewriter/TypeWriter.js';
import ImageManager from '../../../utils/texture/imagemanager/ImageManager.js';
import AddSpriteManager from './methods/spritemanager/AddSpriteManager.js';
import Methods from './methods/Methods.js';
import ClearEvents from './methods/utils/ClearEvents.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class TextPlayer extends Extend(DynamicText) {
    constructor(scene, x, y, fixedWidth, fixedHeight, config) {
        if (IsPlainObject(x)) {
            config = x;
        } else if (IsPlainObject(fixedWidth)) {
            config = fixedWidth;
        }
        if (config === undefined) {
            config = {};
        }

        // Don't set text in DynamicText's constructor
        var content = config.text;
        delete config.text;

        super(scene, x, y, fixedWidth, fixedHeight, config);
        this.type = 'rexTextPlayer';

        this.parser = new Parser(this, GetValue(config, 'parser', undefined));

        this.typeWriter = new TypeWriter(this, GetValue(config, 'typing', undefined));

        this._imageManager = undefined;
        var imageData = GetValue(config, 'images', undefined);
        if (imageData) {
            this.addImage(imageData);
        }

        this.setTargetCamera(GetValue(config, 'camera', this.scene.sys.cameras.main));

        this.initManagers(scene, config);

        var spriteManagerConfig = GetValue(config, 'sprites');
        if ((spriteManagerConfig !== false) && (spriteManagerConfig !== null)) {
            AddSpriteManager.call(this, spriteManagerConfig);
        }

        this.setIgnoreNextPageInput(GetValue(config, 'ignoreNextPageInput', false));
        this.setClickTarget(GetValue(config, 'clickTarget', this));  // this.clickEE
        this.setNextPageInput(GetValue(config, 'nextPageInput', null));

        this.isPlaying = false;

        if (content) {
            this.play(content);
        }
    }

    get imageManager() {
        if (this._imageManager === undefined) {
            this._imageManager = new ImageManager(this.scene);
        }
        return this._imageManager;
    }

    get spriteManager() {
        return this.getGameObjectManager('sprite');
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        ClearEvents(this);

        this.parser.destroy();
        this.parser = undefined;

        this.typeWriter.destroy(fromScene);
        this.typeWriter = undefined;

        if (this._imageManager) {
            this._imageManager.destroy(fromScene);
        }
        this._imageManager = undefined;

        this.targetCamera = undefined;

        this.clickEE = undefined;

        this.destroyManagers(fromScene);

        super.destroy(fromScene);
    }

    get isPageTyping() {
        return this.typeWriter.isPageTyping;
    }

    set defaultTypingSpeed(speed) {
        this.typeWriter.setDefaultTypingSpeed(speed);
    }

    get defaultTypingSpeed() {
        return this.typeWriter.defaultTypingSpeed;
    }

    set typingSpeed(speed) {
        this.typeWriter.setTypingSpeed(speed);
    }

    get typingSpeed() {
        return this.typeWriter.speed;
    }

    set timeScale(value) {
        this.setTimeScale(value);
    }

    get timeScale() {
        return this.getTimeScale();
    }
}

Object.assign(
    TextPlayer.prototype,
    Methods
);

export default TextPlayer;