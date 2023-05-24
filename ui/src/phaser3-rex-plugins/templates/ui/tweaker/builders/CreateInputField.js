import {
    StringType, NumberType, RangeType,
    ListType, ButtonsType,
    BooleanType, ToggleSwitchType,
    ColorType,
} from '../utils/inputs/InputTypes.js';
import CreateTextInput from './CreateTextInput.js';
import CreateNumberInput from './CreateNumberInput.js';
import CreateRangeInput from './CreateRangeInput.js';
import CreateListInput from './CreateListInput.js';
import CreateButtonsInput from './CreateButtonsInput.js';
import CreateCheckboxInput from './CreateCheckboxInput.js';
import CreateToggleSwitchInput from './CreateToggleSwitchInput.js';
import CreateColorInput from './CreateColorInput.js';
import IsFunction from '../../../../plugins/utils/object/IsFunction.js';

var CreateInputField = function (scene, config, style) {
    var viewType = config.view;
    var callback;
    switch (viewType) {
        case StringType:
            callback = CreateTextInput;
            break;

        case NumberType:
            callback = CreateNumberInput;
            break;

        case RangeType:
            callback = CreateRangeInput;
            break;

        case ListType:
            callback = CreateListInput;
            break;

        case ButtonsType:
            callback = CreateButtonsInput;
            break;

        case BooleanType:
            callback = CreateCheckboxInput;
            break;

        case ToggleSwitchType:
            callback = CreateToggleSwitchInput;
            break;

        case ColorType:
            callback = CreateColorInput;
            break;

        default:
            callback = IsFunction(viewType) ? viewType : CreateTextInput;
            break;
    }

    var gameObject = callback(scene, config, style, gameObject);

    // Extra settings
    gameObject.setTextFormatCallback(config.format);

    return gameObject;
}

export default CreateInputField;