import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import Methods from './methods/Methods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class TextEdit extends ComponentBase {
    constructor(gameObject, config) {
        super(gameObject);
        // this.parent = gameObject;

        this.inputText = undefined;
        this.onClose = undefined;
        this.delayCall = undefined;

        this.setOpenConfig(config);

        var clickEnable = GetValue(config, 'clickEnable', true);
        if (clickEnable) {
            gameObject
                .on('pointerdown', function () {
                    this.open();
                }, this)
                .setInteractive()
        }
    }

    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        this.close();

        super.shutdown(fromScene);
    }

    setOpenConfig(config) {
        if (config === undefined) {
            config = {};
        }
        this.openConfig = config;
        return this;
    }

    get isOpened() {
        return (this.inputText !== undefined);
    }

    get text() {
        return (this.isOpened) ? this.inputText.text : this.parent.text;
    }
}

Object.assign(
    TextEdit.prototype,
    Methods,
)

export default TextEdit;