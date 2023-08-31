import Dialog from '../dialog/Dialog.js';
import Methods from './methods/Methods.js';
import RegisterEvents from './methods/RegisterEvents.js';
import DeepClone from '../../../plugins/utils/object/DeepClone.js';
import CreateBackground from '../utils/build/CreateBackground.js';
import CreateLabel from '../utils/build/CreateLabel.js';
import CreateContent from './methods/CreateContent.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';
import HasValue from '../../../plugins/utils/object/HasValue.js';
import TextArea from '../textarea/TextArea.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class ConfirmDialog extends Dialog {
    constructor(scene, config, creators) {
        config = (config) ? DeepClone(config) : {};

        if (creators === undefined) {
            creators = {};
        }

        var createBackground = GetValue(creators, 'background', CreateBackground);
        if (createBackground) {
            config.background = createBackground(scene, config.background);
        } else {
            delete config.background;
        }

        config.title = CreateLabel(scene, config.title, creators.title);

        config.content = CreateContent(scene, config.content, creators.content);
        if (config.content instanceof TextArea) {
            if (HasValue(config, 'height') && !HasValue(config, 'proportion.content')) {
                SetValue(config, 'proportion.content', 1);
            }
        }

        var defaultButtonConfig = config.button;
        var buttonAConfig = config.buttonA || defaultButtonConfig;
        var buttonBConfig = config.buttonB || defaultButtonConfig;
        var buttonMode = config.buttonMode;
        if (buttonMode === undefined) {
            buttonMode = (!!buttonAConfig && !!buttonBConfig) ? 2 :
                (!!buttonAConfig) ? 1 :
                    0;
        }

        var defaultButtonCreator = creators.button;
        var buttonACreators = creators.buttonA || defaultButtonCreator;
        var buttonBCreators = creators.buttonB || defaultButtonCreator;
        switch (buttonMode) {
            case 2:
                config.actions = [
                    CreateLabel(scene, buttonAConfig, buttonACreators),
                    CreateLabel(scene, buttonBConfig, buttonBCreators),
                ]
                break;

            case 1:
                config.actions = [
                    CreateLabel(scene, buttonAConfig, buttonACreators),
                ]
                break;

            case 0:
                break;

            default:
                config.actions = [];
                break;
        }

        var defaultChoiceConfig = config.choice;
        if (defaultChoiceConfig) {
            config.choices = [];
        }

        super(scene, config);
        this.type = 'rexConfirmDialog';

        this.buttonMode = buttonMode;

        this.defaultActionConfig = defaultButtonConfig;
        this.defaultActionButtonCreator = defaultButtonCreator;

        this.defaultChoiceConfig = defaultChoiceConfig;
        this.defaultChoiceCreator = creators.choice;

        var buttons = this.childrenMap.actions;
        this.addChildrenMap('buttonA', (buttons) ? buttons[0] : null);
        this.addChildrenMap('buttonB', (buttons) ? buttons[1] : null);

        // Interactive
        RegisterEvents.call(this);
    }
}

Object.assign(
    ConfirmDialog.prototype,
    Methods
)

export default ConfirmDialog;