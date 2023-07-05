import DeepClone from '../../../../plugins/utils/object/DeepClone.js';
import BuildLabelConfig from './BuildLabelConfig.js';
import CreateLabel from './CreateLabel.js';

var BuildListConfig = function (scene, config, creators) {
    config = (config) ? DeepClone(config) : {};

    if (creators === undefined) { creators = {} }

    var labelConfig = config.label || config.button;
    var listButtonConfig = config.button || config.label;
    delete config.label;
    delete config.button;

    var labelCreator = creators.label || creators.button || creators;
    var listButtonCreator = creators.button || creators.label || creators;

    var listConfig = BuildLabelConfig(scene, labelConfig, labelCreator);
    listConfig.list = config.list || {};

    listConfig.list.createButtonCallback = function (scene, option) {
        var gameObject = CreateLabel(scene, listButtonConfig, listButtonCreator)
            .resetDisplayContent({ text: option.text })

        if (option.hasOwnProperty('value')) {
            gameObject.value = option.value;
        }
        return gameObject;
    }

    listConfig.list.onButtonOver = function (button, index, pointer, event) {
        if (button.setHoverState) {
            button.setHoverState(true);
        }
    }
    listConfig.list.onButtonOut = function (button, index, pointer, event) {
        if (button.setHoverState) {
            button.setHoverState(false);
        }
    }

    return listConfig;
}

export default BuildListConfig;
