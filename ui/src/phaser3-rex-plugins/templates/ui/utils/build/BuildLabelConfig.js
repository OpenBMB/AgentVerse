import DeepClone from '../../../../plugins/utils/object/DeepClone.js';
import SetValue from '../../../../plugins/utils/object/SetValue.js';
import DefaultCreateBackground from './CreateBackground.js';
import DefaultCreateText from './CreateText.js';
import WrapExpandText from '../wrapexpandtext/WrapExpandText.js'
import DefaultCreateImage from './CreateImage.js';


const GetValue = Phaser.Utils.Objects.GetValue;

var BuildLabelConfig = function (scene, config, creators) {
    config = (config) ? DeepClone(config) : {};

    var createBackground = GetValue(creators, 'background', DefaultCreateBackground);
    var createText = GetValue(creators, 'text', DefaultCreateText);
    var createIcon = GetValue(creators, 'icon', DefaultCreateImage);
    var createAction = GetValue(creators, 'action', DefaultCreateImage);

    if (createBackground) {
        config.background = createBackground(scene, config.background);
    } else {
        delete config.background;
    }

    if (createText) {
        var wrapText = GetValue(config, 'wrapText', false);

        if (wrapText) {
            if (wrapText === true) {
                wrapText = 'word';
            }
            SetValue(config, 'text.wrap.mode', wrapText);
            config.expandTextWidth = true;
        }

        config.text = createText(scene, config.text);

        if (wrapText) {
            config.text = WrapExpandText(config.text);
        }
    } else {
        delete config.text;
    }

    if (createIcon && (config.icon !== null)) {
        config.icon = createIcon(scene, config.icon);
    } else {
        delete config.icon;
    }

    if (createAction && (config.action !== null)) {
        config.action = createAction(scene, config.action);
    } else {
        delete config.action;
    }

    return config;
}

export default BuildLabelConfig;